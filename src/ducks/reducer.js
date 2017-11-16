import axios from "axios";

const initialState = {
  user: {},
  NBAgames: [],
  NFLgames: [],
  NFLHierarchy: []
};

const REQ_USER ='REQ_USER'
const SEARCH_SCHEDULE = 'SEARCH_SCHEDULE'
const NFL_GAMES = "NFL_GAMES"
const NFL_HIERARCHY = "NFL_HIERARCHY"

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
    payload: axios.get('/api/NFLHierarchy').then(response => console.log(response))
  }
}

export default function reducer(state = initialState, action){
  switch(action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true});

    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, { isLoading: false, user: action.payload});

    case SEARCH_SCHEDULE + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case SEARCH_SCHEDULE + "_FULFILLED":
      return Object.assign({}, state, {NBAgames: action.payload, isLoading: false})

    case NFL_GAMES + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case NFL_GAMES + "_FULFILLED":
      return Object.assign({}, state, {NFLgames: action.payload, isLoading: false})

    case NFL_HIERARCHY + "_PENDING":
      return Object.assign({}, state, { isLoading: true})

    case NFL_HIERARCHY + "_FULFILLED":
      return Object.assign({}, state, {NFLHierarchy: action.payload, isLoading: false})


    default:
      return state;
  }
}
