import { useEffect, useMemo, useState } from "react";
import { GrLinkDown, GrLinkUp } from "react-icons/gr"
import { getplayers } from "../Api.js";
import { Link } from "react-router-dom";
import "../App.css";

const COLUMNS = [
    { key: "ign", label: "Player", text: true },
    { key: "team_name", label: "Team", text: true },
    {key: "agents", label: "Agents", text: true },
    { key: "acs", label: "Average Combat Score" },
    { key: "kills", label: "Kills" },
    { key: "deaths", label: "Deaths" },
    { key: "assists", label: "Assists" },
    { key: "kdr", label: "K/D Ratio"},
];

export default function GeneralStatPage() {
    const [players, setPlayers] = useState([]);
    const [sort, setSort] = useState({ key: "kills", dir: "desc" });
    const [agent, setAgent] = useState("All agents");
    const [team, setTeam] = useState("All teams");

    useEffect(() => {
        getplayers().then((rows) =>
            setPlayers(rows.map((p) => ({ ...p, kdr: (p.kills / p.deaths).toFixed(2) })))
        );
    }, []);

    const agents = useMemo(
        () => ["All agents", ...new Set(players.flatMap((p) => p.agents))].sort(),
        [players]
    );

    const teams = useMemo(
        () => ["All teams", ...new Set(players.map((p) => p.team_name))].sort(),
        [players]
    );

    const rows = useMemo(() => {
        const filtered = players.filter(
            (p) =>
                (agent === "All agents" || p.agents.includes(agent)) &&
                (team === "All teams" || p.team_name === team)
        );
        const sign = sort.dir === "asc" ? 1 : -1;
        return [...filtered].sort((a, b) =>
            typeof a[sort.key] === "string"
                ? sign * a[sort.key].localeCompare(b[sort.key])
                : sign * (a[sort.key] - b[sort.key])
        );
    }, [players, agent, team, sort]);

    const toggleSort = (key) =>
        setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));
    
    return (
        <main>
            <header>
                <h1>Valorant Champions Tour Stat Tracker</h1>
                <p>Currently testing page functionality using stats from only one match.</p>
                <p>Check the Events page to view team standings for events.</p>
                <Link to="/events">Events Page</Link>
                <p>Click on a player's name to view their individual page!</p>
                <p>Filter by a team to view only players from that team.</p>
                <p>Filter by an agent to view only players that have played that agent.</p>
                <label>
                    Agent: 
                    <select value={agent} onChange={(e) => setAgent(e.target.value)}>
                        {agents.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                </label>
                <label>
                    Team:
                    <select value={team} onChange={(e) => setTeam(e.target.value)}>
                        {teams.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </label>
            </header>
            <div>
                <table>
                    <thead>
                        <tr>
                            {COLUMNS.map((c) => (
                                <th key={c.key} 
                                aria-sort={sort.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                                    <button onClick={() => toggleSort(c.key)}>
                                        {c.label}{sort.key === c.key  ? (sort.dir === "asc" ? <GrLinkUp/> : <GrLinkDown/>) : ""}
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((p) => (
                            <tr key={p.player_id}>
                                <td><Link to={`/players/${p.ign}`}>{p.ign}</Link></td>
                                <td>{p.team_name}</td>
                                <td>{p.agents.join(", ")}</td>
                                <td>{p.acs}</td>
                                <td>{p.kills}</td>
                                <td>{p.deaths}</td>
                                <td>{p.assists}</td>
                                <td>{p.kdr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}