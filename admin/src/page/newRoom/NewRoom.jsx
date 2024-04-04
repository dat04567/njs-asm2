import { FormRoom } from 'components';
import React, { Suspense } from 'react';
import './newRoom.css';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import requests from 'utils/request';
import instance from 'utils/axios';
import { getAuthToken } from 'utils/auth';

function NewRoom() {
   const { titleHotels } = useLoaderData(); 
   return (
      <main className="new-room">
         <div className="title-room">Add New Room</div>
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={titleHotels}>{(titleHotels) => <FormRoom method="post" titleHotels={titleHotels} />}</Await>
         </Suspense>
         
      </main>
   );
}

export default NewRoom;

async function  loadTitleHotels() {
   const response = await instance.get(requests.fetchTitleHotels);
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
      titleHotels: loadTitleHotels(),
   });
}
