const KEY = 'demo_coupons_v1';

function uuid() {
  return (crypto?.randomUUID?.() || String(Date.now())) + Math.random().toString(16).slice(2);
}

export function loadCoupons() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveCoupons(coupons) {
  localStorage.setItem(KEY, JSON.stringify(coupons));
}

export function seedIfEmpty() {
  const cur = loadCoupons();
  if (cur.length === 0) {
    const seed = [
      { id: uuid(), title: '10% Burger Classique', type: 'percent', value: 10, code: 'BURGER10', endDate: '2025-12-31', active: true, redemptions: 0, revenue: 0 },
      { id: uuid(), title: '$5 off Poutine Large', type: 'amount',  value: 5,  code: 'P5OFF',     endDate: '',          active: true, redemptions: 0, revenue: 0 },
      { id: uuid(), title: '2 for 1 Tacos',        type: 'bogo',    value: 0,  code: 'TACOS241',  endDate: '2025-10-31', active: false, redemptions: 0, revenue: 0 }
    ];
    saveCoupons(seed);
    return seed;
  }
  return cur;
}

export function addCoupon(c) {
  const all = loadCoupons();
  const next = [...all, { ...c, id: uuid(), redemptions: 0, revenue: 0 }];
  saveCoupons(next);
  return next;
}

export function updateCoupon(id, patch) {
  const all = loadCoupons();
  const next = all.map(c => c.id === id ? { ...c, ...patch } : c);
  saveCoupons(next);
  return next;
}

export function removeCoupon(id) {
  const next = loadCoupons().filter(c => c.id !== id);
  saveCoupons(next);
  return next;
}

// Simulate a redemption: update coupon counters and return savings for shopper stats
export function redeemCoupon(id, opts) {
  const all = loadCoupons();
  const i = all.findIndex(c => c.id === id);
  if (i < 0) return { next: all, saved: 0 };

  const c = all[i];
  const { basket = 20, itemPrice = 8 } = opts || {};
  let saved = 0;
  if (c.type === 'percent') saved = (c.value / 100) * basket;
  else if (c.type === 'amount') saved = c.value;
  else saved = itemPrice; // BOGO: save price of one item (demo assumption)

  const earned = Math.max(basket - saved, 0);
  const updated = {
    ...c,
    redemptions: (c.redemptions || 0) + 1,
    revenue: +(((c.revenue || 0) + earned).toFixed(2)),
  };

  const next = [...all];
  next[i] = updated;
  saveCoupons(next);
  return { next, saved: +saved.toFixed(2) };
}

// Aggregates for Business analytics
export function getAggregates() {
  const list = loadCoupons();
  const totalRedemptions = list.reduce((a, c) => a + (c.redemptions || 0), 0);
  const totalRevenue     = list.reduce((a, c) => a + (c.revenue || 0), 0);
  const active           = list.filter(c => c.active).length;
  return { totalRedemptions, totalRevenue: +totalRevenue.toFixed(2), active };
}
