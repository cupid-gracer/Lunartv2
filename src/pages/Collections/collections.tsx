import { useState } from 'react';
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
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';

const Collections = (props: any) => {
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);

  const [sidebarActive, setSidebar] = useState(false);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  function handleSearch(e: any) {
    if (e.key === 'Enter' && e.target.value)
      props.history.push({
        pathname: '/nftExplore',
        state: { search: e.target.value },
      });
  }

  return (
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className='artistHub'>
          <div className='wrapper'>            
        <div className='artistInner'>
          <div className='artistInnerHeader'>
            <section>
              <img src='/lunartImages/search.png'/>
              <input placeholder='Search Collection' type="text"/>
            </section>
            <div className='mostTags'>
              <div className='mostDropdown'>
                <span>Newest <b></b></span>
                <ul><li><a href="">Top</a></li><li><a href="">New</a></li><li><a href="">Oldest</a></li></ul>
              </div>
              <div className='tagsSlider'>
                <ul>
                <Swiper
              slidesPerView="auto"
              loopedSlides={1}
              navigation
              loop
              autoplay={{ delay: 7000 }}
              className='feedSwiper'
              slideToClickedSlide
                          >
                   <SwiperSlide><li className='tagsActive'><a href="">All</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide> 
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide>
                  </Swiper>
                </ul>
              </div>
            </div>
          </div>
          <div className='launchpadArtists'>
        <div className='wrapper'>
          <div className='launchpadArtistsInner'>
              <div className='launchpadArtistsSlider'>
                 <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/julia-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collections/Collection - Preview of the Julia Collection/collection.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/collections/Collection - Preview of the Julia Collection/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/collections/Collection - Preview of the Julia Collection/c2.png' alt=""/><b>+10</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>Preview of the Julia Collection<b>Aszoo, J.C, Nameo Ceo, Spoko</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Julia Collection will be the second NFT release from the LunArt team. Taking things up another level these are going to be among the first of their kind, liquidity bonded NFT's for the ARTS/UST pair.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/almond-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collections/Collection - The Almond Breads/collection.jpg' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/collections/Collection - The Almond Breads/c1.jpg' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/collections/Collection - The Almond Breads/c2.jpg' alt=""/><b>+99</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>The Almond Breads<b>Aszoo, J.C, Nameo Ceo, Spoko</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>Hidden deep inside the mathematical intricacies of imaginary numbers are fractals of stunning beauty. The term itself as well as the first of these fractals were first discovered by Benoît Mandelbrot and our genesis collection, The Almond Breads, pushes the boundaries of what can be done with these numbers.</p>
                    </a>
                  </div>

                  
                </div>
          </div>
        </div>
      </div>
        </div>
        </div>
      </div>
        <NftFooter />
      </div>
  );
};

export default Collections;
