import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatusLine from './StatusLine';
import Balance from './Balance';
import TieBreaker from './TieBreaker';
import BidInput from './BidInput';

// TODO - file is misnamed if we're using duck modules
import { submitBid } from './redux/reducer';

class App extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    player1: React.PropTypes.object.isRequired,
    player2: React.PropTypes.object.isRequired,
    submitBid: React.PropTypes.func.isRequired,
    gameOver: React.PropTypes.bool.isRequired,
    lastBid: React.PropTypes.number.isRequired,
    playerIndex: React.PropTypes.number
  }

  handleSubmit(playerIndex, value) {
    this.props.submitBid(playerIndex, value);
  }

  render() {
    if (typeof(this.props.playerIndex) !== 'number') {
      return <div>Player choosing UI here</div>;
    }

    const { item, player1, player2, lastBid } = this.props;
    return (
      <table>
        <tr>
          <td colSpan="3">
            Player {this.props.playerIndex}
          </td>
        </tr>
        <tr>
          <td>
            <Balance balance={player1.balance}/>
            <div>-{lastBid}</div>
          </td>
          <td>
            <BidInput
              max={player1.balance}
              currentBid={player1.currentBid}
              onSubmit={this.handleSubmit.bind(this, 0)}/>
          </td>
          <td><TieBreaker toggle={item.p1TieBreaker}/></td>
          <td><StatusLine length={item.max - item.min + 1} location={item.current}/></td>
          <td><TieBreaker toggle={!item.p1TieBreaker}/></td>
          <td>
            <BidInput
              max={player2.balance}
              currentBid={player2.currentBid}
              onSubmit={this.handleSubmit.bind(this, 1)}/>
          </td>
          <td><Balance balance={player2.balance}/></td>
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
    lastBid: state.private ? state.private.lastBid : '',
    playerIndex: state.activePlayer
  };
}

function actions(dispatch) {
  return bindActionCreators({ submitBid }, dispatch);
}

export default connect(selector, actions)(App);
