
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Scrollbar,
  Pagination,
  Autoplay,
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';
import { useState } from 'react';

interface Props {
    onChangeFilterMode: Function
}

const FilterTags = (props: Props) => {

    const [active, setActive] = useState<string>();
    const _onChangeFilterMode = props.onChangeFilterMode;

    SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);

    const _handleFilterModeChange = (_selectedMode: string) => {
        setActive(_selectedMode);
        _onChangeFilterMode(_selectedMode);
    }

    console.log(active)

    return (

        <div className='mostTags'>
            <div className='mostDropdown'>
                <span>Most Followers <b></b></span>
                    <ul>
                        <li>
                            <a href="">Top</a>
                        </li>
                        <li>
                            <a href="">New</a>
                        </li><li>
                            <a href="">Oldest</a>
                        </li>
                    </ul>
                </div>
                <div className='tagsSlider'>
                <ul>
                    <Swiper
                        slidesPerView="auto"
                        // loopedSlides={1}
                        navigation
                        loop
                        autoplay={{ delay: 7000 }}
                        className='feedSwiper'
                        slideToClickedSlide
                    >
                        <SwiperSlide><li className={active === '2d_artist' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('2d_artist')}>2D Artist</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'all' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('all')}>All</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'painter' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('painter')}>Painter</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'photographer' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('photographer')}>Photographer</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'sketcher' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('sketcher')}>Sketcher</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'digital_artist' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('digital_artist')}>Digital Artist</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === '3d_artist' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('3d_artist')}>3D Artist</a></li></SwiperSlide>
                        <SwiperSlide><li className={active === 'coming_soon' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('coming_soon')}>Coming Soon</a></li></SwiperSlide>
                        {/* <SwiperSlide><li><a onClick={() => _handleFilterModeChange('2d_artist')}>2D Artist</a></li></SwiperSlide> */}
                        <SwiperSlide><li className={active === 'gaming' ? 'tagsActive' : ''}><a onClick={() => _handleFilterModeChange('gaming')}>Gaming</a></li></SwiperSlide> 
                        {/* <SwiperSlide><li><a onClick={() => _handleFilterModeChange('painter')}>Painter</a></li></SwiperSlide>
                        <SwiperSlide> <li><a onClick={() => _handleFilterModeChange('photographer')}>Photographer</a></li></SwiperSlide>
                        <SwiperSlide><li><a onClick={() => _handleFilterModeChange('sketcher')}>Sketcher</a></li></SwiperSlide>
                        <SwiperSlide><li><a onClick={() => _handleFilterModeChange('digital_artist')}>Digital Artist</a></li></SwiperSlide>
                        <SwiperSlide><li><a onClick={() => _handleFilterModeChange('3d_artist')}>3D Artist</a></li></SwiperSlide>
                        <SwiperSlide><li><a onClick={() => _handleFilterModeChange('coming_soon')}>Coming Soon</a></li></SwiperSlide>
                        <SwiperSlide><li><a onClick={() => _handleFilterModeChange('gaming')}>Gaming</a></li></SwiperSlide> */}
                    </Swiper>
                </ul>
            </div>
        </div>
    )
}

export default FilterTags