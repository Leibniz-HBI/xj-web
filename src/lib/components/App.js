import React from 'react';
import Segment from './Segment';
import Controls from './Controls';
import useDataAsSegments from '../hooks/useDataAsSegments';
import Box from '@material-ui/core/Box';
import { ZOOM_LEVELS } from '../constants';

var App = function App(_ref) {
  var from = _ref.from,
      to = _ref.to,
      _ref$categories = _ref.categories,
      categories = _ref$categories === undefined ? [] : _ref$categories,
      _ref$initialZoom = _ref.initialZoom,
      initialZoom = _ref$initialZoom === undefined ? 0 : _ref$initialZoom,
      onClick = _ref.onClick;

  var _React$useState = React.useState(initialZoom),
      zoomIndex = _React$useState[0],
      setZoomIndex = _React$useState[1];

  var segments = useDataAsSegments({
    from: from,
    to: to,
    zoom: ZOOM_LEVELS[zoomIndex],
    categories: categories
  });
  return React.createElement(
    Box,
    { bgcolor: 'background.default' },
    React.createElement(Controls, { zoomIndex: zoomIndex, onZoomChange: setZoomIndex }),
    segments.map(function (seg, i, self) {
      return React.createElement(
        'div',
        { key: seg.from },
        React.createElement(Segment, {
          segment: seg,
          continuous: ZOOM_LEVELS[zoomIndex] !== 1,
          onClick: onClick
          // sum previous terms, in order to know if the segment
          // should start with right aligned label
          , startRight: self.slice(0, i).reduce(function (prev, current) {
            return prev + current.terms.length;
          }, 0) % 2 === 0
        })
      );
    })
  );
};

export default App;