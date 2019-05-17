import React, { Component } from 'react';
import Navigation from '../containers/Navigation';
import Breadcrumbs from '../containers/Breadcrumbs';
import Episode from '../components/Episode';
import Comment from '../components/Comment'
import ReactAudioPlayer from 'react-audio-player';
import renderHTML from 'react-render-html';
import { Accordion, Icon, Segment, Dropdown, Grid, Divider } from 'semantic-ui-react'
const JWT = require('jsonwebtoken');

const mainDiv = {
  'marginTop': '6em',
  'marginBottom': '6em',
}

const audioPlayer = {
  'width': '100%',
}

class EpisodePage extends Component {
  state = { 
    activeIndex: -1,
    episode: {},
    podcast: {},
    allEpisodes: [],
    comments: [],
    content: "",
    ads: [],
    upNext: [],
    start_time: '',
    stop_time: '',
    company: '',
    promo_code: ''
  }

  componentDidMount() {
    const { episodeId } = this.props.match.params
    fetch(`${this.props.apiUrl}/episodes/${episodeId}/`)
      .then(response => response.json())
      .then(json => {
        this.setState({ 
          episode: json,
          podcast: json.podcast,
          comments: json.comments,
          ads: json.ads
        });
        this.fetchEpisodes(1);
        this.fetchAllEpisodes()
      });
  }

  fetchEpisodes(page) {
    fetch(`${this.props.apiUrl}/podcasts/${this.state.podcast.id}/episodes?page=${page}`)
      .then(response => response.json())
      .then(json => {
        json.shift();
        this.setState({ upNext: json });
      });
  }

  fetchAllEpisodes() {
    fetch(`${this.props.apiUrl}/podcasts/${this.state.podcast.id}/all_episodes`)
      .then(res => res.json())
      .then(data => this.setState({allEpisodes: data}))

  }

  renderEpisodes() {
    return this.state.upNext.map(episode => 
      <Episode key={episode.id} episode={episode} />
    );
  }

 renderComments() {
  if (localStorage.getItem("token") !== null) {
     const userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
     return this.state.comments.map(comment =>
        <Comment key={comment.id} comment={comment} userId={userId}/>
      );
   } else {
    return null;
   }
 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  postAd = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const { episodeId } = (this.props.match.params)
    fetch("http://localhost:3000/api/v1/ads", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        accepts: "aaplication/json",
        authorization: token
      },
      body: JSON.stringify({
        ad: {
          start_time: this.state.start_time,
          stop_time: this.state.stop_time,
          company: this.state.company,
          promo_code: this.state.promo_code,
          episode_id: episodeId
        }
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ads: [...this.state.ads, data]}))
  }

  postComment = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
    const { episodeId } = this.props.match.params
    fetch(`http://localhost:3000/api/v1/comments`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        accepts: "aaplication/json",
        authorization: token
      },
      body: JSON.stringify({
        comment:{
          content: this.state.content,
          user_id: userId,
          episode_id: episodeId
        }
      })
    })
      .then(res => res.json())
      .then(data => this.setState({comments: [...this.state.comments, data]}))
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div>
        <Navigation episodes={this.state.allEpisodes} history={this.props.history}/>
        <main>
          <div className="ui container main-container">
            <div className="ui grid">
              <div className="ui breadcrumb">
                <a href="/" className="section">Home</a>
                <i className="right chevron icon divider"></i>
                <a href="/explore" className="section">Explore</a>
                <i className="right chevron icon divider"></i>
                <a href={`/podcasts/${this.state.podcast.id}`} className="section">{this.state.podcast.title}</a>
                <i className="right arrow icon divider"></i>
                <div className="active section">{this.state.episode.title}</div>
              </div>
              <div className="sixteen wide column">
                <div className="ui divider"></div>
              </div>
              <div className="sixteen wide column">
                <div className="ui two column stackable grid">
                  <div className="ten wide column">
                    <h1>{this.state.episode.title}</h1>
                    <div className="ui equal width grid">
                      <div className="column">
                        <img className="ui large rounded image" src={this.state.podcast.image_url} alt={this.state.episode.title} />
                      </div>
                      <div className="column">
                        <h4>Description</h4>
                        {renderHTML(`<p>${this.state.episode.content}</p>`)}
                      </div>
                    </div>
                    <div className="ui grid">
                      <div className="sixteen wide column">
                        <ReactAudioPlayer
                          src={this.state.episode.enclosure_url}
                          autoPlay={false}
                          controls
                          style={audioPlayer}
                        />
                      </div>
                      <div className="sixteen wide column" style={{paddingTop: '0px'}}>
                        <Segment inverted style={{background: '#0A3DCB', padding: '0px 20px'}}>
                          <Accordion inverted>
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                              <Icon name='info circle' />
                              Help Us Mark Ads
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                              <form className="ui inverted small form" onSubmit={this.postAd}>
                                <div className="two fields">
                                  <div className="field">
                                    <label>Start Time</label>
                                    <input placeholder="00:00:00" type="text" name="start_time" value={this.state.start_time} onChange={this.handleChange}/>
                                  </div>
                                  <div className="field">
                                    <label>End Time</label>
                                    <input placeholder="00:00:00" type="text" name="stop_time"value={this.state.stop_time}onChange={this.handleChange}/>
                                  </div>
                                </div>
                                <div className="two fields">
                                  <div className="field">
                                    <label>Company</label>
                                    <input placeholder="Google" type="text" name="company" value={this.state.company}onChange={this.handleChange}/>
                                  </div>
                                  <div className="field">
                                    <label>Promo Code</label>
                                    <input placeholder="Leave empty if none" type="text" name="promo_code" value={this.state.promo_code}onChange={this.handleChange}/>
                                  </div>
                                </div>
                                <button className="ui black submit button" style={{marginBottom: '10px'}}>Submit</button>
                              </form>
                            </Accordion.Content>
                          </Accordion>
                        </Segment>
                      </div>
                    </div>
                    <div className="ui comments">
                      <Grid>
                        <Grid.Column floated='left' width={5}>
                          <h3 className="ui header">{this.state.comments.length} Comments</h3>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Dropdown text='Sort By' className="fixed right">
                            <Dropdown.Menu>
                              <Dropdown.Item text='Newest' />
                              <Dropdown.Item text='Oldest' />
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid.Column>
                      </Grid>
                      <Divider />
                      {this.renderComments()}
                    </div>
                    <form className="ui reply form" onSubmit={this.postComment}>
                      <div className="field">
                        <textarea onChange={this.handleChange} name="content" value={this.state.content}></textarea>
                      </div>
                      <button type="submit" className="ui blue labeled submit icon button">
                        <i className="icon edit"></i> Add Reply
                      </button>
                    </form>
                  </div>
                  <div className="six wide column">
                    <h3>Up Next</h3>
                    <div className="ui relaxed divided list">
                      {this.renderEpisodes()}
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

export default EpisodePage;