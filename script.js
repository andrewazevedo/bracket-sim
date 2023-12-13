const conferenceTeams = {
    "North": ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    "East": ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    "South": ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    "West": ["Ballers", "Crusaders", "Dinos", "Explorers", "Frogs", "Heros", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
}

const teams = {}

const schedule = {
    day: 1,
    "1": [[1, 2], [8, 10], [9, 16], [7, 11], [3, 15], [6, 12], [4, 14], [5, 13]]
}

function Team(pg, sg, sf, pf, c, wins, losses, standing, teamNum) {
    this.pg = pg;
    this.sg = sg;
    this.sf = sf;
    this.pf = pf; 
    this.c = c;
    this.wins = wins;
    this.losses = losses;
    this.standing = standing;
    this.teamNum = teamNum;
}

function createLeague() {
    for (const key in conferenceTeams) {
        teams[key] = {};
        for (let i = 0; i < conferenceTeams[key].length; i++) {
            let pg = Math.floor(Math.random() * (99 - 65) + 65);
            let sg = Math.floor(Math.random() * (99 - 65) + 65);
            let sf = Math.floor(Math.random() * (99 - 65) + 65);
            let pf = Math.floor(Math.random() * (99 - 65) + 65);
            let c = Math.floor(Math.random() * (99 - 65) + 65);
            let team = new Team(pg, sg, sf, pf, c, 0, 0, i + 1, i + 1);
            teams[key][conferenceTeams[key][i]] = team;
        }
    }
}

function orderStandings() {
    for (const conference in teams) {
        let teamStandings = [];
        for (const team in teams[conference]) {
            let teamArr = [team, teams[conference][team].wins, teams[conference][team].standing];
            teamStandings.push(teamArr);
        }
        for (let i = 0; i < teamStandings.length; i++) {
            for (let j = 0; j < teamStandings.length - i - 1; j++) {
                if (teamStandings[j][1] < teamStandings[j + 1][1]) {
                    let temp = teamStandings[j];
                    teamStandings[j] = teamStandings[j + 1];
                    teamStandings[j + 1] = temp;
                } else if (teamStandings[j][1] === teamStandings[j + 1][1]) {
                    if (teamStandings[j][2] > teamStandings[j + 1][2]) {
                        let temp = teamStandings[j];
                        teamStandings[j] = teamStandings[j + 1];
                        teamStandings[j + 1] = temp;
                    }
                }
            }
        }
        for (let i = 1; i < teamStandings.length + 1; i++) {
            for (const team in teams[conference]) {
                if (team === teamStandings[i - 1][2]) {
                    teams[conference][team].standing = i;
                }
            }
        }
    }
}

function displayStandings() {
    for (const key in teams) {
        let conference = document.createElement("div");
        conference.id = key;
        document.getElementById("league-grid").append(conference);
        let conferenceName = document.createElement("div");
        document.getElementById(key).append(conferenceName);
        conferenceName.innerHTML = key;
        for (let i = 1; i < 17; i++) {
            for (const team in teams[key]) {
                if (teams[key][team].standing === i) {
                    let teamDiv = document.createElement("div");
                    teamDiv.innerHTML = i + ". " + team + " (" + teams[key][team].wins + "-" + teams[key][team].losses + ")";
                    document.getElementById(key).append(teamDiv);
                }
            }
        }
    }
}

function displaySchedule() {
    let dayNum = schedule.day;
    let dayStr = dayNum.toString();
    for (const conference in teams) {
        let conferenceDiv = document.createElement("div");
        conferenceDiv.innerHTML = conference;
        document.getElementById("schedule-grid").append(conferenceDiv);
        for (let i = 0; i < schedule[dayStr].length; i++) {
            let team1;
            let record1;
            let team2;
            let record2;
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === schedule[dayStr][i][0]) {
                    team1 = team;
                    record1 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    console.log(team);
                } else if (teams[conference][team].standing === schedule[dayStr][i][1]) {
                    team2 = team;
                    record2 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    console.log(team);
                }
            }
            let matchup = document.createElement("div");
            matchup.innerHTML = team1 + " " + record1 + " vs. " + team2 + " " + record2;
            document.getElementById("schedule-grid").append(matchup);
        }
    }
}

function simulateDay() {
    schedule.day += 1;
}

function start() {
    createLeague();
    orderStandings();
    displayStandings();
    displaySchedule();
    console.log(teams);
}

start();