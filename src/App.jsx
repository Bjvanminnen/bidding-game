import React from 'react';
import StatusLine from './StatusLine';
import Balance from './Balance';
import TieBreaker from './TieBreaker';
import BidInput from './BidInput';

export class App extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <td><Balance balance={100}/></td>
          <td><BidInput max={100} locked={false}/></td>
          <td><TieBreaker toggle={false}/></td>
          <td><StatusLine length={7} location={3}/></td>
          <td><TieBreaker toggle={true}/></td>
          <td><BidInput max={80} locked={true}/></td>
          <td><Balance balance={80}/></td>
        </tr>
      </table>
    );
  }
}
