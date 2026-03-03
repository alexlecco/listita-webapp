import { useRef, useEffect } from 'react'
import { useNote } from './useNote'
import './App.css'

const PREFIX = '- '

export default function App() {
  const { body, setBody } = useNote()
  const ref = useRef(null)

  // Auto-resize textarea height to fit content
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }, [body])

  // Place cursor at end on mount
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.focus()
    el.selectionStart = el.selectionEnd = el.value.length
  }, [])

  function handleKeyDown(e) {
    const el = ref.current
    if (!el) return

    if (e.key === 'Enter') {
      e.preventDefault()
      const { selectionStart, selectionEnd } = el
      const before = body.slice(0, selectionStart)
      const after = body.slice(selectionEnd)
      const newBody = before + '\n' + PREFIX + after
      setBody(newBody)

      // Move cursor after the new "- "
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 1 + PREFIX.length
      })
    }

    if (e.key === 'Backspace') {
      const { selectionStart, selectionEnd } = el
      if (selectionStart !== selectionEnd) return

      // If cursor is right after "- " at start of a line, remove the whole line
      const lineStart = body.lastIndexOf('\n', selectionStart - 1) + 1
      const lineContent = body.slice(lineStart, selectionStart)
      if (lineContent === PREFIX) {
        e.preventDefault()
        const before = body.slice(0, lineStart > 0 ? lineStart - 1 : 0)
        const after = body.slice(selectionStart)
        const newBody = lineStart > 0 ? before + after : PREFIX + after.slice(PREFIX.length)
        setBody(newBody)
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = Math.max(0, lineStart - 1)
        })
      }
    }
  }

  function handleChange(e) {
    let value = e.target.value

    // Ensure every line starts with "- "
    const lines = value.split('\n').map(line => {
      if (line === '') return PREFIX
      if (!line.startsWith(PREFIX)) return PREFIX + line.replace(/^-\s*/, '')
      return line
    })

    setBody(lines.join('\n'))
  }

  return (
    <div className="note">
      <h1 className="note-title">Listita</h1>
      <textarea
        ref={ref}
        className="note-body"
        value={body}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder={PREFIX}
      />
    </div>
  )
}
