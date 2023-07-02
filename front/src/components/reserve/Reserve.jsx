import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";

const Reserve =({setOPen, hotelId}) => {

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`http://localhost:8080/back/hotels/rooms/${hotelId}`);
    const {dates} = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let list = [];
 
        while(date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list

    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unvailableDates.some((date) => 
        alldates.includes(new Date(date).getTime())
        );
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked? [...selectedRooms, value] 
        : selectedRooms.filter(item => item !==value) 
        )
    };


    const handleClick = async () => {
        try {
          await Promise.all(
            selectedRooms.map((roomId) => {
              const res = axios.put(`/rooms/availability/${roomId}`, {
                dates: alldates,
              });
              return res.data;
            })
          );
        } catch (err) {
          console.error(err);
        }
      };
      
      
 return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{color: "#005eff"}}className="rClose" onClick={() => setOPen(false)}/>
            {data.map(item =>(
                <div className="rItem">
                <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDescription">{item.desc}</div>
                <div className="rMax">Max <b>{item.maxPeople}</b></div>
                <div className="rPrice">{item.price} $</div>
                </div>
                <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                    <label>{roomNumber.number}</label>
                    <input type="checkbox" 
                    value={roomNumber._id} 
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    />
                </div>
                ))}
            </div>
                <button onClick={handleClick} className="rButton">Reserve Now</button>
                </div>
            ) )}
    
        </div> 
    </div>
 )
}

export default Reserve;  