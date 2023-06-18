import { useState, useEffect } from "react"

export function useLocalStorage(key) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(key))
    if (storedItems) {
      setItems(storedItems)
    }
  }, [key])

  return [items, setItems]
}

export function getItem(key) {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
