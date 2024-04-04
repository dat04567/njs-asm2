import React, { Suspense } from 'react';
import './editHotel.css'
import { FormHotel } from 'components';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import instance from 'utils/axios';
import requests from 'utils/request';
import { getAuthToken } from 'utils/auth';




function EditHotel() {
   const {loadHotel } = useLoaderData();
   return <main className='edit-hotel'>
      <div className='title-room'>Edit Hotel</div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={loadHotel}>{(hotel) =>  <FormHotel method="patch" hotel={hotel[0]} />}</Await>
      </Suspense>
   
   </main>;
}

export default EditHotel;


async function loadHotel(id) {
   const response = await instance.post(requests.fetchSingleHotel, {_id : id});
   if (!response.status === 500) {
      throw json(
         { message: 'Could not fetch detail hotel .' },
         {
            status: 500,
         }
      );
   } else {
      const resData = await response.data;
      return resData;
   }
};

export function loader({ request, params }) {
   const token = getAuthToken();
   if(!token) return redirect('/login');
   const id = params.hotelId;
   return defer({
      loadHotel: loadHotel(id),
   });
}
