import { useEffect, useState } from "react";
import MenuButton from "./menuButton.svg";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState();
  const [expand, setExpand] = useState(false);

  const path = "https://image.tmdb.org/t/p/w500/";
  let categories;

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  //This is not working properly
  function toggleExpand(id) {
    setExpand(!expand);
    if (!expand) document.querySelector(id).style.height = "auto";
    if (expand) document.querySelector(id).style.height = "20vh";
  }

  useEffect(() => {
    //Gets the genre specifications
    async function getCategories() {
      const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=27cfec6c9eb8080cb7d8025ba420e2d7&language=en-US")
      const data = await response.json();
      categories = {
        action: data.genres[0].id,
        drama: data.genres[6].id,
        comedy: data.genres[3].id
      };
      console.log(categories);
    }
    getCategories();
  }, [])

  //Returns the movies based on search query
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=27cfec6c9eb8080cb7d8025ba420e2d7&language=en-US&query=${searchString}&page=1&include_adult=false`);
    const data = await response.json();
    const drama = [];
    const action = [];
    const comedy = [];

    //Didn't manage to sort based on category-object fetched in useEffect, hard coded values instead.
    data.results.forEach((result) => {
      result.genre_ids.forEach((id) => {
        if (id === 28) action.push(result)
        if (id === 18) drama.push(result)
        if (id === 35) comedy.push(result)
      })
    });
    setResults({ drama, action, comedy });
  };

  console.log("results done", results);

  return (
    <div>
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
        {/* Conditional rendering for sections should be fixed so that they are hidden if no results.*/}
        {/* Better solution for dynamically rendering sections needed.*/}
        {/* Images should be adjusted to be centered in figure.*/}
        {results && <section>
          <h2>Drama</h2>
          <div className="container" id="drama">
            {results.drama.map((result) => (
              <div>
                {result.poster_path && <figure><img src={path + result.poster_path}></img></figure>}
                {result.title && <p>{result.title}</p>}
                {result.release_date && <p>{result.release_date.slice(0, 4)}</p>}
              </div>
            ))}
          </div>
          <button onClick={() => toggleExpand("#drama")}>
            {!expand ? "See more" : "See less"}
          </button>
        </section>}
        {results && <section>
          <h2>Action</h2>
          <div className="container" id="action">
            {results.action.map((result) => (
              <div>
                {result.poster_path && <figure>
                  <img src={path + result.poster_path}></img>
                </figure>}
                {result.title && <p>{result.title}</p>}
                {result.release_date && <p>{result.release_date.slice(0, 4)}</p>}
              </div>
            ))}
          </div>
          <button onClick={() => toggleExpand("#action")}>
            {!expand ? "See more" : "See less"}
          </button>
        </section>}
        {results && <section>
          <h2>Comedy</h2>
          <div className="container" id="comedy">
            {results.comedy.map((result) => (
              <div>
                {result.poster_path && <figure>
                  <img src={path + result.poster_path}></img>
                </figure>}
                {result.title && <p>{result.title}</p>}
                {result.release_date && <p>{result.release_date.slice(0, 4)}</p>}
              </div>
            ))}
          </div>
          <button onClick={() => toggleExpand("#comedy")}>
            {!expand ? "See more" : "See less"}
          </button>
        </section>}
      </main>
      <footer>
        The Movie Finder
      </footer>
    </div>
  );
};

export default App;
