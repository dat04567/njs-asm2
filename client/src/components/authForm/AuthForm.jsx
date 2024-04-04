import React from 'react';
import { Form, useActionData, useLocation } from 'react-router-dom';
import './authform.css'
function AuthForm() {
   const {pathname} = useLocation();
   const data = useActionData();
   return (
      <>
         <h1>{pathname === '/login' ? "Login" : "Sign Up"}</h1>
         <Form className='formAuth' method='post'>
            <input type="text" name='email' />
            <input type="password"  name='password'/> 
            <button   >{pathname === '/login' ? "Login" : "Create Account"}</button>
            {data?.message &&  <label style={{color : 'red'}}>{data.message}</label>}
           
         </Form>
      </>
   );
}

export default AuthForm;



