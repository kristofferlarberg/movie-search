import { useEffect, useState } from "react";
import MenuButton from "./menuButton.svg"

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=27cfec6c9eb8080cb7d8025ba420e2d7&language=en-US&query=${searchString}&page=1&include_adult=false`)
    const data = await response.json();
    setResults(data.results)
  }

  console.log(results);

  return (
    <div className="">
      <header>
        <div>
          Movie Finder
          <button onClick={toggleMenu} role="button">
            <img src={MenuButton} alt="Menu button logo" />
          </button>
          <nav className="desktop">
            <a>Movies</a>
            <a>Tv-shows</a>
            <a>Actors</a>
          </nav>
        </div>
        {isOpen && (
          <nav className="mobile">
            <a>Movies</a>
            <a>Tv-shows</a>
            <a>Actors</a>
          </nav>
        )}
      </header>
      <main>
        <h1 className="hidden">Search for your movie</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="movie-search" className="hidden">
            Search for your movie:
          </label>
          <input
            type="search"
            id="movie-search"
            aria-label="Search through site content"
            placeholder="Search movie, TV shows or actors"
            onChange={(event) => setSearchString(event.target.value)}
          />
          <button>Search</button>
        </form>
        <section>
          <h2>Category</h2>
          <div className="container">
            <img src="img/test.png"></img>
            <img src="img/test.png"></img>
          </div>
        </section>
      </main>
      <footer>
        The Movie Finder
      </footer>
    </div >
  );
}

export default App;
