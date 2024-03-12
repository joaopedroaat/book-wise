import { ExploreContext } from '@/contexts/ExploreContext'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { FormEvent, useContext, useEffect, useState } from 'react'

export function SearchInput() {
  const { query, setQuery } = useContext(ExploreContext)
  const [term, setTerm] = useState(query)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(term)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [setQuery, term])

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    setQuery(term)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border border-gray-500 text-gray-300 placeholder:text-gray-400 px-4 py-2 rounded-md focus-within:outline focus-within:outline-gray-500"
    >
      <input
        type="text"
        placeholder="Buscar livro ou autor"
        className="bg-gray-800 outline-none"
        value={term}
        onChange={(evt) => setTerm(evt.target.value)}
      />
      <MagnifyingGlass className="text-gray-500" size={20} />
    </form>
  )
}
