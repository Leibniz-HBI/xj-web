import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import Circle from './CircleSvg'
import { WIDTH } from '../constants'

const HEIGHT = 120
const RADIUS = 2
const PADDING = RADIUS
const SPACING_CIRCLE = RADIUS * 2 + 4

const ContinuousSegment = ({ segment: { from, to, terms }, onClick }) => {
  const lines = []
  for (let index = 0; index < to - from; index++) {
    let year = from + index
    lines.push({
      year,
      terms: terms.filter(t => t.start.year() === year),
    })
  }
  return (
    <svg height={HEIGHT} width={WIDTH}>
      <LineSvg />
      {lines.map(({ year, terms }, lineIdx) => {
        if (lines.length === 0) {
          return null
        }
        let x =
          WIDTH / 2 -
          (terms.length * RADIUS * 2 + (terms.length - 1) * 4) / 2 +
          RADIUS
        let y = (lineIdx / lines.length) * (HEIGHT - 2 * PADDING) + RADIUS
        return (
          <g key={year} transform={`translate(${x} ${y})`}>
            {terms.map((t, termIdx) => (
              <TermSvg
                radius={RADIUS}
                key={t.term}
                term={t}
                x={termIdx * SPACING_CIRCLE}
                y={0}
                withTooltip
                onClick={onClick}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

const LineSvg = () => {
  return (
    <line
      x1="50%"
      x2="50%"
      y1={PADDING}
      y2={HEIGHT - PADDING}
      stroke="black"
      strokeWidth={1}
      strokeOpacity={0.3}
    />
  )
}

const TermSvg = ({ x, y, radius, term, withTooltip, onClick }) => {
  const circle = (
    <Circle
      radius={radius}
      category={term.categories[0]}
      disabled={term.disabled}
    />
  )
  return (
    <g
      transform={`translate(${x} ${y})`}
      onClick={() => onClick && onClick(term)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {withTooltip ? (
        <Tooltip title={`${term.start.year()}: ${term.term}`}>
          <g>{circle}</g>
        </Tooltip>
      ) : (
        circle
      )}
    </g>
  )
}

TermSvg.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  withTooltip: PropTypes.bool,
  radius: PropTypes.number,
  term: PropTypes.shape({
    start: PropTypes.object.isRequired,
    term: PropTypes.string.isRequired,
  }),
}

export default ContinuousSegment
