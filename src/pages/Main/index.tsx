import React, { useEffect, useState } from 'react';
import Map from 'components/Map';

declare global {
  interface Window {
    kakao: any;
  }
}

const Main = () => {
  return (
    <>
      <Map />
    </>
  );
};

export default Main;
