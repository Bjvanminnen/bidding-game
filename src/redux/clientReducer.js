import { SUBMIT_BID } from './reducer';

export const RECEIVE_STATE = 'bidding-game/RECEIVE_STATE';
export const ACTIVATE_PLAYER = 'bidding-game/ACTIVATE_PLAYER';

const NO_BID = null;

export function receiveState(state) {
  return {
    type: RECEIVE_STATE,
    state
  };
}

export function activatePlayer(playerIndex) {
  return {
    type: ACTIVATE_PLAYER,
    playerIndex
  };
}

// TODO - can i get rid of initial state here? if not, should share at least
const initialPlayerState = {
  balance: 100,
  currentBid: NO_BID
};

const initialState = {
  item: {
    min: 0,
    max: 6,
    current: 3,
    p1TieBreaker: true
  },
  players: [0, 1].map(() => initialPlayerState),
  gameOver: false
};

const clientInitialState = {
  ...initialState,
  private: {
    lastBid: 0
  },
  activePlayer: null
};

function throwIfNoActivePlayer(state) {
  if (state.activePlayer === null) {
    throw new Error('Need active player');
  }
}

// TODO - eventually i think the client responds to SUBMIT_BID to update some
// of their private data
export function reducer(state = clientInitialState, action) {
  if (action.type === ACTIVATE_PLAYER) {
    if (state.activePlayer !== null) {
      throw new Error('Already have an active player');
    }
    return {
      ...state,
      activePlayer: action.playerIndex
    };
  }

  if (action.type === RECEIVE_STATE) {
    throwIfNoActivePlayer(state);
    return {
      ...state,
      ...action.state
    };
  }
  if (action.type === SUBMIT_BID) {
    throwIfNoActivePlayer(state);
    return {
      ...state,
      private: {
        lastBid: action.bid
      }
    };
  }

  return state;
}
