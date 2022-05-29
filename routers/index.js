const router = require('express').Router();
const sparql = require('../data/sparql');
const fromSearchToQuery = require('../helpers/search');
const fromFilterToQuery = require('../helpers/filter');

router.get('/', async (req, res) => {
  const { search } = req.query;

  let [filter, having] = fromSearchToQuery(search);

  if (!search) {
    [filter, having] = fromFilterToQuery(req.query);
  }

  console.log([filter, having]);

  const query = `
    SELECT 
    (GROUP_CONCAT(?name; SEPARATOR=",") AS ?authors) 
    (GROUP_CONCAT(?institute; SEPARATOR=",") AS ?institutes) 
    ?title ?year ?publisher ?doi ?total_page ?link

    WHERE {
        ?docId a :Document .
        ?docId :title ?title .
        ?docId :year ?year .
        ?docId :publisher ?publisher .
        ?docId :doi ?doi .
        ?docId :total_page ?total_page .
        ?docId :link ?link .

        ?docId :hasAuthor ?authorId .

        ?authorId a :Author .
        ?authorId :name ?name .
        ?authorId :institute ?institute .

        ${filter ? `FILTER (${filter})` : ''}
    }
    GROUP BY ?title ?year ?publisher ?doi ?total_page ?link
    ${having ? `HAVING (${having})` : ''}
  `;

  console.log(query);

  try {
    let results = await sparql(query);
    results = results.map((result) => ({
      ...result,
      authors: result.authors.split(','),
      institutes: result.institutes.split(','),
    }));

    res.render('index', { results, query: req.query });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
