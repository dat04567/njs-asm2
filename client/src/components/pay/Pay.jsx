import React, { useContext, useEffect, useMemo, useState } from 'react';
import './Pay.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import FormBill from '../formBill/FormBill';
import BillContext from '../../store/form-context';
import Room from '../billRooms/Room';
import axios from 'axios';
import {  useLocation } from 'react-router-dom';

function Pay() {
   const { data, handleDate, handleRooms, handlePrice, handleSubmit, handlePayment} =
      useContext(BillContext);
   const { pathname } = useLocation();
   const idHotel = useMemo(() => pathname.split('/')[2], [pathname]);
   const [rooms, setRooms] = useState(null);
 
   // fetch sumPrice
   useEffect(() => {
      async function fetchSumPrice() {
         const response = await axios.post('http://localhost:5000/api/booking/sumPrice', {
            rooms: data.rooms,
            numDate: data.numberDate,
         });
         if (response.status === 200) {
            handlePrice(response.data.result);
         }
      }
      fetchSumPrice();
   }, [data.rooms, data.numberDate, handlePrice]);
   // fetch room 
   useEffect(() => {
      const startDate = data.date[0].startDate;
      const endDate = data.date[0].endDate;

      async function fetchRooms() {
         const response = await axios.post('http://localhost:5000/api/booking/rooms', {
            hotelID: idHotel,
            startDate,
            endDate,
         });
         if (response.status === 200) {
            setRooms(response.data);
         }
      }
      fetchRooms();
   }, [data.date, idHotel]);



   return (
      <>
         <section className="pay-container">
            <article className="pay-date">
               <h3>Dates</h3>
               <DateRange
                  editableDateInputs={true}
                  onChange={(item) => handleDate(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={data.date}
                  className=""
                  minDate={new Date()}
               />
            </article>
            <article className="reserve-info">
               <h3>Reserve Info</h3>
               <FormBill />
            </article>
         </section>
         <div className="select-rooms">
            <h2>Select Rooms</h2>
            <article>
               {rooms?.map((room) => (
                  <Room room={room} key={room._id} handleRoom={handleRooms.bind(null, room._id)} />
               ))}
            </article>
            <div className="bill-container">
               <h2>Total Bills : ${data.price}</h2>
               <div className="bill-car-btn">
                  <select
                     name="car"
                     id="car"
                     className="pay-bill"
                     defaultValue={'DEFAULT'}
                     onChange={handlePayment}>
                     <option value="DEFAULT" disabled>
                        Select Payment Method
                     </option>
                     <option value="Cash">Cash</option>
                     <option value="Credit Card">Credit Card</option>
                  </select>
                  <button onClick={handleSubmit.bind(null, idHotel)}>Reserve Now</button>
               </div>
            </div>
         </div>
      </>
   );
}

export default Pay;
