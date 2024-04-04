import "./list.css";
import Header from "../../components/header/Header";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from 'axios';

const url = 'http://localhost:5000/api/booking/search'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);


  useEffect(() => {
    const startDate = date[0].startDate.toISOString();
    const endDate = date[0].endDate.toISOString();
    const fetchData = async () => {
      const response = await axios.get(`${url}?searchText=${destination}&startDate=${startDate}&endDate=${endDate}&room=${options.room}`);
      if (response.status === 500) {
         throw new Error('Could not fetch cart data!');
      }
      setHotels(response.data);
   };
   fetchData();

  },[date,options.room,destination]);


  const handleDestination = function(event)
  {
      setDestination(event.target.value);
  }

  return (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text"  value={destination} onChange={handleDestination} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {hotels?.map( (hotel,index) => <SearchItem key={index} _id={hotel._id} {...hotel}  />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
