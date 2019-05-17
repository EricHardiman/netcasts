import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import PodcastPage from './static_pages/PodcastPage';
import EpisodePage from './static_pages/EpisodePage';
import HomePage from './static_pages/HomePage';
import LoginPage from './static_pages/LoginPage';
import ExplorePage from './static_pages/ExplorePage';
import RegisterPage from './static_pages/RegisterPage';
import MyPodcastsPage from './static_pages/MyPodcastsPage';
import './App.css';

const API_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/podcasts/:podcastId" render={(props) => <PodcastPage {...props} apiUrl={API_URL} />} />
        <Route path="/episodes/:episodeId" render={(props) => <EpisodePage {...props} apiUrl={API_URL} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} apiUrl={API_URL} />} />
        <Route path="/register" render={(props) => <RegisterPage {...props} apiUrl={API_URL} />} />
        <Route path="/explore" render={(props) => <ExplorePage {...props} apiUrl={API_URL} />} />
        <Route path="/mypodcasts" render={(props) => <MyPodcastsPage {...props} apiUrl={API_URL} />} />
        <Route path="/" render={(props) => <HomePage {...props} apiUrl={API_URL} />} />
      </Switch>
    );
  }
}

export default App;
