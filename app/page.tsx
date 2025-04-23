"use client"

import { useState, useEffect } from "react"
import Dashboard from "@/components/dashboard"
import AddWidgetPanel from "@/components/add-widget-panel"
import TopNavBar from "@/components/top-nav-bar"
import DashboardHeader from "@/components/dashboard-header"
import { initialDashboardData } from "@/lib/data"
import type { Widget } from "@/lib/types"

export default function Home() {
  const [dashboardData, setDashboardData] = useState(initialDashboardData)
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false)
  const [timeFilter, setTimeFilter] = useState("Last 2 days")
  const [addedWidgets, setAddedWidgets] = useState<Record<string, boolean>>({})
  const [removedWidgets, setRemovedWidgets] = useState<Widget[]>([])

  // Initialize the addedWidgets state based on current dashboard data
  useEffect(() => {
    const widgetMap: Record<string, boolean> = {}

    dashboardData.categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        widgetMap[widget.id] = true
      })
    })

    setAddedWidgets(widgetMap)
  }, [])

  const handleAddWidget = (categoryId: string, widget: any) => {
    setDashboardData((prev) => {
      const updatedData = { ...prev }
      const category = updatedData.categories.find((c) => c.id === categoryId)

      if (category) {
        // Check if widget already exists
        const existingWidgetIndex = category.widgets.findIndex((w) => w.id === widget.id)

        if (existingWidgetIndex === -1) {
          // Add new widget
          category.widgets.push(widget)
          // Update added widgets state
          setAddedWidgets((prev) => ({ ...prev, [widget.id]: true }))

          // Remove from removedWidgets if it was there
          setRemovedWidgets((prev) => prev.filter((w) => w.id !== widget.id))
        }
      }

      return updatedData
    })
    setIsAddWidgetOpen(false)
  }

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    setDashboardData((prev) => {
      const updatedData = { ...prev }
      const category = updatedData.categories.find((c) => c.id === categoryId)

      if (category) {
        // Find the widget before removing it
        const widgetToRemove = category.widgets.find((w) => w.id === widgetId)

        // Remove the widget from the category
        category.widgets = category.widgets.filter((w) => w.id !== widgetId)

        // If it's a custom widget, add it to removedWidgets
        if (widgetToRemove && widgetToRemove.id.startsWith("custom-")) {
          setRemovedWidgets((prev) => [...prev, widgetToRemove])
        }

        // Update added widgets state
        setAddedWidgets((prev) => {
          const updated = { ...prev }
          delete updated[widgetId]
          return updated
        })
      }

      return updatedData
    })
  }

  const handleRefresh = () => {
    // In a real application, this would refresh data from the server
    console.log("Refreshing dashboard data...")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <TopNavBar />
      <DashboardHeader
        onAddWidget={() => setIsAddWidgetOpen(true)}
        onRefresh={handleRefresh}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      <div className="p-4">
        <Dashboard data={dashboardData} onRemoveWidget={handleRemoveWidget} />
      </div>

      {isAddWidgetOpen && (
        <AddWidgetPanel
          onClose={() => setIsAddWidgetOpen(false)}
          onAddWidget={handleAddWidget}
          dashboardData={dashboardData}
          removedWidgets={removedWidgets}
        />
      )}
    </main>
  )
}
