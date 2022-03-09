import React, { createContext, useContext, useReducer } from 'react'
import dayjs from 'dayjs'
import { csvParse } from 'd3-dsv'
import { schemeSet2 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
import dataRaw from '../data/data.csv'
import {
  useFiltersStateContext,
  useFiltersDispatchContext,
} from './useFilters'

const StateContext = createContext()
const DispatchContext = createContext()

const SET_TERMS = 'XJ/DATA/SET_TERMS'
const SET_DOMAIN = 'XJ/DATA/SET_DOMAIN'
const SET_HIGHLIGHTED_TERMS = 'XJ/DATA/SET_HIGHLIGHTED_TERMS'
const SET_COLOR_SCALE = 'XJ/DATA/SET_COLOR_SCALE'

const __initialState = {
  domain: null,
  terms: [],
  colorScale: null,
}

const __reducer = (state, action) => {
  switch (action.type) {
    case SET_TERMS:
      return {
        ...state,
        terms: action.payload,
      }
    case SET_COLOR_SCALE:
      return {
        ...state,
        colorScale: action.payload,
      }
    case SET_DOMAIN:
      return {
        ...state,
        domain: action.payload,
      }
    case SET_HIGHLIGHTED_TERMS:
      return __reducer(state, {
        type: SET_TERMS,
        payload: state.terms.map(t => ({
          ...t,
          disabled:
            action.payload.cats.length > 0 &&
            action.payload.cats.indexOf(t.categories[0]) === -1,
        })),
      })
    default:
      return { ...state }
  }
}

export const DataStateProvider = ({
  reducer = __reducer,
  initialState = __initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchCat = useFiltersDispatchContext()
  const { selected: selectedCats } = useFiltersStateContext()

  const computeDomain = terms => {
    const allDates = terms.map(i => i.start)
    return [
      new dayjs(Math.min.apply(null, allDates)),
      new dayjs(Math.max.apply(null, allDates)),
    ]
  }
  var accent = scaleOrdinal(schemeSet2)

  // Downloads the data and hydrates some fields. Runs only once at startup
  React.useEffect(() => {
    // const data = csvParse(dataRaw)
    const data = dataRaw;
    let items = data
      .filter(d => d.appeared_year && d.appeared_year.length > 10)
      .map(d => ({
        ...d,
        id: d.id,
        content: d.term,
        start: dayjs(new Date(d.appeared_year.slice(0, 10))),
        parent: d.parent_id ? d.parent_id : null,
        categories: d.categories.split(', '),
      }))
      .filter(d => !!d)
      .sort((a, b) => a.start - b.start)

    // set the terms
    dispatch({
      type: SET_TERMS,
      payload: items,
    })
    // set the color scale
    dispatch({
      type: SET_COLOR_SCALE,
      payload: accent,
    })
    // Set the domain (for the scale)
    dispatch({
      type: SET_DOMAIN,
      payload: computeDomain(items),
    })
  }, [dispatchCat])

  // when a category change, update the selected terms
  React.useEffect(() => {
    dispatch({
      type: SET_HIGHLIGHTED_TERMS,
      payload: { cats: selectedCats },
    })
  }, [selectedCats])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useDataStateContext = () => useContext(StateContext)
export const useDataDispatchContext = () => useContext(DispatchContext)
