import React from 'react';
import './transactionLastest.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import TransactionItem from 'components/transactionItem/TransactionItem';

function TransactionLastest({transactions, name}) {
   return (
      <div className={`transactionContainer  ${name ? 'transaction-list' : '' }`}>
         <section className="transactionLastest">
            <h2> {name || 'Lastest Transactions'} </h2>

            <article>
               <table className="transaction">
                  <thead>
                     <tr>
                        <th>
                           <input type="checkbox" name="" id="" />
                        </th>
                        <th>
                           <span>ID</span>
                        </th>
                        <th>
                           <span>User</span>
                        </th>
                        <th>
                           <span>Hotel</span>
                        </th>
                        <th>
                           <span>Room</span>
                        </th>
                        <th>
                           <span>Date</span>
                        </th>
                        <th>
                           <span>Price</span>
                        </th>
                        <th>
                           <span>Payment Method</span>
                        </th>
                        <th>
                           <span>Status</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {transactions.map( (transaction,index) => <TransactionItem key={index} {...transaction} />)}
                  </tbody>
               </table>

               <div>
                  <p>1-8 of 8 </p>
                  <ArrowBackIos />
                  <ArrowForwardIos />
               </div>
            </article>
         </section>
      </div>
   );
}

export default TransactionLastest;
