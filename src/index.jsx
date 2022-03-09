import React from 'react';
import ReactDOM from 'react-dom';

import './styles/xj.css';

import XJournalism from './lib';

const bodyElem = document.getElementsByTagName("body")[0];
const detailElem = document.getElementsByClassName("detail")[0];
const detailDataElem = document.getElementsByClassName("detail-data")[0];
const detailCloseElem = document.getElementsByClassName("detail-close")[0];

const showTerm = term => {
  console.info(term);
  detailElem.classList.toggle("detail--show");
  bodyElem.classList.toggle("body--noscroll");
  detailDataElem.innerHTML = `
  <p>
    <h4>${term.term}</h4>
    This journalism term first appeared in a New York Times article from ${term.appeared_year.substr(0,10)},
    the number of Google Scholar search results is ${term.search_results_gscholar}. We decided to file it under "${term.categories}".
  </p>
  ${term.definition ? '<p><h5 class="h5">Definition</h5>'+term.definition+'</p>' : ''}
  <p>
    <h5 class="h5">Sources</h5>
    <ul class="sources">
      <li>${term.source_1_citation} ${term.source_1_doi ? '<a class="a--small" href="'+ term.source_1_doi +'" target="_blank">→</a>' : ''}</li>
      <li>${term.source_2_citation} ${term.source_2_doi ? '<a class="a--small" href="'+ term.source_2_doi +'" target="_blank">→</a>' : ''}</li>
      <li>${term.source_3_citation} ${term.source_3_doi ? '<a class="a--small" href="'+ term.source_3_doi +'" target="_blank">→</a>' : ''}</li>
  </p>
  `
}

const closeTerm = () => {
  detailElem.classList.toggle("detail--show");
  bodyElem.classList.toggle("body--noscroll");
}

detailCloseElem.addEventListener("click", closeTerm);

ReactDOM.render(
  <div>
    <XJournalism from={1840} to={2021} initialZoom={1} onClick={term => showTerm(term)} />
  </div>,
  document.getElementsByClassName('app')[0]
);