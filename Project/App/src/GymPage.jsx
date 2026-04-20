import { useState, useEffect, useRef } from 'react'
import axios from "axios";

export default function GymPage({ onBack }) {
  const [bookings,setBookings] = useState([]);
  const [HIIT_requireBooking,setHIIT_requireBooking] = useState(true);
  const [booked_HIIT, setBooked_HIIT] = useState(false);
  const [yoga_requireBooking,setYoga_requireBooking] = useState(true);
  const [booked_yoga, setBooked_yoga] = useState(false);
  const [cycle_requireBooking,setCycle_requireBooking] = useState(true);
  const [booked_cycle, setBooked_cycle] = useState(false);
  const [capacity,setCapacity] = useState(0);
  const [unavailable_HIIT, setUnavailable_HIIT] = useState(false);
  const [unavailable_yoga, setUnavailable_yoga] = useState(false);
  const [unavailable_cycle, setUnavailable_cycle] = useState(false);

  useEffect(() => {
      axios.get("/api/get_capacity.php")
        .then(res => {
            setCapacity(res.data.percentage); 
        })
        .catch(err => console.log(err));

      const Username = localStorage.getItem("username");
      axios.get("/api/get_bookings.php", {
          params: { username: Username }
      })
      .then(res => {
          const bookings2 = Array.isArray(res.data) ? res.data : [];
          const now = new Date();
          const target = new Date();
          const target2 = new Date();
          const target3 = new Date();
          target.setHours(10, 0, 0, 0);
          target2.setHours(12, 30, 0, 0);
          target3.setHours(17, 0, 0, 0);
          setBookings(bookings2);
          if(bookings2.some(b => b.booking_name == "Spin Cycle")){
            setBooked_cycle(true);
            setCycle_requireBooking(false);
          }
          else if(now > target3){
            setUnavailable_cycle(true);
            setCycle_requireBooking(false);
          }
          if(bookings2.some(b => b.booking_name == "HIIT Blast")){
            setBooked_HIIT(true);
            setHIIT_requireBooking(false);
          }
          else if(now > target2){
            setUnavailable_HIIT(true);
            setHIIT_requireBooking(false);
          }
          if(bookings2.some(b => b.booking_name == "Yoga Flow")){
            setBooked_yoga(true);
            setYoga_requireBooking(false);
          }
          else if(now > target){
            setUnavailable_yoga(true);
            setYoga_requireBooking(false);
          }

      })
      .catch(err => console.log(err));
  }, []);

  const handleBooking = (bookingData) => {
    axios.post("/api/add_booking.php", bookingData)
        .then(res => {
        })
        .catch(err => {
            console.error("Booking Error:", err);
        });
    };

  function Booking_HIIT(){
      const bookingTime = new Date();
      bookingTime.setHours(12,30,0,0);
      const formattedTime = bookingTime.toISOString().slice(0, 19).replace('T', ' ');
      setBooked_HIIT(true);
      setHIIT_requireBooking(false);
      setCapacity(capacity + 1);

      const bookingData = {
        username: localStorage.getItem("username"),
        booking_name: "HIIT Blast",
        booking_time: formattedTime
      };
      handleBooking(bookingData);
  }

  function Booking_yoga(){
      setBooked_yoga(true);
      setYoga_requireBooking(false);
      setCapacity(capacity + 1);

      const bookingTime = new Date();
      bookingTime.setHours(10,0,0,0);
      const formattedTime = bookingTime.toISOString().slice(0, 19).replace('T', ' ');
      const bookingData = {
        username: localStorage.getItem("username"),
        booking_name: "Yoga Flow",
        booking_time: formattedTime
      };
      handleBooking(bookingData);
  }

  function Booking_cycle(){
      setBooked_cycle(true);
      setCycle_requireBooking(false);
      setCapacity(capacity + 1);
      const bookingTime = new Date();
      bookingTime.setHours(17,0,0,0);
      const formattedTime = bookingTime.toISOString().slice(0, 19).replace('T', ' ');
      const bookingData = {
        username: localStorage.getItem("username"),
        booking_name: "Spin Cycle",
        booking_time: formattedTime
      };
      handleBooking(bookingData);
  }
  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">WLV Gym</h1>
        <span className="status-badge status-green">Open Now</span>
      </div>

      <div className="occupancy-meter">
        <div className="meter-label">
          <span>Current Capacity</span>
          <span>{capacity}%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-fill" style={{ width: capacity + "%"}}></div>
        </div>
        <p className="meter-text">Plenty of space available.</p>
      </div>

      <div className="section">
        <h2>Today's Classes</h2>
        <div className="class-list">
          <div className="class-item">
            <div className="class-time">10:00</div>
            <div className="class-info">
              <h3>Yoga Flow</h3>
              <p>Studio A • Sarah J.</p>
            </div>
            {unavailable_yoga && <div className="status-full">Unavailable</div>}
            {yoga_requireBooking && <button className="action-btn" onClick = {Booking_yoga}>Book</button>}
            {booked_yoga && <div className="status-full">Booked</div>}
          </div>
          <div className="class-item">
            <div className="class-time">12:30</div>
            <div className="class-info">
              <h3>HIIT Blast</h3>
              <p>Studio B • Mike T.</p>
            </div>
            {unavailable_HIIT && <div className="status-full">Unavailable</div>}
            {HIIT_requireBooking && <button className="action-btn" onClick = {Booking_HIIT}>Book</button>}
            {booked_HIIT && <div className="status-full">Booked</div>}
          </div>
          <div className="class-item">
            <div className="class-time">17:00</div>
            <div className="class-info">
              <h3>Spin Cycle</h3>
              <p>Cycle Room • Jenny W.</p>
            </div>
            {unavailable_cycle && <div className="status-full">Unavailable</div>}
            {cycle_requireBooking && <button className="action-btn" onClick = {Booking_cycle}>Book</button>}
            {booked_cycle && <div className="status-full">Booked</div>}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Opening Hours</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Monday - Friday</td>
              <td>06:30 - 22:00</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>08:00 - 20:00</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>08:00 - 18:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
