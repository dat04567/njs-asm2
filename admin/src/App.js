
import { actionHotel, actionRoom } from 'components';


import {
   loaderEditRoom,
   EditRoom,
   NewHotel,
   NewRoom,
   Hotel,
   Root,
   DashBoard,
   loaderDashBoard,
   loaderHotels,
   EditHotel,
   actionDeleteHotel,
   loaderEditHotel,
   loaderNewRoom,
   Room, 
   actionAuth,
   loaderRooms,
   actionDeleletRoom,
   Authentication,
   actionLogout,
   Transaction,
   loaderTransaction
} from 'page';

import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';
import { checkAuthLoader, tokenAuthLoader } from 'utils/auth';

const routes = createRoutesFromElements(
   <>
      <Route path="/" element={<Root />} id="root" loader={tokenAuthLoader}>
         <Route index element={<DashBoard />} loader={loaderDashBoard}  />
         <Route
            path="/hotels"
            element={<Hotel />}
            loader={loaderHotels}
            action={actionDeleteHotel}
         />
         <Route path="/hotel" element={<NewHotel />} action={actionHotel} loader={checkAuthLoader} />
         <Route
            path="/hotel/:hotelId"
            element={<EditHotel />}
            loader={loaderEditHotel}
            action={actionHotel} 
         />
         <Route path='/rooms' element={<Room />}  loader={loaderRooms}  action={actionDeleletRoom} /> 
         <Route path='/room' element={<NewRoom />}  loader={loaderNewRoom} action={actionRoom}/> 
         <Route path='room/:roomId' element={<EditRoom /> }  loader={loaderEditRoom} action={actionRoom} />
         <Route path="/login" element={<Authentication />}  action={actionAuth} />
         <Route path="/transactions" element={<Transaction />} loader={loaderTransaction} />
         <Route path="/logout"   action={actionLogout} /> 

      </Route>
   </>
);

const router = createBrowserRouter(routes);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
