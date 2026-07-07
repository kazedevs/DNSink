export default function TopBlocked({ topBlocked = [] }) {
    if (!topBlocked || topBlocked.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h2 className="text-xs font-semibold text-black uppercase tracking-widest mb-4">Top Blocked</h2>
                <p className="text-black text-sm py-8 text-center">No blocked domains yet</p>
            </div>
        )
    }

    const maxCount = Math.max(...topBlocked.map(t => t.count));

    return (
        <div className="border border-gray-400 rounded-lg p-5">
            <h2 className="text-xs font-semibold text-black uppercase tracking-widest mb-4">Top Blocked</h2>
            <div className="space-y-3">
                {topBlocked.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-black truncate pr-4">{item.domain}</span>
                            <span className="text-black tabular-nums">{item.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
