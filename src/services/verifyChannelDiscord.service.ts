import 'isomorphic-fetch';
import { API_PREFIX } from '../env';

export default async (body: {
  verificationCode: number | string;
  discordUserId: number | string;
}): Promise<{ success: boolean; data: string }> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_PREFIX}/account/verifyChannelDiscord`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        const data = await res.json();

        if ([409, 404, 500].includes(res.status)) {
          throw new Error(data?.message || '500 Server error 🤯');
        }

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
