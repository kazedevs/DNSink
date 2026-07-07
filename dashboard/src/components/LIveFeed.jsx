export default function LiveFeed({ queries }) {
    return (
        <div className="border border-gray-400 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-black uppercase tracking-widest">Live Feed</h2>
                <span className="text-xs text-black">Real-time</span>
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto">
                {queries.length === 0 ? (
                    <p className="text-black text-sm py-8 text-center">Waiting for DNS queries...</p>
                ) : (
                    queries.map((q, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className={`text-xs font-mono px-1.5 py-0.5 rounded shrink-0 ${q.blocked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                                    {q.blocked ? 'BLOCK' : 'ALLOW'}
                                </span>
                                <span className="text-sm text-black truncate">{q.domain}</span>
                            </div>
                            <span className="text-xs text-black font-mono shrink-0 ml-4">
                                {new Date(q.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}