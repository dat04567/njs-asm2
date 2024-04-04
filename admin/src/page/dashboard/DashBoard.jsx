import { StatisticsRow, TransactionLastest } from 'components';
import React, { Suspense } from 'react';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';
import './dashboard.css';
import instance from 'utils/axios';
import requests from 'utils/request';
import { getAuthToken } from 'utils/auth';
function Dashboard() {
   const {topTransactions}  = useLoaderData();
   return (
      <main className='dashbroad'>
         <StatisticsRow />
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={topTransactions}>{(transaction) =>  <TransactionLastest transactions={transaction} /> }</Await>
         </Suspense>
        
      </main>
   );
}

export default Dashboard;
async function loadTransaction() {
   const response = await instance.get(requests.fetchTopTransaction);

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
      topTransactions: loadTransaction(),
   });
}
