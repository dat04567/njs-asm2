import { json, redirect } from 'react-router-dom';

export function getAuthToken() {
   const token = localStorage.getItem('token');
   if (!token) {
      return null;
   }
   return JSON.parse(token);
}

export function tokenAuthLoader() {
   const token = getAuthToken();
   return token;
}

export function checkAuthLoader({ request }) {
   const token = getAuthToken();
   const url = new URL(request.url);
   if (token && (url.pathname === '/login') ) return redirect('/');
   else if (!token && (url.pathname !== '/login')) return redirect('/login');
   return json({ token: false }, { status: 200 });
}
