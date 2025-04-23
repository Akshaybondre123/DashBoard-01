"use client"

import { useEffect, useRef } from "react"

interface DonutChartProps {
  data: {
    total: number
    items: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export default function DonutChart({ data }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    let startAngle = Math.PI / 2 + Math.PI

    const donutWidth = radius * 0.4
    const outerRadius = radius
    const innerRadius = radius - donutWidth

    // Sort so "Not Connected" is drawn first (background)
    const sortedItems = [...data.items].sort((a, b) => {
      if (a.label === "Not Connected") return -1
      if (b.label === "Not Connected") return 1
      return 0
    })

    sortedItems.forEach((item) => {
      const sliceAngle = (item.value / data.total) * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw center white circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()

    // ✅ Show only "Connected" value in the center
    const connectedItem = data.items.find(i => i.label === "Connected")
    const centerDisplayValue = connectedItem ? connectedItem.value : 0

    ctx.fillStyle = "#333" // Black text
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${centerDisplayValue}`, centerX, centerY - 10)

    ctx.font = "14px Arial"
    ctx.fillText("Total", centerX, centerY + 15)
  }, [data])

  return (
    <div className="flex items-start justify-between w-full">
      {/* Chart on the left */}
      <div className="flex-shrink-0">
        <canvas ref={canvasRef} width={200} height={200} />
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-10">
        {[...data.items]
          .sort((a, b) => {
            if (a.label === "Connected") return -1
            if (b.label === "Connected") return 1
            return 0
          })
          .map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-4 h-4 mr-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="font-medium text-gray-700">
                {item.label} ({item.value})
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
