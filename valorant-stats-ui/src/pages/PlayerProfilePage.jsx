import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getplayers, getPlayerbyIGN, getPlayerAgents,  getPlayerMapStats } from "../Api.js";
import "../App.css";

export default function player_profile_page() {
    const { ign } = useParams();
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        setState({loading: true});
        Promise.all([getPlayerbyIGN(ign), getPlayerAgents(ign), getPlayerMapStats(ign)]).then(
            ([player, agents, maps]) => {
                setState({ loading: false, player, agents, maps})
            }
        );
    }, [ign]);

    if (state.loading) return <main className="page"><p className="sub">Loading player</p></main>;
    const { player: p, agents, maps} = state;
    if (!p) {
        return (
            <main>
                <p>We couldn't find that player.</p>
                <Link to="/">Back to Homepage</Link>
            </main>
        );
    }

    const kd = (p.kills / p.deaths).toFixed(2);
    const statlist = [
        ["ACS", p.acs],
        ["K/D", kd],
        ["Total Kills", p.kills],
        ["Total Deaths", p.deaths],
        ["Total Assists", p.assists],
    ];

    function agentPercentage(maps) {
        const agent_counts = {};
        maps.forEach((m) => {
            agent_counts[m.agent] = (agent_counts[m.agent] || 0) + 1;
        });
        return Object.entries(agent_counts)
            .map(([agent, count]) => ({
                agent,
                maps: count,
                percentage: Math.round((count / maps.length) * 100),
            }))
            .sort((a, b) => b.maps - a.maps);
    }

    const agentPool = agentPercentage(maps);

    return (
        <main>
            <Link to="/">Back to Homepage</Link>
            <header>
                <div>
                    <h1>{p.ign}</h1>
                    <p>{p.team_name}</p>
                </div>
            </header>
            <dl className="strip">
                {statlist.map(([label, value]) => (
                    <div key={label}><dd>{label}</dd><dt>{value}</dt></div>
                ))}
            </dl>
            <h2>
                <table className="player-stat-table">
                    <thead>
                        <tr>
                            <th>Agent</th>
                            <th>ACS</th>
                            <th>K/D</th>
                            <th>Kills</th>
                            <th>Deaths</th>
                            <th>Assists</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((v, k) => (
                            <tr key={k}>
                                <td>{v.agent}</td>
                                <td>{v.acs}</td>
                                <td>{kdr(v.kills, v.deaths)}</td>
                                <td>{v.kills}</td>
                                <td>{v.deaths}</td>
                                <td>{v.assists}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Agent</th>
                            <th>Pick %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agentPool.map((a) => (
                            <tr key={a.agent}>
                                <td>{a.agent}</td>
                                <td>{a.percentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </h2>
        </main>
    )

    function kdr({kills, deaths}) {
        return (
            (kills / deaths).toFixed(2)
        )
    }

}