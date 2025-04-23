import { Plus } from "lucide-react"

export default function EmptyWidgetSlot() {
  return (
    <div className="bg-white border border-dashed rounded-lg shadow-sm p-4 flex items-center justify-center h-64 hover:bg-gray-50 transition-colors">
      <button className="text-gray-400 flex flex-col items-center hover:text-blue-500 transition-colors">
        <Plus size={24} />
        <span className="mt-2">Add Widget</span>
      </button>
    </div>
  )
}
