import { useState, useEffect } from 'react'

const KEY = 'shopping-list'
const PREFIX = '- '

function bodyFromItems(items) {
  if (!items || items.length === 0) return PREFIX
  return items.map(t => PREFIX + t).join('\n') + '\n' + PREFIX
}

function itemsFromBody(body) {
  return body
    .split('\n')
    .map(line => line.replace(/^- ?/, '').trim())
    .filter(Boolean)
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return PREFIX
    const parsed = JSON.parse(raw)
    // support both old format (array) and new format ({ items })
    const items = Array.isArray(parsed) ? parsed.map(i => i.text ?? i) : parsed.items ?? []
    return bodyFromItems(items)
  } catch {
    return PREFIX
  }
}

export function useNote() {
  const [body, setBody] = useState(load)

  useEffect(() => {
    const items = itemsFromBody(body)
    localStorage.setItem(KEY, JSON.stringify({ items }))
  }, [body])

  return { body, setBody, items: itemsFromBody(body) }
}
