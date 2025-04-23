import { Bell, ChevronDown, Search } from "lucide-react"

export default function TopNavBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      
      <div className="flex items-center">
        <span className="text-gray-400">Home</span>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="font-semibold text-blue-500">Dashboard V2</span>
      </div>

      
      <div className="flex items-center space-x-4">
        
        <div className="relative flex-grow max-w-xl mx-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 w-full rounded-full border border-blue-100 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        
        <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md cursor-pointer">
          <span>All Accounts</span>
          <ChevronDown className="h-4 w-4" />
        </div>

        
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </button>

        
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}
