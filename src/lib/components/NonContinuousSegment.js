var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { WIDTH } from '../constants';
import Circle from './CircleSvg';
import Typography from '@material-ui/core/Typography';

var PADDING = 10;
var RADIUS = 10;
var TERM_HEIGHT = RADIUS * 2 + 20;
var Segment = function Segment(_ref) {
  var _ref$segment = _ref.segment,
      from = _ref$segment.from,
      to = _ref$segment.to,
      terms = _ref$segment.terms,
      nonContinuous = _ref$segment.nonContinuous,
      startRight = _ref.startRight,
      onClick = _ref.onClick;

  var height = terms.length * TERM_HEIGHT + 2 * PADDING;
  return React.createElement(
    'svg',
    { height: height, width: WIDTH },
    React.createElement(LineSvg, { nonContinuous: nonContinuous, height: height }),
    terms.map(function (t, i) {
      return React.createElement(TermSvg, {
        key: t.term,
        x: WIDTH / 2,
        y: i * TERM_HEIGHT + TERM_HEIGHT / 2 + PADDING,
        term: t,
        alignRight: i % 2 === (startRight ? 0 : 1),
        onClick: onClick
      });
    })
  );
};

var TermSvg = function TermSvg(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      term = _ref2.term,
      alignRight = _ref2.alignRight,
      _onClick = _ref2.onClick;

  var textProps = {
    textAnchor: 'end',
    x: 0 - RADIUS * 2,
    y: 5
  };
  if (alignRight) {
    textProps = _extends({}, textProps, {
      textAnchor: 'start',
      x: 0 - textProps.x
    });
  }
  return React.createElement(
    'g',
    {
      transform: 'translate(' + x + ' ' + y + ')',
      onClick: function onClick() {
        return _onClick && _onClick(term);
      },
      style: { cursor: _onClick ? 'pointer' : 'default' }
    },
    React.createElement(Circle, {
      category: term.categories[0],
      radius: RADIUS,
      disabled: term.disabled
    }),
    React.createElement(
      Typography,
      _extends({ component: 'text', variant: 'body2' }, textProps),
      term.term
    )
  );
};

var LineSvg = function LineSvg(_ref3) {
  var nonContinuous = _ref3.nonContinuous,
      height = _ref3.height;

  return React.createElement(
    'g',
    null,
    React.createElement('line', {
      x1: '50%',
      x2: '50%',
      y1: 0,
      y2: height - 2,
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 0.3
    }),
    nonContinuous && React.createElement('line', {
      x1: WIDTH / 2 - 10,
      x2: WIDTH / 2 + 10,
      y1: height - 1,
      y2: height - 1,
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 0.3
    })
  );
};

export default Segment;