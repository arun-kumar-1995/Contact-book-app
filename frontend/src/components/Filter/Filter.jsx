import "./Filter.css";
const Filter = () => {
  return (
    <select name="filter" id="filter">
      <option value="">Filter Contact</option>
      <option value="recently-added">Recent Added</option>
      <option value="date-wise">Date wise</option>
      <option value="oldest">Oldest</option>
    </select>
  );
};

export default Filter;
