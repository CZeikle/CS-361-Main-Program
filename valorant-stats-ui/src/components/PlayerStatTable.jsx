export default function PlayerStatTable({}) {
    const kd = (p.kills / p.deaths).toFixed(2);
    const statlist = [
        ["ACS", p.acs],
        ["K/D", kd],
        ["Total Kills", p.kills],
        ["Total Deaths", p.deaths],
        ["Total Assists", p.assists],
    ];  

    return (
        <table className="player-stat-table">
            <thead>
                <th>Agent</th>
                <th>ACS</th>
                <th>K/D</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>Assists</th>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}