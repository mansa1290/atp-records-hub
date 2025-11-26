'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPlayersData, fetchTopPlayers } from '@/lib/api';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const data = await fetchTopPlayers(200);
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    (player.name && player.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (player.player_id && player.player_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (player.first_name && player.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (player.last_name && player.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="p-8 text-center text-white">Loading top players...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2">Top ATP Players</h1>
        <p className="text-slate-300 mb-8">Current world rankings and player profiles</p>
        
        <input
          type="text"
          placeholder="Search players by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 outline-none"
        />

        {filteredPlayers.length === 0 ? (
          <div className="text-center text-slate-300 py-12">
            {players.length > 0 ? 'No players match your search' : 'No players data available'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlayers.map((player, idx) => {
              const displayName = player.name || `${player.first_name || ''} ${player.last_name || ''}`.trim() || player.player_id || 'Unknown';
              const playerId = player.player_id || idx;
              
              return (
                <Link key={playerId} href={`/players/${playerId}`}>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white truncate flex-1">{displayName}</h3>
                      <span className="text-cyan-400 font-bold text-sm ml-2">#{idx + 1}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">ID: {player.player_id}</p>
                    {player.rank && <p className="text-slate-400 text-sm">Ranking: {player.rank}</p>}
                    {player.ranking && <p className="text-slate-400 text-sm">Ranking: {player.ranking}</p>}
                    {player.points && <p className="text-slate-400 text-sm">Points: {player.points}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
