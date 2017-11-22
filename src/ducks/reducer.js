import axios from "axios";

const initialState = {
  user: {},
  NBAgames: [],
  NFLgames: [],
  NFLHierarchy: [],
  NFLRoster: [],
  NFLPlayers: [],
  NBALeague: [],
  NBARoster: [],
  NBAPlayers: [],
  MLBSchedule: [],
  MLBPlayers: [],
  MLBTeams: [],
  MLBRoster: []
};

const REQ_USER ='REQ_USER'
const SEARCH_SCHEDULE = 'SEARCH_SCHEDULE'
const NFL_GAMES = "NFL_GAMES"
const NFL_HIERARCHY = "NFL_HIERARCHY"
const NFL_ROSTER = "NFL_ROSTER"
const NFL_PLAYERS = "NFL_PLAYERS"
const NBA_LEAGUE = "NBA_LEAGUE"
const NBA_ROSTER = "NBA_ROSTER"
const NBA_PLAYERS = "NBA_PLAYERS"
const MLB_SCHEDULE = "MLB_SCHEDULE"
const MLB_PLAYERS = "MLB_PLAYERS"
const MLB_TEAMS = "MLB_TEAMS"
const MLB_ROSTER = "MLB_ROSTER"

export function requestUser(){
  return {
    type: REQ_USER,
    payload: axios.get('/api/me').then(response => response.data)
  }
}

//Nba NBAgames
export function searchSchedule(){
  return {
    type: SEARCH_SCHEDULE,
    payload: axios.get('/api/NBAgames').then(response => response.data)
  }
}

// NFL GAMES
export function searchNflGames(){
  return {
    type: NFL_GAMES,
    payload: axios.get('/api/NFLgames').then(response => response.data)
  }
}

// NFL HIERARCHY
export function searchNflHierarchy(){
  return {
    type: NFL_HIERARCHY,
    payload: axios.get('/api/NFLHierarchy').then(response => {
        let nflteams = []
    response.data.conferences.map(x => {x.divisions.map(y => {y.teams.map(z =>{
      let teamName = z.market + " " + z.name
      nflteams.push(teamName)
    })})})
    return nflteams.sort()
  })
}
}
//NFL ROSTER
export function searchNFLRoster(){
  return {
    type: NFL_ROSTER,
    payload: axios.get('/api/NFLroster').then(response => {
      let nflroster = []
      response.data.players.map(x => {
        let playerName = x.name
        nflroster.push(playerName)
      })
      return nflroster.sort()
    })
  }
}

// NFL PLAYERS
export function searchNFLPlayers(){
  return {
    type: NFL_PLAYERS,
    payload: axios.get('/api/NFLplayers').then(response => {
      return response.data
    })
  }
}

//NBA LEAGUE
export function searchNBALeague(){
  return {
    type: NBA_LEAGUE,
    payload: axios.get('/api/NBAleague').then(response => {
      let nbateams = []
       response.data.conferences.map(x => {x.divisions.map(y => {y.teams.map(z => {
         let teamName = z.market + " " + z.name
         nbateams.push(teamName)
       })})})
       return nbateams.sort()
    })
  }
}

//NBA ROSTER
export function searchNBARoster(){
  return {
    type: NBA_ROSTER,
    payload: axios.get('/api/NBAroster').then(response => {
      let nbaroster = []
      response.data.players.map(x => {
        let playerName = x.full_name
        nbaroster.push(playerName)
      })
      return nbaroster.sort();
    })
  }
}

//NBA PLAYERS
export function searchNBAPlayers(){
  return {
    type: NBA_PLAYERS,
    payload: axios.get('/api/NBAplayers').then(response => {
      return response.data
    })
  }
}


//MLB schedule
export function searchMLBSchedule(){
  return {
    type: MLB_SCHEDULE,
    payload: axios.get('/api/MLBschedule').then(response => {
      return response.data
    })
  }
}

//MLB players
export function searchMLBPlayers(){
  return {
    type: MLB_PLAYERS,
    payload: axios.get('/api/MLBplayers').then(response => {
      return response.data
    })
  }
}

//MLB TEAMS
export function searchMLBTeams(){
  return {
    type: MLB_TEAMS,
    payload: axios.get('/api/MLBteams').then(response => {
      let mlbteams = []
     response.data.leagues.map(x => {x.divisions.map(y => {y.teams.map(z => {
       let teamName = z.market + " " + z.name
       mlbteams.push(teamName)
     })})})
     return mlbteams.sort()
    })
  }
}

//MLB ROSTER
export function searchMLBRoster(){
  return {
    type: MLB_ROSTER,
    payload: axios.get('/api/MLBroster').then(response => {
      let mlbroster = []
      response.data.players.map(x => {
        let playerName = x.full_name
        mlbroster.push(playerName)
      })
        return mlbroster.sort();
    })
  }
}


export default function reducer(state = initialState, action){
  switch(action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });

    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, { isLoading: false, user: action.payload });

    case SEARCH_SCHEDULE + "_PENDING":
      return Object.assign({}, state, { isLoading: true })

    case SEARCH_SCHEDULE + "_FULFILLED":
      return Object.assign({}, state, { NBAgames: action.payload, isLoading: false })

    case NFL_GAMES + "_PENDING":
      return Object.assign({}, state, { isLoading: true })

    case NFL_GAMES + "_FULFILLED":
      return Object.assign({}, state, { NFLgames: action.payload, isLoading: false })

    case NFL_HIERARCHY + "_PENDING":
      return Object.assign({}, state, { isLoading: true })

    case NFL_HIERARCHY + "_FULFILLED":
      return Object.assign({}, state, { NFLHierarchy: action.payload, isLoading: false })

    case NFL_ROSTER + "_PENDING":
      return Object.assign({}, state, { isLoading: true })

    case NFL_ROSTER + "_FULFILLED":
      return Object.assign({}, state, { NFLRoster: action.payload, isLoading: false })

    case NFL_PLAYERS + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case  NFL_PLAYERS + "_FULFILLED":
      return Object.assign({}, state, { NFLPlayers: action.payload, isLoading: false })

    case NBA_LEAGUE + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case NBA_LEAGUE + "_FULFILLED":
      return Object.assign({}, state, { NBALeague: action.payload, isLoading: false })

    case NBA_ROSTER + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case NBA_ROSTER + "_FULFILLED":
      return Object.assign({}, state, { NBARoster: action.payload, isLoading: false })

    case NBA_PLAYERS + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case NBA_PLAYERS + "_FULFILLED":
      return Object.assign({}, state, { NBAPlayers: action.payload, isLoading: false })

    case MLB_SCHEDULE + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case MLB_SCHEDULE + "_FULFILLED":
      return Object.assign({}, state, { MLBSchedule: action.payload, isLoading: false })

    case MLB_PLAYERS + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case MLB_PLAYERS + "_FULFILLED":
      return Object.assign({}, state, { MLBPlayers: action.payload, isLoading: false })

    case MLB_TEAMS + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case MLB_TEAMS + "_FULFILLED":
      return Object.assign({}, state, { MLBTeams: action.payload, isLoading: false })

    case MLB_ROSTER + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case MLB_ROSTER + "_FULFILLED":
      return Object.assign({}, state, { MLBRoster: action.payload, isLoading: false })




    default:
      return state;
  }
}
