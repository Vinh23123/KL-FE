const SearchForm = ({ state, setState, width = 400 }) => {
  const searchForm = "search-form";
  const handleOnChange = (e) => {
    console.log("The value of the current state " + e.target.value);

    setState(e.target.value);
  };

  return (
    <div
      className={`${searchForm}__search-wrapper`}
      style={{ width: `${width}px` }}
    >
      <input
        className={`${searchForm}__input`}
        type="text"
        placeholder="Search"
        value={state}
        onChange={handleOnChange}
      />
      <button className={`${searchForm}__search-button`} type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </button>
    </div>
  );
};
export default SearchForm;
