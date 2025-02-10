const QueryBuilder = (endpoint, page, perPage) => {
  let query = endpoint;
  if (page) {
    query += `&page=${page}`;
  }

  if (perPage) {
    query += `&perPage=${perPage}`;
  }

  if (selectedMonth) {
    query += `&month=${selectedMonth}`;
  }
  if (searchText) {
    query += `&search=${encodeURIComponent(searchText)}`;
  }

  return query;
};

export default QueryBuilder;
