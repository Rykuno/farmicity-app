import React from 'react';
import populateStoreWithMods from '../../parsers/mods';

class Mods extends React.Component {
  componentDidMount = () => {
    populateStoreWithMods();
  };

  render() {
    return (
      <div>
        <h1>Mods</h1>
      </div>
    );
  }
}

export default Mods;
