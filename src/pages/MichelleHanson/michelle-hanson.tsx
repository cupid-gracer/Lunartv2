import { useEffect, useState } from 'react';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
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

const MichelleHanson = (props: any) => {
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
  const [sidebarActive, setSidebar] = useState(false);
  const [artLoading, setArtLoading] = useState(true)
  const designCounter = [1,2,3,4,5,6,7,8,9,10]
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
 
  const [activeSection, setActiveSection] = useState('artGallery');
  
  useEffect( () => {
    setTimeout(
      () => {
        setArtLoading(false)
      }, 3000
    )
  },[])


  return (
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className='topCreationDetails'>
        <div className='wrapper'>
          <div className='headerBack'><a href="/artist">Back</a></div>
          <div className='topCreationDetailsHub'>
            <div className='topCreationLeft'>
            <div className='topCreationLeftNames'>
              <span><img src='/lunartImages/michelle/profile.jpg'/></span>
              <h6>Michelle Hanson<p>Painter</p></h6>
            </div>
            <div className='topCreationLeftFollowers'>
              <ul>
                <li>
                  <span><img src='/lunartImages/Followers.svg'/></span>
                  <h6>Followers<p>-</p></h6>
                </li>
                <li>
                  <button className='activeTopResult'><img src='/lunartImages/NotLiked.svg'/><img src='/lunartImages/Liked.svg'/></button>
                  <h6>Likes<p>-</p></h6>
                </li>
                <li>
                  <button><img src='/lunartImages/NotSuperliked.svg'/><img src='/lunartImages/SuperLiked.svg'/></button>
                  <h6>Super-Likes<p>-</p></h6>
                </li>
              </ul>
              <p>I experience pure passion when I’m painting. My process is led by the creative inspiration I feel moment to moment, drawing me to put paint down and move it around to create the unexpected. In this sense, I never plan what I am going to paint - rather I surrender to the creative process to have its way with me. <br></br><br></br>My inspiration in life is drawn from mystery and the universe - I find the universe and the unknown utterly intriguing. For me, there is a beautiful experience to be had when I can tap into, and yield, to this mystery.<br></br><br></br>My artworks are large pieces created with energy and impact. They are textured, and each piece is literally hand crafted as I use only my hands to create. My medium is acrylic on canvas.<br></br><br></br>I am not formally trained as an artist - my process is intuitive, self-directed and therefore it feels original to me.<br></br><br></br>I had an inkling I was an artist from a young age, however had nothing to base this on. One day I followed the calling only to discover my natural love for painting and creating artworks.<br></br><br></br>I believe in the power of following inner inklings, even when they are based on nothing in reality! To create the new...</p>
            </div>
            <button><a href="mailto:contact@lunart.io?subject=Michelle Hanson"><img src="/lunartImages/commision.png" alt=""/>Commission Artist</a></button>
          </div>
          <div className='topCreationRight'>
            <span><img src="/lunartImages/michelle/p1.jpg" alt=""/></span>
            <ul><li><img src="/lunartImages/michelle/p2.jpg" alt=""/></li><li><img src="/lunartImages/michelle/p3.jpg" alt=""/></li><li><img src="/lunartImages/michelle/p4.jpg" alt=""/></li></ul>
          </div>
        </div>
      </div>
    </div>
    <div className='leaderBoard'>
      <div className='wrapper'>
        <div className='leaderBoardInner'>
          <div className='topCreations'>
            {/* <h6 onClick={() => setActiveSection('topCreations') } className={ activeSection == 'topCreations' ? 'topCreationsActive': ''} >Top Creations</h6>  */}
            <h5 onClick={() => setActiveSection('artGallery') } className={ activeSection == 'artGallery' ? 'topCreationsActive': ''}>Art Gallery <b>(11)</b></h5>
          </div>
          { 
          activeSection == 'topCreations' && 
            <div className='rankingLeaderboard'>
              <section><a className='rankActive' href="">Weekly</a><a href="">All Time</a><a href="">Moving Up</a><p>Last Updated: <b>7 Apr '22</b></p></section>
              <div className='leaderTable'>
                <table className='topCreationsSet'>
                  <tr>
                    <th>RANK</th>
                    <th>Artist</th>
                    <th>Genere</th>
                    <th>Likes</th>
                    <th>Lunart Superlikes</th>
                  </tr>
                  {
                    designCounter.map( (index,item) => (
                      <tr>
                        <td>{index}</td>
                        <td><b><a href=""><img src="lunartImages/topC.png"/><section><img src="lunartImages/topC.png"/></section> Ralph Edwards <img className='artistLink' src="lunartImages/arrowDigonal.png"/></a></b></td>
                        <td><a href="">Painter <img className='artistLink' src="lunartImages/arrowDigonal.png"/></a></td>
                        <td>13671</td>
                        <td>6065</td>
                      </tr> 
                    ) )
                  }
                </table>
                <div className='viewMoreArt'>
                  <a href="">View more <img src='/lunartImages/rightArrow.svg' alt=""/></a>
                </div>
              </div>
            </div> 
          }
          { 
          activeSection == 'artGallery' && 
            <div  className='artGallery'>
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
                  <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                  <SwiperSlide><li className='tagsActive'><a href="">All</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide> 
                  <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                  <SwiperSlide> <li><a href="">Photographer</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                  <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide>
                  </Swiper>
                </ul>
              </div>
            </div>
            <div className='tagsProducts'>
              <ul>
              { artLoading && designCounter.map( (index,item) => (
                  <li>
                    <div className='skeletonSet skeleton'>
                      <label></label>
                      <section></section>
                      <h6><b></b><b></b><b></b></h6>
                    </div>
                  </li>
                ) )}
                

                {/* { !artLoading && designCounter.map( (index,item) => ( */}
                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Cosmic Celebration<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/1.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>
                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Cosmogenesis<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/2.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson1<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/4.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson2<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/5.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson3<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/6.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson4<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/7.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson5<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/8.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Hanson6<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/9.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Mystic<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/10.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Universal Timepiece<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/11.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Veils<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/michelle/inner/12.jpg" alt=""/>
                        <img src="/lunartImages/imgPlace.png" alt=""/>

                      </div>
                      <div className='tagsFooter'>
                        <ul>
                          <li><img src='/lunartImages/tagsFrvt.png' alt=""/> -- <b>Likes</b></li>
                          <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> -- <b>Super-Likes</b></li>
                          <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> --</li>
                        </ul>
                      </div>
                    </a>
                  </li>
                {/* ) )} */}
              </ul>
            </div>
            </div>
          }
        </div>
      </div>
    </div> 

    <NftFooter />
  </div>
  );
};

export default MichelleHanson;
