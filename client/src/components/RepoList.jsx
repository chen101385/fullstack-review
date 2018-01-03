import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos (sorted by watchers).
    <div>
      {props.repos.map(repo => <RepoEntry username={repo.fullname} description={repo.description} watchers={repo.watchers_count} key={repo.id} />

      )}
      </div>
  </div>
)

export default RepoList;