import React from 'react';

const NO_BID = null; // TODO - share?

export default class extends React.Component {
  static propTypes = {
    max: React.PropTypes.number.isRequired,
    currentBid: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super();
    this.state = {
      value: '',
      round: props.round
    };
  }

  handleSubmit() {
    const value = this.refs.input.value;
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      return;
    }
    this.props.onSubmit(num);
  }

  componentWillReceiveProps(nextProps) {
    // TODO - i dont love this approach
    if (nextProps.currentBid === NO_BID && nextProps.round > this.state.round) {
      this.setState({ value: '', round: this.state.round});
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
