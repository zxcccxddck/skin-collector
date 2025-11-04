import React from 'react';

export default function SkinGrid({ skins, loading }){
  return (
    <div>
      {loading && <div className="text-center">Загрузка…</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skins.map((s, i) => (
          <div key={i} className="bg-[#0b0b0f] p-3 rounded-2xl border border-gray-800 shadow-[0_8px_30px_rgba(123,31,162,0.12)]">
            <div className="h-40 bg-gray-900 rounded-md overflow-hidden flex items-center justify-center">
              {s.preview ? <img src={s.preview} alt={s.name} className="object-cover h-full w-full"/> : <div className="text-sm opacity-60">No preview</div>}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="font-semibold truncate max-w-[200px]">{s.name}</div>
                <div className="text-xs opacity-60">{s.source}</div>
              </div>
              <div>
                {s.download ? <a className="px-3 py-1 border rounded" href={`/api/download?url=${encodeURIComponent(s.download)}`}>Download</a> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
