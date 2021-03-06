import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatusLine from './StatusLine';
import Balance from './Balance';
import TieBreaker from './TieBreaker';
import BidInput from './BidInput';

import { submitBid } from './redux/clientActions';
import { NO_BID } from './redux/constants';

function checkmark(boolean) {
   return boolean ? '\u2714' : '\u2716'
}

class App extends React.Component {
  static propTypes = {
    // TODO - used propTypes
    // item: React.PropTypes.object.isRequired,
    // player1: React.PropTypes.object.isRequired,
    // player2: React.PropTypes.object.isRequired,
    // submitBid: React.PropTypes.func.isRequired,
    // gameOver: React.PropTypes.bool.isRequired,
    // currentBid: React.PropTypes.number.isRequired,
    // playerIndex: React.PropTypes.number
  }

  handleSubmit(playerIndex, value) {
    this.props.submitBid(playerIndex, value);
  }

  render() {
    const { storeId, playerIndex, ownsTie, currentBid, opponentHasBid, balance,
      lineLength, itemPosition, round } = this.props

    if (typeof(playerIndex) !== 'number') {
      return <div>Player choosing UI here</div>;
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>Store {storeId}</td>
          </tr>
          <tr>
            <td colSpan="3">
              Player {playerIndex + 1}
            </td>
          </tr>
          <tr>
            <td>
              <Balance balance={balance}/>
              <div>currentBid: $ {currentBid}</div>
            </td>
          </tr>
          <tr>
            <td>Owns tiebreaker: {checkmark(ownsTie)}</td>
          </tr>
          <tr>
            <td>Opponent bid: {checkmark(opponentHasBid)}</td>
          </tr>
          <tr>
            <td>
              <BidInput
                max={balance}
                round={round}
                currentBid={currentBid}
                onSubmit={this.handleSubmit.bind(this, playerIndex)}/>
            </td>
          </tr>
          <tr>
            <td><StatusLine length={lineLength} location={itemPosition}/></td>
          </tr>
          {this.renderGameOver()}
        </tbody>
      </table>
    );
  }

  renderGameOver() {
    const { winningPlayer } = this.props;
    if (!this.winningPlayer) {
      return;
    }

    return <tr><td colSpan="3">GAME OVER: {winningPlayer} wins</td></tr>;
  }
};

function selector(state) {
  const { activePlayer, currentBid } = state;
  const server = state.serverState;
  if (!server) {
    return {};
  }

  // TODO - good solution for server sending down filtered state. ie. we shouldnt
  // really be looking at state.serverOnly at all

  const otherPlayer = (activePlayer + 1) % 2;
  return {
    storeId: server.storeId,
    playerIndex: activePlayer,
    ownsTie: server.tieBreaker[activePlayer],
    currentBid: currentBid === NO_BID ? server.currentBid : currentBid,
    opponentHasBid: server.bidThisRound[otherPlayer],
    balance: server.balance[activePlayer],
    lineLength: server.item.max - server.item.min + 1,
    itemPosition: server.item.current,
    round: server.round,
    // TODO - where should logic live?
    winningPlayer: null
  };
}

function actions(dispatch) {
  return bindActionCreators({ submitBid }, dispatch);
}

export default connect(selector, actions)(App);
