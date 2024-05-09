import React, { useEffect, useState } from 'react';
import Map from 'components/Map';
import SideBar from './SideBar';

const Main = () => {
  const [activeArea, setActiveArea] = useState('');

  // hover될때 activeArea가 변경되게
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
