import { useReview } from './ReviewContext.jsx'
import { InfoIcon, CheckIcon } from '../../ui/Icon.jsx'
import { MiniButton, UndoButton, MatchButton } from '../../ui/Buttons.jsx'

const cx = (...a) => a.filter(Boolean).join(' ')

/* Полоса резолва: teal-галочка + «Confirmed»/«Corrected» + Undo (200:14894) */
function ResolvedRow({ id, how, style }) {
  const { undo } = useReview()
  return (
    <div className="frow" style={style}>
      <span className="why">
        <CheckIcon style={{ stroke: 'var(--teal)' }} />
        {how === 'edited' ? 'Corrected' : 'Confirmed'}
      </span>
      <UndoButton onClick={() => undo(id)} />
    </div>
  )
}

/* ------------------------------------------------------------------
   Флагованное поле по мастеру `fields with action bar`.
   kind=rev — рамка warning, полоса с причиной + View in PDF + Confirm.
   kind=nf  — красная рамка, лейбл уходит в placeholder, полоса без кнопок
              (резолв — вводом значения).
   ------------------------------------------------------------------ */
export function FlagField({ id, label, value, placeholder, why, pdf, width, style, after }) {
  const { flags, resolve, viewInPdf } = useReview()
  const flag = flags[id]
  if (!flag) return null
  const nf = flag.kind === 'nf'
  const done = !!flag.resolved

  return (
    <div
      id={id}
      className={cx('fld', 'ffield', nf && 'nf', done && 'resolved')}
      style={{ ...(width ? { width } : null), ...style }}
    >
      {(!nf || done) && label != null && <span className="nl">{label}</span>}
      <div className="box">
        <input
          defaultValue={value ?? ''}
          {...(placeholder ? { placeholder } : null)}
          onInput={() => resolve(id, 'edited')}
        />
        {after}
      </div>
      {done ? (
        <ResolvedRow id={id} how={flag.resolved} />
      ) : nf ? (
        <div className="frow">
          <span className="why">
            <InfoIcon nf /> {why}
          </span>
        </div>
      ) : (
        <div className="frow">
          <span className="why">{why}</span>
          {/* блок кнопок — отдельный контейнер: у полосы justify-between, между кнопками gap 6 */}
          <span className="fact">
            <MiniButton variant="out" onClick={() => viewInPdf(pdf)}>
              View in PDF
            </MiniButton>
            <MiniButton variant="conf" onClick={() => resolve(id, 'confirmed')}>
              Confirm
            </MiniButton>
          </span>
        </div>
      )}
    </div>
  )
}

/* Баннер совпадения сущности у райтера: warn-полоса + Link Existing / Create New */
export function MatchFlag({ id, why }) {
  const { flags, resolve } = useReview()
  const flag = flags[id]
  if (!flag) return null
  const done = !!flag.resolved
  const style = { margin: '0 0 20px' }

  return (
    <div id={id} className={cx('fld', 'ffield', done && 'resolved')}>
      {done ? (
        <ResolvedRow id={id} how={flag.resolved} style={style} />
      ) : (
        <div className="frow match" style={style}>
          <span className="why">{why}</span>
          <MatchButton tone="w" onClick={() => resolve(id, 'confirmed')}>
            Link Existing
          </MatchButton>
          <MatchButton tone="g" onClick={() => resolve(id, 'confirmed')}>
            Create New
          </MatchButton>
        </div>
      )}
    </div>
  )
}
