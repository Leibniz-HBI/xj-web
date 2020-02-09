import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FilterIcon from '@material-ui/icons/Label';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { ZOOM_LEVELS } from '../constants';
import Circle from './CircleSvg';
import { useFiltersStateContext, useFiltersDispatchContext, selectCategory, deselectCategory, resetSelected } from '../hooks/useFilters';
import { Button, Typography } from '@material-ui/core';

var Controls = function Controls(_ref) {
  var zoomIndex = _ref.zoomIndex,
      onZoomChange = _ref.onZoomChange;

  var _React$useState = React.useState(null),
      anchorEl = _React$useState[0],
      setSelectCatAnchorEl = _React$useState[1];

  var handleSelectCatClick = function handleSelectCatClick(event) {
    setSelectCatAnchorEl(event.currentTarget);
  };
  var dispatchFilter = useFiltersDispatchContext();
  var handleSelectCatClose = function handleSelectCatClose() {
    setSelectCatAnchorEl(null);
  };

  var selectCatId = open ? 'select-category' : undefined;

  var _useFiltersStateConte = useFiltersStateContext(),
      selected = _useFiltersStateConte.selected;

  return React.createElement(
    Box,
    { position: 'sticky', top: 0, zIndex: 1 },
    React.createElement(
      Box,
      { position: 'absolute' },
      React.createElement(
        'div',
        null,
        React.createElement(
          IconButton,
          {
            onClick: function onClick() {
              return onZoomChange(zoomIndex + 1);
            },
            disabled: zoomIndex === ZOOM_LEVELS.length - 1
          },
          React.createElement(ZoomInIcon, null)
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          IconButton,
          {
            onClick: function onClick() {
              return onZoomChange(zoomIndex - 1);
            },
            disabled: zoomIndex === 0
          },
          React.createElement(ZoomOutIcon, null)
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          Popover,
          {
            id: selectCatId,
            open: Boolean(anchorEl),
            anchorEl: anchorEl,
            onClose: handleSelectCatClose,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          },
          React.createElement(
            Box,
            { p: 2 },
            React.createElement(CategoriesSelector, null)
          )
        ),
        React.createElement(
          Tooltip,
          { title: 'Filter by categories' },
          React.createElement(
            IconButton,
            { onClick: handleSelectCatClick },
            React.createElement(FilterIcon, { color: selected.length > 0 ? 'primary' : 'action' })
          )
        ),
        selected.length > 0 && React.createElement(
          Box,
          { mt: 1, m: 2 },
          React.createElement(
            Button,
            {
              size: 'small',
              onClick: function onClick() {
                return dispatchFilter(resetSelected());
              }
            },
            'Reset filter'
          ),
          selected.map(function (cat) {
            return React.createElement(
              Box,
              { key: cat, maxWidth: 150, display: 'flex' },
              React.createElement(
                Box,
                { mr: 1, display: 'inline-block' },
                React.createElement(Circle, { category: cat, radius: 6 })
              ),
              React.createElement(
                Typography,
                { variant: 'body2', noWrap: true },
                cat
              )
            );
          })
        )
      )
    )
  );
};

Controls.propTypes = process.env.NODE_ENV !== "production" ? {} : {};
export default Controls;

var CategoriesSelector = function CategoriesSelector() {
  var _useFiltersStateConte2 = useFiltersStateContext(),
      categories = _useFiltersStateConte2.categories,
      selected = _useFiltersStateConte2.selected;

  var dispatch = useFiltersDispatchContext();
  return React.createElement(
    FormGroup,
    null,
    categories.map(function (cat) {
      return React.createElement(FormControlLabel, {
        key: cat,
        control: React.createElement(Checkbox, {
          checked: selected.indexOf(cat) > -1,
          onChange: function onChange(_e, isChecked) {
            if (isChecked) {
              dispatch(selectCategory(cat));
            } else {
              dispatch(deselectCategory(cat));
            }
          },
          value: cat
        }),
        label: React.createElement(
          'div',
          null,
          React.createElement(
            Box,
            { mr: 1, display: 'inline-block' },
            React.createElement(Circle, { category: cat, radius: 6 })
          ),
          cat
        )
      });
    })
  );
};