import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/timetable.css";

const Timetable = () => {

    const [showtime, setShowtime] = useState([]);
    const [filteredShowtimes, setFilteredShowtimes] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [error, setError] = useState(null);
    const [movieTitles , setMovieTitles] = useState({});
    const [theaterNames, setTheaterNames] = useState({});


    useEffect(() => {
        const fetchShowtimes = async () => {
            try{
                const response = await fetch("http://localhost:8000/showtimes");
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setShowtime(data);
                console.log("Showtime Data: ", data);
                setFilteredShowtimes(data);
                fetchMovieTitles(data);
                fetchTheaterNames(data);
            } catch (err) {
                console.error("Failed to fetch showtimes");
                setError(err.message);
            }
        }
        fetchShowtimes();
    }, []);

    const fetchMovieTitles = async (showtimes) => {
        const titles = {};
        for (const showtime of showtimes) {
            if (!titles[showtime.movie_id]) {
                const response = await fetch(`http://localhost:8000/movies/${showtime.movie_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const movieData = await response.json();
                titles[showtime.movie_id] = movieData.title;
            }
        }
        setMovieTitles(titles);
    }

    const fetchTheaterNames = async (showtimes) => {
        const names = {};
        for (const showtime of showtimes) {
            if (!names[showtime.theater_id]) {
                const response = await fetch(`http://localhost:8000/theaters/${showtime.theater_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const theaterData = await response.json();
                names[showtime.theater_id] = theaterData.name;
            }
        }
        setTheaterNames(names);
    }
    const handleDayChange = (e) => {
        const day = e.target.value;
        setSelectedDay(day);
        if (day === ""){
            setFilteredShowtimes(showtime);
        } else {
            const filtered = showtime.filter((showing) => {
                const showtimeDate = new Date(showing.start_time);
                const showtimeDay = showtimeDate.toLocaleDateString("en-GB", { weekday: "long" });
                return showtimeDay === day;
            });
            setFilteredShowtimes(filtered);
        }
    }
    return (
        
        <>
        <div className="timetableCont">
            <h1 className="title">Raspored prikazivanja</h1>
            {error && <p style={{ color: "red" }}>Failed to fetch showtimes: {error}</p>}
            <div className="day-selection-cont">
                <label htmlFor="dayselect"> Pretražite po danu: </label>
                <select
                    name="dayselect"
                    id="dayselect"
                    value={selectedDay}
                    onChange={handleDayChange}
                    className="dayselect"
                >
                    <option value="">Svi dani</option>
                    <option value="Monday">Ponedjeljak</option>
                    <option value="Tuesday">Utorak</option>
                    <option value="Wednesday">Srijeda</option>
                    <option value="Thursday">Četvrtak</option>
                    <option value="Friday">Petak</option>
                    <option value="Saturday">Subota</option>
                    <option value="Sunday">Nedjelja</option>
                </select>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Film</th>
                            <th>Sala</th>
                            <th>Dan</th>
                            <th>Vrijeme prikazivanja</th>
                            <th>Kupi kartu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredShowtimes.map((showtime) => (
                            <tr key={showtime.id}>
                                <td>{movieTitles[showtime.movie_id] || `loading....`}</td>
                                <td>{theaterNames[showtime.theater_id]}</td>
                                <td>{new Date(showtime.start_time).toLocaleDateString("bs-BA", { weekday: "long" })}</td>
                                <td>{new Date(showtime.end_time).toLocaleTimeString("bs-BA")}</td>
                                <td>
                                    <button className="buy-ticket-btn">Kupi kartu</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        </>
    );
}

export default Timetable;