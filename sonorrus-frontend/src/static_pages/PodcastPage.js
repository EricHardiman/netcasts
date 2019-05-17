import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Navigation from '../containers/Navigation';
import Breadcrumbs from '../containers/Breadcrumbs';
import Episode from '../components/Episode';

const mainDiv = {
  marginTop: '6em',
}

class PodcastPage extends Component {
  componentDidMount() {
    const { podcastId } = this.props.match.params
    fetch(`${this.props.apiUrl}/podcasts/${podcastId}/`)
      .then(response => response.json())
      .then(json => {
        this.setState({ podcast: json });
        this.fetchEpisodes(1);
        this.fetchAllEpisodes();
      });
  }

  state = {
    podcast: {},
    episodes: [],
    allEpisodes: []
  }

  fetchEpisodes(page) {
    fetch(`${this.props.apiUrl}/podcasts/${this.state.podcast.id}/episodes?page=${page}`)
      .then(response => response.json())
      .then(json => this.setState({ episodes: json }));
  }

  fetchAllEpisodes = () => {
    const { podcastId } = this.props.match.params
    fetch(`${this.props.apiUrl}/podcasts/${podcastId}/all_episodes`)
      .then(res => res.json())
      .then(data => this.setState({allEpisodes: data}))
  }

  renderEpisodes() {
    return this.state.episodes.map(episode => 
      <Episode key={episode.id} episode={episode} allEpisodes={this.state.allEpisodes}/>
    );
  }

  render() {
    return (
      <div>
        <Navigation episodes={this.state.allEpisodes} history={this.props.history}/>
        <main>
          <div className="ui container main-container">
            <div className="ui grid">
              <Breadcrumbs podcast={this.state.podcast} />
              <div className="sixteen wide column">
                <div className="ui divider"></div>
              </div>
              <div className="sixteen wide column">
                <div className="ui two column stackable grid">
                  <div className="eight wide column">
                    <img className="ui medium rounded image" src={this.state.podcast.image_url} alt={this.state.podcast.title} />
                    <h1>{this.state.podcast.title}</h1>
                    {renderHTML(`<p>${this.state.podcast.description}</p>`)}
                    <p>{this.state.podcast.copyright}</p>
                  </div>
                  <div className="eight wide column">
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

export default PodcastPage;