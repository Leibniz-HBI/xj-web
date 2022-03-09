import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContinuousSegment from './ContinuousSegment'
import NonContinuousSegment from './NonContinuousSegment'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  title: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
  },
}))

const Segment = ({ segment, continuous, startRight, onClick }) => {
  const classes = useStyles()
  const SegmentComponent = continuous ? ContinuousSegment : NonContinuousSegment
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{segment.from}</Typography>
      <SegmentComponent
        segment={segment}
        startRight={startRight}
        onClick={onClick}
      />
    </div>
  )
}

export default Segment
