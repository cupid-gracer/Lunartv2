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

const TommyBalogh = (props: any) => {
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
              <span><img src='/lunartImages/tommy/profile.jpg'/></span>
              <h6>Tommy Balogh<p>Painter</p></h6>
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
              <p>Tommy Balogh was born in Budapest and moved to Australia early on in his life. He graduated with Honours from the Australian National University and is known for his large format light-reactive paintings made on plexiglass, canvas and glass. His art celebrates emotions elicited by the interaction of organic forms with light to create transformational spiritual experiences.<br></br><br></br>By creating large exhibitions, including high impact gorilla activations of public spaces, he has become recognised nationwide for pushing the envelope of visual art. His 2016 exhibition VOYAGE drew international attention which led to a private invitation of an art residency in Germany by the founders of VIVID international light festival. More recently, he was featured in Dubai’s premiere art magazine ‘Artoze’ and last year became paint ambassador for Permaplastik paints Australia. This year he created ‘Art Kix’ footwear and is collaborating with LIFX to transform the spaces of the future, both physical and metaphysical.</p>
            </div>
            <button><a href="mailto:contact@lunart.io?subject=Tommy Balogh"><img src="/lunartImages/commision.png" alt=""/>Commission Artist</a></button>
          </div>
          <div className='topCreationRight'>
            <span><img src="/lunartImages/tommy/p1.jpg" alt=""/></span>
            <ul><li><img src="/lunartImages/tommy/p2.jpg" alt=""/></li><li><img src="/lunartImages/tommy/p3.jpg" alt=""/></li><li><img src="/lunartImages/tommy/p4.jpg" alt=""/></li></ul>
          </div>
        </div>
      </div>
    </div>
    <div className='leaderBoard'>
      <div className='wrapper'>
        <div className='leaderBoardInner'>
          <div className='topCreations'>
            {/* <h6 onClick={() => setActiveSection('topCreations') } className={ activeSection == 'topCreations' ? 'topCreationsActive': ''} >Top Creations</h6>  */}
            <h5 onClick={() => setActiveSection('artGallery') } className={ activeSection == 'artGallery' ? 'topCreationsActive': ''}>Art Gallery <b>(14)</b></h5>
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
                  <li>
                    <a>
                      <div className='tagsProductsHeader'>
                        <h5>Art Kix<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/1.jpg" alt=""/>
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
                        <h5>Aztec<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/2.jpg" alt=""/>
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
                        <h5>Crossing UV<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/3.jpg" alt=""/>
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
                        <h5>Destiny<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/4.jpg" alt=""/>
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
                        <h5>Elements<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/5.jpg" alt=""/>
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
                        <h5>Enigma Ovolo<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/6.jpg" alt=""/>
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
                        <h5>fluid 1<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/7.jpg" alt=""/>
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
                        <h5>fluidvortexspin<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/8.jpg" alt=""/>
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
                        <h5>H5<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/9.jpg" alt=""/>
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
                        <h5>impossiblemoment<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/10.jpg" alt=""/>
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
                        <h5>Revelation<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/11.jpg" alt=""/>
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
                        <h5>SpaceshipEarth<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/12.jpg" alt=""/>
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
                        <h5>Vortex UV<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/13.jpg" alt=""/>
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
                        <h5>Whirlwind UV<b>Coming Soon</b></h5>
                        <span><img src="/lunartImages/terra-luna.png" alt=""/> --</span>
                      </div>
                      <div className='tagsImage'>
                        <img src="/lunartImages/tommy/inner/14.jpg" alt=""/>
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

export default TommyBalogh;
