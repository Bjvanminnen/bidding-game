import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatusLine from './StatusLine';
import Balance from './Balance';
import TieBreaker from './TieBreaker';
import BidInput from './BidInput';

// TODO - file is misnamed if we're using duck modules
import { submitBid } from './redux/reducer';

function checkmark(boolean) {
   return boolean ? '\u2714' : '\u2716'
}

class App extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    player1: React.PropTypes.object.isRequired,
    player2: React.PropTypes.object.isRequired,
    submitBid: React.PropTypes.func.isRequired,
    gameOver: React.PropTypes.bool.isRequired,
    currentBid: React.PropTypes.number.isRequired,
    playerIndex: React.PropTypes.number
  }

  handleSubmit(playerIndex, value) {
    this.props.submitBid(playerIndex, value);
  }

  render() {
    if (typeof(this.props.playerIndex) !== 'number') {
      return <div>Player choosing UI here</div>;
    }

    const { item, player1, player2, currentBid, playerIndex } = this.props;

    const me = playerIndex === 0 ? player1 : player2;
    const them = playerIndex === 1 ? player1 : player2;

    const ownsTie = playerIndex === 0 && item.p1TieBreaker;

    return (
      <table>
        <tr>
          <td colSpan="3">
            Player {this.props.playerIndex}
          </td>
        </tr>
        <tr>
          <td>
            <Balance balance={me.balance}/>
            <div>currentBid: $ {currentBid}</div>
          </td>
        </tr>
        <tr>
          <td>Owns tiebreaker: {checkmark(ownsTie)}</td>
        </tr>
        <tr>
          <td>Opponent bid: {checkmark(them.currentBid !== null)}</td>
        </tr>
        <tr>
          <td>
            <BidInput
              max={me.balance}
              currentBid={currentBid}
              onSubmit={this.handleSubmit.bind(this, playerIndex)}/>
          </td>
        </tr>
        <tr>
          <td><StatusLine length={item.max - item.min + 1} location={item.current}/></td>
        </tr>
        {this.renderGameOver()}
      </table>
    );
  }

  renderGameOver() {
    const { item, gameOver} = this.props
    if (!gameOver) {
      return;
    }

    const winningPlayer = item.current === item.min ? 'player1' : 'player2';
    return <tr><td colSpan="3">GAME OVER: {winningPlayer} wins</td></tr>;
  }
};

function selector(state) {
  return {
    item: state.item,
    player1: state.players[0],
    player2: state.players[1],
    gameOver: state.gameOver,
    currentBid: state.private ? state.private.currentBid : null,
    playerIndex: state.activePlayer
  };
}

function actions(dispatch) {
  return bindActionCreators({ submitBid }, dispatch);
}

export default connect(selector, actions)(App);
