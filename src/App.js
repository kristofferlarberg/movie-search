import { useEffect, useState } from "react";
import MenuButton from "./menuButton.svg"

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
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
        <form>
          <label htmlFor="site-search" className="hidden">
            Search for your movie:
          </label>
          <input type="search" id="site-search" name="q"
            aria-label="Search through site content" placeholder="Search movie, TV shows or actors" />
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
