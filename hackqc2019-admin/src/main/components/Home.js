import React from 'react';
import OrgList from './Orgs/OrgList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <header>
          <OrgList />
        </header>
      </div>
    );
  }
}

export default Home;