export const ACTIVATE_PLAYER = 'bidding-game/client/ACTIVATE_PLAYER';
export const SUBMIT_BID = 'bidding-game/client/SUBMIT_BID';

export function submitBid(playerId, bid) {
  return {
    type: SUBMIT_BID,
    playerId,
    bid
  }
}

export function activatePlayer(playerIndex) {
  return {
    type: ACTIVATE_PLAYER,
    playerIndex
  };
}
