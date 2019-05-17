import React, { Component } from 'react';
import Navigation from '../containers/Navigation';
import Gallery from "react-photo-gallery";
import { Redirect } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Dot, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const photos = [
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/1d/c0/50/1dc0507b-ef3f-e3ce-a496-d8bf487d5cea/mza_8369428678980530952.jpg/268x0w.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/01/05/dd/0105dd73-39da-642f-d6c5-a2bd85b2623c/mza_3802597510695326929.jpg/268x0w.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/86/71/3b/86713b3a-c7f4-9c1c-2339-164b0e7fbd2e/mza_6864898488568873192.jpeg/268x0w.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/89/1c/49/891c492b-e700-f995-bd67-73dadc412c47/mza_9145243473092200264.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/26/77/77/2677772a-061d-ec55-9131-74d625839e2d/mza_5290411153447414149.jpeg/268x0w.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts124/v4/96/10/fe/9610fe46-f942-69af-ebd3-2acf25b03e02/mza_6875868368979685694.png/268x0w.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/fe/5a/70/fe5a7085-c3e1-28d5-b0c7-8c7a00bef5ca/mza_8534132027997253852.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/1a/9f/e1/1a9fe18e-91ec-ee2a-de7f-e3a71131f274/mza_695565387070306490.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/2e/97/52/2e9752db-939e-c85c-6fa5-3efd0e62b915/mza_5987642754974238276.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/7d/51/bb/7d51bb88-aa6e-b247-2184-6edac062dfef/mza_6236246535006647182.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/c9/44/e9/c944e988-b6d9-9749-744a-c8c04dfb3d93/mza_4777826317095043703.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/26/b1/dc/26b1dce8-1b9e-2125-818c-038b15fd5873/mza_5732043115265830795.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts118/v4/57/bf/c3/57bfc319-b688-33cb-c4d5-75cef78d9f10/mza_2268299553315648418.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/4e/b9/bb/4eb9bb9b-ed19-f0b7-7739-1177f1b35207/mza_8452563123961176873.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/24/1e/97/241e9701-f40e-8c4d-a783-9b7b77508f6d/mza_1803616348270839033.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/32/41/17/32411787-ba26-eaee-b0d4-1a6a27eb7b37/mza_7054996594515982402.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/db/db/e0/dbdbe051-53c0-806a-d115-93189281609d/mza_8956263450789007114.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/57/9e/80/579e802f-63e7-e5b8-1e2f-8bcb4a1968f7/mza_4646561600001809308.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/df/90/95/df90958c-83c5-1c5e-3859-94589d563475/mza_7584622966963879667.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/b0/4e/c9/b04ec9e2-ef17-2ccb-cf43-6bc9801fff39/mza_5848226369463695152.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/79/9c/44/799c444a-ce56-3e2b-7dc8-a5399255c427/mza_6262794307050744120.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/3c/0d/f5/3c0df588-3d68-459a-5665-cba2616f7712/mza_2827406375559886362.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/e9/5f/42/e95f4240-70f1-3fa8-5322-8c4756cc170d/mza_7218742575859729622.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/8a/07/59/8a075971-d405-6830-6ee4-2ee52c0b254d/mza_7646753129874429705.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/c5/fe/fb/c5fefb60-fecc-54c0-a814-88e9a54b9003/mza_7233747953754915864.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://media.npr.org/assets/img/2018/08/02/npr_planetmoney_podcasttile_sq-7b7fab0b52fd72826936c3dbe51cff94889797a0.jpg?s=1400',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/71/87/c7/7187c786-023a-c56a-dd48-d79005e41d16/mza_2921157577709375052.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/4d/5d/b6/4d5db632-6b62-d885-9f15-60de88045619/mza_4225170137682952882.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/8a/04/83/8a048391-e927-989d-d3c3-58251fb4684b/mza_57780691228813360.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/5a/e2/15/5ae215b7-64e8-8dfd-b44e-fb5d1ac58e00/mza_8693542031777529947.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/aa/1d/e8/aa1de851-6291-fde0-a800-282d14d7ef16/mza_503893003050438356.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts124/v4/29/08/03/29080389-0a75-b2cc-9e9d-3f3876147945/mza_5910980041217963975.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://static.megaphone.fm/podcasts/1427a2f4-2674-11e6-a3d7-cf7ee2a2c03c/image/uploads_2F1542302370190-aoalvw0x11n-61dc154e07933b3b8fbad8911e4d11c4_2FRevisionistHistory_Vector_withfade.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/60/48/4f/60484f6f-573f-f9cb-274e-46875f314c0c/mza_2221388306175387053.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/52/2f/1a/522f1a64-eec2-20ad-634d-2753b43a1b41/mza_5616570971389715212.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/6b/50/2c/6b502cf3-2050-2b61-1887-56e2db6fc057/mza_1346285540996568450.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'http://static.libsyn.com/p/assets/7/1/f/3/71f3014e14ef2722/JREiTunesImage2.jpg',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f6/01/cd/f601cd57-1351-1b8b-2f62-12474f2fb591/mza_7884400955446653415.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/05/37/63/05376322-c68e-b700-ee35-f2725abe2c7c/mza_3439999612709326667.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/b8/78/d4/b878d499-094d-db8e-3aea-ffa13655e71d/mza_4689640219339396523.png/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/08/98/c3/0898c3b2-868a-ccb8-bd0d-f7a0015be038/mza_7951177573567370488.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/68/b8/0e/68b80ee5-d6fd-0194-3e58-6cda6bb61af5/mza_463644983452833516.jpeg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/91/74/8b/91748be7-dfa1-1801-c518-63c497152785/mza_7097370048656431582.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
      {
        src: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/dd/60/13/dd60134a-1390-4b2f-84ef-0e0a13f33a0b/mza_9043585064416723311.jpg/200x200bb.png',
        width: 1,
        height: 1,
      },
    ];

class HomePage extends Component {
  state = {
    user: {},
    photos: [[], [], []],
    podcasts: []
  }

  componentDidMount() {
    this.fetchPhotos();
    this.fetchPodcasts();
    
    if (localStorage.getItem("token") !== null) {
      fetch(`${this.props.apiUrl}/profile`, {
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          authorization: `${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ user: data.user }));
    }
  }

  fetchPhotos() {
    // fetch(`${this.props.apiUrl}/podcasts/photos`)
    //   .then(response => response.json())
    //   .then(json => { 
    //     this.setState({
    //       photos: [ json.slice(0, 44),
    //                 json.slice(44, 88),
    //                 [...json.slice(88, 100), ...json.slice(0, 32)], ],
    //     });
    //   });
    fetch(`${this.props.apiUrl}/podcasts/photos`)
      .then(response => response.json())
      .then(json => { 
        this.setState({
          photos: [ photos,
                    photos,
                    photos ],
        });
      });
  }

  selectPodcast = (e) => {
    this.props.history.push(`/podcasts/${e.target.id}`);
  }

  fetchPodcasts() {
    fetch(`${this.props.apiUrl}/podcasts`)
      .then(res => res.json())
      .then(data => this.setState({podcasts: data}))
  }
  render() {
    return (
      <div>
        <Navigation history={this.props.history} user={this.state.user} podcasts={this.state.podcasts}/>
        <main style={{ marginTop: '4em' }}>
          <div className="ui container">
            <div className="ui grid">
              <div className="sixteen wide column">
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={40}
                    totalSlides={3}
                    isPlaying={true}
                    interval={7500}
                >
                  <Slider>
                    <Slide index={0}>
                      <Gallery photos={this.state.photos[0].length === 0 ? photos : this.state.photos[0]} direction="column" columns={11} onClick={this.selectPodcast} />
                    </Slide>
                    <Slide index={1}>
                      <Gallery photos={this.state.photos[1].length === 0 ? photos : this.state.photos[1]} direction="column" columns={11} onClick={this.selectPodcast} />
                    </Slide>
                    <Slide index={2}>
                      <Gallery photos={this.state.photos[2].length === 0 ? photos : this.state.photos[2]} direction="column" columns={11} onClick={this.selectPodcast} />
                    </Slide>
                  </Slider>
                  <div className="ui centered grid">
                    <Dot className="circular ui button" slide={0}>1</Dot>
                    <Dot className="circular ui button" slide={1}>2</Dot>
                    <Dot className="circular ui button" slide={2}>3</Dot>
                  </div>
                </CarouselProvider>
              </div>
              <div className="sixteen wide column">
                <div className="ui vertical stripe segment">
                  <div className="ui middle aligned stackable grid container">
                    <div className="row">
                      <div className="eight wide column">
                        <h3 className="ui header">Hello World</h3>
                        <p><em>Netcast</em> is a reimagined podcast experience. Made with <i className="heart icon" style={{ color: 'red' }}></i> at Flatiron School.</p>
                        <h3 className="ui header">Made For Everyone</h3>
                        <p>Designed for podcast aficionados and newbies alike. <em>Netcast</em> is the best podcast experience for any level of podcast listener.</p>
                      </div>
                      <div className="six wide right floated column">
                        <img src="https://images.unsplash.com/photo-1483032469466-b937c425697b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" className="ui large bordered rounded image" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="center aligned column">
                        <a className="ui primary huge button" href="/explore">Explore</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui vertical stripe quote segment">
                  <div className="ui equal width stackable internally celled grid">
                    <div className="center aligned row">
                      <div className="column">
                        <h3>"I use Netcast to listen to podcasts. Now I'm a billionaire, and women flock to me."</h3>
                        <p>A Real And Totally Not Fake Person</p>
                      </div>
                      <div className="column">
                        <h3>"This is the opposite of trash code."</h3>
                        <p>Charlie Russo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui vertical stripe segment">
                  <div className="ui text container">
                    <h3 className="ui header">A Reimagined Ad Experience</h3>
                    <p>Skip ads with just one click. Save ads relevant to you, and never forget a promo code ever again.</p>
                    <a className="ui large primary button">Learn More</a>
                    <div className="ui divider" style={{ marginTop: '3em' }}></div>
                    <h3 className="ui header">Share Clips</h3>
                    <p>Effortlessly share portions of podcasts using parametricized urls. No editing or uploading required. Podcast clips – now a reality.</p>
                    <a className="ui large primary button">Learn More</a>
                  </div>
                </div>
                <div className="ui vertical footer segment">
                  <div className="ui container">
                    <div className="ui stackable divided equal height stackable grid">
                      <div className="three wide column">
                        <h4 className="ui header">About</h4>
                        <div className="ui link list">
                          <a href="#" className="item">Sitemap</a>
                          <a href="#" className="item">Contact Us</a>
                          <a href="#" className="item">Religious Ceremonies</a>
                          <a href="#" className="item">Gazebo Plans</a>
                        </div>
                      </div>
                      <div className="three wide column">
                        <h4 className="ui header">Services</h4>
                        <div className="ui link list">
                          <a href="#" className="item">Soup Dumplings</a>
                          <a href="#" className="item">FAQ</a>
                          <a href="#" className="item">How To Access</a>
                          <a href="#" className="item">Favorite X-Men</a>
                        </div>
                      </div>
                      <div className="seven wide column">
                        <h4 className="ui header">Founders</h4>
                        <p>Ethan Nam</p>
                        <p>Eric Hardiman</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default HomePage;