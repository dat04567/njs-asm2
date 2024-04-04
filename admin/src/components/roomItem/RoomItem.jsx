import React from 'react';
import { Form, Link } from 'react-router-dom';


function truncate(source, size) {
   return source.length > size ? source.slice(0, size - 1) + "…" : source;
 }

function RoomItem({_id, title, price, desc, maxPeople}) {
   return <tr>
   <td>
      <input type="checkbox" name="" id="" />
   </td>
   <td>
      <span>{_id}</span>
   </td>
   <td>
      <span>{title}</span>
   </td>
   <td>
      <span>{truncate(desc, 44)}</span>
   </td>
   <td>
      <span>{price}</span>
   </td>
   <td>
      <span>{maxPeople}</span>
   </td>
   <td> 
      <Form method='post'>
         <input type="text"  name='_id' defaultValue={_id}  hidden />
         <button>Delete</button>
      </Form>
      <div>
         <input type="text"  name='_id' defaultValue={_id}  hidden />
         <Link to={`/room/${_id}`}>
            <button >Edit</button>
         </Link>
      </div>
   </td>
</tr>
}

export default RoomItem;