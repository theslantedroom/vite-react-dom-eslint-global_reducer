import React from 'react';
import { useGlobalContext } from '../contexts/global/GlobalContext.jsx';
import { DisplayData } from '../components/cards/DisplayData/DisplayData.jsx';
import { FightTwo } from '../components/cards/DisplayData/FightTwo.jsx';
//style
import { globalStyles } from '../theme/globalStyles';
function Home() {
  const { cat, dog } = useGlobalContext();

  return (
    <div style={globalStyles.container}>
      <h1>HOME</h1>

      <div style={globalStyles.flexRowSA}>
        <DisplayData object={cat} />
        <DisplayData object={dog} />
      </div>
      <FightTwo objectA={cat} objectB={dog} />
    </div>
  );
}

export default Home;
