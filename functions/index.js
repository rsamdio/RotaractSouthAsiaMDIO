/**
 * Cloud Functions for Firebase — Realtime Database only (not Firestore).
 *
 * Data flow: public site calls HTTPS callables submitScore / joinWaitlist; this
 * code writes /scores and /waitlist with the Admin SDK. updateTop10OnScoreWrite
 * mirrors /scores into /top10 for the public leaderboard.
 *
 * Artifact Registry: deployment images for Cloud Functions (see prior notes).
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const REGION = 'asia-southeast1';

/** Minimum 2048 score after at least one merge (blocks score:0 spam). */
const MIN_SCORE = 4;
const MAX_SCORE = 1_000_000;

admin.initializeApp();

/**
 * @param {string} email
 * @returns {string|null} error message or null if ok
 */
function validateEmailShape(email) {
  if (!email || typeof email !== 'string') return 'Invalid email';
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length < 5 || trimmed.length > 254) return 'Invalid email';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Invalid email';
  const local = trimmed.split('@')[0];
  if (local.length > 64) return 'Invalid email';
  const dots = (local.match(/\./g) || []).length;
  if (dots > 5) return 'Invalid email';
  return null;
}

/**
 * @param {unknown} data
 * @returns {string|null} error message or null if ok
 */
function validateScoreSubmission(data) {
  if (!data || typeof data !== 'object') return 'Invalid payload';

  const score = Number(data.score);
  if (!Number.isFinite(score) || !Number.isInteger(score)) return 'Invalid score';
  if (score < MIN_SCORE || score > MAX_SCORE) return 'Score out of range';

  const name = String(data.name || '').trim();
  if (name.length < 2 || name.length > 80) return 'Invalid name';
  if (!/[a-zA-Z\u00C0-\u024F]/.test(name)) return 'Name must include letters';

  const emailErr = validateEmailShape(String(data.email || ''));
  if (emailErr) return emailErr;

  const phone = String(data.phone || '').trim();
  if (phone.length < 7 || phone.length > 24) return 'Invalid phone';
  if (!/^[\d\s\-+()]+$/.test(phone)) return 'Invalid phone';

  const districtNumber = String(data.districtNumber || '').trim();
  if (!/^D?\d{3,4}$/i.test(districtNumber)) return 'Invalid district';

  return null;
}

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
  .region(REGION)
  .database.ref('scores/{scoreId}')
  .onWrite(async () => {
    await buildTop10();
  });

/**
 * Callable function to backfill /top10 from existing /scores (e.g. once after first deploy).
 */
exports.backfillTop10 = functions.region(REGION).https.onCall(async () => {
  await buildTop10();
  return { ok: true };
});

/**
 * Only supported path for new score rows (replaces direct client RTDB writes).
 */
exports.submitScore = functions.region(REGION).https.onCall(async (data) => {
  const err = validateScoreSubmission(data);
  if (err) {
    throw new functions.https.HttpsError('invalid-argument', err);
  }
  const name = String(data.name).trim();
  const email = String(data.email).trim().toLowerCase();
  const phone = String(data.phone).trim();
  const districtNumber = String(data.districtNumber).trim();
  const score = Number(data.score);

  await admin.database().ref('scores').push({
    name,
    email,
    phone,
    districtNumber,
    score,
    timestamp: Date.now()
  });
  return { ok: true };
});

/**
 * Only supported path for waitlist signups (replaces direct client RTDB writes).
 */
exports.joinWaitlist = functions.region(REGION).https.onCall(async (data) => {
  const emailRaw = String((data && data.email) || '').trim();
  const emailErr = validateEmailShape(emailRaw);
  if (emailErr) {
    throw new functions.https.HttpsError('invalid-argument', emailErr);
  }
  const email = emailRaw.toLowerCase();
  await admin.database().ref('waitlist').push({
    email,
    timestamp: Date.now()
  });
  return { ok: true };
});
