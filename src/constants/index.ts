import { BASIC_ROLE_ID, PREMIUM_ROLE_ID, STANDARD_ROLE_ID } from '../env';

export const Roles = Object.freeze({
  BASIC: BASIC_ROLE_ID || '',
  STANDARD: STANDARD_ROLE_ID || '',
  PREMIUM: PREMIUM_ROLE_ID || ''
});
