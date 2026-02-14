const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Build sanitized top10 from /scores and write to /top10.
 * Used by onWrite and by the backfill callable.
 */
async function buildTop10() {
  const db = admin.database();
  const snapshot = await db.ref('scores').once('value');
  const val = snapshot.val();
  const top10 = {};
  if (!val || typeof val !== 'object') {
    await db.ref('top10').set(null);
    return;
  }
  const entries = Object.entries(val).map(([id, data]) => ({ id, ...data }));
  entries.sort((a, b) => (b.score || 0) - (a.score || 0));
  const top = entries.slice(0, 10);
  top.forEach((entry, i) => {
    const name = (entry.name || 'Anonymous').trim();
    top10[i] = {
      displayName: name.length > 20 ? name.substring(0, 20) : name,
      districtNumber: entry.districtNumber || '—',
      score: entry.score
    };
  });
  await db.ref('top10').set(top10);
}

/**
 * On every write under /scores, recompute and overwrite /top10.
 * Region must match Realtime Database (asia-southeast1).
 */
exports.updateTop10OnScoreWrite = functions
  .region('asia-southeast1')
  .database.ref('scores/{scoreId}')
  .onWrite(async () => {
    await buildTop10();
  });

/**
 * Callable function to backfill /top10 from existing /scores (e.g. once after first deploy).
 */
exports.backfillTop10 = functions.https.onCall(async () => {
  await buildTop10();
  return { ok: true };
});
