import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import './authform.css'
function AuthForm() {
   const data = useActionData();
   return (
      <>
         <h1>Login</h1>
         <Form className='formAuth' method='post'>
            <input type="text" name='email' />
            <input type="password"  name='password'/> 
            <button>Login</button>
            {data?.message &&  <label style={{color : 'red'}}>{data.message}</label>}
         </Form>
      </>
   );
}

export default AuthForm;



