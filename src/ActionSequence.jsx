import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// TODO - file is misnamed if we're using duck modules
import { submitBid } from './redux/reducer';

class ActionSequence extends React.Component {
  handleClick() {
    const { submitBid } = this.props;

    submitBid(0, 1);
    submitBid(1, 2);

    submitBid(0, 1);
    submitBid(1, 2);

    submitBid(0, 1);
    submitBid(1, 2);
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
