import { players } from "./Mockdata.js";
import { player_data } from "./MockPlayerData.js";
import { match_data } from "./MockMatchData.js"
import { event_data } from "./MockEventData.js";

// Swap mock data for real API and PostreSQL db later
export async function getplayers() {
    return players;
}

export async function getPlayerbyID(id) {
    return players.find((p) => p.player_id === Number(id)) ?? null;
}

export async function getPlayerbyIGN(ign) {
    return players.find((p) => p.ign === String(ign)) ?? null;
}

export async function getPlayerAgents(ign) {
    return player_data[ign]?.agents ?? [];
}

export async function getPlayerMapStats(ign) {
    return player_data[ign]?.maps ?? [];
}

export async function getMatchData(id) {
    return match_data[id]?.maps ?? [];
}

export async function getEventData(event) {
    return event_data[event]?.matches ?? [];
}

export async function getEventNames() {
    return Object.keys(event_data);
}