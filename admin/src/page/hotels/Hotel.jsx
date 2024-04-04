import React, { Suspense } from 'react';

import './hotel.css';
import { HotelList } from 'components';
import { Await, Link, defer, json, redirect, useLoaderData } from 'react-router-dom';
import requests from 'utils/request';
import instance from 'utils/axios';
import { getAuthToken } from 'utils/auth';

function Hotel() {
   const { hotels } = useLoaderData();
   return (
      <section className="hotels">
         <article className="header-hotels">
            <h2>Hotels List</h2>
            <Link to="/hotel">
               <button>Add new</button>
            </Link>
         </article>

         <article>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={hotels}>{(hotels) => <HotelList hotels={hotels} />}</Await>
            </Suspense>
         </article>
      </section>
   );
}

export default Hotel;

export async function action({ request }) {
   const data = await request.formData();
   const idData = {
      _id: data.get('_id'),
   };
   const isCheck = window.confirm('Are you sure you delete hotel ? ');
   if (isCheck) {
      try {
         const response = await instance.post(requests.deleteHotel, idData);
         window.confirm('Delete success');
         return response;
      } catch (error) {
         window.confirm(error.response.data.message);
         return error;
      }
   } else {
      window.confirm('Delete not success');
   }
}

export async function loadhotels() {
   const response = await instance.get(requests.fetchHotels);
   if (response.status === 500) {
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
}

export function loader() {
   const token = getAuthToken();
   if(!token) return redirect('/login');
   return defer({
      hotels: loadhotels(),
   });
}
