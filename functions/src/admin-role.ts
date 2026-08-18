import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';

/**
 * Grants (or revokes) the `admin` custom claim on a user, so Firestore/Storage
 * security rules can recognize them via `request.auth.token.admin == true`.
 *
 * Only an existing admin may call this — it is intentionally NOT usable to
 * bootstrap the very first admin, since that would let anyone self-promote.
 * To create the first admin, run a one-off trusted script with the Firebase
 * Admin SDK (see functions/README.md → "Bootstrapping the first admin").
 */
export const setAdminRole = onCall<{ uid: string; isAdmin: boolean }>(async (request) => {
  if (request.auth?.token?.['admin'] !== true) {
    throw new HttpsError('permission-denied', 'Only an existing admin can grant admin access.');
  }

  const { uid, isAdmin } = request.data;
  if (!uid || typeof isAdmin !== 'boolean') {
    throw new HttpsError('invalid-argument', 'Expected { uid: string, isAdmin: boolean }.');
  }

  await getAuth().setCustomUserClaims(uid, { admin: isAdmin });
  return { success: true };
});
