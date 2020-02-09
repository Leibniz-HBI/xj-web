var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { useDataStateContext } from './useData';
import { useFiltersStateContext, useFiltersDispatchContext, SET_CATEGORIES } from './useFilters';
import uniq from 'lodash/uniq';

var useDataAsSegments = function useDataAsSegments(_ref) {
  var from = _ref.from,
      to = _ref.to,
      zoom = _ref.zoom,
      categories = _ref.categories;

  var data = useDataStateContext();
  var dispatchCat = useFiltersDispatchContext();
  var segments = React.useMemo(function () {
    var segments = [];
    if (data.domain) {
      from = from || Math.floor(data.domain[0].year() / 10) * 10;
      to = to || Math.ceil(data.domain[1].year() / 10) * 10;
      var domainDiff = to - from;
      var loopIndex = 0;
      // filter categories
      var allTerms = data.terms;
      if (categories.length > 0) {
        allTerms = allTerms.filter(function (t) {
          return categories.indexOf(t.categories[0]) > -1;
        });
      }
      // set categories and filter them
      dispatchCat({
        type: SET_CATEGORIES,
        payload: uniq(allTerms.map(function (i) {
          return i.categories[0];
        }))
      });
      segments = Array.from(Array(Math.ceil(domainDiff / zoom)).keys()).map(function (_v, i) {
        var segFrom = from + zoom * i;
        var segTo = segFrom + zoom;
        // set terms for the current segment
        var terms = [];
        for (; loopIndex < allTerms.length; loopIndex++) {
          var term = allTerms[loopIndex];
          if (term.start.year() < segTo) {
            if (term.start.year() >= segFrom) {
              terms.push(term);
            }
          } else {
            break;
          }
        }
        return {
          from: segFrom,
          to: segTo,
          terms: terms
        };
      });
    }
    // yearly view
    if (zoom === 1) {
      // we remove empty segments
      segments = segments.filter(function (s) {
        return s.terms.length > 0;
      });
      // is a non continuous segment ?
      segments = segments.map(function (s, i, self) {
        return _extends({}, s, {
          nonContinuous: i < self.length - 1 && self[i + 1].from !== s.to
        });
      });
    }
    return segments;
  }, [data.domain, data.terms, categories, from, to, zoom]);
  return segments;
};

export default useDataAsSegments;