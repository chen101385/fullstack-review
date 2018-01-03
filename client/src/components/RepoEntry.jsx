import React from 'react';

//username, description, watchers

const RepoEntry = (props) => (
  <div>
    <h5> Username: {props.username}</h5>
    <h6> Description: {props.description} </h6>
    <h6> Number of Watchers: {props.description}</h6>
  </div>
)

export default RepoEntry;