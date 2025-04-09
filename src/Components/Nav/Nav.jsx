import { Routes, Route, NavLink } from "react-router-dom"
import { Home } from "../Home/Home"
import { About } from "../About/About"
import "./nav.css"

const Nav = () => {

    return (
        <>
            <div className="nav-container">
                <h1 style={{ marginLeft: "1rem" }}>Weather App</h1>
                <div className="text">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        About
                    </NavLink>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>

    )
}
export { Nav }