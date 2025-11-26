'use client';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const atpRecords = [
  { label: 'Grand Slams Won', value: '20', icon: Trophy },
  { label: 'ATP Masters', value: '64', icon: TrendingUp },
  { label: 'Active Players', value: '1000+', icon: Users },
  { label: 'Total Matches', value: '500K+', icon: Zap },
];

const topPlayers = [
  { name: 'Novak Djokovic', titles: 24, ranking: 1, aces: 12500 },
  { name: 'Rafael Nadal', titles: 22, ranking: 2, aces: 8900 },
  { name: 'Roger Federer', titles: 20, ranking: 3, aces: 10100 },
  { name: 'Jannik Sinner', titles: 5, ranking: 4, aces: 4200 },
  { name: 'Carlos Alcaraz', titles: 4, ranking: 5, aces: 3800 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-primary text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wider text-cyan-400">ATP Records Hub</h1>
          <div className="flex gap-8">
            <a href="#records" className="hover:text-cyan-400 transition">Records</a>
            <a href="#players" className="hover:text-cyan-400 transition">Players</a>
            <a href="#rankings" className="hover:text-cyan-400 transition">Rankings</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <motion.div className="max-w-7xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 variants={itemVariants} className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Open Era Tennis Statistics
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8">
            Complete ATP records, player profiles, GOAT rankings, and advanced tennis statistics
          </motion.p>
          <motion.button variants={itemVariants} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold transition transform hover:scale-105">
            Explore Records
          </motion.button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="records" className="py-16 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center">ATP Open Era Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {atpRecords.map((record, idx) => {
              const Icon = record.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition">
                  <Icon className="text-cyan-400 mb-4" size={32} />
                  <p className="text-gray-300 text-sm">{record.label}</p>
                  <p className="text-4xl font-bold mt-2">{record.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section id="players" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center">Top Tennis Players (All-Time)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-500/30">
                  <th className="text-left py-4 px-6">Rank</th>
                  <th className="text-left py-4 px-6">Player</th>
                  <th className="text-center py-4 px-6">Titles</th>
                  <th className="text-center py-4 px-6">Aces</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player, idx) => (
                  <motion.tr key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="border-b border-slate-700 hover:bg-slate-800/50 transition">
                    <td className="py-4 px-6 font-bold text-cyan-400">#{player.ranking}</td>
                    <td className="py-4 px-6">{player.name}</td>
                    <td className="py-4 px-6 text-center font-bold">{player.titles}</td>
                    <td className="py-4 px-6 text-center">{player.aces.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-cyan-500/20 text-center text-gray-400">
        <p>&copy; 2025 ATP Records Hub. All tennis records from Open Era. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </main>
  );
}
