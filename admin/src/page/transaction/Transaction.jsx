import {  TransactionLastest } from 'components';
import React, { Suspense } from 'react';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import './transaction.css';
import instance from 'utils/axios';
import requests from 'utils/request';
import { getAuthToken } from 'utils/auth';

function Transaction() {
   const {transactions}  = useLoaderData();
   return (
      <main className='transactions'>
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={transactions}>{(transaction) =>  <TransactionLastest name="Transactions List" transactions={transaction} /> }</Await>
         </Suspense>
      </main>
   );
}

export default Transaction;

async function loadTransaction() {
   const response = await instance.get(requests.fetchTransaction);

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
}

export function loader() {
   const token = getAuthToken();
   if(!token) return redirect('/login');
   return defer({
      transactions: loadTransaction(),
   });
}
