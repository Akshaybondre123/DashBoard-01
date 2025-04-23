import Category from "@/components/category"
import type { DashboardData } from "@/lib/types"

interface DashboardProps {
  data: DashboardData
  onRemoveWidget: (categoryId: string, widgetId: string) => void
}

export default function Dashboard({ data, onRemoveWidget }: DashboardProps) {
  return (
    <div className="space-y-6">
      {data.categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onRemoveWidget={(widgetId) => onRemoveWidget(category.id, widgetId)}
        />
      ))}
    </div>
  )
}
