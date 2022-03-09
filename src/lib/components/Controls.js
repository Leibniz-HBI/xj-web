import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FilterIcon from '@material-ui/icons/Label'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import { ZOOM_LEVELS } from '../constants'
import Circle from './CircleSvg'
import {
  useFiltersStateContext,
  useFiltersDispatchContext,
  selectCategory,
  deselectCategory,
  resetSelected,
} from '../hooks/useFilters'
import { Button, Typography } from '@material-ui/core'

const Controls = ({ zoomIndex, onZoomChange }) => {
  const [anchorEl, setSelectCatAnchorEl] = React.useState(null)
  const handleSelectCatClick = event => {
    setSelectCatAnchorEl(event.currentTarget)
  }
  const dispatchFilter = useFiltersDispatchContext()
  const handleSelectCatClose = () => {
    setSelectCatAnchorEl(null)
  }

  const selectCatId = open ? 'select-category' : undefined
  const { selected } = useFiltersStateContext()

  return (
    <Box position="sticky" top={0} zIndex={1}>
      <Box position="absolute">
        <div>
          <Popover
            id={selectCatId}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleSelectCatClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box p={2}>
              <CategoriesSelector />
            </Box>
          </Popover>
          <Tooltip title="Filter by categories">
            <IconButton onClick={handleSelectCatClick}>
              <FilterIcon color={selected.length > 0 ? 'primary' : 'action'} />
            </IconButton>
          </Tooltip>
          {selected.length > 0 && (
            <Box mt={1} m={2}>
              <Button
                size="small"
                onClick={() => dispatchFilter(resetSelected())}
              >
                Reset filter
              </Button>
              {selected.map(cat => (
                <Box key={cat} maxWidth={150} display="flex">
                  <Box mr={1} display="inline-block">
                    <Circle category={cat} radius={6} />
                  </Box>
                  <Typography variant="body2" noWrap>
                    {cat}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </div>
      </Box>
    </Box>
  )
}

Controls.propTypes = {}
export default Controls

const CategoriesSelector = () => {
  const { categories, selected } = useFiltersStateContext()
  const dispatch = useFiltersDispatchContext()
  return (
    <FormGroup>
      {categories.map(cat => (
        <FormControlLabel
          key={cat}
          control={
            <Checkbox
              checked={selected.indexOf(cat) > -1}
              onChange={(_e, isChecked) => {
                if (isChecked) {
                  dispatch(selectCategory(cat))
                } else {
                  dispatch(deselectCategory(cat))
                }
              }}
              value={cat}
            />
          }
          label={
            <div>
              <Box mr={1} display="inline-block">
                <Circle category={cat} radius={6} />
              </Box>
              {cat}
            </div>
          }
        />
      ))}
    </FormGroup>
  )
}
