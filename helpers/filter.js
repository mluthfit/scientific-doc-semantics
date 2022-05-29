const fromFilterToQuery = (request) => {
  const {
    author,
    institute,
    title,
    publisher,
    from_year: fromYear,
    to_year: toYear,
    from_page: fromPage,
    to_page: toPage,
  } = request;

  let filter = `
    ${title ? `regex(?title, "${title}", "i")` : ''}
    ${publisher ? `&& regex(?publisher, "${publisher}", "i")` : ''}
    ${fromYear ? `&& ?year >= "${fromYear}"` : ''}
    ${toYear ? `&& ?year <= "${toYear}"` : ''}
    ${fromPage ? `&& ?total_page >= "${fromPage}"` : ''}
    ${toPage ? `&& ?total_page <= "${toPage}"` : ''}
  `.replace(/\n/g, '').trim();

  let having = `
    ${author ? `regex(?authors, "${author}", "i")` : ''}
    ${institute ? `&& regex(?institutes, "${institute}", "i")` : ''}  
  `.replace(/\n/g, '').trim();

  filter = filter[0] === '&' ? filter.replace('&& ', '') : filter;
  having = having[0] === '&' ? having.replace('&& ', '') : having;
  return [filter, having];
};

module.exports = fromFilterToQuery;
