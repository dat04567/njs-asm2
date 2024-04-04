import React from 'react';
import './statisticsRow.css';
import {
   ShoppingCartOutlined,
   PersonOutlined,
   PaidOutlined,
   AccountBalanceWalletOutlined,
} from '@mui/icons-material';

function StatisticsRow() {
   return (
      <section className="statistics-row">
         <article>
            <h2>USERS</h2>
            <p>100</p>
            <div className='icon'>
               <PersonOutlined />
            </div>
         </article>
         <article>
            <h2>ORDERS</h2>
            <p>100</p>
            <div className='icon'>
               <ShoppingCartOutlined />
            </div>
         </article>
         <article>
            <h2>EARNINGS</h2>
            <p>100</p>
            <div className='icon'>
               <PaidOutlined />
            </div>
         </article>
         <article>
            <h2>BALANCE</h2>
            <p> 100</p>
            <div className='icon'>
               <AccountBalanceWalletOutlined />
            </div>
         </article>
      </section>
   );
}

export default StatisticsRow;
