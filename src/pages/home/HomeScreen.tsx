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
    'https://scontent.fpnq13-4.fna.fbcdn.net/v/t39.30808-6/312178340_492705012877051_843077765688750511_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4W4nc5rXmMAQ7kNvgEfJmMT&_nc_ht=scontent.fpnq13-4.fna&_nc_gid=AEivyAgP1xpPXzNvfvu5wut&oh=00_AYCYJCrdCxuShiv7XhNFj7cxsR5JA6_Re5ONAy16TVr6oQ&oe=66FA3CE0',
    'https://scontent.fpnq13-4.fna.fbcdn.net/v/t39.30808-6/312178340_492705012877051_843077765688750511_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4W4nc5rXmMAQ7kNvgEfJmMT&_nc_ht=scontent.fpnq13-4.fna&_nc_gid=AEivyAgP1xpPXzNvfvu5wut&oh=00_AYCYJCrdCxuShiv7XhNFj7cxsR5JA6_Re5ONAy16TVr6oQ&oe=66FA3CE0',
    'https://scontent.fpnq13-4.fna.fbcdn.net/v/t39.30808-6/312178340_492705012877051_843077765688750511_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4W4nc5rXmMAQ7kNvgEfJmMT&_nc_ht=scontent.fpnq13-4.fna&_nc_gid=AEivyAgP1xpPXzNvfvu5wut&oh=00_AYCYJCrdCxuShiv7XhNFj7cxsR5JA6_Re5ONAy16TVr6oQ&oe=66FA3CE0',
  ];

  const onCardClick = (index: number) => {
    if (index == 0) {
      history.push('/add-address');
    } else if (index == 1) {
      history.push('/add-address');
    } else {
      history.push('/add-address');
    }
  };

  return (
    <div className={classes.centerScreen}>
      <div className={classes.container}>
        <HomeSearchAppBar onChangeLocation={ononChangeLocation} onLogout={onLogout} address={address} />
        <div className={classes.scrollableContent}>
          <div >
            <img src='https://scontent.fpnq13-4.fna.fbcdn.net/v/t39.30808-6/438078949_854269576720591_3557140590076617471_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=SYIIhtw0ZrwQ7kNvgHuj4fI&_nc_ht=scontent.fpnq13-4.fna&_nc_gid=AeUBpuhKMFuQyS1gazYvwwg&oh=00_AYCkTH6xUBE-aIa1AKhSXNkGzXE9aygMELO0jMt8NAvQcw&oe=66FA6AE7' alt="Logo" className={classes.logo} />
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
