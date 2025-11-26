'use client';

import Link from 'next/link';
import { Trophy, Users, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🎾 ATP Records
          </Link>
          <div className="flex gap-6">
            <Link href="/players" className="text-slate-300 hover:text-cyan-400 transition">
              Players
            </Link>
            <Link href="/records" className="text-slate-300 hover:text-cyan-400 transition">
              Records
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          ATP Open Era
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Tennis Records
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Explore comprehensive statistics, player profiles, and records from the Open Era of professional tennis. Discover the legends who shaped the sport.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/players" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
            View Players →
          </Link>
          <Link href="/records" className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400/10 transition">
            Explore Records
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition">
            <Trophy className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">20</div>
            <div className="text-slate-400 text-sm">Grand Slam Leaders</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 rounded-xl p-6 hover:border-pink-400/60 transition">
            <Users className="w-8 h-8 text-pink-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">1000+</div>
            <div className="text-slate-400 text-sm">Professional Players</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition">
            <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">500K+</div>
            <div className="text-slate-400 text-sm">Matches Recorded</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/60 transition">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">64</div>
            <div className="text-slate-400 text-sm">ATP Masters 1000</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Explore the Best of Tennis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition">
            <h3 className="text-2xl font-bold text-white mb-4">🏆 Player Profiles</h3>
            <p className="text-slate-400 mb-6">
              Dive into detailed player statistics, career achievements, tournament history, and head-to-head comparisons with other legends of the game.
            </p>
            <Link href="/players" className="text-purple-400 font-bold hover:text-purple-300 transition">
              Browse Players →
            </Link>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition">
            <h3 className="text-2xl font-bold text-white mb-4">📊 Records Database</h3>
            <p className="text-slate-400 mb-6">
              Discover all-time records including most Grand Slam titles, longest win streaks, career statistics, and other remarkable achievements in tennis history.
            </p>
            <Link href="/records" className="text-cyan-400 font-bold hover:text-cyan-300 transition">
              View Records →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© 2025 ATP Records Hub | Open Era Tennis Statistics | Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
