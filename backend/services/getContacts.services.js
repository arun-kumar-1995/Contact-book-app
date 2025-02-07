class GetContacts {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const searchQuery = { deleted: false };
    if (this.queryStr.name)
      searchQuery.name = { $regex: this.queryStr.search, $options: "i" };

    if (this.queryStr.email)
      searchQuery.email = { $regex: this.queryStr.email, $options: "i" };

    if (this.queryStr.phone)
      searchQuery.phone = {
        $regex: this.queryStr.phone,
        $options: "i",
      };

    this.query = this.query.find(searchQuery);
    return this;
  }

  filter() {
    const query = {};
    if (this.queryStr?.filterBy === "recent-added")
      this.query.sort({ _id: -1 });

    if (this.queryStr?.filterBy === "oldest") this.query.sort({ _id: 1 });
    if (this.queryStr?.filterBy === "date") this.query.sort({ createdAt: -1 });

    this.query.find({
      ...this.queryStr,
      ...query,
    });

    return this;
  }

  async getContactsCount() {
    const query = { deleted: false };

    if (this.queryStr.name)
      query.name = { $regex: this.queryStr.name, $options: "i" };

    if (this.queryStr.email)
      query.email = { $regex: this.queryStr.email, $options: "i" };

    if (this.queryStr.phone)
      query.phone = { $regex: this.queryStr.phone, $options: "i" };

    const count = await this.query.countDocuments({
      ...this.queryStr,
      ...query,
    });

    return count;
  }

  paginate() {
    const currentPage = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.perPage) || 10;
    const skip = (currentPage - 1) * Number(this.queryStr?.perPage);
    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}

export default GetContacts;
