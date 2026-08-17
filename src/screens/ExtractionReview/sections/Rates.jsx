import { useEffect, useMemo, useState } from 'react'
import { Section } from '../Section.jsx'
import { Field, Unit, QuarterYearField } from '../../../ui/Field.jsx'
import { Note } from '../../../ui/Layout.jsx'
import { PillInfo, MoreDetails } from '../../../ui/Pills.jsx'
import { SaveButton, DeleteButton, InlineLink, AddButton } from '../../../ui/Buttons.jsx'
import { Radio } from '../../../ui/Controls.jsx'
import { InfoIcon, PercentUnit, ChevronIcon } from '../../../ui/Icon.jsx'
import { RATE_TYPES, PR_RATES } from '../data.js'
import { useContract } from '../ContractContext.jsx'
import { useReview } from '../ReviewContext.jsx'

const OVERRIDES = [
  { type: 'Sync', splits: [{ territory: 'United States', rate: '92' }, { territory: 'Japan', rate: '50' }] },
  { type: 'Print', splits: [{ territory: 'Europe', rate: '70' }] },
  { type: 'Performance', splits: [{ territory: 'World', rate: '-' }] },
]

/* Ячейка активного сета: поле 140×42 + «= standard» либо NON-STANDARD + reset */
function StdCell({ type, cell, headline, wraparound, onEdit, onReset, disabled }) {
  const isWrap = type === 'Wraparound'
  const shown = cell.ghost ? headline : cell.value
  const bad = parseFloat(shown) > 100
  return (
    <div className="rmx-cell" data-type={type} style={isWrap && !wraparound ? { display: 'none' } : undefined}>
      <span className={'rmx-in' + (bad ? ' bad' : '')}>
        <input value={shown} inputMode="decimal" disabled={disabled} onChange={(e) => onEdit(type, e.target.value)} />
        <PercentUnit />
      </span>
      {isWrap ? null : cell.ghost ? (
        <span className="rmx-eq">= standard</span>
      ) : (
        <>
          <span className="rmx-tag">NON-STANDARD</span>
          <button className="rmx-reset" onClick={() => onReset(type)}>
            ×  <u>reset to standard</u>
          </button>
        </>
      )}
    </div>
  )
}

function RateHistoryPop({ pop, onClose }) {
  if (!pop) return null
  return (
    <div className="pop show" style={{ left: pop.left, top: pop.top }}>
      <h4>
        Rate history · {pop.kind === 'std' ? 'Standard' : 'Post Recoupment'}
        <button onClick={onClose}>✕</button>
      </h4>
      <div className="cur">Q2 2026 · Original · ● CURRENT</div>
      <div className="row">Headline 85% · non-standard: Sync 90 · Procured Sync 75 · Grand Rights 87.5</div>
      <div className="old">Q4 2025 · Superseded</div>
      <div className="row">Headline 80% · non-standard: Sync 88</div>
      <div className="foot">
        Read-only snapshot — selecting a prior set does not change rates until saved as a new set.
      </div>
    </div>
  )
}

export function Rates() {
  const { wraparound } = useContract()
  const { toast } = useReview()
  const [headline, setHeadline] = useState('85')
  const [activeSet, setActiveSet] = useState('std')
  const [ovOpen, setOvOpen] = useState(true)
  const [pop, setPop] = useState(null)

  /* ghost = ставка наследуется от Standard Rate; спец-ставка «своя» */
  const [cells, setCells] = useState(() =>
    Object.fromEntries(
      RATE_TYPES.filter(([, spec]) => spec !== 'EXCL').map(([t, spec]) => [
        t,
        spec === 'WRAP' ? { value: '50', ghost: false } : spec == null ? { value: '', ghost: true } : { value: String(spec), ghost: false },
      ])
    )
  )

  useEffect(() => {
    if (!pop) return
    const close = (e) => {
      if (!e.target.closest('.pop') && !e.target.closest('[data-hist]')) setPop(null)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [pop])

  const onEdit = (type, value) => setCells((c) => ({ ...c, [type]: { value, ghost: false } }))
  const onReset = (type) => setCells((c) => ({ ...c, [type]: { ...c[type], ghost: true } }))

  const anyBad = useMemo(
    () => Object.entries(cells).some(([, c]) => parseFloat(c.ghost ? headline : c.value) > 100),
    [cells, headline]
  )

  const openHist = (kind, e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPop({ kind, left: Math.min(r.left, window.innerWidth - 380), top: r.bottom + 8 })
  }

  const wrapStyle = wraparound ? undefined : { display: 'none' }

  return (
    <Section id="sec-rates" title="RATES">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, maxWidth: 1150 }}>
        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Rate Schedule</span>
        <PillInfo>EFFECTIVE Q2 2026 · ORIGINAL · CURRENT</PillInfo>
      </div>

      <div style={{ marginTop: 22 }}>
        <QuarterYearField label="Effective Date" quarter="Q2" year="2026" />
      </div>

      {/* Матрица ставок (291:90728): слева типы, активный сет — белая
          приподнятая карточка, неактивный лежит на фоне страницы. */}
      <div className="ratemx" style={{ marginTop: 25 }}>
        <div className="rmx-types">
          <div className="rmx-head">
            <Field label="Standard Rate">
              <input value={headline} inputMode="decimal" onChange={(e) => setHeadline(e.target.value)} />
              <InfoIcon />
              <PercentUnit />
            </Field>
            <button
              className="rmx-apply"
              onClick={() => toast('Standard Rate applied to every type without its own specific rate.')}
            >
              Apply
            </button>
          </div>
          {RATE_TYPES.map(([t, spec]) => (
            <div
              key={t}
              className={'rmx-trow' + (spec === 'EXCL' ? ' short' : '')}
              data-type={t}
              style={t === 'Wraparound' ? wrapStyle : undefined}
            >
              {t}
            </div>
          ))}
        </div>

        <div className={'rmx-col rmx-std' + (activeSet === 'std' ? ' on' : '')}>
          <div className="rmx-sethead">
            <div className="row">
              <Radio name="aset" value="std" checked={activeSet === 'std'} onChange={() => setActiveSet('std')}>
                STANDARD ROYALTY RATE (%)
              </Radio>
              <button className="rmx-hist" data-hist="std" onClick={(e) => openHist('std', e)}>
                Rate History (1)
              </button>
            </div>
          </div>
          {RATE_TYPES.map(([t, spec]) =>
            spec === 'EXCL' ? (
              <div key={t} className="rmx-cell short" data-type={t}>
                Not collected - see exclusions
              </div>
            ) : (
              <StdCell
                key={t}
                type={t}
                cell={cells[t]}
                headline={headline}
                wraparound={wraparound}
                onEdit={onEdit}
                onReset={onReset}
                disabled={activeSet !== 'std'}
              />
            )
          )}
        </div>

        <div className={'rmx-col rmx-pr' + (activeSet === 'pr' ? ' on' : '')}>
          <div className="rmx-sethead">
            <div className="row">
              <Radio name="aset" value="pr" checked={activeSet === 'pr'} onChange={() => setActiveSet('pr')}>
                POST RECOUPMENT RATE (%)
              </Radio>
              <button className="rmx-hist" data-hist="pr" onClick={(e) => openHist('pr', e)}>
                Rate History (1)
              </button>
            </div>
          </div>
          {RATE_TYPES.map(([t, spec], i) =>
            spec === 'EXCL' ? (
              <div key={t} className="rmx-cell short" data-type={t}>
                Not collected - see exclusions
              </div>
            ) : (
              <div key={t} className="rmx-cell" data-type={t} style={t === 'Wraparound' ? wrapStyle : undefined}>
                <span className="rmx-in">
                  <input defaultValue={PR_RATES[t]} inputMode="decimal" disabled={activeSet !== 'pr'} />
                  <PercentUnit muted={activeSet !== 'pr'} />
                </span>
                {/* «= standard» в неактивном сете стоит только у первого ряда */}
                {i === 0 && <span className="rmx-eq">= standard</span>}
              </div>
            )
          )}
        </div>
      </div>
      <div className={'badhint' + (parseFloat(headline) > 100 ? ' show' : '')}>
        Each value is a percentage of the collected amount and cannot exceed 100%.
      </div>

      <div className={'badhint' + (anyBad ? ' show' : '')}>
        Each value is a percentage of the collected amount and cannot exceed 100% — a rate set cannot be saved while
        any value violates this.
      </div>

      {/* оверрайды — на серой подложке */}
      <div className="ovpanel">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <b style={{ fontSize: 14.5 }}>
            Rate Overrides (Non-Standard Rates) <InfoIcon />
          </b>
          <MoreDetails open={ovOpen} onClick={() => setOvOpen(!ovOpen)}>
            4 overrides
          </MoreDetails>
        </div>
        {ovOpen && (
          <div>
            <Note style={{ marginTop: 12 }}>
              Only overrides are listed here - any royalty type × territory not listed uses the per-type rates above.
              Within a type, territories must not overlap. Overrides are versioned with this rate set. Royalty types
              not collected at all are captured under Royalty Type & Territory Exclusions; platform-level carve-outs
              under Platform Exclusions.
            </Note>
            {OVERRIDES.map((ov, gi) => (
              <div key={ov.type} className="ovg" style={gi === OVERRIDES.length - 1 ? { borderBottom: 'none' } : undefined}>
                <Field label="Royalty Type" width={272}>
                  <input defaultValue={ov.type} />
                  <ChevronIcon />
                </Field>
                <div className="splits">
                  {ov.splits.map((s, si) => (
                    <div className="splitrow" key={si}>
                      <Field label="Territory" style={{ flex: 1 }}>
                        <input defaultValue={s.territory} />
                        <ChevronIcon />
                      </Field>
                      <Field label="Rate" width={180}>
                        <input defaultValue={s.rate} />
                        <PercentUnit />
                      </Field>
                      <DeleteButton />
                    </div>
                  ))}
                  <InlineLink>+ TERRITORY SPLIT</InlineLink>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <AddButton>Add override</AddButton>
            </div>
          </div>
        )}
      </div>

      {/* Work-specific Overrides и SAVE — вне серой подложки */}
      <Field label="Work-specific Overrides" style={{ marginTop: 26 }}>
        <input defaultValue={'"Sunrise Boulevard" and two other Schedule A compositions carry a 90% rate on all royalty types per §4.3.'} />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
        <SaveButton onClick={() => toast('Rate changes saved (demo).')}>SAVE RATE CHANGES</SaveButton>
      </div>

      <RateHistoryPop pop={pop} onClose={() => setPop(null)} />
    </Section>
  )
}
