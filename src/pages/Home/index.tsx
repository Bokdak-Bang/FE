import CustomButton from 'components/common/Button';
import React from 'react';

const Home = () => {
  return (
    <>
      <div>Home</div>
      <CustomButton
        width={213}
        buttonType={'fill'}
        fontType={'H2'}
        text={'버튼내용'}
      />
      <CustomButton
        width={213}
        buttonType={'empty'}
        fontType={'B1'}
        text={'버튼내용'}
      />
      <CustomButton
        width={213}
        buttonType={'empty'}
        fontType={'C1'}
        text={'버튼내용'}
      />
    </>
  );
};

export default Home;
