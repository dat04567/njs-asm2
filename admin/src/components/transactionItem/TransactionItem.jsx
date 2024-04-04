import React from 'react';

function TransactionItem({
   _id,
   startDate,
   endDate,
   user,
   status,
   numberRoom,
   payMethod,
   price,
   title,
   name,
}) {
   const startDateFormat = new Date(startDate).toLocaleDateString("en-GB");
   const endDateFormat = new Date(endDate).toLocaleDateString("en-GB");
   return (
      <tr>
         <td>
            <input type="checkbox" name="" id="" />
         </td>
         <td>
            <span>{_id}</span>
         </td>
         <td>
            <span>{user}</span>
         </td>
         <td>
            <span>{name || title}</span>
         </td>
         <td>
            <span>{numberRoom.join(',')}</span>
         </td>
         <td>
            <span>{startDateFormat} - {endDateFormat} </span>
         </td>
         <td>
            <span>${price}</span>
         </td>
         <td>
            <span>{payMethod}</span>
         </td>
         <td>
            <span>{status}</span>
         </td>
      </tr>
   );
}

export default TransactionItem;
