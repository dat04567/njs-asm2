import { FormRoom } from 'components';
import React, { Suspense } from 'react';
import './editRoom.css';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import requests from 'utils/request';
import instance from 'utils/axios';
import { getAuthToken } from 'utils/auth';

function EditRoom() {
   const {loadSingleRoom} = useLoaderData(); 
   return (
      <main className="edit-room">
         <div className="title-room">Edit Room</div>
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={loadSingleRoom}>{(room) => <FormRoom method="post" room={room}  />}</Await>
         </Suspense>
      </main>
   );
}

export default EditRoom;

async function loadSingleRoom(id) {

   const response = await instance.post(requests.fetchSingleRoom, {_id : id});
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

export function loader({ request, params}) {
   const id = params.roomId;
   const token = getAuthToken();
   if(!token) return redirect('/login');
   return defer({
      loadSingleRoom : loadSingleRoom(id),
   });
}
