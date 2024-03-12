import { ReactNode, createContext, useState } from 'react'

export type ExploreContext = {
  query: string
  setQuery: (value: string) => void
}

export const ExploreContext = createContext({} as ExploreContext)

export function ExploreContextProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')

  return (
    <ExploreContext.Provider value={{ query, setQuery }}>
      {children}
    </ExploreContext.Provider>
  )
}
