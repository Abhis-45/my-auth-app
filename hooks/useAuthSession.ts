import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/authSlice';
import Cookies from 'js-cookie';

export const useAuthSession = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const login = async (username: string, password: string) => {
    dispatch(loginStart());
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token, user } = response.data;
      Cookies.set('token', token);
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    }
  };

  const fetchUser = async () => {
    dispatch(loginStart());
    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('No token found');
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response.data;
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      dispatch(loginFailure('Failed to fetch user'));
    }
  };

  const signout = () => {
    Cookies.remove('token');
    dispatch(logout());
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { ...authState, login, signout };
};
