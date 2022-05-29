const fromSearchToQuery = (request) => {
  let filter = '';
  // let having = '';

  if (request) {
    filter = `
      regex(?title, "${request}", "i") || 
      regex(?publisher, "${request}", "i") || 
      regex(?year, "${request}", "i") || 
      regex(?total_page, "${request}", "i") ||
      regex(?name, "${request}", "i") ||
      regex(?institute, "${request}", "i") 
    `;

    // having = `HAVING (
    //   regex(?authors, "${request}", "i") ||
    //   regex(?institutes, "${request}", "i")
    // )`;
  }

  return [filter, ''];
};

module.exports = fromSearchToQuery;
