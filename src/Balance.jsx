import React from 'react';

export default class extends React.Component {
  static propTypes = {
    balance: React.PropTypes.number.isRequired
  };

  render() {
    const styles = {
    };

    return (
      <div>$ {this.props.balance}</div>
    );
  }
}
