import React, { useEffect, useState } from 'react';
import Map from 'components/Map';
import SideBar from './SideBar';

const Main = () => {
  const [activeArea, setActiveArea] = useState('');

  useEffect(() => {
    console.log(`active area: ${activeArea}`);
  }, [activeArea]);

  return (
    <>
      <SideBar onSelectArea={setActiveArea} />
      <Map activeArea={activeArea} />
    </>
  );
};

export default Main;
