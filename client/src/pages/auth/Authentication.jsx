import React from 'react';
import AuthForm from '../../components/authForm/AuthForm';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';

import './authentication.css';
import { redirect } from 'react-router-dom';

function Authentication() {

   return (
      <>
         <Header type="list" />
         <div className='authContainer'>
            <AuthForm />
            <MailList />
         </div>
      </>
   );
}

export default Authentication;


export async function action({ request })
{
   const searchParams = new URL(request.url);
   const path = searchParams.pathname;
   const data = await request.formData();
   const authData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const response = await fetch('http://localhost:5000' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });
  
    if (response.status === 422 || response.status === 401) {
      return response;
    }
  
    if (!response.ok) {
       return response;
    }
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', JSON.stringify({token, email : resData.user.email}));
    
   return redirect('/');
}
