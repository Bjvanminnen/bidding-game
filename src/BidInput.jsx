import React from 'react';

export default class extends React.Component {
  static propTypes = {
    max: React.PropTypes.number.isRequired,
    locked: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  };

  handleSubmit() {
    const value = this.refs.input.getDOMNode().value;
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      return;
    }
    this.props.onSubmit(num);
  }

  render() {
    const styles = {
      input: {
        width: 40
      }
    };

    // TODO - will need something to reset value to 0

    return (
      <div>
        <input
          ref="input"
          style={styles.input}
          type="number"
          min={0}
          max={this.props.max}
          disabled={this.props.locked}/>
        <button
          disabled={this.props.locked}
          onClick={this.handleSubmit.bind(this)}>
          OK
        </button>
      </div>
    );
  }
}
