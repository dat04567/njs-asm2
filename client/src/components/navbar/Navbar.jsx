import './navbar.css';
import { Form, Link, useLoaderData } from 'react-router-dom';
const Navbar = () => {
   const auth = useLoaderData();
   return (
      <div className="navbar">
         <div className="navContainer">
            <Link to="/" className="logo">
               <span className="logo">Booking Website</span>
            </Link>
            {!auth && (
               <div className="navItems">
                  <Link to="/signUp">
                     <button className="navButton">Register</button>
                  </Link>
                  <Link to="/login">
                     <button className="navButton">Login</button>
                  </Link>
               </div>
            )}
            {auth && (
               <div className="navItems">
                  <p className='name'>{auth.email}</p>
                  <Link to="/transactions">
                     <button className="navButton">Transactions</button>
                  </Link>
                  <Form action='/logout' method='post'>
                     <button className="navButton">Logout</button>
                  </Form>
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;
