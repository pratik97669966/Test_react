import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';

import second_banner from '../../assets/Icons/ic_second_banner.png';
import first_banner from '../../assets/Icons/ic_top_banner.svg';
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
    const token = localStorage.getItem('token');
    // if (!token) {
    //   history.push(LOGIN);
    // } else
    localStorage.removeItem('selected-symptom');
    localStorage.removeItem('complaint-note');
    {
      getSelfData()
        .then((response) => {
          localStorage.setItem('selfData', JSON.stringify(response.data));
          getRecentUsedLocation(response.data.userId)
            .then((responseAddress) => {
              // if (!responseAddress.data) {
              //   history.push('/choose-address');
              // } else {
              setAddress(responseAddress.data);
              // }
            })
            .catch(error => {
              console.error('Error :', error);
            });
        })
        .catch(error => {
          console.error('Error :', error);
        });
    }
  }, [history]);

  const onLogout = () => {
    setLogoutDiloageOpen(true);
  };
  const onLogoutConfirm = () => {
    logoutUser(localStorage.getItem('token') + '')
      .then(response => {
        localStorage.clear();
        history.push(LOGIN);
      })
      .catch(error => {
      });
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
    'https://atys-images.s3.ap-south-1.amazonaws.com/Services-img/Doctor-Home-visit-S1-.png',
    'https://atys-images.s3.ap-south-1.amazonaws.com/Services-img/Lab-Test-s3-.png',
    'https://atys-images.s3.ap-south-1.amazonaws.com/Services-img/Medicine-Delivery-s2-.png',
  ];

  const onCardClick = (index: number) => {
    if (index == 0) {
      history.push('/choose-address');
    } else if (index == 1) {
      history.push('/lab-test');
    } else {
      history.push('/medicine-delivery');
    }
  };

  return (
    <div className={classes.centerScreen}>
      <div className={classes.container}>
        <HomeSearchAppBar onChangeLocation={ononChangeLocation} onLogout={onLogout} address={address} />
        <div className={classes.scrollableContent}>
          <div style={{ marginTop: '20px', marginRight: '10px', marginLeft: '10px' }}>
            <img src='https://atys-images.s3.ap-south-1.amazonaws.com/promtional-banners/Doctor+at+Home.png' alt="Logo" className={classes.logo} />
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
