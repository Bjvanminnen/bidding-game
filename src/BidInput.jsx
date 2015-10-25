import React from 'react';

const NO_BID = null; // TODO - share?

export default class extends React.Component {
  static propTypes = {
    activePlayer: React.PropTypes.bool.isRequired,
    max: React.PropTypes.number.isRequired,
    currentBid: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleSubmit() {
    const value = this.refs.input.getDOMNode().value;
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      return;
    }
    this.props.onSubmit(num);
  }

  componentWillReceiveProps(nextProps) {
    // TODO - i dont love this approach
    if (nextProps.currentBid === null) {
      this.setState({ value: '' });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const styles = {
      input: {
        width: 40
      }
    };

    const { currentBid, max } = this.props

    const haveBid = currentBid !== NO_BID;

    if (!this.props.activePlayer) {
      return <div>{haveBid ? "\u2705" : "?"}</div>;
    }

    return (
      <div>
        <input
          ref="input"
          style={styles.input}
          type="number"
          value={this.state.value}
          onChange={::this.handleChange}
          min={0}
          max={max}
          disabled={haveBid}/>
        <button
          disabled={haveBid}
          onClick={::this.handleSubmit}>
          OK
        </button>
      </div>
    );
  }
}
