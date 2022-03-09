import React from 'react'
import Segment from './Segment'
import Controls from './Controls'
import useDataAsSegments from '../hooks/useDataAsSegments'
import Box from '@material-ui/core/Box'
import { ZOOM_LEVELS } from '../constants'

const App = ({ from, to, categories = [], initialZoom = 0, onClick }) => {
  const [zoomIndex, setZoomIndex] = React.useState(initialZoom)
  let segments = useDataAsSegments({
    from,
    to,
    zoom: ZOOM_LEVELS[zoomIndex],
    categories,
  })

  segments.reverse()
  
  return (
    <Box bgcolor="background.default">
      <Controls zoomIndex={zoomIndex} onZoomChange={setZoomIndex} />
      {segments.map((seg, i, self) => (
        <div key={seg.from}>
          <Segment
            segment={seg}
            continuous={ZOOM_LEVELS[zoomIndex] !== 1}
            onClick={onClick}
            // sum previous terms, in order to know if the segment
            // should start with right aligned label
            startRight={
              self
                .slice(0, i)
                .reduce((prev, current) => prev + current.terms.length, 0) %
                2 ===
              0
            }
          />
        </div>
      ))}
    </Box>
  )
}

export default App
