const QueryBuilder = (endpoint, page, perPage, filters = {}) => {
  let query = endpoint;
  if (page) {
    query += `page=${page}`;
  }

  if (perPage) {
    query += `&perPage=${perPage}`;
  }

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      query += `&${key}=${encodeURIComponent(value)}`;
    }
  }

  return query;
};

export default QueryBuilder;
