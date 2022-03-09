import React from 'react'
import { useDataStateContext } from './useData'
import {
  useFiltersStateContext,
  useFiltersDispatchContext,
  SET_CATEGORIES,
} from './useFilters'
import uniq from 'lodash/uniq'

const useDataAsSegments = ({ from, to, zoom, categories }) => {
  const data = useDataStateContext()
  const dispatchCat = useFiltersDispatchContext()
  const segments = React.useMemo(() => {
    let segments = []
    if (data.domain) {
      from = from || Math.floor(data.domain[0].year() / 10) * 10
      to = to || Math.ceil(data.domain[1].year() / 10) * 10
      let domainDiff = to - from
      let loopIndex = 0
      // filter categories
      let allTerms = data.terms
      if (categories.length > 0) {
        allTerms = allTerms.filter(
          t => categories.indexOf(t.categories[0]) > -1
        )
      }
      // set categories and filter them
      dispatchCat({
        type: SET_CATEGORIES,
        payload: uniq(allTerms.map(i => i.categories[0])),
      })
      segments = Array.from(Array(Math.ceil(domainDiff / zoom)).keys()).map(
        (_v, i) => {
          let segFrom = from + zoom * i
          let segTo = segFrom + zoom
          // set terms for the current segment
          let terms = []
          for (; loopIndex < allTerms.length; loopIndex++) {
            const term = allTerms[loopIndex]
            if (term.start.year() < segTo) {
              if (term.start.year() >= segFrom) {
                terms.push(term)
              }
            } else {
              break
            }
          }
          return {
            from: segFrom,
            to: segTo,
            terms,
          }
        }
      )
    }
    // yearly view
    if (zoom === 1) {
      // we remove empty segments
      segments = segments.filter(s => s.terms.length > 0)
      // is a non continuous segment ?
      segments = segments.map((s, i, self) => ({
        ...s,
        nonContinuous: i < self.length - 1 && self[i + 1].from !== s.to,
      }))
    }
    return segments
  }, [data.domain, data.terms, categories, from, to, zoom])
  return segments
}

export default useDataAsSegments
