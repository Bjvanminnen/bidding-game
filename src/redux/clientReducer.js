import { combineReducers } from 'redux';

import { ACTIVATE_PLAYER, SUBMIT_BID } from './clientActions';
import { SERVER_UPDATE } from './serverActions';
import { NO_BID } from './constants';

function serverState(state = null, action) {
  if (action.type === SERVER_UPDATE) {
    return action.state;
  }
  return state;
}

function activePlayer(state = null, action) {
  if (action.type === ACTIVATE_PLAYER) {
    return action.playerIndex;
  }

  return state;
}

function currentBid(state = [NO_BID, NO_BID], action) {
  if (action.type === SUBMIT_BID) {
    const { playerId, bid } = action;
    return state.map((_, index) => index === playerId ? bid : NO_BID);
  }
  if (action.type === SERVER_UPDATE) {
    const { bidThisRound } = action.state;
    return state.map((_, index) => bidThisRound[index] ? state[index] : NO_BID);
  }

  return state;
}

export default combineReducers({
  serverState,
  activePlayer,
  currentBid
});
