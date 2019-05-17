import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Loader } from 'semantic-ui-react'

const JWT = require('jsonwebtoken');

const NavRight = (props) => {
  return (
    localStorage.getItem("token") === null ?
      (
        <Fragment>
          <div class="item">
            <a class="ui button" href="/register">Sign Up</a>
          </div>
          <div class="item">
            <a class="ui green button" href="/login">Log In</a>
          </div>
        </Fragment>
      ) :
      (
        <div className="ui simple dropdown item">
          <i className="user icon"/>&nbsp;
          {JWT.verify(localStorage.getItem("token"), 'secret').username} <i className="dropdown icon"/>
          <div className="menu">
            <a className="item" href="/profile">Profile</a>
            <a className="item" href="/podcasts">My Podcasts</a>
            <a className="item" href="/ads">Saved Ads</a>
            <a className="item" href="/settings">Settings</a>
            <a className="item" href="/help">Help</a>
            <div className="divider"></div>
            <a className="item" onClick={() => props.logout()}>Sign Out</a>
          </div>
        </div>
      )
  );
}

export default NavRight;