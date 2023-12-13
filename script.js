const conferenceTeams = {
    "North": ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    "East": ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    "South": ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    "West": ["Ballers", "Crusaders", "Dinos", "Explorers", "Frogs", "Heros", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
}

const teams = {}

const schedule = {
    day: 1,
    "1": [[1, 2], [8, 10], [9, 16], [7, 11], [3, 15], [6, 12], [4, 14], [5, 13]],
    "2": [[9, 10], [1, 3], [8, 11], [2, 16], [7, 12], [4, 15], [6, 13], [5, 14]],
    "3": [[2, 3], [9, 11], [1, 4], [8, 12], [10, 16], [7, 13], [5, 15], [6, 14]],
    "4": [[10, 11], [2, 4], [9, 12], [1, 5], [8, 13], [3, 16], [7, 14], [6, 15]],
    "5": [[3, 4], [10, 12], [2, 5], [9, 13], [1, 6], [8, 14], [11, 16], [7, 15]],
    "6": [[11, 12], [3, 5], [10, 13], [2, 6], [9, 14], [1, 7], [8, 15], [4, 16]],
    "7": [[4, 5], [11, 13], [3, 6], [10, 14], [2, 7], [9, 15], [1, 8], [12, 16]],
    "8": [[13, 12], [4, 6], [11, 14], [3, 7], [10, 15], [2, 8], [5, 16], [1, 9]],
    "9": [[5, 6], [12, 14], [4, 7], [11, 15], [3, 8], [13, 16], [2, 9], [1, 10]],
    "10": [[13, 14], [5, 7], [12, 15], [4, 8], [6, 16], [3, 9], [1, 11], [2, 10]],
    "11": [[2, 10], [6, 7], [13, 15], [5, 8], [14, 16], [4, 9], [1, 12], [3, 10]],
    "12": [[2, 11], [14, 15], [6, 8], [7, 16], [5, 9], [1, 13], [4, 10]],
    "13": [[2, 12], [3, 11], [7, 8], [15, 16], [6, 9], [1, 14], [5, 10]],
    "14": [[2, 13], [4, 11], [3, 12], [8, 16], [7, 9], [1, 15], [6, 10]],
    "15": [[2, 14], [5, 11], [3, 13], [4, 12], [8, 9], [1, 16], [7, 10]],
    "16": [[2, 15], [6, 11], [3, 14], [5, 12], [4, 13]] 
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
    if (document.getElementById("league")) {
            let element = document.getElementById("league");
            element.remove();
    }
    let league = document.createElement("div");
    league.id = "league";
    document.getElementById("league-grid").append(league);
    for (const key in teams) {
        let conference = document.createElement("div");
        conference.id = key;
        document.getElementById("league").append(conference);
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
    if (document.getElementById("schedule")) {
        let element = document.getElementById("schedule");
        element.remove();
    }
    let dayNum = schedule.day;
    let dayStr = dayNum.toString();
    let scheduleDiv = document.createElement("div");
    scheduleDiv.id = "schedule";
    document.getElementById("schedule-grid").append(scheduleDiv);
    for (const conference in teams) {
        let conferenceDiv = document.createElement("div");
        conferenceDiv.innerHTML = conference;
        document.getElementById("schedule").append(conferenceDiv);
        for (let i = 0; i < schedule[dayStr].length; i++) {
            let team1;
            let record1;
            let team2;
            let record2;
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === schedule[dayStr][i][0]) {
                    team1 = team;
                    record1 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                } else if (teams[conference][team].standing === schedule[dayStr][i][1]) {
                    team2 = team;
                    record2 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                }
            }
            let matchup = document.createElement("div");
            matchup.innerHTML = team1 + " " + record1 + " vs. " + team2 + " " + record2;
            document.getElementById("schedule").append(matchup);
        }
    }
}

function simulateDay() {
    schedule.day += 1;
    orderStandings();
    displayStandings();
    displaySchedule();
}

function start() {
    createLeague();
    orderStandings();
    displayStandings();
    displaySchedule();
    console.log(teams);
}

start();