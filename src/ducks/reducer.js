import axios from "axios";

const initialState = {
  user: {},
  NBAgames: []

};

const REQ_USER ='REQ_USER'
const SEARCH_SCHEDULE = 'SEARCH_SCHEDULE'

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

    default:
      return state;
  }
}
