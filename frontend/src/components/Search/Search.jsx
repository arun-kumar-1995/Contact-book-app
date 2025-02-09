import "./Search.css";

const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Phonebook search.." />

      <select name="search" id="search-opton">
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
    </div>
  );
};

export default Search;
