import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import Circle from './CircleSvg';
import { WIDTH } from '../constants';

var HEIGHT = 120;
var RADIUS = 4;
var PADDING = RADIUS;
var SPACING_CIRCLE = RADIUS * 2 + 4;

var ContinuousSegment = function ContinuousSegment(_ref) {
  var _ref$segment = _ref.segment,
      from = _ref$segment.from,
      to = _ref$segment.to,
      terms = _ref$segment.terms,
      onClick = _ref.onClick;

  var lines = [];

  var _loop = function _loop(index) {
    var year = from + index;
    lines.push({
      year: year,
      terms: terms.filter(function (t) {
        return t.start.year() === year;
      })
    });
  };

  for (var index = 0; index < to - from; index++) {
    _loop(index);
  }
  return React.createElement(
    'svg',
    { height: HEIGHT, width: WIDTH },
    React.createElement(LineSvg, null),
    lines.map(function (_ref2, lineIdx) {
      var year = _ref2.year,
          terms = _ref2.terms;

      if (lines.length === 0) {
        return null;
      }
      var x = WIDTH / 2 - (terms.length * RADIUS * 2 + (terms.length - 1) * 4) / 2 + RADIUS;
      var y = lineIdx / lines.length * (HEIGHT - 2 * PADDING) + RADIUS;
      return React.createElement(
        'g',
        { key: year, transform: 'translate(' + x + ' ' + y + ')' },
        terms.map(function (t, termIdx) {
          return React.createElement(TermSvg, {
            radius: RADIUS,
            key: t.term,
            term: t,
            x: termIdx * SPACING_CIRCLE,
            y: 0,
            withTooltip: true,
            onClick: onClick
          });
        })
      );
    })
  );
};

var LineSvg = function LineSvg() {
  return React.createElement('line', {
    x1: '50%',
    x2: '50%',
    y1: PADDING,
    y2: HEIGHT - PADDING,
    stroke: 'black',
    strokeWidth: 1,
    strokeOpacity: 0.3
  });
};

var TermSvg = function TermSvg(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      radius = _ref3.radius,
      term = _ref3.term,
      withTooltip = _ref3.withTooltip,
      _onClick = _ref3.onClick;

  var circle = React.createElement(Circle, {
    radius: radius,
    category: term.categories[0],
    disabled: term.disabled
  });
  return React.createElement(
    'g',
    {
      transform: 'translate(' + x + ' ' + y + ')',
      onClick: function onClick() {
        return _onClick && _onClick(term);
      },
      style: { cursor: _onClick ? 'pointer' : 'default' }
    },
    withTooltip ? React.createElement(
      Tooltip,
      { title: term.start.year() + ': ' + term.term },
      React.createElement(
        'g',
        null,
        circle
      )
    ) : circle
  );
};

TermSvg.propTypes = process.env.NODE_ENV !== "production" ? {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  withTooltip: PropTypes.bool,
  radius: PropTypes.number,
  term: PropTypes.shape({
    start: PropTypes.object.isRequired,
    term: PropTypes.string.isRequired
  })
} : {};

export default ContinuousSegment;