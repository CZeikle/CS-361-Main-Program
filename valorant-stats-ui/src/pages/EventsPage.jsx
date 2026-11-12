import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventNames } from "../Api";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        getEventNames().then(setEvents);
    }, []);

    return (
        <main>
            <Link to="/">Back to Homepage</Link>
            <header>
                <h1>Events</h1>
                <p>Click on an event to go to its standings page.</p>
            </header>
            <ul>
                {events.map((name) => (
                    <li key={name}>
                        <Link to={`/events/${encodeURIComponent(name)}`}>{name}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}