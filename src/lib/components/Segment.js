import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContinuousSegment from './ContinuousSegment';
import NonContinuousSegment from './NonContinuousSegment';

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      textAlign: 'center'
    },
    title: {
      position: 'sticky',
      top: 0,
      backgroundColor: theme.palette.background.default
    }
  };
});

var Segment = function Segment(_ref) {
  var segment = _ref.segment,
      continuous = _ref.continuous,
      startRight = _ref.startRight,
      onClick = _ref.onClick;

  var classes = useStyles();
  var SegmentComponent = continuous ? ContinuousSegment : NonContinuousSegment;
  return React.createElement(
    'div',
    { className: classes.root },
    React.createElement(
      Typography,
      { className: classes.title },
      segment.from
    ),
    React.createElement(SegmentComponent, {
      segment: segment,
      startRight: startRight,
      onClick: onClick
    })
  );
};

export default Segment;