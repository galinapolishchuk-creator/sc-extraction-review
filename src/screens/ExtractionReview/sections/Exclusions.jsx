import { useState } from 'react'
import { Section } from '../Section.jsx'
import { Field, QuarterYearField, ErrorField } from '../../../ui/Field.jsx'
import { Note } from '../../../ui/Layout.jsx'
import { PillInfo, MoreDetails } from '../../../ui/Pills.jsx'
import { ALink, AddButton, DeleteButton } from '../../../ui/Buttons.jsx'
import { InfoIcon, ChevronIcon } from '../../../ui/Icon.jsx'

const TYPE_ROWS = [
  { type: 'Karaoke', territory: 'All territories' },
  /* Japan исключена и одновременно имеет ставку в оверрайдах — своя ошибка */
  {
    type: 'Sync',
    territory: 'Japan',
    conflict: true,
    error: 'Conflicts with the Sync rate exception for "Japan"',
  },
]

const PLATFORM_ROWS = [
  { platform: 'YouTube', territory: 'Germany', note: 'UGC claiming handled separately' },
  { platform: 'Facebook', territory: 'All territories', note: '' },
]

export function Exclusions() {
  const [typesOpen, setTypesOpen] = useState(true)
  const [platOpen, setPlatOpen] = useState(true)

  return (
    <Section id="sec-exclusions" title="EXCLUSIONS">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, maxWidth: 1150 }}>
        <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Exclusion Schedule</span>
        <PillInfo>EFFECTIVE Q2 2026 · CURRENT</PillInfo>
        <span style={{ flex: 1 }} />
        <ALink>EXCLUSION HISTORY (1)</ALink>
      </div>

      <div style={{ marginTop: 22 }}>
        <QuarterYearField label="Effective Date" quarter="Q2" year="2026" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 26 }}>
        <b style={{ fontSize: 14 }}>Royalty Type &amp; Territory Exclusions</b>
        <InfoIcon />
        <MoreDetails open={typesOpen} onClick={() => setTypesOpen(!typesOpen)}>
          2 exclusions
        </MoreDetails>
      </div>
      {typesOpen && (
        <div>
          <Note style={{ marginTop: 10 }}>
            Royalty types listed here are excluded from the deal - royalties of this scope are not expected to arrive
            (distinct from a 0% rate). If royalties nonetheless arrive, no fee is taken - they pass through at an
            effective 100% rate to the counterparty.
          </Note>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 18 }}>
            {TYPE_ROWS.map((r) => (
              <div className="exrow" key={r.type}>
                <Field label="Royalty Type">
                  <input defaultValue={r.type} />
                  <ChevronIcon />
                </Field>
                {r.conflict ? (
                  <ErrorField label="Territory" value={r.territory} error={r.error} />
                ) : (
                  <Field label="Territory">
                    <input defaultValue={r.territory} />
                    <ChevronIcon />
                  </Field>
                )}
                <DeleteButton />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <AddButton>Exclude a royalty type</AddButton>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30 }}>
        <b style={{ fontSize: 14 }}>Platform Exclusions</b>
        <MoreDetails open={platOpen} onClick={() => setPlatOpen(!platOpen)}>
          2 exclusions
        </MoreDetails>
      </div>
      {platOpen && (
        <div>
          <Note style={{ marginTop: 10 }}>
            Platforms withheld from the grant - royalties from an excluded platform are not expected to arrive. Same
            pass-through rule, optionally narrowed to a territory.
          </Note>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 18 }}>
            {PLATFORM_ROWS.map((r) => (
              <div className="exrow plat" key={r.platform}>
                <Field label="Platform">
                  <input defaultValue={r.platform} />
                  <ChevronIcon />
                </Field>
                <Field label="Excluded Territory">
                  <input defaultValue={r.territory} />
                  <ChevronIcon />
                </Field>
                <Field label="Note">
                  <input defaultValue={r.note} placeholder="Note" />
                </Field>
                <DeleteButton />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <AddButton>Add platform exclusion</AddButton>
          </div>
        </div>
      )}
    </Section>
  )
}
