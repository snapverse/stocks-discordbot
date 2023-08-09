import 'isomorphic-fetch';
import { API_PREFIX } from '../env';

export default async (body: {
  verificationCode: number | string;
  discordUserId: number | string;
}): Promise<{ success: boolean; data: User }> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_PREFIX}/account/verifyChannelDiscord`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => resolve(res.json()))
      .catch(_ => reject('Could not assign role to user: '));
  });
};
