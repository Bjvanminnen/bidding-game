import React from 'react';

export default class extends React.Component {
  static propTypes = {
    length: React.PropTypes.number.isRequired,
    location: React.PropTypes.number.isRequired
  };

  render() {
    const styles = {
      td: {
        border: '1px solid black',
        color: 'lightgray',
        padding: 5
      },
      activeTd: {
        color: 'black'
      }
    };

    let cols = [];
    for (let i = 0; i < this.props.length; i++) {
      const style = {
        ...styles.td,
        ...(i === this.props.location ? styles.activeTd : null)
      };
      cols.push(<td key={i} style={style}>{i}</td>);
    }

    return (
      <table>
        <tr>
          <td>P1</td>
          <td>
            {cols}
          </td>
          <td>P2</td>
        </tr>
      </table>
    );
  }
}
