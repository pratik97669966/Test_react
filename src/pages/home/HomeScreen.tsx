import React, { useState } from 'react';
import {
  AppBar, BottomNavigation, BottomNavigationAction,
  Card, CardContent, CardMedia, Container, IconButton, InputBase, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Chat as ChatIcon,
  Home as HomeIcon, Notifications as NotificationsIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';

import bhel from '../../assets/Icons/bhel.png';
import matanbhakri from '../../assets/Icons/matanbhakri.png';
import productImage from '../../assets/Icons/misal.png'; // Your product image
import bannerImage from '../../assets/Icons/offer1.jpg'; // Your banner image
import painting from '../../assets/Icons/painting.png';
import vegbiryani from '../../assets/Icons/vegbiryani.png';
import useStyles from './HomeStyles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define interfaces
interface Category {
  name: string;
  icon: string;
}
interface Banner {
  bannerImage: string;
}
interface Product {
  name: string;
  price: string;
  image: string;
  minDescription: string;
}

interface Section {
  type: 'banner' | 'category' | 'recommendation' | 'singleBanner';
  title?: string; // Only for recommendation type
  data: Category[] | Product[] | Banner[]; // Can be either categories or products
}

const HomeScreen: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const sections: Section[] =
    [

      {
        type: 'singleBanner',
        data: [
          { bannerImage: "https://i.postimg.cc/4y9bMqrS/Whats-App-Image-2024-10-17-at-08-05-32-a82413e6.jpg" },
        ],
      },
      {
        type: 'category',
        data: [
          { name: 'व्हेज बिर्याणी', icon: vegbiryani },
          { name: 'नॉनव्हेज', icon: matanbhakri },
          { name: 'भेळ', icon: bhel },
        ],
      },
      {
        type: 'recommendation',
        title: 'गुंजाळ पाटील स्पेशल मेनू',
        data: [
          { name: 'स्पेशल मिसळ', price: '₹.७०/- फक्त', image: productImage, minDescription: 'अस्सल संगमनेरी मिसळ चव अशी हवी हवीशी वाटणारी.' },
          { name: 'मटन भाकरी', price: '₹.१९९/- फक्त', image: productImage, minDescription: 'अस्सल हैद्राबादी स्टाईल बिर्याणी शुद्धशाकाहारी.' },
        ],
      },
      {
        type: 'recommendation',
        title: 'व्हेज चटका',
        data: [
          { name: 'व्हेज बिर्याणी', price: '₹.१५०/- फक्त', image: vegbiryani, minDescription: 'अस्सल हैद्राबादी स्टाईल बिर्याणी शुद्धशाकाहारी.' },
          { name: 'भेळ', price: '₹.५०/- फक्त', image: bhel, minDescription: 'अस्सल पुणेरी भेळ चव अशी हवी हवीशी वाटणारी.' },
        ],
      },
      {
        type: 'recommendation',
        title: 'नॉनव्हेज झटका',
        data: [
          { name: 'चिकन दम बिर्याणी', price: '₹.१५०/- फक्त', image: vegbiryani, minDescription: 'अस्सल हैद्राबादी स्टाईल बिर्याणी शुद्धशाकाहारी.' },
          { name: 'मटन भाकरी', price: '₹.१९९/- फक्त', image: productImage, minDescription: 'अस्सल हैद्राबादी स्टाईल बिर्याणी शुद्धशाकाहारी.' },
        ],
      },
      {
        type: 'recommendation',
        title: 'स्पेशल भेळ मेनू',
        data: [
          { name: 'भेळ', price: '₹.५०/- फक्त', image: bhel, minDescription: 'अस्सल पुणेरी भेळ चव अशी हवी हवीशी वाटणारी.' },
          { name: 'ओली भेळ', price: '₹.६०/- फक्त', image: bhel, minDescription: 'अस्सल पुणेरी भेळ चव अशी हवी हवीशी वाटणारी.' },
          { name: 'मटकी भेळ', price: '₹.६०/- फक्त', image: bhel, minDescription: 'अस्सल पुणेरी भेळ चव अशी हवी हवीशी वाटणारी.' },
        ],
      },
      {
        type: 'singleBanner',
        data: [
          { bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7qByogr549XiTCh4IbzRTE2a8BpvxawbUg&s' },
        ],
      },
    ];

  const onCardClick = (index: number) => {
    // localStorage.setItem('combopack', String(index + 1));
    // history.push('/billing-page');
  };

  return (
    <div className={classes.centerScreen}>
      <div className={classes.container}>
        <div className={classes.scrollableContent}>
          <div>
            <img src={painting} alt="Logo" className={classes.logo} />
          </div>
          {sections.map((section, sectionIndex) => {
            if (section.type === 'singleBanner') {
              return (
                <div key={sectionIndex} >
                  {(section.data as { bannerImage: string }[]).map((item, index) => (
                    <img key={index} src={item.bannerImage} alt="Banner" className={classes.hoeizontalCard} />
                  ))}
                </div>
              );
            }
            if (section.type === 'banner') {
              return (
                <div key={sectionIndex} className={classes.banner}>
                  <Slider {...sliderSettings}>
                    {(section.data as { bannerImage: string }[]).map((item, index) => (
                      <img key={index} src={item.bannerImage} alt="Banner" className={classes.bannerImage} />
                    ))}
                  </Slider>
                </div>
              );
            }
            if (section.type === 'category') {
              return (
                <div key={sectionIndex} className={classes.categoryTabs}>
                  {(section.data as Category[]).map((category, index) => (
                    <div key={index} className={classes.categoryIcon}>
                      <img src={category.icon} alt={category.name} className={classes.circleCard} />
                      <Typography variant="h6" style={{ textAlign: 'center', fontStyle: 'bold', fontSize: '14px' }}>{category.name}</Typography>
                    </div>
                  ))}
                </div>
              );
            }
            if (section.type === 'recommendation') {
              return (
                <div key={sectionIndex}>
                  <Typography variant="h6">{section.title}</Typography>
                  <div style={{ display: 'flex', height: 'auto', overflowX: 'scroll' }}>
                    {(section.data as Product[]).map((product, index) => (
                      <Card key={index} className={classes.card} onClick={() => onCardClick(index)}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={product.image}
                          title={product.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" style={{ fontStyle: 'bold', }} component="h2">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {product.price}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {product.minDescription}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
