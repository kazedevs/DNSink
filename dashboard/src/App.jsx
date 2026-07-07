import { useEffect, useState } from "react";
import StatusBar from "./components/StatusBar";
import TopBlocked from "./components/TopBlocked";
import LiveFeed from "./components/LIveFeed";

function App(){
  const [stats, setStats] = useState({ total: 0, blocked: 0, recent: [] })
  const [queries, setQueries] = useState([])
  const [wsStatus, setWsStatus] = useState('Connecting...')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/stats');
        const data = await response.json();
        setStats(data)
        setQueries(data.recent.map(q => ({ ...q, blocked: Boolean(q.blocked) })))
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);

  const [wsGreeting, setWsGreeting] = useState('')

  useEffect(() => {
    let ws;
    let stopped = false;

    function connect() {
      if (stopped) return;
      setWsStatus('Connecting...')
      ws = new WebSocket('ws://localhost:8080')

      ws.onopen = () => setWsStatus('Connected')
      ws.onclose = () => {
        setWsStatus('Disconnected')
        setWsGreeting('')
        // Retry connection after 3s
        if (!stopped) setTimeout(connect, 3000)
      }
      ws.onerror = () => setWsStatus('Disconnected')
      ws.onmessage = (e) => {
        if (typeof e.data === 'string' && !e.data.startsWith('{')) {
          setWsGreeting(e.data)
          return
        }
        try {
          const query = JSON.parse(e.data)
          if (query && typeof query === 'object' && 'domain' in query) {
            setQueries(prev => [query, ...prev].slice(0, 100))
            setStats(prev => ({
              ...prev,
              total: prev.total + 1,
              blocked: query.blocked ? prev.blocked + 1 : prev.blocked
            }))
          }
        } catch (_) {}
      }
    }

    connect()
    return () => { stopped = true; ws?.close() }
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">DNSink</h1>
            <p className="text-black text-sm mt-0.5">DNS level tracker & ad blocker</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${wsStatus === 'Disconnected' || wsStatus === 'Error' ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <div>
              <span className="text-sm text-black">{wsStatus}</span>
              {wsGreeting && <p className="text-xs text-gray-400">{wsGreeting}</p>}
            </div>
          </div>
        </header>

        <StatusBar total={stats.total} blocked={stats.blocked} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TopBlocked topBlocked={stats.topBlocked} />
          </div>
          <div className="lg:col-span-2">
            <LiveFeed queries={queries}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App