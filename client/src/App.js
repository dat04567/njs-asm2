import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';
import Home, { loader as loaderHome } from './pages/home/Home';
import Hotel, { loader as loaderHotel, action as actionHotel } from './pages/hotel/Hotel';
import RootLayout from './pages/root/Root';
import { checkAuthLoader, tokenAuthLoader } from './utils/auth';
import Authentication , {action as authAction}  from './pages/auth/Authentication';
import { action as logoutAction } from './pages/logout/Logout';
import Transactions, {loader as loadTransactions} from './pages/transactions/Transactions';

import List from './pages/list/List';

const routes = createRoutesFromElements(
   <>
      <Route path="/" element={<RootLayout />} id='root' loader={tokenAuthLoader}>
         <Route index element={<Home />}  loader={loaderHome}  />
         <Route path="/hotels" element={<List /> }  />
         <Route path="/hotels/:id" element={<Hotel />} loader={loaderHotel} action={actionHotel}/>
         <Route path="/login" element={<Authentication />}  action={authAction} loader={checkAuthLoader} />
         <Route path="/signUp" element={<Authentication />} action={authAction} loader={checkAuthLoader} />
         <Route path="/transactions" element={<Transactions />} loader={loadTransactions}  />
         <Route path='/logout'  action={logoutAction}  />
      </Route>
   </>
);

const router = createBrowserRouter(routes);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
