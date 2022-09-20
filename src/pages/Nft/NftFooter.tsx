import React from 'react';

const NftFooter = () => {
  return (
    <>
      <div id='footerId' className='footer'>
        <div className='wrapper'>
          <div className='footerInner'>
            <div className='footerPrimary'>
              <a className='footerLogo' href='/'>
                <img src='/lunartImages/lunartLogo.svg' alt='' />
              </a>
              {/* <h3>World's First NFT Fixed Yield Bond Marketplace</h3> */}
              <p>Hidden deep inside the mathematical intricacies of imaginary numbers
are fractals of stunning beauty.
LunArt pushes the boundaries of what can be done with these numbers.</p>
              <ul>
                <li>
                  <a target="_blank" href='https://twitter.com/LunArt_NFT'>
                    <img src='/na.svg' alt='social' />
                  </a>
                </li>
                <li>
                <a target="_blank" href='https://www.instagram.com/nft.lunart/'>
                    <img src='/Ni.svg' alt='social' />
                  </a>
                </li>
                <li>
                <a target="_blank" href='https://discord.com/invite/LunArt'>
                    <img src='/nc.svg' alt='social' />
                  </a>
                </li>
               
              </ul>
            </div>
            <div className='footerSecondary'>
              <div className='footerSecondary1'>
                <ul>
                  <li>About</li>
                  <li><a target="_blank" href="https://www.lunart.io/">LunArt NFT</a></li>
                  <li><a target="_blank" href="https://www.lunart.io/#:~:text=Partners%20%26%20Investors">Investors</a></li>
                  <li><a href="https://www.lunart.io/faq" target="_blank">FAQs</a></li>
                  {/* <li><a href="">Terms of  services</a></li> */}
                </ul>
              </div>
              <div className='footerSecondary1'>
                <ul>
                  <li>Partnership</li>
                  <li><a href="https://www.loop.markets/" target="_blank">LOOP Finance</a></li>
                  <li><a href="https://www.loopventures.io/" target="_blank">LOOP Ventures</a></li>
                  <li><a href="https://www.hybridnft.io/" target="_blank">Hybrid</a></li>
                  <li><a href="https://www.bigbrain.holdings/" target="_blank">Big Brain Holdings</a></li>
                  <li><a href="https://www.angelprotocol.io/" target="_blank">Angel Protocol</a></li>
                </ul>
              </div>
              <div className='footerSecondary1'>
                <ul>
                  <li>Marketplace</li>
                  <li><a href="https://knowhere.art/collections/terra1flwpxxfl8ldxhdgzxkwet2r37c45hutapgjwkg" target="_blank">Knowhere</a></li>
                  <li><a href="https://randomearth.io/collections/terra1flwpxxfl8ldxhdgzxkwet2r37c45hutapgjwkg"target="_blank">RandomEarth</a></li>
                </ul>
              </div>
            </div>
          </div>
          <span>Copyright © LunArt 2022</span>
        </div>
      </div>
    </>
  );
};

export default NftFooter;
