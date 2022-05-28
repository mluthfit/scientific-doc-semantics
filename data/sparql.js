require('isomorphic-fetch');
const d3 = require('d3-sparql');

const SPARQL_URL = 'http://localhost:3030/scientific-doc/query';
const prefix = `
  prefix : <http://www.semanticweb.org/mluth/scientific-docs#>
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
`;

const sparql = (query) => d3.sparql(SPARQL_URL, `${prefix} ${query}`);

module.exports = sparql;
