export function computeStandings(matches) {
        const table = {};
        const row = (team) =>
        (table[team] ??= {team, played: 0, wins: 0, losses: 0, mapsWon: 0, mapsLost: 0, roundsWon: 0, roundsLost: 0});

        for (const m of matches) {
            const a = row(m.team_a);
            const b = row(m.team_b);
            a.played++; b.played++;
            a.mapsWon += m.team_a_maps; 
            a.mapsLost += m.team_b_maps;
            b.mapsWon += m.team_b_maps;
            b.mapsLost += m.team_a_maps;
            a.roundsWon += m.team_a_rounds;
            a.roundsLost += m.team_b_rounds;
            b.roundsWon += m.team_b_rounds;
            b.roundsLost += m.team_a_rounds;
            if (m.team_a_maps > m.team_b_maps) {a.wins++; b.losses++;}
            else {b.wins++; a.losses++;}
        }

        return Object.values(table)
        .map((t) => ({...t, mapDiff: t.mapsWon - t.mapsLost, roundDiff: t.roundsWon - t.roundsLost, }))
        .sort((x, y) => y.wins - x.wins || y.mapDiff - x.mapDiff || y.roundDiff - x.roundDiff);
    }