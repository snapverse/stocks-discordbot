import 'isomorphic-fetch';
import { API_PREFIX } from '../env';

export default async (): Promise<{ success: boolean; data: User[] }> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_PREFIX}/account/usersToBeCancel`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        const json = await res.json();

        if ([409, 404, 500].includes(res.status))
          throw new Error(json?.message || '500 Server error 🤯');
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
};
