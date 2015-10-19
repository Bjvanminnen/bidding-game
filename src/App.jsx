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
    submitBid: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <table>
        <tr>
          <td><Balance balance={100}/></td>
          <td><BidInput max={100} locked={false}/></td>
          <td><TieBreaker toggle={false}/></td>
          <td><StatusLine length={this.props.item.max - this.props.item.min} location={this.props.item.current}/></td>
          <td><TieBreaker toggle={true}/></td>
          <td><BidInput max={80} locked={true}/></td>
          <td><Balance balance={80}/></td>
        </tr>
      </table>
    );
  }
};

export default connect(state => {
  return {
    item: state.item
  };
}, dispatch => bindActionCreators({ submitBid }, dispatch))(App);
