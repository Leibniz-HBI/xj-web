import React from 'react'
import { DataStateProvider } from './hooks/useData'
import { CategoriesStateProvider } from './hooks/useFilters'
import App from './components/App'

export default props => {
  return (
    <CategoriesStateProvider>
      <DataStateProvider>
        <App {...props} />
      </DataStateProvider>
    </CategoriesStateProvider>
  )
}
