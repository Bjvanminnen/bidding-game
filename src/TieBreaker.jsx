import React from 'react';

export default class extends React.Component {
  static propTypes = {
    toggle: React.PropTypes.bool.isRequired
  };

  render() {
    const styles = {
      active: {
        backgroundColor: 'black',
        width: 10,
        height: 10
      }
    };

    return (
      <div style={this.props.toggle ? styles.active : null}> </div>
    );
  }
}
