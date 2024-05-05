import React, { useEffect, useState } from 'react';
import Map from 'components/Map';
import SideBar from './SideBar';

const Main = () => {
  return (
    <>
      <SideBar />
      <Map />
    </>
  );
};

export default Main;
