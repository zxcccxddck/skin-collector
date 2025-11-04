import React, { useEffect, useState } from 'react';
import SkinGrid from './components/SkinGrid';

export default function App(){
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchList(); },[]);

  async function fetchList(){
    setLoading(true);
    try{
      const r = await fetch('/api/skins');
      const json = await r.json();
      setSkins(json);
    }catch(e){ console.error(e); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">osu! Skin Collector</h1>
        <div className="text-sm opacity-70">Proxy aggregator • Vercel demo</div>
      </header>

      <main className="max-w-6xl mx-auto mt-6">
        <div className="mb-4">
          <input placeholder="Поиск" className="px-4 py-2 rounded-md bg-gray-800 w-full" />
        </div>
        <SkinGrid skins={skins} loading={loading} />
      </main>
    </div>
  )
}
