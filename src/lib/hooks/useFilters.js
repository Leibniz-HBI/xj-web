var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { createContext, useContext, useReducer } from 'react';

export var StateContext = createContext();
export var DispatchContext = createContext();

export var SET_CATEGORIES = 'XJ/FILTERS/SET_CATEGORIES';
var SELECT_CATEGORY = 'XJ/FILTERS/SELECT_CATEGORY';
var DESELECT_CATEGORY = 'XJ/FILTERS/DESELECT_CATEGORY';
var RESET_SELECTED = 'XJ/FILTERS/RESET_SELECTED';

var __initialState = {
  categories: [],
  selected: []
};

var __reducer = function __reducer(state, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return _extends({}, state, {
        categories: action.payload
      });
    case SELECT_CATEGORY:
      return _extends({}, state, {
        selected: [].concat(state.selected, [action.payload])
      });
    case DESELECT_CATEGORY:
      var index = state.selected.indexOf(action.payload);
      var newSelected = [].concat(state.selected);
      newSelected.splice(index, 1);
      return _extends({}, state, {
        selected: newSelected
      });
    case RESET_SELECTED:
      return _extends({}, state, {
        selected: []
      });
    default:
      return _extends({}, state);
  }
};

export var CategoriesStateProvider = function CategoriesStateProvider(_ref) {
  var _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === undefined ? __reducer : _ref$reducer,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === undefined ? __initialState : _ref$initialState,
      children = _ref.children;

  var _useReducer = useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React.createElement(
    DispatchContext.Provider,
    { value: dispatch },
    React.createElement(
      StateContext.Provider,
      { value: state },
      children
    )
  );
};
export var selectCategory = function selectCategory(cat) {
  return {
    type: SELECT_CATEGORY,
    payload: cat
  };
};
export var deselectCategory = function deselectCategory(cat) {
  return {
    type: DESELECT_CATEGORY,
    payload: cat
  };
};
export var resetSelected = function resetSelected() {
  return {
    type: RESET_SELECTED
  };
};
export var useFiltersStateContext = function useFiltersStateContext() {
  return useContext(StateContext);
};
export var useFiltersDispatchContext = function useFiltersDispatchContext() {
  return useContext(DispatchContext);
};