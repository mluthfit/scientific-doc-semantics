require('isomorphic-fetch');
const d3 = require('d3-sparql');

const SPARQL_URL = 'http://localhost:3030/friends/sparql';
const prefix = `
  PREFIX : <http://www.semanticweb.org/mluth/teman#> 
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
`;

const query = `
  ${prefix}

  SELECT ?email ?nama ?gender ?umur ?tempat_lahir ?hobi ?no_hp ?sd ?smp ?sma
  WHERE {
      ?id a :Person .
      ?id :email ?email .
      ?id :nama ?nama .
      ?id :gender ?gender .
      ?id :umur ?umur .
      ?id :tempat_lahir ?tempat_lahir .
      ?id :hobi ?hobi .
      ?id :no_hp ?no_hp .

      ?id :sd_di ?id_sd .
      ?id_sd a :SD .
      ?id_sd :nama_sekolah ?sd .

      ?id :smp_di ?id_smp .
      ?id_smp a :SMP .
      ?id_smp :nama_sekolah ?smp .

      ?id :sma_di ?id_sma .
      ?id_sma a :SMA .
      ?id_sma :nama_sekolah ?sma .

      FILTER(?umur = "20")
    }
`;

d3.sparql(SPARQL_URL, query).then((data) => {
  console.log(data);
});
