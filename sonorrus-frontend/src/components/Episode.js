import React from 'react';
import { Link } from "react-router-dom";

const Episode = (props) => {
  return (
    <div className="item">
      <i className="large play middle aligned icon"></i>
      <div className="content">
        <Link 
          className="header"
          to={`/episodes/${props.episode.id}`} 
          onClick={() => this.history.push(`/episodes/${props.episode.id}`)}
        >
          {props.episode.title}
        </Link>
        <div className="description">{props.episode.pubdate}</div>
      </div>
    </div>
  );
}

export default Episode;