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
    submitBid: React.PropTypes.func.isRequired
  }

  handleSubmit(playerIndex, value) {
    this.props.submitBid(playerIndex, value);
  }

  render() {
    const { item, player1, player2 } = this.props;
    return (
      <table>
        <tr>
          <td><Balance balance={player1.balance}/></td>
          <td>
            <BidInput
              max={player1.balance}
              currentBid={player1.currentBid}
              onSubmit={this.handleSubmit.bind(this, 0)}/>
          </td>
          <td><TieBreaker toggle={item.p1TieBreaker}/></td>
          <td><StatusLine length={item.max - item.min} location={item.current}/></td>
          <td><TieBreaker toggle={!item.p1TieBreaker}/></td>
          <td>
            <BidInput
              max={player2.balance}
              currentBid={player2.currentBid}
              onSubmit={this.handleSubmit.bind(this, 1)}/>
          </td>
          <td><Balance balance={player2.balance}/></td>
        </tr>
      </table>
    );
  }
};

function selector(state) {
  return {
    item: state.item,
    player1: state.players[0],
    player2: state.players[1],
  };
}

function actions(dispatch) {
  return bindActionCreators({ submitBid }, dispatch);
}

export default connect(selector, actions)(App);
