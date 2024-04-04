import './hotel.css';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Suspense, useState } from 'react';
import { Await, defer, json, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import DetailsHotel from '../../components/detailHotel/DetailsHotel';
import Pay from '../../components/pay/Pay';
import FormProvider from '../../store/FormProvider';
import axios from 'axios';
import { tokenAuthLoader } from '../../utils/auth';
const Hotel = () => {
   const { detailHotels} = useLoaderData();
   // const  gett 
   const token = tokenAuthLoader();
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const handleOpen = () => {
      if(!token)
      {
         navigate('/login');
         return;
      }
      setOpen(!open);
   };

   return (
      <div>
         <Header type="list" />
         <div className="hotelContainer">
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={detailHotels}>
                  {(loadHotel) => (
                     <DetailsHotel
                        hotel={loadHotel}
                        faLocationDot={faLocationDot}
                        setOpen={handleOpen}
                     />
                  )}
               </Await>
            </Suspense>
            {open && (
               <FormProvider>
                  <Pay />
               </FormProvider>
            )}

            <MailList />
         </div>
      </div>
   );
};

export default Hotel;

export async function action({ request }) {
   const formData = await request.json();
   await axios.post('http://localhost:5000/api/booking', formData);
   return redirect('/transactions');
}

async function loaderDetailHotels(id) {
   const response = await fetch(`http://localhost:5000/api/booking/hotels/${id}`);

   if (!response.ok) {
      throw json(
         { message: 'Could not fetch detail hotel .' },
         {
            status: 500,
         }
      );
   } else {
      const resData = await response.json();
      return resData;
   }
}


export function loader({ request, params }) {
   const id = params.id;
   return defer({
      detailHotels: loaderDetailHotels(id),
   });
}
