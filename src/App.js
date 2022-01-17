function App() {
  return (
    <div className="">
      <header>
        The Movie Finder
      </header>
      <main>
        <h1 className="hidden">Search for your movie</h1>
        <form>
          <label for="site-search" className="hidden">
            Search for your movie:
          </label>
          <input type="search" id="site-search" name="q"
            aria-label="Search through site content" />
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
    </div>
  );
}

export default App;
