import { useReview } from './ReviewContext.jsx'
import { HeadPill, NoFlags } from '../../ui/Pills.jsx'

/* Секция ревью: заголовок с тёмной линейкой + пилюли состояния справа.
   Пилюли считает контекст — они тают по мере резолва флагов. */
export function Section({ id, title, children }) {
  const { counts } = useReview()
  const c = counts.bySection[id] || { rev: 0, nf: 0 }
  const flagged = c.rev || c.nf

  return (
    <section className="sec" id={id}>
      <div className="sec-head">
        <h2>{title}</h2>
        <span className="head-pills">
          {flagged ? (
            <>
              {c.rev > 0 && <HeadPill kind="rev">{c.rev} REVIEW</HeadPill>}
              {c.nf > 0 && <HeadPill kind="nf">{c.nf} NOT FOUND</HeadPill>}
            </>
          ) : (
            <NoFlags />
          )}
        </span>
      </div>
      {children}
    </section>
  )
}
