const Search = () => {
  return (
    <header>
      <p className="header__subtitle">Seek and buy available Web 3.0 domain names on Ethereum</p>
      <h2 className="header__title">It all begins with a domain name.</h2>
      <div className="header__search">
        <input
          type="text"
          className="header__input"
          placeholder="Find your domain"
        />
        <button
          type="button"
          className='header__button'
        >
          Buy It
        </button>
      </div>
    </header>
  );
}

export default Search;