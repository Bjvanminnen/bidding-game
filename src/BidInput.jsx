import React from 'react';

export default class extends React.Component {
  static propTypes = {
    max: React.PropTypes.number.isRequired,
    locked: React.PropTypes.bool.isRequired
  };

  render() {
    const styles = {
      input: {
        width: 40
      }
    };

    // TODO - will need something to reset value to 0

    return (
      <div>
        <input style={styles.input} type="number" min={0} max={this.props.max} disabled={this.props.locked}/>
        <button disabled={this.props.locked}>OK</button>
      </div>
    );
  }
}
