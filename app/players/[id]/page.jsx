'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchPlayerDetails, fetchPlayerStats } from '@/lib/api';

export default function PlayerDetailPage() {
  const params = useParams();
  const playerId = params.id;
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        setLoading(true);
        const [playerData, statsData] = await Promise.all([
          fetchPlayerDetails(playerId),
          fetchPlayerStats(playerId)
        ]);
        setPlayer(playerData);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) loadPlayerData();
  }, [playerId]);

  if (loading) return <div className="p-8 text-center">Loading player data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!player) return <div className="p-8 text-center">Player not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/players" className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block">← Back to Players</Link>
        
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8 mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">{player.name || 'Unknown Player'}</h1>
          <div className="grid grid-cols-2 gap-4 text-slate-300">
            <div>
              <p className="text-sm text-slate-400">Player ID</p>
              <p className="text-lg font-mono">{player.player_id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Birth Year</p>
              <p className="text-lg">{player.birth_date || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Nationality</p>
              <p className="text-lg">{player.country || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Height</p>
              <p className="text-lg">{player.ht || 'N/A'}</p>
            </div>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/50 rounded-lg p-6">
              <p className="text-cyan-400 text-sm mb-2">Wins</p>
              <p className="text-4xl font-bold text-white">{stats.wins}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6">
              <p className="text-red-400 text-sm mb-2">Losses</p>
              <p className="text-4xl font-bold text-white">{stats.losses}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg p-6">
              <p className="text-yellow-400 text-sm mb-2">Titles</p>
              <p className="text-4xl font-bold text-white">{stats.titles}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
