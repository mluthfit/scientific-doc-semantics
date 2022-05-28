const router = require('express').Router();
const sparql = require('../data/sparql');

router.get('/', async (req, res) => {
  console.log(req.query);
  const query = `
    SELECT 
    (GROUP_CONCAT(?name; SEPARATOR=",") AS ?authors) 
    (GROUP_CONCAT(?institute; SEPARATOR=",") AS ?institutes) 
    ?title ?year ?publisher ?doi ?totalPage ?link

    WHERE {
        ?docId a :Document .
        ?docId :title ?title .
        ?docId :year ?year .
        ?docId :publisher ?publisher .
        ?docId :doi ?doi .
        ?docId :total_page ?totalPage .
        ?docId :link ?link .

        ?docId :hasAuthor ?authorId .

        ?authorId a :Author .
        ?authorId :name ?name .
        ?authorId :institute ?institute .
    }
    GROUP BY ?title ?year ?publisher ?doi ?totalPage ?link
  `;

  try {
    let results = await sparql(query);
    results = results.map((result) => ({
      ...result,
      authors: result.authors.split(','),
      institutes: result.institutes.split(','),
    }));

    res.render('index', { results });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
