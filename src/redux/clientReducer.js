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

// TODO - i think we should just store the current player's bid on the client
// will be less confusing
function currentBid(state = NO_BID, action) {
  if (action.type === SUBMIT_BID) {
    const { bid } = action;
    return bid;
  }
  if (action.type === SERVER_UPDATE) {
    const { bidThisRound } = action.state;
    if (!bidThisRound[0] && !bidThisRound[0]) {
      // nobody has bid yet. reset our local bid
      return NO_BID;
    }    
  }

  return state;
}

export default combineReducers({
  serverState,
  activePlayer,
  currentBid
});
