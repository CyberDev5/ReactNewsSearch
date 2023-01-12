import React from 'react';
import './App.css';
import NewsList from './components/NewsList';

const SearchBar = ({change, submit}) => {
  return (
    <div className="navbar bg-body-tertiary" onSubmit={(e) => { e.preventDefault(); submit(e) }} >
      <header className="container-fluid">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => change(e)}></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
    </div>
  )
}

//début de l'application
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      APIkey: 'Sj7xtLZvPNVhJFClOTwHhaBhrlnGOZvu',
      input: '',
      results: []
    }
  }

  handleChange = (e) => {
    this.setState(
      {
        input: e.target.value
      }
    )
    console.log(e.target.value)
  }

  handleSubmit = () => {
    console.log(this.state.input)
    this.query()
  }

  query = () => {
    let url = this.state.baseURL + "?q=" + this.state.input + "&api-key=" + this.state.APIkey
    fetch(url).then(response => {
      if (!response.ok) {
        console.log(response.statusText)
        return
      }
      return response.json()
    }).then(data => {
      let docs = data.response.docs
      let results = docs.map(doc => {
        let url = doc.web_url
        let headline = doc.headline
        let main = headline.main
        let date = doc.pub_date
        let byline = doc.byline
        let author = byline.original
        let id = doc._id

        return { id: id, title: main, date: date, url: url, author: author }
      })

      this.setState({ results: results })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container-sm">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <h1>Newspaper Search</h1>
              </a>
            </div>
          </nav>
        </div>
        <SearchBar change={this.handleChange} submit={this.handleSubmit}></SearchBar>
        <NewsList results={this.state.results}></NewsList>
      </div>
    );
  }
}

export default App;
