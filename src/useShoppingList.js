import { useState, useEffect } from 'react'

const STORAGE_KEY = 'shopping-list'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useShoppingList() {
  const [items, setItems] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    setItems(prev => [...prev, { id: Date.now(), text: trimmed, checked: false }])
  }

  function toggleItem(id) {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    )
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function clearChecked() {
    setItems(prev => prev.filter(item => !item.checked))
  }

  function clearAll() {
    setItems([])
  }

  return { items, addItem, toggleItem, removeItem, clearChecked, clearAll }
}
