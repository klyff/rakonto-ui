import { useState, useRef, useCallback, useEffect } from 'react'

const useStateCallback = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState)
  const cbRef = useRef<((state: T) => void) | null>(null) // init mutable ref container for callbacks

  const setStateCallback = useCallback((state: T, cb: ((state: T) => void) | null) => {
    cbRef.current = cb
    setState(state)
  }, [])

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null
    }
  }, [state])

  return [state, setStateCallback]
}

export default useStateCallback
