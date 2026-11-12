import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerProfilePage from "./pages/PlayerProfilePage.jsx";
import GeneralStatPage from "./pages/GeneralStatPage.jsx";
import StandingsPage from "./pages/StandingsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GeneralStatPage />} />
                <Route path="/players/:ign" element={<PlayerProfilePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:eventName" element={<StandingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
