import React from 'react';
import { AuthForm } from 'components';
import './authentication.css';
import { redirect } from 'react-router-dom';
import axios from 'axios';



function Authentication() {

   return (
      <>
         <div className='authContainer'>
            <AuthForm />
         </div>
      </>
   );
}

export default Authentication;


export async function action({ request })
{
   const data = await request.formData();
   const authData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
         const response = await axios.post('http://localhost:5000/loginAdmin', authData);
         window.confirm(response.data.message);
         localStorage.setItem('token', JSON.stringify(response.data.token));
    } catch (error) {
      return error.response.data;
    }
   return redirect('/');
}
