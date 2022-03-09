import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()
export const DispatchContext = createContext()

export const SET_CATEGORIES = 'XJ/FILTERS/SET_CATEGORIES'
const SELECT_CATEGORY = 'XJ/FILTERS/SELECT_CATEGORY'
const DESELECT_CATEGORY = 'XJ/FILTERS/DESELECT_CATEGORY'
const RESET_SELECTED = 'XJ/FILTERS/RESET_SELECTED'

const __initialState = {
  categories: [],
  selected: [],
}

const __reducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selected: [...state.selected, action.payload],
      }
    case DESELECT_CATEGORY:
      let index = state.selected.indexOf(action.payload)
      let newSelected = [...state.selected]
      newSelected.splice(index, 1)
      return {
        ...state,
        selected: newSelected,
      }
    case RESET_SELECTED:
      return {
        ...state,
        selected: [],
      }
    default:
      return { ...state }
  }
}

export const CategoriesStateProvider = ({
  reducer = __reducer,
  initialState = __initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}
export const selectCategory = cat => ({
  type: SELECT_CATEGORY,
  payload: cat,
})
export const deselectCategory = cat => ({
  type: DESELECT_CATEGORY,
  payload: cat,
})
export const resetSelected = () => ({
  type: RESET_SELECTED,
})
export const useFiltersStateContext = () => useContext(StateContext)
export const useFiltersDispatchContext = () => useContext(DispatchContext)
