import "./Filter.css";
const Filter = () => {
  return (
    <select name="filter" id="filter">
      <option value="">Filter By</option>
      <option value="recent">Recent</option>
      <option value="date">Date</option>
      <option value="oldest">Oldest</option>
    </select>
  );
};

export default Filter;
