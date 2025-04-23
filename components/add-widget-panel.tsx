"use client"

import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import type { DashboardData, Widget } from "@/lib/types"
import { availableWidgets } from "@/lib/data"

interface AddWidgetPanelProps {
  onClose: () => void
  onAddWidget: (categoryId: string, widget: Widget) => void
  dashboardData: DashboardData
  removedWidgets: Widget[] 
}

export default function AddWidgetPanel({ onClose, onAddWidget, dashboardData, removedWidgets }: AddWidgetPanelProps) {
  const [activeTab, setActiveTab] = useState("CSPM")
  const [searchQuery, setSearchQuery] = useState("")
  const [newWidgetName, setNewWidgetName] = useState("")
  const [newWidgetText, setNewWidgetText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(dashboardData.categories[0]?.id || "")
  const [addedWidgets, setAddedWidgets] = useState<Record<string, boolean>>({})
  const [customWidgets, setCustomWidgets] = useState<Widget[]>([])

  useEffect(() => {
    const widgetMap: Record<string, boolean> = {}
    const customWidgetsFound: Widget[] = []


    dashboardData.categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        widgetMap[widget.id] = true

        
        if (widget.id.startsWith("custom-") && !availableWidgets.some((w) => w.id === widget.id)) {
          customWidgetsFound.push(widget)
        }
      })
    })

    // Add any removed custom widgets to our list (but don't mark them as added)
    removedWidgets.forEach((widget) => {
      if (widget.id.startsWith("custom-") && !customWidgetsFound.some((w) => w.id === widget.id)) {
        customWidgetsFound.push(widget)
      }
    })

    setAddedWidgets(widgetMap)
    setCustomWidgets(customWidgetsFound)
  }, [dashboardData, removedWidgets])

  // Combine available widgets with custom widgets
  const allWidgets = [...availableWidgets, ...customWidgets]

  // Filter widgets based on search query and active tab
  const filteredWidgets = allWidgets.filter((widget) => {
    const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = widget.category === activeTab || searchQuery !== ""
    return matchesSearch && (matchesTab || searchQuery !== "")
  })

  // Check if a widget is already added to the selected category
  const getIsWidgetAdded = (widgetId: string) => {
    return addedWidgets[widgetId] || false
  }

  const handleWidgetToggle = (widget: Widget) => {
    const isAdded = getIsWidgetAdded(widget.id)

    if (!isAdded) {
      onAddWidget(selectedCategory, widget)
      setAddedWidgets((prev) => ({ ...prev, [widget.id]: true }))
    } else {
      // If we want to handle removal here, we would need to add that functionality
      // For now, we'll just update the UI state
      console.log("Widget already added, would need to remove it")
    }
  }

  const handleAddCustomWidget = () => {
    if (!newWidgetName.trim() || !selectedCategory) return

    const newWidget: Widget = {
      id: `custom-${Date.now()}`,
      name: newWidgetName,
      type: "noData",
      category: activeTab,
      data: {
        text: newWidgetText || "Custom widget content",
        total: 0,
        items: [],
      },
    }

    // Add the new widget to our custom widgets list
    setCustomWidgets((prev) => [...prev, newWidget])

    // Add the widget to the dashboard
    onAddWidget(selectedCategory, newWidget)

    // Mark it as added
    setAddedWidgets((prev) => ({ ...prev, [newWidget.id]: true }))

    // Clear the form
    setNewWidgetName("")
    setNewWidgetText("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md flex flex-col h-full">
        {/* Header */}
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <h2 className="font-semibold">Add Widget</h2>
          <button onClick={onClose} aria-label="Close panel">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <p className="text-gray-600 mb-4">Personalise your dashboard by adding the following widget</p>

          {/* Search */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search widgets..."
              className="w-full pl-10 p-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-4">
            {["CSPM", "CWPP", "Image", "Ticket"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Widget List */}
          <div className="space-y-2 mb-6">
            {filteredWidgets.map((widget) => {
              const isAdded = getIsWidgetAdded(widget.id)

              return (
                <div key={widget.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`widget-${widget.id}`}
                    checked={isAdded}
                    onChange={() => handleWidgetToggle(widget)}
                    className="mr-2"
                  />
                  <label htmlFor={`widget-${widget.id}`} className="cursor-pointer">
                    {widget.name}
                  </label>
                </div>
              )
            })}
          </div>

          {/* Add Custom Widget */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Add Custom Widget</h3>

            <div className="space-y-3">
              <div>
                <label htmlFor="category" className="block text-sm mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {dashboardData.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="widgetName" className="block text-sm mb-1">
                  Widget Name
                </label>
                <input
                  id="widgetName"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  placeholder="Enter widget name"
                />
              </div>

              <div>
                <label htmlFor="widgetText" className="block text-sm mb-1">
                  Widget Text
                </label>
                <textarea
                  id="widgetText"
                  className="w-full p-2 border rounded-md"
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  placeholder="Enter widget content"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
          <button onClick={onClose} className="px-4 py-2 border border-blue-800 text-blue-800 rounded-md">
            Cancel
          </button>
          <button onClick={handleAddCustomWidget} className="px-4 py-2 bg-blue-800 text-white rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
