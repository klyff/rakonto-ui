import { useState } from 'react'
import { api } from '@root/api'

interface iUsePeopleApi {
  getSuggestions: (query: string) => void
  suggestions: string[]
  loading: boolean
}

export const useSuggestionApi = (): iUsePeopleApi => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([])
      return
    }
    setLoading(true)
    const data = await api.searchSuggestions(query)
    setSuggestions(data.suggestions)
    setLoading(false)
  }

  return {
    getSuggestions,
    suggestions,
    loading
  }
}
