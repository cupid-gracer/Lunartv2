import { useState } from 'react';
import { Link } from 'react-router-dom';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
import FilterTags from 'components/FilterTags';

const Artist = (props: any) => {

  const [sidebarActive, setSidebar] = useState(false);
  const [filter, setFilter] = useState<string>();
  const [mode, setMode] = useState<string>();

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

  const data = [
    {
      icon: '/lunartImages/dreamy/profile.jpg',
      artist: 'Christopher Paul Toth',
      link: '/christopher-paul-toth',
      status: 'Painter',
      main: '/lunartImages/christopher/p1.png',
      sub: [
        '/lunartImages/christopher/p2.png',
        '/lunartImages/christopher/p3.png',
        '/lunartImages/christopher/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/christopher/profile.png',
      artist: 'Dreamy Pixel',
      link: '/dreamy-pixel',
      status: 'Photographer (Landscape) ',
      main: '/lunartImages/dreamy/p1.png',
      sub: [
        '/lunartImages/dreamy/p2.png',
        '/lunartImages/dreamy/p3.png',
        '/lunartImages/dreamy/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/mark/profile.jpg',
      artist: 'Mark Spaeth',
      link: '/mark-spaeth',
      status: 'Aquatic Landscaper',
      main: '/lunartImages/mark/p1.jpg',
      sub: [
        '/lunartImages/mark/p2.jpg',
        '/lunartImages/mark/p3.jpg',
        '/lunartImages/mark/p4.jpg',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/michelle/profile.jpg',
      artist: 'Michelle Hanson',
      link: '/michelle-hanson',
      status: 'Painter',
      main: '/lunartImages/michelle/p1.jpg',
      sub: [
        '/lunartImages/michelle/p2.jpg',
        '/lunartImages/michelle/p3.jpg',
        '/lunartImages/michelle/p4.jpg',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/nico/profile.png',
      artist: 'Nico Mares',
      link: '/nico-mares',
      status: 'Painter',
      main: '/lunartImages/nico/p1.jpg',
      sub: [
        '/lunartImages/nico/p2.jpg',
        '/lunartImages/nico/p3.jpg',
        '/lunartImages/nico/p4.jpg',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/tommy/profile.jpg',
      artist: 'Tommy Balogh',
      link: '/tommy-balogh',
      status: 'Painter',
      main: '/lunartImages/tommy/p1.jpg',
      sub: [
        '/lunartImages/tommy/p2.jpg',
        '/lunartImages/tommy/p3.jpg',
        '/lunartImages/tommy/p4.jpg',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/yudha/profile.png',
      artist: 'Yudha Scholes',
      link: '/yudha-scholes',
      status: 'Painter (Landscape, Laser Etching)',
      main: '/lunartImages/yudha/p1.jpg',
      sub: [
        '/lunartImages/yudha/p2.jpg',
        '/lunartImages/yudha/p3.jpg',
        '/lunartImages/yudha/p4.jpg',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/spoko/profile.png',
      artist: 'Spoko',
      link: '/spoko',
      status: 'Fractal Artist (Digital)',
      main: '/lunartImages/spoko/p1.png',
      sub: [
        '/lunartImages/spoko/p2.png',
        '/lunartImages/spoko/p3.png',
        '/lunartImages/spoko/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/nameo/profile.png',
      artist: 'Nameo Ceo',
      link: '/nameo',
      status: 'Fractal Artist (Digital)',
      main: '/lunartImages/nameo/p1.png',
      sub: [
        '/lunartImages/nameo/p2.png',
        '/lunartImages/nameo/p3.png',
        '/lunartImages/nameo/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/jc/profile.png',
      artist: 'J.C',
      link: '/jc',
      status: 'Fractal Artist (Digital) ',
      main: '/lunartImages/jc/p1.png',
      sub: [
        '/lunartImages/jc/p2.png',
        '/lunartImages/jc/p3.png',
        '/lunartImages/jc/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
    {
      icon: '/lunartImages/aszoo/profile.png',
      artist: 'Aszoo',
      link: '/aszoo',
      status: 'Fractal Artist (Digital) ',
      main: '/lunartImages/aszoo/p1.png',
      sub: [
        '/lunartImages/aszoo/p2.png',
        '/lunartImages/aszoo/p3.png',
        '/lunartImages/aszoo/p4.png',
      ],
      followers: '--',
      likes: '--',
    },
  ]

  const filteredData = () => {

    console.log(mode)
    // clone data
    let _filteredData = data.map(each => each);
    if (filter) _filteredData = _filteredData.filter(each => each.artist.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    if (mode) {
      switch (mode) {
        case 'all':
          break;
        case '2d_artist':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('2d artist') !== -1);
          break;
        case 'painter':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('painter') !== -1);
          break;
        case 'photographer':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('photographer') !== -1);
          break;
        case 'sketcher':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('sketcher') !== -1);
          break;
        case 'digital_artist':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('digital artist') !== -1);
          break;
        case '3d_artist':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('3d artist') !== -1);
          break;
        case 'coming_soon':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('coming soon') !== -1);
          break;
        case 'gaming':
          _filteredData = _filteredData.filter(each => each.status.toLowerCase().indexOf('gaming') !== -1);
          break;
        default:
          break;
      }
    }
    return _filteredData;
  }

  const handleMode = (_mode: string) => {
    setMode(_mode);
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
              <input placeholder='Search Artist Name' type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </section>
            <FilterTags onChangeFilterMode={handleMode} />
          </div>
          <div className='launchpadArtists'>
        <div className='wrapper'>
          <div className='launchpadArtistsInner'>
              <div className='launchpadArtistsSlider'>
                {filteredData().map((each, index) => (
                  <div className='launchpadArtistsSliderInner' key={`artists-${index}`}>
                  <a href={each.link}>
                  <div className=''>
                    <div className='artistHeader'>
                      <span><img src={each.icon} alt=""/></span>
                      <label>{each.artist}<b>{each.status}</b></label>
                    </div>
                    <div className='artistPainting'>
                    {/* <div className='artistPainting NoPaintings'> */}
                    <span><img src={each.main} alt=""/></span>
                    <ul>
                    {each.sub.map((eachSub, indexSub) => (
                      <li><img src={eachSub} alt="" key={`artists-${index}-Sub-${indexSub}`} /></li>
                    ))}
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>{each.followers} <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>{each.likes} <b>Likes</b></b></li>
                    </ul>
                    </div>
                  </div>
                  </a>
                  </div>
                ))}
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

export default Artist;
