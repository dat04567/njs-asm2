import React, { Suspense } from 'react';
import MailList from '../../components/mailList/MailList';
import './transactions.css';
import axios from 'axios';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../utils/auth';
function Transactions() {
   const { transactions } = useLoaderData();
   return (
      <div className="transactionsContainer">
         <section className="transactions">
            <article>
               <h3>Your Transactions</h3>
               <table>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <Suspense
                        fallback={
                           <tr style={{ textAlign: 'center' }}>
                              <td>Loading...</td>
                           </tr>
                        }>
                        <Await resolve={transactions}>
                           {(transactions) => {
                              return transactions.map((transaction, index) => { 
                                 const startDate = new Date(transaction.startDate).toLocaleDateString("en-US");
                                 const endDate = new Date(transaction.endDate).toLocaleDateString("en-US");
                                 return <tr key={transaction._id}>
                                    <td align='center'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</td>
                                    <td>{transaction.nameHotel}</td>
                                    <td>{transaction.numberRoom.join(',')}</td>
                                    <td>{`${startDate} - ${endDate}`}</td>
                                    <td>{`$${transaction.price}`}</td>
                                    <td>{transaction.payMethod}</td>
                                    <td> <span>{transaction.status}</span></td>
                                 </tr>
                            });
                           }}
                        </Await>
                     </Suspense>
                  </tbody>
               </table>
            </article>
         </section>

         <MailList />
      </div>
   );
}

export default Transactions;

async function loadTransactions() {
   const data = getAuthToken();
   const response = await axios.post(`http://localhost:5000/api/booking/trainsactions`, { email : data.email });
   if (!response.status === 500) {
      throw json(
         { message: 'Could not fetch transactions .' },
         {
            status: 500,
         }
      );
   } else {
      return response.data;
   }
}

export function loader({ request, params }) {
   const token = getAuthToken();
   if (!token) return redirect('/');
   return defer({
      transactions: loadTransactions(),
   });
}
