/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Save.module.scss';
import { SaveLo, Share } from 'assets';
import Button from 'components/common/Button';
import RadarChart from './RaderChart';
import { getLoginToken } from 'hooks/SignInHooks';

const Save = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const userAreas = location.state?.userAreas || [];
  const [selectedArea, setSelectedArea] = useState(userAreas[0] || null);

  useEffect(() => {
    if (!getLoginToken()) {
      navigator('/signin');
    }
  }, [navigator]);
  const handleSearch = () => {
    navigator('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>관심 동네</div>
      <div className={styles.container}>
        {userAreas.map(
          (
            area: {
              area:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              areaBoardScoreResponseList: any;
            },
            index: React.Key | null | undefined,
          ) => (
            <div
              key={index}
              className={styles.wrapper}
              onClick={() => setSelectedArea(area)}
            >
              <div className={styles.head}>
                <div className={styles.area}>{area.area}</div>
                <SaveLo />
              </div>
              <div className={styles.chartWrapper}>
                <RadarChart areaData={area.areaBoardScoreResponseList} />
              </div>
              <div className={styles.btnWrapper}>
                <Share />
                <Button
                  width={212}
                  buttonType={'fill'}
                  fontType={'B1'}
                  text={'둘러보기'}
                  onClick={handleSearch}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Save;
