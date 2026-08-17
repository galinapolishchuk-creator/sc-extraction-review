import { useReview } from './ReviewContext.jsx'
import { InfoIcon, CheckIcon, UndoIcon } from '../../ui/Icon.jsx'
import { MiniButton, UndoButton, MatchButton } from '../../ui/Buttons.jsx'

const cx = (...a) => a.filter(Boolean).join(' ')

/* Полоса резолва: teal-галочка + «Confirmed»/«Corrected» + Undo (200:14894) */
function ResolvedRow({ id, how, style }) {
  const { undo } = useReview()
  return (
    <div className="frow" style={style}>
      <span className="why">
        <CheckIcon style={{ stroke: 'var(--positive)' }} />
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

/* ------------------------------------------------------------------
   Баннер совпадения сущности у райтера — мастер `Alert` (412:683).
   Три состояния: notice → linked / created. Резолв НЕ схлопывается в
   «Confirmed»: приходит зелёная плашка со своим текстом и Undo.
   ------------------------------------------------------------------ */
export function MatchFlag({ id, why, linkedText, createdText }) {
  const { flags, resolve, undo } = useReview()
  const flag = flags[id]
  if (!flag) return null
  const done = flag.resolved

  if (done) {
    return (
      <div id={id} className="ffield resolved mbanner done" style={{ margin: '0 0 20px' }}>
        <span>{done === 'created' ? createdText : linkedText}</span>
        <span className="acts">
          <button className="mbtn undo" onClick={() => undo(id)}>
            <UndoIcon /> Undo
          </button>
        </span>
      </div>
    )
  }

  return (
    <div id={id} className="ffield mbanner notice" style={{ margin: '0 0 20px' }}>
      <span>{why}</span>
      <span className="acts">
        <MatchButton tone="w" onClick={() => resolve(id, 'linked')}>
          Link Existing
        </MatchButton>
        <MatchButton tone="g" onClick={() => resolve(id, 'created')}>
          Create New
        </MatchButton>
      </span>
    </div>
  )
}
