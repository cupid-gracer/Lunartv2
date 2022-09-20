import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, {
  Navigation,
  Scrollbar,
  Pagination,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';
const NftPromotedSection = (props: any) => {
  const [sidebarActive, setSidebar] = useState(false);
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  // const handleClick = (array: any) => {
  //   props.history.push({
  //     pathname: '/nftExplore',
  //     state: { category: array }
  //   })
  // }

  return (
    <>
      <div className='launchpadArtists'>
        <div className='wrapper'>
          <div className='launchpadArtistsInner'>
            <h2><b>Featured</b>
            Launchpad <span>Artists</span> <img src='/lunartImages/star.png' alt=""/><a href="/artist">View All</a></h2>
              <div className='launchpadArtistsSlider'>
              <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        loopedSlides={1}
        navigation
        loop
        autoplay={{ delay: 7000 }}
        className='feedSwiper'
        slideToClickedSlide
                    >
                       <SwiperSlide>
                  <a href="/aszoo">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/aszoo/profile.png' alt=""/></span>
                      <label>Aszoo<b>Fractal Artist (Digital) </b></label>
                    </div>
                    <div className='artistPainting'>
                    {/* <div className='artistPainting NoPaintings'> */}
                    <span><img src='/lunartImages/aszoo/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/aszoo/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/aszoo/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/aszoo/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/christopher-paul-toth">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/christopher/profile.png' alt=""/></span>
                      <label>Christopher Paul Toth<b>Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    {/* <div className='artistPainting NoPaintings'> */}
                    <span><img src='/lunartImages/christopher/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/christopher/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/christopher/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/christopher/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
              <SwiperSlide>
                <a href="/dreamy-pixel">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/dreamy/profile.jpg' alt=""/></span>
                      <label>Dreamy Pixel<b>Photographer (Landscape) </b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/dreamy/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/dreamy/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/dreamy/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/dreamy/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div></a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/jc">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/aszoo/profile.png' alt=""/></span>
                      <label>J.C<b>Fractal Artist (Digital) </b></label>
                    </div>
                    <div className='artistPainting'>
                    {/* <div className='artistPainting NoPaintings'> */}
                    <span><img src='/lunartImages/jc/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/jc/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/jc/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/jc/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/mark-spaeth">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/mark/profile.jpg' alt=""/></span>
                      <label>Mark Spaeth<b>Aquascaper (Photography) </b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/mark/p1.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/mark/p2.jpg' alt=""/></li>
                    <li><img src='/lunartImages/mark/p3.jpg' alt=""/></li>
                    <li><img src='/lunartImages/mark/p4.jpg' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/michelle-hanson">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/michelle/profile.jpg' alt=""/></span>
                      <label>Michelle Hanson<b>Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/michelle/p1.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/michelle/p2.jpg' alt=""/></li>
                    <li><img src='/lunartImages/michelle/p3.jpg' alt=""/></li>
                    <li><img src='/lunartImages/michelle/p4.jpg' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/nameo">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/nameo/profile.png' alt=""/></span>
                      <label>Nameo Ceo<b>Fractal Artist (Digital)</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/nameo/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/nameo/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/nameo/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/nameo/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/spoko">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/spoko/profile.png' alt=""/></span>
                      <label>Spoko<b>Fractal Artist (Digital)</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/spoko/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/spoko/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/spoko/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/spoko/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/nico-mares">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/nico/profile.png' alt=""/></span>
                      <label>Nico Mares<b>Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/nico/p1.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/nico/p2.jpg' alt=""/></li>
                    <li><img src='/lunartImages/nico/p3.jpg' alt=""/></li>
                    <li><img src='/lunartImages/nico/p4.jpg' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/tommy-balogh">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/tommy/profile.jpg' alt=""/></span>
                      <label>Tommy Balogh<b>Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/tommy/p1.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/tommy/p2.jpg' alt=""/></li>
                    <li><img src='/lunartImages/tommy/p3.jpg' alt=""/></li>
                    <li><img src='/lunartImages/tommy/p4.jpg' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/yudha-scholes">
                  <div className='launchpadArtistsSliderInner'>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/yudha/profile.png' alt=""/></span>
                      <label>Yudha Scholes<b>Painter (Landscape, Laser Etching)</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/yudha/p1.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/yudha/p2.jpg' alt=""/></li>
                    <li><img src='/lunartImages/yudha/p3.jpg' alt=""/></li>
                    <li><img src='/lunartImages/yudha/p4.jpg' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li className='cmsoon'><img src='/lunartImages/user.png'/> <b>-- <b>Followers</b></b></li>
                    <li className='cmsoon'><img src='/lunartImages/fvrt.png'/> <b>-- <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  </Swiper>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftPromotedSection;
