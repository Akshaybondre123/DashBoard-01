export interface Widget {
  id: string
  name: string
  type: "donut" | "arc" | "bar" | "noData"
  category?: string
  data: {
    total: number
    text?: string
    items: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}

export interface DashboardData {
  categories: Category[]
}
