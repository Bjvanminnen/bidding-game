const NO_BID = null;

/**
 * Given current state and action, calculate what each player is bidding this
 * turn.
 * @returns {(number|null)[]}
 */
export function getCurrentBids(fullState, action) {
  const { playerId, bid } = action;

  return fullState.players.map((_, id) =>  {
    const newBid = playerId === id ? bid : NO_BID;
    const currentBid = fullState.players[id].currentBid;
    if (newBid !== NO_BID && currentBid !== NO_BID) {
      throw new Error(`Player(${id}) already has a current bid`);
    }

    if (newBid !== NO_BID && newBid > fullState.players[id].balance) {
      throw new Error('bid too high');
    }

    return currentBid === NO_BID ? newBid : currentBid;
  });
}

/**
 * Given a pair of bids, and the tie breaker, calculates the delta in item
 * position and new tie breaker
 */
export function resolveBids(bid1, bid2, p1TieBreaker) {
  if (bid1 === NO_BID || bid2 === NO_BID) {
    return { delta: 0, p1TieBreaker };
  }

  let delta;
  let tied = false;
  if (bid1 > bid2) {
    delta = -1;
  } else if (bid1 < bid2) {
    delta = 1;
  } else {
    tied = true;
    delta = p1TieBreaker ? -1 : 1;
  }

  return {
    delta,
    p1TieBreaker: tied ? !p1TieBreaker : p1TieBreaker
  };
}
