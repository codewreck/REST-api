
import React from 'react';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
        else {
          throw new Error('something went wrong.......')
        }
      })
      .then((data) => this.setState({ hits: data.hits, isLoading: false }))
      .catch((error) => this.setState({ error:error, isLoading: false }));
  }
  render(){
    const isLoading = this.state.isLoading;
    const error = this.state.error
    if(error) {
      return (<p>{error.message}</p>)
    }
    if(isLoading){
      return (<p>Loading......</p>);
    }
    else {
      return (
        <div>
          <List hits={this.state.hits} />
        </div>
      );
    }
    // return (
    //   <div>
    //     {
    //       isLoading ? (<p>load</p>) : (<List hits={this.state.hits}/>)
    //     }
    //   </div>
    // )

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
