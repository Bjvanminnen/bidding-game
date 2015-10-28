import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  ACTIVATE_USER,
  SUBMIT_BID,
  SERVER_UPDATE,
  RESOLVE_BIDS,
  activateUser,
  submitBid,
  resolveBidsIfNecessary
} from './redux/serverReducer';

class ActionSequence extends React.Component {
  constructor() {
    super();
    this.state = {
      clicks: 0
    };
  }

  handleClick() {
    const { submitBid } = this.props;

    // TODO - could use generators?
    switch (this.state.clicks) {
    case 0:
      submitBid(0, 1);
      break;
    case 1:
      submitBid(1, 1);
      break;
    }

    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return (
      <div style={{paddingTop: 50}}>
        <button onClick={::this.handleClick}>DEBUG</button>
      </div>
    );
  }
}

function selector(state) {
  return {};
}

function actions(dispatch) {
  return bindActionCreators({ submitBid }, dispatch);
}

export default connect(selector, actions)(ActionSequence);
