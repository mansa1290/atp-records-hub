'use client';

import Link from 'next/link';

export default function RecordsPage() {
  const records = [
    { title: 'Most Grand Slam Titles', description: 'Players with the most Grand Slam tournament wins' },
    { title: 'Highest Career Win-Loss Record', description: 'Players with the best win-loss percentages' },
    { title: 'Most ATP Masters 1000 Titles', description: 'Players with the most Masters 1000 titles' },
    { title: 'Consecutive Weeks at World No. 1', description: 'Players with the longest #1 rankings' },
    { title: 'Best Singles Record in One Year', description: 'Highest win totals in single calendar year' },
    { title: 'ATP Race Rankings', description: 'Current year ATP race to the Finals' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block">← Home</Link>
        
        <h1 className="text-5xl font-bold text-white mb-2 gradient-text">ATP Records</h1>
        <p className="text-slate-300 mb-8">Browse historic and current ATP tennis records</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record, idx) => (
            <div key={idx} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition">
              <h3 className="text-xl font-bold text-white mb-2">{record.title}</h3>
              <p className="text-slate-400 text-sm">{record.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
