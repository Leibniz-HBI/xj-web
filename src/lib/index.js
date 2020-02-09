import React from 'react';
import { DataStateProvider } from './hooks/useData';
import { CategoriesStateProvider } from './hooks/useFilters';
import App from './components/App';

export default (function (props) {
  return React.createElement(
    CategoriesStateProvider,
    null,
    React.createElement(
      DataStateProvider,
      null,
      React.createElement(App, props)
    )
  );
});

