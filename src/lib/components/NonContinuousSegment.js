import React from 'react'
import { WIDTH } from '../constants'
import Circle from './CircleSvg'
import Typography from '@material-ui/core/Typography'

const PADDING = 20
const RADIUS = 6
const TERM_HEIGHT = RADIUS * 2 + 30
const Segment = ({
  segment: { from, to, terms, nonContinuous },
  startRight,
  onClick,
}) => {
  const height = terms.length * TERM_HEIGHT + 2 * PADDING
  return (
    <svg height={height} width={WIDTH}>
      <LineSvg nonContinuous={nonContinuous} height={height} />
      {terms.map((t, i) => (
        <TermSvg
          key={t.term}
          x={WIDTH / 2}
          y={i * TERM_HEIGHT + TERM_HEIGHT / 2 + PADDING}
          term={t}
          alignRight={i % 2 === (startRight ? 0 : 1)}
          onClick={onClick}
        />
      ))}
    </svg>
  )
}

const TermSvg = ({ x, y, term, alignRight, onClick }) => {
  let textProps = {
    textAnchor: 'end',
    x: 0 - RADIUS * 2,
    y: 5,
  }
  if (alignRight) {
    textProps = {
      ...textProps,
      textAnchor: 'start',
      x: 0 - textProps.x,
    }
  }
  return (
    <g
      transform={`translate(${x} ${y})`}
      onClick={() => onClick && onClick(term)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Circle
        category={term.categories[0]}
        radius={RADIUS}
        disabled={term.disabled}
      />
      <Typography component="text" variant="body2" {...textProps}>
        {term.term}
      </Typography>
    </g>
  )
}

const LineSvg = ({ nonContinuous, height }) => {
  return (
    <g>
      <line
        x1="50%"
        x2="50%"
        y1={0}
        y2={height - 2}
        stroke="black"
        strokeWidth={1}
        strokeOpacity={0.3}
      />
      {nonContinuous && (
        <line
          x1={WIDTH / 2 - 10}
          x2={WIDTH / 2 + 10}
          y1={height - 1}
          y2={height - 1}
          stroke="black"
          strokeWidth={1}
          strokeOpacity={0.3}
        />
      )}
    </g>
  )
}

export default Segment
