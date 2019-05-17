import React, { Component, } from 'react';
import { Grid, Menu, Segment, Table, Image, Header, Placeholder } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import renderHTML from 'react-render-html';
import Navigation from '../containers/Navigation';
import Breadcrumbs from '../containers/Breadcrumbs';
import Episode from '../components/Episode';

const mainDiv = {
  marginTop: '6em',
}

class MyPodcastsPage extends Component {
  state = { 
    activeItem: 'Subscribed',
    podcasts: [],
    library: [],
 }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    this.fetchPodcasts();
    this.fetchEpisodes();
  }

  fetchPodcasts() {
    fetch(`${this.props.apiUrl}/podcasts/`)
      .then(response => response.json())
      .then(json => { 
        this.setState({
          podcasts: json,
        });
      });
  }

  fetchEpisodes() {
    fetch(`${this.props.apiUrl}/episodes/`)
      .then(response => response.json())
      .then(json => { 
        this.setState({
          episodes: json,
        });
      });
  }

  renderTable = () => {
    switch(this.state.activeItem) {
      case 'Subscribed':
        return (
          <Table color="black" key="black" size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Podcast Title</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Episodes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.state.podcasts.slice(12, 17).map(podcast =>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4' image>
                      <Image src={podcast.image_url} rounded size='mini' />
                      <Header.Content>
                        <Link 
                          className="header"
                          to={`/podcasts/${podcast.id}`} 
                        >
                          {podcast.title}
                        </Link>
                      </Header.Content>
                    </Header>
                    </Table.Cell>
                    <Table.Cell>{podcast.author}</Table.Cell>
                    <Table.Cell>{podcast.episodes}</Table.Cell>
                  </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        );
        break;
      case 'History':
        return (
          <Table color="red" key="red" size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Episode Title</Table.HeaderCell>
                <Table.HeaderCell>Podcast</Table.HeaderCell>
                <Table.HeaderCell>Played</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.state.episodes.slice(0, 20).map(episode =>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h5' image>
                      <Image src={episode.podcast.image_url} rounded size='mini' />
                      <Header.Content>
                        <Link 
                          className="header"
                          to={`/episodes/${episode.id}`} 
                        >
                          {episode.title}
                        </Link>
                      </Header.Content>
                    </Header>
                    </Table.Cell>
                    <Table.Cell>{episode.podcast.author}</Table.Cell>
                    <Table.Cell>{episode.pubdate}</Table.Cell>
                  </Table.Row>
                )
              }
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                  <Image src='http://static.libsyn.com/p/assets/7/1/f/3/71f3014e14ef2722/JREiTunesImage2.jpg' rounded size='mini' />
                  <Header.Content>
                    JRE MMA Show #62 with Brendan Schaub
                  </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>The Joe Rogan Experience</Table.Cell>
                <Table.Cell>April 17, 2019</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                  <Image src='https://static.megaphone.fm/podcasts/1427a2f4-2674-11e6-a3d7-cf7ee2a2c03c/image/uploads_2F1542302370190-aoalvw0x11n-61dc154e07933b3b8fbad8911e4d11c4_2FRevisionistHistory_Vector_withfade.png' rounded size='mini' />
                  <Header.Content>
                    Revisionist History Presents: Against the Rules with Michael Lewis
                  </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>Revisionist History</Table.Cell>
                <Table.Cell>April 1, 2019</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        );
        break;
      case 'Listen Later':
        return <Image className="medium square" src="https://media.giphy.com/media/xKvwa3SjldeWQ/giphy.gif" />
        break;
      case 'Liked Episodes':
        return <Image className="medium square" src="https://media1.tenor.com/images/ca50f373f728042e548643ce4b4e63da/tenor.gif?itemid=9205869" />
        break;
      case 'Saved Ads':
        return <Image className="medium square" src="https://media1.tenor.com/images/e32d670c95a03a0578ef953425c4005e/tenor.gif?itemid=12660998" />
        break;
      case 'My Comments':
        return <Image className="medium square" src="https://media1.tenor.com/images/d3419f07ed6d89b40bfff972193c7b10/tenor.gif?itemid=10936717" />
        break;
      default:
        return <Image className="medium square" src="https://media.giphy.com/media/xKvwa3SjldeWQ/giphy.gif" />
        break;
    }
  }

  render() {
    const { activeItem } = this.state

    if (localStorage.getItem("token") === null) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <Navigation history={this.props.history} />
        <main>
          <div className="ui container main-container">
            <div className="ui grid">
              <div className="ui breadcrumb">
                <a href="/" className="section">Home</a>
                <i className="right arrow icon divider"></i>
                <div className="active section">My Podcasts</div>
              </div>
              <div className="sixteen wide column">
                <div className="ui divider"></div>
              </div>
              <div className="sixteen wide column">
                <Grid>
                  <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                      <Menu.Item name='Subscribed' active={activeItem === 'Subscribed'} onClick={this.handleItemClick} />
                      <Menu.Item name='History' active={activeItem === 'History'} onClick={this.handleItemClick} />
                      <Menu.Item
                        name='Listen Later'
                        active={activeItem === 'Listen Later'}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        name='Liked Episodes'
                        active={activeItem === 'Liked Episodes'}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        name='Saved Ads'
                        active={activeItem === 'Saved Ads'}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        name='My Comments'
                        active={activeItem === 'My Comments'}
                        onClick={this.handleItemClick}
                      />
                    </Menu>
                  </Grid.Column>
                  <Grid.Column stretched width={12}>
                    { this.renderTable() }
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default MyPodcastsPage;