import React, { Component } from 'react';
import NavRight from '../components/NavRight';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'

class Navigation extends Component {
  state = {
    loggedIn: localStorage.getItem("token") !== null ? true : false,
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: false,
    });
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title }, () => {
    this.changeUrl()})
  }

  changeUrl = () => {
    this.props.history.push(this.props.podcasts ? `/podcasts/${this.state.results[0].id}` : `/episodes/${this.state.results[0].id}`)
  }

  handleSearchChange = (e, { value }) => {
    const source = this.props.podcasts ? this.props.podcasts : this.props.episodes
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      console.log(_.filter(source, isMatch))

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    return (
      <header>
        <div className="ui fixed inverted menu" style={this.props.style}>
          <div className="ui container">
            <a href="/" className={`header item logo-font nav-logo ${this.props.history.location.pathname === '/' ? 'active' : null}`}>
              <i className="podcast icon"></i>
              netcast
            </a>
            <a href="/mypodcasts" className={`item ${this.props.history.location.pathname === '/mypodcasts' ? 'active' : null}`}>My Podcasts</a>
            <a href="/explore" className={`item ${this.props.history.location.pathname === '/explore' || this.props.history.location.pathname.includes('podcasts/') || this.props.history.location.pathname.includes('episodes')  ? 'active' : null}`}>Explore</a>
            <div className="right menu">
              <div className="item">
                <div className="ui icon input">
                  <Search
                    loading={this.state.isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={this.state.results}
                    value={this.state.value}
                    {...this.props}
                  />
                </div>
              </div>
              <NavRight logout={this.logout} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
