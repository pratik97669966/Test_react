import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';

import baneer from '../../assets/Icons/baneer.png';
import painting from '../../assets/Icons/painting.png';
import { LOGIN } from '../../navigation/Constants';
import { Address } from '../../redux/dtos/Address';
import { getRecentUsedLocation, getSelfData, logoutUser } from '../../services/api/DoctorAPI';
import HomeSearchAppBar from './app_bar/HomeAppBar';
import LogoutDialog from './diloage/LogoutDiloag';
import useStyles from './HomeStyles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface RouteParams {
  doctorId: string;
}

const HomeScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<RouteParams>();
  const [logoutDiloageOpen, setLogoutDiloageOpen] = useState(false);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  if (params.doctorId !== ':doctorId') {
    localStorage.setItem('doctorId', params.doctorId);
  }

  useEffect(() => {

  }, [history]);

  const onLogout = () => {
    setLogoutDiloageOpen(true);
  };
  const onLogoutConfirm = () => {
    localStorage.clear();
    history.push(LOGIN);
  };

  const ononChangeLocation = () => {
    // history.push('/select-city');
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 3,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (current: any, next: React.SetStateAction<number>) => setActiveSlide(next),
  };

  const images = [
    baneer,
    baneer,
    baneer,
  ];

  const onCardClick = (index: number) => {
    if (index == 0) {
      localStorage.setItem('combopack', '1');
      history.push('/billing-page');
    } else if (index == 1) {
      localStorage.setItem('combopack', '2');
      history.push('/billing-page');
    } else {
      localStorage.setItem('combopack', '3');
      history.push('/billing-page');
    }
  };

  return (
    <div className={classes.centerScreen}>
      <div className={classes.container}>
        {/* <HomeSearchAppBar onChangeLocation={ononChangeLocation} onLogout={onLogout} address={address} /> */}
        <div className={classes.scrollableContent}>
          <div >
            <img src={painting} alt="Logo" className={classes.logo} />
          </div>
          <Slider {...sliderSettings} className={classes.slider}>
            {images.map((image, index) => (
              <div key={index} className={`${classes.slide} ${index === activeSlide ? classes.activeSlide : ''}`}>
                <div onClick={() => onCardClick(index)} style={{ marginRight: '40px' }}>
                  <img src={image} alt={`Slide ${index}`} className={classes.image} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <LogoutDialog
        open={logoutDiloageOpen}
        onClose={() => setLogoutDiloageOpen(false)}
        onConfirm={onLogoutConfirm}
      />
    </div>
  );
};

export default HomeScreen;
