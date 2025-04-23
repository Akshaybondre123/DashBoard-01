"use client"

import type { Widget as WidgetType } from "@/lib/types"
import { X } from "lucide-react"
import DonutChart from "@/components/charts/donut-chart"
import ArcChart from "@/components/charts/arc-chart"
import BarChart from "@/components/charts/bar-chart"
import NoDataWidget from "@/components/charts/no-data-widget"

interface WidgetProps {
  widget: WidgetType
  onRemove: () => void
}

export default function Widget({ widget, onRemove }: WidgetProps) {
  const handleRemove = () => {
    
    onRemove()
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 relative hover:shadow-md transition-shadow h-72 overflow-auto">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove widget"
      >
        <X size={16} />
      </button>

      <h3 className="font-medium text-gray-900 mb-3 border-b pb-2">{widget.name}</h3>

      <div className="flex items-center justify-center h-[calc(100%-3rem)]">
        {widget.type === "donut" && <DonutChart data={widget.data} />}
        {widget.type === "arc" && <ArcChart data={widget.data} />}
        {widget.type === "bar" && <BarChart data={widget.data} />}
        {widget.type === "noData" && <NoDataWidget text={widget.data.text} />}
      </div>
    </div>
  )
}
