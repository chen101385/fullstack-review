import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  fetch() {
    $.get({
      url: `http://localhost:1128/repos`,
      contentType: `application/json`,
      //PRO-TIP: data: req.body
      //objects must be in JSON string format
      success: (data) => this.setState({
        repos: data
      }),
      error: () => console.log('search failed')
    })
  }

  search(term) {
    console.log(`${term} was searched`);

    let json = JSON.stringify({ username: term });

    $.post({
      url: `http://localhost:1128/repos`,
      contentType: `application/json`,
      //PRO-TIP: data: req.body
      //objects must be in JSON string format
      data: json,
      //use complete when not sending anything back in post request (i.e. not using req.send/json);
      success: () => this.fetch(),
      error: () => console.log('search failed')
    })
  }

  componentDidMount() {
    this.fetch();
  }


  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));