import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../store/atoms/userAtom';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { userSelector } from '../store/atoms/userSelector'; // Import the userSelector

export const useAuth = () => {
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const user = useRecoilValue(userSelector);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      if (token) {
        try {
          const response = await axios.get('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setLoading(false); // Set loading to false once user data is fetched
        } catch (error) {
          console.error('Failed to fetch user:', error);
          setError('Failed to fetch user');
          setLoading(false);
        }
      } else {
        setLoading(false); // No token, set loading to false
      }
    };

    fetchUser();
  }, [setUser]); // Only run once on component mount or if setUser changes

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user } = response.data;
      
      setUser(user);
      const tokenArray = response.headers['set-cookie']; // Array of strings
      if (tokenArray && tokenArray.length > 0) {
        const tokenString = tokenArray.join('; '); // Join into a single string
        Cookies.set('authToken', tokenString, { path: '/' });
      }

      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('authToken', { path: '/' });
    setUser(null);
    router.push('/login');
  };

  return { login, logout, loading, error, user };
};
