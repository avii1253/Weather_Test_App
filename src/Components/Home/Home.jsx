import { useState, useReducer } from "react"
import axios from "axios";
import "./Home.css"
import { data } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const Home = () => {

    const [cities, setCity] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [isData, setData] = useState(false);
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState(false);
    const [forcastList, setForcastList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) => {
        setSearchVal(e.target.value)
        console.log(searchVal);
    }

    const callApi = async (city) => {

        try {
            setIsLoading(true);
            const API_KEY = "56d5779f89c73eee15ffd2d702ab47e6";
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            console.log(data);
            setWeatherData(data);
            setData(true);
        }
        catch (error) {
            console.log(error);
            const { status } = error;
            if (status === 404) {
                setError(true);
                setData(false);
            }
            console.log(status);
        }
        finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }


    }

    const getDailyForcast = (dataList) => {
        const filteredList = dataList.filter((item) => item.dt_txt.includes("12:00:00"));
        return filteredList.slice(0, 5);
    }

    const callApiForcast = async (city) => {
        try {
            const API_KEY = "56d5779f89c73eee15ffd2d702ab47e6";
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            console.log(response);
            const dataList = response.data.list;
            const dailyForcast = getDailyForcast(dataList);
            console.log(dailyForcast);
            setForcastList(dailyForcast);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchClick = (e) => {
        //base case
        if (searchVal.trim() === "") return;

        //API calling
        const temp = searchVal.trim()

        if (cities.length > 0 && cities[cities.length - 1].toLowerCase() === temp.toLowerCase()) return;

        callApi(temp);
        callApiForcast(temp);
        if (cities.length < 5) {
            setCity([...cities, temp]);
        }
        else {
            const updatedHistory = [...cities, temp];
            setCity(updatedHistory.slice(-5));
        }
        setSearchVal("");
    }

    const handleClearHistory = () => {
        setCity([]);
        setData(false);
        setError(false);
        setWeatherData();
    }

    const handleRefresh = () => {
        if (!weatherData?.name) return;
        const city = weatherData.name;
        callApi(city);
        callApiForcast(city);
    };

    return (
        <>

            {isLoading ? (<Loader />) : (<>
                <div className="container">

                    {/* search-card */}
                    <div className="search-card">
                        <div className="search-top">
                            <p style={{ fontFamily: "sans-serif" }}>Search for any City</p>
                            <div style={{ "display": "flex" }}>
                                <input className="serach-bar" type="text" placeholder="Enter city..." value={searchVal} onChange={handleChange} />
                                <span className="material-symbols-rounded icon-round-radius" onClick={handleSearchClick}>
                                    search
                                </span>
                            </div>
                        </div>
                        <div className="history">
                            <div className="history-buttons">
                                <button className="history-btn refresh-btn" onClick={handleRefresh}>Refresh</button>
                                <button className="history-btn clear-btn" onClick={handleClearHistory}>Clear History</button>
                            </div>
                            <div className="prev-city-container">
                                {cities.map((city, index) => <p key={index} className="prev-city-list">{city}</p>)}
                            </div>
                        </div>
                    </div>

                    {/* weather-card */}
                    <div className={isData ? "weather-card" : "d-none"}>
                        <div className="weather-body">
                            <h2>{`City : ${weatherData?.name} `}</h2>
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                                alt={weatherData?.weather[0]?.description}
                                width={100}
                                height={100}
                                style={{ imageRendering: "auto" }}
                            />
                            <p>{`Temperature : ${weatherData?.main?.temp} C`}</p>
                            <p>{`Weather Condition : ${weatherData?.weather[0]?.main}`}</p>
                            <p>{`Humidity : ${weatherData?.main?.humidity}%`}</p>
                            <p>{`Wind Speed : ${weatherData?.wind.speed} MPH`}</p>
                        </div>
                        <div className="weather-forcast">
                            <h2>5-day Forecast</h2>
                            <div className="forecast-list">
                                {forcastList.map((day, idx) => (
                                    <div key={idx} className="forecast-card">
                                        <p>{new Date(day.dt_txt).toDateString()}</p>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                            alt={day.weather[0].description}
                                            width={100}
                                            height={100}
                                            style={{ imageRendering: "auto" }}
                                        />
                                        <p>Temp : {day.main.temp}°C</p>
                                        <p>Humidity : {day.weather[0].main}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className={!isData && error ? "error-card" : "d-none"}>
                        <h1>City Name is Invalid</h1>
                    </div>
                </div>
            </>)}


        </>
    )
}

export { Home }