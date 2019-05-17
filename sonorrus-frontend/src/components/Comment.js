import React from "react";

const Comment = (props) => {
  return (
    <div className="comment">
      <a className="avatar">
        <i className="user circle big icon"/>
      </a>
      <div className="content">
        <a className="author">{props.comment.user}</a>
        <div className="metadata">
          <span className="date">{props.comment.created_at}</span>
        </div>
        <div className="text">
          {props.comment.content}
        </div>
      </div>
    </div>
  )
}

export default Comment