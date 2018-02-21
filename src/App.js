
import React from 'react';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hits: []
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then((data) => this.setState({ hits: data.hits }));
  }
  render(){
    return (
      <List hits={this.state.hits} />
    )
  }
}

const List = (props) => {
  return (
    <div>
      {
        props.hits.map((hit) =>
            <div key={hit.objectID}>
              <span>{hit.author}</span>
              <br />
              <a href={hit.url}>{hit.title}</a>
              <p>---------</p>
            </div>
        )
      }
    </div>
  )
}

export default App;
