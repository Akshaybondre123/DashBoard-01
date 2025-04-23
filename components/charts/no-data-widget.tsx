import { LineChart } from "lucide-react"

interface NoDataWidgetProps {
  text?: string
}

export default function NoDataWidget({ text }: NoDataWidgetProps) {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
      <LineChart size={32} className="mb-2" />
      <p>No Graph data available!</p>
      {text && <p className="mt-2 text-center text-gray-600">{text}</p>}
    </div>
  )
}
