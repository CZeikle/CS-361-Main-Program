CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    region TEXT NOT NULL
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    ign TEXT NOT NULL UNIQUE,
    roles TEXT NOT NULL
);

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    team_a_id INT REFERENCES teams,
    team_b_id INT REFERENCES teams,
    date_played DATE,
    number_of_maps INT
);

CREATE TABLE maps (
    map_id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches,
    map_name TEXT NOT NULL,
    team_a_id INT REFERENCES teams,
    team_b_id INT REFERENCES teams,
    team_a_rounds INT,
    team_b_rounds INT
);

CREATE TABLE player_map_stats (
    player_id INT REFERENCES players,
    map_id INT REFERENCES maps,
    team_id INT REFERENCES teams,
    agent TEXT,
    kills INT, deaths INT, assists INT,
    acs INT, first_bloods INT,
    PRIMARY KEY (player_id, map_id)
);
