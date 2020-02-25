import React from 'react';
import ReactDOM from 'react-dom';

import './styles/xj.css';

import XJournalism from './lib/lokaler-xjournalism.js';


ReactDOM.render(
  <div><XJournalism initialZoom={1} onClick={term => alert(JSON.stringify(term, null, '\t'))} /></div>,
  document.getElementsByClassName('app')[0]
);