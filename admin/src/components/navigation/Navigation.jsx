import React from 'react';
import './navigation.css';
import {
   Dashboard,
   People,
   Store,
   LocalShipping,
   Payment,
   Logout,
   Login,
} from '@mui/icons-material';
import { Form, NavLink, useLoaderData } from 'react-router-dom';
function Navigation() {
   const token = useLoaderData('root');
   return (
      <nav className="navigation">
         <ul className="list">
            {token && (
               <>
                  <li>
                     Main
                     <ul>
                        <li>
                           <NavLink to="/">
                              <Dashboard />
                              <span>Dashboard</span>
                           </NavLink>
                        </li>
                     </ul>
                  </li>
                  <li>
                     List
                     <ul>
                        <li>
                           <NavLink>
                              <People />
                              <span>Users</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/hotels">
                              <Store />
                              <span>Hotels</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/rooms">
                              <Payment />
                              <span>Rooms</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/transactions">
                              <LocalShipping />
                              <span>Transactions</span>
                           </NavLink>
                        </li>
                     </ul>
                  </li>
                  <li>
                     New
                     <ul>
                        <li>
                           <NavLink to="/hotel">
                              <Store />
                              <span>New Hotel</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/room">
                              <Payment />
                              <span>New Room</span>
                           </NavLink>
                        </li>
                     </ul>
                  </li>
               </>
            )}

            <li>
               User
               <ul>
                  <li>
                     {!token ? (
                        <NavLink to="/login">
                           <Login />
                           <span>Login</span>
                        </NavLink>
                     ) : (
                        <Form action="/logout" method="post">
                           <button type="submit">
                              <Logout />
                              Logout
                           </button>
                        </Form>
                     )}
                  </li>
               </ul>
            </li>
         </ul>
      </nav>
   );
}

export default Navigation;
