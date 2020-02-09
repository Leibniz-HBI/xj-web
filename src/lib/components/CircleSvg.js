import React from 'react';
import { useDataStateContext } from '../hooks/useData';

var Circle = function Circle(_ref) {
  var category = _ref.category,
      radius = _ref.radius,
      disabled = _ref.disabled;

  var _useDataStateContext = useDataStateContext(),
      colorScale = _useDataStateContext.colorScale;

  var color = disabled ? 'gray' : colorScale(category);
  return React.createElement(
    'svg',
    {
      x: -radius,
      y: -radius,
      width: radius * 2,
      height: radius * 2,
      viewBox: '0 0 ' + radius * 2 + ' ' + radius * 2
    },
    React.createElement('circle', {
      cx: radius,
      cy: radius,
      r: radius,
      fill: color,
      opacity: disabled ? 0.3 : 1
    })
  );
};

Circle.displayName = 'CircleSvg';
export default Circle;