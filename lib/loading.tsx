export const LoadingSidebar = () => {
    return <div role="status" className="p-4 space-y-4 divide-y rounded shadow animate-pulse divide-gray-700 md:p-6 border-gray-700">
        {Array(20).fill(null).map((_, i) => <div key={i} className="flex items-center justify-between">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>)}
        <span className="sr-only">Loading...</span>
    </div>
}