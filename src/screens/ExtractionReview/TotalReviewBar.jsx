import { useEffect, useRef, useState } from 'react'
import { useReview } from './ReviewContext.jsx'
import { SECTIONS, FLAGS } from './data.js'
import { CountTag, CountCircle } from '../../ui/Pills.jsx'
import { CommitButton } from '../../ui/Buttons.jsx'
import { CheckIcon } from '../../ui/Icon.jsx'

/* ------------------------------------------------------------------
   Sticky total-review бар (спека 274:17028): контекст-строка + чипы секций.
   Активный чип ведёт scroll-spy; клик по флагованному чипу скроллит
   к первому НЕрезолвленному флагу секции и подсвечивает его.
   ------------------------------------------------------------------ */
export function TotalReviewBar({ onCommit }) {
  const { counts, flags, activeSection, setActiveSection } = useReview()
  const barRef = useRef(null)
  const sentinelRef = useRef(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([en]) => setStuck(!en.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const spy = () => {
      const bar = barRef.current
      if (!bar) return
      const barBottom = bar.getBoundingClientRect().bottom + 8
      let active = SECTIONS[0][0]
      for (const [id] of SECTIONS) {
        const node = document.getElementById(id)
        if (!node) continue
        if (node.getBoundingClientRect().top <= barBottom) active = id
        else break
      }
      setActiveSection(active)
    }
    spy()
    document.addEventListener('scroll', spy, { passive: true })
    return () => document.removeEventListener('scroll', spy)
  }, [setActiveSection])

  const jump = (secId) => {
    const open = FLAGS.filter((f) => f.section === secId && !flags[f.id]?.resolved)
    const target = open.length ? document.getElementById(open[0].id) : document.getElementById(secId)
    if (!target) return
    const barH = barRef.current ? barRef.current.offsetHeight : 0
    const y = target.getBoundingClientRect().top + window.scrollY - (barH + 18)
    window.scrollTo({ top: y, behavior: 'smooth' })
    if (open.length) {
      target.classList.remove('jump-flash')
      void target.offsetWidth
      target.classList.add('jump-flash')
    }
  }

  return (
    <>
      <div ref={sentinelRef} />
      <div ref={barRef} className={'bar-wrap' + (stuck ? ' stuck' : '')}>
        <div className="bar">
          <div className="bar-ctx">
            <b>
              {counts.resolved} of {counts.total} resolved
            </b>
            <span>·</span>
            {counts.rev > 0 && <CountTag kind="rev">{counts.rev} REVIEW</CountTag>}
            {counts.nf > 0 && <CountTag kind="nf">{counts.nf} NOT FOUND</CountTag>}
            <span className="ctx-secs">
              · {counts.flaggedSecs} of {SECTIONS.length} sections flagged
            </span>
            <span className="sp" />
            <CommitButton onClick={onCommit} />
          </div>
          <div className="chips">
            {SECTIONS.map(([id, label]) => {
              const c = counts.bySection[id] || { rev: 0, nf: 0 }
              const clean = c.rev + c.nf === 0
              return (
                <button
                  key={id}
                  className={'chip' + (activeSection === id ? ' active' : '')}
                  onClick={() => jump(id)}
                >
                  {label}
                  <span className="slot">
                    {c.rev > 0 && <CountCircle kind="rev">{c.rev}</CountCircle>}
                    {c.nf > 0 && <CountCircle kind="nf">{c.nf}</CountCircle>}
                    {clean && (
                      <span className="ok">
                        <CheckIcon />
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
