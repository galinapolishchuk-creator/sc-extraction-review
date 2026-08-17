import { createContext, useContext, useMemo, useState, useCallback, useRef } from 'react'
import { SECTIONS, FLAGS } from './data.js'

const ReviewContext = createContext(null)
export const useReview = () => useContext(ReviewContext)

const initialFlags = () =>
  Object.fromEntries(FLAGS.map((f) => [f.id, { ...f, resolved: f.resolved || null }]))

export function ReviewProvider({ children }) {
  const [flags, setFlags] = useState(initialFlags)
  const [toastMsg, setToastMsg] = useState('')
  const [activeSection, setActiveSection] = useState(SECTIONS[0][0])
  const [pdfClause, setPdfClause] = useState(null)
  const toastTimer = useRef(null)

  const toast = useCallback((m) => {
    setToastMsg(m)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 2400)
  }, [])

  /* Confirm / Link existing / правка значения — всё резолвит флаг (Req 4.1) */
  const resolve = useCallback((id, how = 'confirmed') => {
    setFlags((prev) => (prev[id]?.resolved ? prev : { ...prev, [id]: { ...prev[id], resolved: how } }))
  }, [])

  const undo = useCallback((id) => {
    setFlags((prev) => ({ ...prev, [id]: { ...prev[id], resolved: null } }))
  }, [])

  const viewInPdf = useCallback(
    (clause) => {
      setPdfClause({ clause, at: Date.now() })
      toast('PDF jumps to ' + clause + ' and highlights the clause.')
    },
    [toast]
  )

  /* счётчики: по секциям и общий — тают по мере резолва */
  const counts = useMemo(() => {
    const bySection = {}
    let rev = 0
    let nf = 0
    let flaggedSecs = 0
    SECTIONS.forEach(([id]) => {
      const open = FLAGS.filter((f) => f.section === id && !flags[f.id]?.resolved)
      const r = open.filter((f) => f.kind === 'rev').length
      const n = open.filter((f) => f.kind === 'nf').length
      bySection[id] = { rev: r, nf: n, has: FLAGS.some((f) => f.section === id) }
      if (r + n > 0) flaggedSecs++
      rev += r
      nf += n
    })
    const total = FLAGS.length
    return { bySection, rev, nf, flaggedSecs, total, resolved: total - rev - nf }
  }, [flags])

  const value = {
    flags,
    resolve,
    undo,
    counts,
    toast,
    toastMsg,
    activeSection,
    setActiveSection,
    viewInPdf,
    pdfClause,
  }
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
}
