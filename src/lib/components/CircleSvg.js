import React from 'react'
import { useDataStateContext } from '../hooks/useData'

const Circle = ({ category, radius, disabled }) => {
  const { colorScale } = useDataStateContext()
  const color = disabled ? 'gray' : colorScale(category)
  return (
    <svg
      x={-radius}
      y={-radius}
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill={color}
        opacity={disabled ? 0.3 : 1}
      />
    </svg>
  )
}

Circle.displayName = 'CircleSvg'
export default Circle
