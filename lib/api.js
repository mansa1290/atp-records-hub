// API utilities for Jeff Sackman Tennis Database
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master';

// Parse CSV string into array of objects
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    data.push(obj);
  }
  
  return data;
}

// Fetch all players from master data
export async function fetchPlayersData() {
  try {
    const response = await fetch(`${API_BASE}/tennis_atp/master_df.csv`);
    if (!response.ok) throw new Error('Failed to fetch players data');
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

// Fetch specific player details
export async function fetchPlayerDetails(playerId) {
  try {
    const players = await fetchPlayersData();
    return players.find(p => p.player_id === playerId) || null;
  } catch (error) {
    console.error('Error fetching player details:', error);
    return null;
  }
}

// Fetch tournament matches for a specific year
export async function fetchTournaments(year) {
  try {
    const response = await fetch(`${API_BASE}/tennis_atp/atp_matches_${year}.csv`);
    if (!response.ok) throw new Error(`Failed to fetch matches for ${year}`);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error(`Error fetching tournaments for ${year}:`, error);
    return [];
  }
}

// Fetch player rankings for a specific year
export async function fetchPlayerRankings(year) {
  try {
    const response = await fetch(`${API_BASE}/tennis_atp/atp_rankings_${year}.csv`);
    if (!response.ok) throw new Error(`Failed to fetch rankings for ${year}`);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error(`Error fetching rankings for ${year}:`, error);
    return [];
  }
}

// Get player statistics
export async function fetchPlayerStats(playerId) {
  try {
    const currentYear = new Date().getFullYear();
    const stats = {
      wins: 0,
      losses: 0,
      titles: 0,
      tournaments: new Set()
    };
    
    // Fetch matches from last 5 years
    for (let year = currentYear; year >= currentYear - 5; year--) {
      const matches = await fetchTournaments(year);
      matches.forEach(match => {
        if (match.winner_id === playerId) stats.wins++;
        if (match.loser_id === playerId) stats.losses++;
        if (match.winner_id === playerId && match.round === 'F') stats.titles++;
      });
    }
    
    return stats;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return { wins: 0, losses: 0, titles: 0, tournaments: new Set() };
  }
}

// Get top ranked players
export async function fetchTopPlayers(limit = 100) {
  try {
    const currentYear = new Date().getFullYear();
    const rankings = await fetchPlayerRankings(currentYear);
    return rankings.slice(0, limit);
  } catch (error) {
    console.error('Error fetching top players:', error);
    return [];
  }
}
