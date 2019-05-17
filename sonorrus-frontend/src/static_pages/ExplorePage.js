import React, { Component, Fragment } from 'react';
import Navigation from '../containers/Navigation';
import Breadcrumbs from '../containers/Breadcrumbs';
const Coverflow = require('react-coverflow');

class ExplorePage extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    const { podcastId } = this.props.match.params
    fetch(`${this.props.apiUrl}/categories/`)
      .then(response => response.json())
      .then(json => {
        this.setState({ categories: json });
      });
  }

  renderCategories = () => {
    return this.state.categories.map(category => 
      <Fragment>
        <h2>{`${category.name}`}</h2>
          <Coverflow
            height={200}
            width={'100%'}
            displayQuantityOfSide={4}
            navigation={false}
            enableHeading={true}
            enableScroll={false}
          >
            {
              category.podcasts.map(podcast =>
                <img src={podcast.image_url} alt={podcast.title} data-action={`/podcasts/${podcast.id}`} />
              )
            }
          </Coverflow>
      </Fragment>
    )
  }

  render() {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', paddingTop: '7em' }}>
        <Navigation style={{ backgroundColor: 'black' }} history={this.props.history} />
        <main>
          <div className="ui container" style={{ marginBottom: '7em' }}>
            <div className="ui grid">
              <div className="ui breadcrumb">
                <a className="section" href="/">Home</a>
                <i className="right arrow icon divider"></i>
                <div className="active section">Explore</div>
              </div>
              <div className="sixteen wide column">
                <div className="ui divider"></div>
              </div>
              <div className="sixteen wide column">
                { this.renderCategories() }
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ExplorePage;