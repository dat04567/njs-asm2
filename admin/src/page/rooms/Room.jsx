import React, { Suspense } from 'react';
import { Await, Link, defer, json, redirect, useLoaderData } from 'react-router-dom';
import instance from 'utils/axios';
import requests from 'utils/request';
import './room.css';
import { RoomList } from 'components';
import { getAuthToken } from 'utils/auth';

function Room() {
   const { rooms } = useLoaderData();
   return (
      <section className="rooms-container">
         <article className="header-rooms">
            <h2>Rooms List</h2>
            <Link to="/room">
               <button>Add new</button>
            </Link>
         </article>

         <article>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={rooms}>{(rooms) => <RoomList rooms={rooms} />}</Await>
            </Suspense>
         </article>
      </section>
   );
}  

export default Room;

export async function loadRooms() {
   const response = await instance.get(requests.fetchRooms);
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

export async function action({ request }) {
   const data = await request.formData();
   const idData = {
      _id: data.get('_id'),
   };
   const isCheck = window.confirm('Are you sure you delete hotel ? ');
   if (isCheck) {
      try {
         const response = await instance.post(requests.deleteRoom, idData);
         window.confirm(response.data.message);
         return response;
      } catch (error) {
         window.confirm(error.response.data.error);
         return error;
      }
   } else {
      window.confirm('Delete not success');
   }
}



export function loader() {
   const token = getAuthToken();
   if(!token) return redirect('/login');
   return defer({
      rooms: loadRooms(),
   });
}
