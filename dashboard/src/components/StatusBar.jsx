export default function StatusBar({ total, blocked }) {
    const percentage = total > 0 ? ((blocked / total) * 100).toFixed(1) : 0;

    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="border border-gray-400 rounded-lg p-5">
                <p className="text-black text-xs uppercase tracking-widest mb-2">Total Queries</p>
                <p className="text-3xl font-bold text-black">{total.toLocaleString()}</p>
            </div>
            <div className="border border-gray-400 rounded-lg p-5">
                <p className="text-black text-xs uppercase tracking-widest mb-2">Blocked</p>
                <p className="text-3xl font-bold text-red-500">{blocked.toLocaleString()}</p>
            </div>
            <div className="border border-gray-400 rounded-lg p-5">
                <p className="text-black text-xs uppercase tracking-widest mb-2">Block Rate</p>
                <p className="text-3xl font-bold text-black">{percentage}%</p>
            </div>
        </div>
    );
}
