const SearchFilter = ({
    search,
    onSearch,
    statusFilter,
    onStatusChange,
    sortOrder,
    onSortChange,
}) => {
    return (
        <section className="shadow-md bg-white w-full rounded-2xl p-4 flex flex-col gap-y-5">
            {/* Search */}
            <div>
                <label className="block mb-2 text-sm font-medium">Search</label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search destination..."
                    className="border border-gray-300 px-4 py-2 rounded-md outline-none w-full"
                />
            </div>

            {/* Filter by status */}
            <div>
                <label className="block mb-2 text-sm font-medium">Filter</label>
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-700 outline-none"
                >
                    <option value="">All</option>
                    <option value="PLANNED">Planned</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {/* Sort */}
            <div>
                <label
                    htmlFor="sort"
                    className="block mb-2 text-sm font-medium"
                >
                    Sort by Price
                </label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full border border-gray-300 text-sm rounded-lg p-2 outline-none"
                >
                    <option value="default">Default</option>
                    <option value="low-high">Low to High</option>
                    <option value="high-low">High to Low</option>
                </select>
            </div>
        </section>
    );
};

export default SearchFilter;
