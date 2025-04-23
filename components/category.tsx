import Widget from "@/components/widget"
import EmptyWidgetSlot from "@/components/empty-widget-slot"
import type { Category as CategoryType } from "@/lib/types"

interface CategoryProps {
  category: CategoryType
  onRemoveWidget: (widgetId: string) => void
}

export default function Category({ category, onRemoveWidget }: CategoryProps) {
 
  const widgetsPerRow = 3
  const totalWidgets = category.widgets.length
  const emptySlots = Math.max(1, widgetsPerRow - (totalWidgets % widgetsPerRow))

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} onRemove={() => onRemoveWidget(widget.id)} />
        ))}

       
        {Array.from({ length: emptySlots }).map((_, index) => (
          <EmptyWidgetSlot key={`empty-${index}`} />
        ))}
      </div>
    </div>
  )
}
