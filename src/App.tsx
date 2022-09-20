import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NftExplore from './pages/Nft/NftExplore/NftExplore';
import MyNft from './pages/MyNft/mynft';
import NftWelcome from './pages/Nft/NftWelcome/NftWelcome';
import NftExploreItemDetails from './pages/Nft/NftExplore/NftExploreItemDetails';
import NftCreation from './pages/Nft/NftExplore/nftCreation';
import ScrollToTop from './pages/Shared/ScrollToTop';
import NftFarm from './pages/Nft/NftFarm';
import Launchpad from './pages/Launchpad/launchpad';
import Collection from './pages/Collections/collections';
import Artist from './pages/Artist/artist';
import Farming from './pages/Farming';
import Staking from './pages/Staking/staking';
import BuyArts from 'pages/BuyArts';
import SpecialBurn from 'pages/Specialburns';
import ArtDetail from 'pages/ArtDetail/art-detail';
import AlmondDetail from 'pages/AlmondDetail/almond-detail';
import JuliaDetail from 'pages/JuliaDetail/julia-detail';
import ChristopherPaulToth from './pages/ChristopherPaulToth/christopher-paul-toth';
import DreamyPixel from './pages/DreamyPixel/dreamy-pixel';
import MarkSpaeth from './pages/MarkSpaeth/mark-spaeth';
import MichelleHanson from './pages/MichelleHanson/michelle-hanson';
import NicoMares from './pages/NicoMares/nico-mares';
import TommyBalogh from './pages/TommyBalogh/tommy-balogh';
import YudhaScholes from './pages/YudhaScholes/yudha-scholes';
import Aszoo from './pages/Aszoo/aszoo';
import Jc from './pages/Jc/jc';
import Nameo from './pages/Nameo/nameo';
import Spoko from './pages/Spoko/spoko';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <ScrollToTop />
        <div className='App'>
          <Switch>
            <Route path='/' exact component={NftWelcome} />
            <Route path='/nftCreation' exact component={NftCreation} />
            <Route path='/myNft' exact component={MyNft} />
            <Route path='/nftExplore' exact component={NftExplore} />
            <Route path='/launchpad' exact component={Launchpad} />
            <Route path='/collections' exact component={Collection} />
            <Route path='/mynft' exact component={MyNft} />
            <Route path='/artist' exact component={Artist} />
            <Route path='/farming' exact component={Farming} />
            <Route path='/staking' exact component={Staking} />
            <Route path='/buy' exact component={BuyArts} />
            <Route path="/burn" exact component={SpecialBurn} />
            <Route path="/art" exact component={SpecialBurn} />
            <Route path="/art-detail" exact component={ArtDetail} />
            <Route path="/almond-detail" exact component={AlmondDetail} />
            <Route path="/julia-detail" exact component={JuliaDetail} />
            <Route path='/christopher-paul-toth' exact component={ChristopherPaulToth} />
            <Route path='/dreamy-pixel' exact component={DreamyPixel} />
            <Route path='/mark-spaeth' exact component={MarkSpaeth} />
            <Route path='/michelle-hanson' exact component={MichelleHanson} />
            <Route path='/nico-mares' exact component={NicoMares} />
            <Route path='/tommy-balogh' exact component={TommyBalogh} />
            <Route path='/yudha-scholes' exact component={YudhaScholes} />
            <Route path='/aszoo' exact component={Aszoo} />
            <Route path='/jc' exact component={Jc} />
            <Route path='/nameo' exact component={Nameo} />
            <Route path='/spoko' exact component={Spoko} />
            <Route
              path='/nftDetail/:address/:id'
              exact
              component={NftExploreItemDetails}
            />
            <Route path='/nftFarm' exact component={NftFarm} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
