// state/userSelector.ts

import { selector } from 'recoil';
import axios from 'axios';
import { userAtom } from './userAtom';
import Cookies from 'js-cookie';

export const userSelector = selector({
  key: 'userSelector',
  get: async ({ get }) => {
    const user = get(userAtom);
    if (user) return user;

    const authToken = Cookies.get('authToken');
    console.log("Token in userSelector is: ", authToken);
    if (!authToken) return null;
    
    try {
        let resu:any = [];
        fetch('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                resu = result;
            })
            .catch(error => console.error('Error:', error));
      return resu;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },
});