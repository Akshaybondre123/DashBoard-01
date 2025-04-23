"use client"

import { ChevronDown, Clock, MoreVertical, RefreshCw } from "lucide-react"

interface DashboardHeaderProps {
  onAddWidget: () => void
  onRefresh: () => void
  timeFilter: string
  setTimeFilter: (filter: string) => void
}

export default function DashboardHeader({ onAddWidget, onRefresh, timeFilter, setTimeFilter }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      
      <h1 className="text-lg font-semibold text-gray-900">CNAPP Dashboard</h1>

      
      <div className="flex items-center space-x-3">
        
        <button
          onClick={onAddWidget}
          className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Add Widget +
        </button>

        
        <button
          onClick={onRefresh}
          className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          aria-label="Refresh dashboard"
        >
          <RefreshCw className="h-5 w-5" />
        </button>

        {/* More Options */}
        <button
          className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>

        
        <div className="relative">
          <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-blue-700">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeFilter}</span>
            <div className="h-4 mx-1 border-l border-blue-300"></div>
            <ChevronDown className="h-4 w-4" />
          </button>
          {/* Dropdown would go here */}
        </div>
      </div>
    </div>
  )
}
