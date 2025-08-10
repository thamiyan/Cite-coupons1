const KEY = 'demo_user_stats_v1';

export function getStats() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { redemptions: 0, savings: 0 }; }
  catch { return { redemptions: 0, savings: 0 }; }
}

export function addRedemption(savings) {
  const s = getStats();
  const next = { redemptions: s.redemptions + 1, savings: +(s.savings + (savings || 0)).toFixed(2) };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function resetStats() {
  localStorage.removeItem(KEY);
}
