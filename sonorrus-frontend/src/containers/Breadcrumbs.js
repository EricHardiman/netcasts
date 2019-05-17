import React, { Component } from 'react';

class Breadcrumbs extends Component {
  render() {
    return (
      <div className="ui breadcrumb">
        <a href="/" className="section">Home</a>
        <i className="right chevron icon divider"></i>
        <a href="/explore" className="section">Explore</a>
        <i className="right arrow icon divider"></i>
        <div className="active section">{this.props.podcast.title}</div>
      </div>
    );
  }
}

export default Breadcrumbs;