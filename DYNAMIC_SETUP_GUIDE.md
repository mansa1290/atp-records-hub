# ATP Records Hub - Dynamic API Integration Guide

## Overview
This guide provides complete code for integrating Jeff Sackman's Tennis Database API into your ATP Records Hub website. This makes the site fully dynamic with real tennis data and working routes.

## Step 1: Create .env.local file

Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_API_URL=https://raw.githubusercontent.com/JeffSackmann/tennis_atp
NEXT_PUBLIC_API_BASE=https://raw.githubusercontent.com/JeffSackmann
```

## Step 2: Create API utilities (lib/api.js)

```javascript
// lib/api.js
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://raw.githubusercontent.com/JeffSackmann';

export async function fetchPlayersData() {
  try {
    const res = await fetch(`${API_BASE}/tennis_atp/master_df.csv`);
    if (!res.ok) throw new Error('Failed to fetch');
    const text = await res.text();
    return parseCSV(text).slice(0, 100);
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

export async function fetchPlayerDetails(playerId) {
  try {
    const res = await fetch(`${API_BASE}/tennis_atp/master_df.csv`);
    if (!res.ok) throw new Error('Failed to fetch');
    const text = await res.text();
    const players = parseCSV(text);
    return players.find(p => p.player_id === playerId);
  } catch (error) {
    console.error('Error fetching player:', error);
    return null;
  }
}

export async function fetchTournaments(year) {
  try {
    const res = await fetch(`${API_BASE}/tennis_atp/atp_matches_${year}.csv`);
    if (!res.ok) throw new Error('Failed to fetch');
    const text = await res.text();
    return parseCSV(text).slice(0, 50);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

export async function fetchPlayerStats(playerId) {
  try {
    const res = await fetch(`${API_BASE}/tennis_atp/master_df.csv`);
    const text = await res.text();
    const players = parseCSV(text);
    const player = players.find(p => p.player_id === playerId);
    
    if (!player) return null;
    
    return {
      name: player.name_first + ' ' + player.name_last,
      dob: player.dob,
      country: player.isocode,
      ...player
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const cols = lines[i].split(',');
    headers.forEach((header, index) => {
      obj[header.trim()] = cols[index]?.trim();
    });
    data.push(obj);
  }
  
  return data;
}
```

## Step 3: Create Dynamic Pages

### app/players/page.jsx

```javascript
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPlayersData } from '@/lib/api';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayersData().then(data => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-primary text-white p-6">
      <h1 className="text-4xl font-bold mb-8">ATP Players</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, idx) => (
          <Link key={idx} href={`/players/${player.player_id}`}>
            <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition cursor-pointer">
              <h2 className="text-xl font-bold">{player.name_first} {player.name_last}</h2>
              <p className="text-sm text-gray-300">{player.isocode}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### app/players/[id]/page.jsx

```javascript
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPlayerStats } from '@/lib/api';

export default function PlayerDetailPage() {
  const params = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPlayerStats(params.id).then(data => {
        setPlayer(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!player) return <div className="text-center py-20">Player not found</div>;

  return (
    <div className="min-h-screen bg-gradient-primary text-white p-6">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{player.name}</h1>
        <div className="space-y-3">
          <p><strong>Country:</strong> {player.country}</p>
          <p><strong>DOB:</strong> {player.dob}</p>
          {/* Add more player stats as needed */}
        </div>
      </div>
    </div>
  );
}
```

## Step 4: Update Homepage (app/page.jsx)

Update your homepage to include links to dynamic pages:

```javascript
// Add this to your navigation:
<Link href="/players" className="hover:text-cyan-400">Players</Link>
<Link href="/tournaments" className="hover:text-cyan-400">Tournaments</Link>
<Link href="/records" className="hover:text-cyan-400">Records</Link>
```

## Step 5: Deploy Instructions

1. Push all code to GitHub:
```bash
git add .
git commit -m "Add dynamic API integration with tennis database"
git push origin main
```

2. Go to Vercel dashboard
3. Click "Import Project" and select your repository
4. Vercel will automatically detect Next.js and deploy
5. Add environment variables in Vercel project settings
6. Your live URL will be generated!

## Available Data APIs

- **Players Master Data**: `/tennis_atp/master_df.csv`
- **Matches (Annual)**: `/tennis_atp/atp_matches_YEAR.csv`
- **Rankings**: `/tennis_atp/atp_rankings_YEAR.csv`

## Testing URLs

- `/players` - All players list
- `/players/[id]` - Individual player details
- `/tournaments` - Tournament listings
- `/records` - All-time records

## Notes

- All data is from Jeff Sackmann's open-source tennis database
- Data is CSV format, need CSV parsing
- Cache results for better performance
- Consider using SWR for client-side data fetching

## Next Steps

1. Clone the repo locally
2. Create `.env.local` with API URLs
3. Create the route files above
4. Test locally with `npm run dev`
5. Push and deploy to Vercel

Your fully dynamic ATP Records Hub will be live! 🎾
