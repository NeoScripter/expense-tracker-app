export default function ExpenseFilterPanel({ dateGrouping, setDateGrouping, totalAmount, searchQuery, setSearchQuery }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-4 bg-white border border-gray-200 rounded-sm">
            <div className="max-w-70">
                <label
                    htmlFor="expense-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="expense-search"
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50"
                        placeholder="Search by description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setDateGrouping('day')}
                    className={`p-3 text-sm border border-gray-300 rounded-sm ${
                        dateGrouping === 'day'
                            ? 'text-white bg-primary-yellow'
                            : 'cursor-pointer bg-gray-50 text-gray-900'
                    }`}
                >
                    By day
                </button>
                <button
                    onClick={() => setDateGrouping('week')}
                    className={`p-3 text-sm border border-gray-300 rounded-sm ${
                        dateGrouping === 'week'
                            ? 'text-white bg-primary-yellow'
                            : 'cursor-pointer bg-gray-50 text-gray-900'
                    }`}
                >
                    By week
                </button>
            </div>

            <div className="ml-auto md:ml-0">
                Total: ${totalAmount}
            </div>
        </div>
    );
}
