"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  data: {
    total: number
    items: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export default function BarChart({ data }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    const titleText = `${data.total}`
    ctx.font = "bold 22px Arial"
    ctx.fillStyle = "#111"
    ctx.textAlign = "left"
    ctx.fillText(titleText, 10, 30)

    const subText = data.total > 10 ? "Total Vulnerabilities" : "Total Images"
    ctx.font = "14px Arial"
    ctx.fillStyle = "#555"
    const titleWidth = ctx.measureText(titleText).width
    ctx.fillText(subText, 10 + titleWidth + 20, 30)

    const barX = 10
    const barY = 60
    const barWidth = width - 20
    const barHeight = 20
    const barRadius = barHeight / 2

    // Draw the background rounded bar
    ctx.beginPath()
    ctx.moveTo(barX + barRadius, barY)
    ctx.lineTo(barX + barWidth - barRadius, barY)
    ctx.arc(barX + barWidth - barRadius, barY + barRadius, barRadius, -Math.PI / 2, Math.PI / 2)
    ctx.lineTo(barX + barRadius, barY + barHeight)
    ctx.arc(barX + barRadius, barY + barRadius, barRadius, Math.PI / 2, -Math.PI / 2)
    ctx.closePath()
    ctx.fillStyle = "#e5e7eb"
    ctx.fill()

    // Clip everything inside rounded background shape
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(barX + barRadius, barY)
    ctx.lineTo(barX + barWidth - barRadius, barY)
    ctx.arc(barX + barWidth - barRadius, barY + barRadius, barRadius, -Math.PI / 2, Math.PI / 2)
    ctx.lineTo(barX + barRadius, barY + barHeight)
    ctx.arc(barX + barRadius, barY + barRadius, barRadius, Math.PI / 2, -Math.PI / 2)
    ctx.closePath()
    ctx.clip()

    // Draw each segment
    const totalValue = data.items.reduce((sum, item) => sum + item.value, 0)
    let currentX = barX

    data.items.forEach((item) => {
      const segmentWidth = (item.value / totalValue) * barWidth
      ctx.fillStyle = item.color
      ctx.fillRect(currentX, barY, segmentWidth, barHeight)
      currentX += segmentWidth
    })

    ctx.restore() // End clip

    // Draw legend
    const legendY = barY + barHeight + 20
    const spacing = 120
    data.items.forEach((item, index) => {
      const x = 10 + index * spacing
      ctx.fillStyle = item.color
      ctx.fillRect(x, legendY, 12, 12)

      ctx.font = "12px Arial"
      ctx.fillStyle = "#333"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.label} (${item.value})`, x + 18, legendY + 6)
    })
  }, [data])

  return (
    <div className="flex flex-col">
      <canvas ref={canvasRef} width={350} height={150} />
    </div>
  )
}
