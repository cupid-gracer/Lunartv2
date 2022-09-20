import { useEffect } from 'react';
import { useState } from 'react';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
const AlmondDetail = (props: any) => {
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
  const [creations, setCreations] = useState(true);
  const [creationsOne, setCreationOne] = useState(false);
  const [myStyleRL, setmyStyleRL] = useState({display: "block"});
  const [myStyleAG, setmyStyleAG] = useState({display: "none"});
  const [data, setData] = useState([
    {
      name: "Pink Evening Sunset",
      collection: "Digital Art",
      url: "/lunartImages/imgSet.png",
      price: "--",
      likes: "--",
      superLikes: "--",
      endTime: Math.floor(Date.now() / 1000) + 5000 //s
    },
    {
      name: "Pink Evening Sunset",
      collection: "Digital Art",
      url: "/lunartImages/imgSet.png",
      price: "--",
      likes: "--",
      superLikes: "--",
      endTime: Math.floor(Date.now() / 1000) + 5000 //s
    },
    {
      name: "Pink Evening Sunset",
      collection: "Digital Art",
      url: "/lunartImages/imgSet.png",
      price: "--",
      likes: "--",
      superLikes: "--",
      endTime: Math.floor(Date.now() / 1000) + 5000 //s
    },
    {
      name: "Pink Evening Sunset",
      collection: "Digital Art",
      url: "/lunartImages/imgSet.png",
      price: "--",
      likes: "--",
      superLikes: "--",
      endTime: Math.floor(Date.now() / 1000) + 5000 //s
    },
    {
      name: "Pink Evening Sunset",
      collection: "Digital Art",
      url: "/lunartImages/imgSet.png",
      price: "--",
      likes: "--",
      superLikes: "--",
      endTime: Math.floor(Date.now() / 1000) + 5000 //s
    },
  ])
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000))

  useEffect(() => {
    const _timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(_timer)
  }, [])

  function topCreations(x:any){
    
    if(x == 1){
     
      setCreations(true);
      setCreationOne(false);
      setmyStyleRL({display: "block"});
      setmyStyleAG({display: "none"});
      
    } else{
     
      setCreations(false);
      setCreationOne(true);
      setmyStyleRL({display: "none"});
      setmyStyleAG({display: "block"});
    } 
   
  }

  const calculateRemainTime = (endTime: number) => {
    const diff = endTime - currentTime;
    const hour = Math.floor(diff / (60 * 60));
    const minute = Math.floor((diff / (60))) % 60;
    const second = diff % 60;
    return `${hour}:${minute}:${second}`
  }

  return (
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className='topCreationDetails artDetailset'>
        <div className='wrapper'>
          <div className='headerBack'>
            <a href="/collections">Back</a>
          </div>
          <div className='topCreationDetailsHub baseline'>
            <div className='topCreationLeft'>
              <div className='topCreationLeftNames'>
                <h6>Preview of the Julia Collection</h6>
              </div>
              <div className='topCreationLeftFollowers'>
                <ul>
                  <li>
                    <span className='artImage'><img src='/lunartImages/collections/Collection - The Almond Breads/Aszoo/profile.png' alt="images"/></span>
                    <h6>Coming Soon<p>Aszoo</p></h6>
                  </li>
                  <li>
                    <span className='artImage'><img src='/lunartImages/collections/Collection - The Almond Breads/J.C/profile.jpg' alt="images"/></span>
                    <h6>Painter<p>J.C</p></h6>
                  </li>
                  <li className='moreSet'>
                    2+ More
                  </li>
                </ul>
                <div className='topFollowersCreation'>
                  <ul>
                    <li>
                      <button className='activeTopResult'><img src='/lunartImages/NotLiked.svg'/><img src='/lunartImages/Liked.svg'/></button>
                      <h6>Likes<p>--</p></h6>
                    </li>
                    <li>
                      <button><img src='/lunartImages/NotSuperliked.svg'/><img src='/lunartImages/SuperLiked.svg'/></button>
                      <h6>Super-Likes<p>--</p></h6>
                    </li>
                    <li>
                      <span><img src='/lunartImages/ItemsCollection.svg'/></span>
                      <h6>Items<p>--</p></h6>
                    </li>
                  </ul>
                </div>
                <p>The Julia Collection will be the second NFT release from the LunArt team. Taking things up another level these are going to be among the first of their kind, liquidity bonded NFT's for the ARTS/UST pair.</p>
              </div>
            </div>
            <div className='topCreationRight'>
              <span className="topCreationRightSpan"><img src="/lunartImages/collections/Collection - The Almond Breads/inner/p1.png" alt=""/></span>
              <ul><li><img src="/lunartImages/collections/Collection - The Almond Breads/inner/p2.png" alt=""/></li><li><img src="/lunartImages/collections/Collection - The Almond Breads/inner/p3.png" alt=""/></li><li><img src="/lunartImages/collections/Collection - The Almond Breads/inner/p4.png" alt=""/></li></ul>
            </div>
          </div>
        </div>
      </div>
      <div className='launchpadArtistsInner artDetailset'>
        <div className='wrapper'>
          <h2><b>Items in </b>
          <span>Collection</span> <section><button className='active'>All</button><button><label><img src='/lunartImages/topartist1.png' alt="images"/></label> Venom Jones</button><button><label><img src='/lunartImages/topartist.png' alt="images"/></label> David Russel</button></section></h2>
          <div className='tagsProducts'>
            <ul className='gallerySet'>
            {data.map((each, index) => (
              <li key={`gallery-${index}`}>
                <a href="">
                  <div className='tagsProductsHeader'>
                    <h5>{each.name}<b>{each.collection}</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> {each.price}</span>
                  </div>
                  <div className='tagsImage'>
                    <img src={each.url} alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> {each.likes} <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> {each.superLikes} <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> {calculateRemainTime(each.endTime)}</li>
                    </ul>
                  </div>
                </a>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
      <NftFooter />
    </div>
  );
};

export default AlmondDetail;
