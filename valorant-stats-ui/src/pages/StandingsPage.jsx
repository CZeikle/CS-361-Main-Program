import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMatchData } from "../Api.js";
import { getEventData } from "../Api.js";
import { computeStandings } from "../components/StandingsTable.jsx"
import "../App.css";

const signed = (n) => (n > 0 ? `+${n}` : n);

export default function StandingsPage() {
    const { eventName } = useParams();
    const [standings, setStandings] = useState(null);

    useEffect(() => {
        setStandings(null);
        getEventData(eventName).then((matches) => setStandings(computeStandings(matches)));
    }, [eventName]);

    return (
        <main>
            <Link to="/">Back to Homepage</Link>
            <header>
                <h1>{eventName} Standings</h1>
            </header>
            {standings === null ? (
                <p>Loading standings...</p>
            ) : standings.lenth === 0 ? (
                <p>No matches yet.</p>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>Record</th>
                                <th>Map Differential</th>
                                <th>Round Differential</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((k, i) => (
                                <tr key={k.team}>
                                    <td>{i+1}</td>
                                    <td>{k.team}</td>
                                    <td>{k.wins} - {k.losses}</td>
                                    <td>{k.mapDiff}</td>
                                    <td>{k.roundDiff}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}