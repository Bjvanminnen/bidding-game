export const SERVER_UPDATE = 'bidding-game/server/SERVER_UPDATE';
export const RESOLVE_BIDS = 'bidding-game/server/RESOLVE_BIDS';

// TODO - should this really be a client side "receive server update"?
export function serverUpdate(state) {
  // TODO - perhaps we strip private info here?
  return {
    type: SERVER_UPDATE,
    state
  };
}

export function resolveBids(rootState) {
  return {
    type: RESOLVE_BIDS,
    rootState
  };
}
