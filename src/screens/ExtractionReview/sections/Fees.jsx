import { useState } from 'react'
import { Section } from '../Section.jsx'
import { Field, Unit } from '../../../ui/Field.jsx'
import { Grid, SetHead } from '../../../ui/Layout.jsx'
import { Checkbox, Radio, EnumGroup, RadioGroup } from '../../../ui/Controls.jsx'
import { AddButton } from '../../../ui/Buttons.jsx'
import { ChevronIcon, PercentUnit } from '../../../ui/Icon.jsx'
import { FlagField } from '../FlagField.jsx'

/* Fulfilled всегда виден, активен только пока Condition = Conditional */
function FeeSet({ n, type, pct, cond: initialCond, trigger, flag, calc }) {
  const [cond, setCond] = useState(initialCond)
  const [fulfilled, setFulfilled] = useState(false)
  const conditional = cond === 'C'

  return (
    <div className="advset">
      <SetHead title={`Fee ${n}`} />
      <Grid>
        <div style={{ display: 'flex', gap: 20 }}>
          <Field label="Fee Type" width={273}>
            <input defaultValue={type} />
            <ChevronIcon />
          </Field>
          <Field label="Fee (%)" width={273}>
            <input defaultValue={pct} />
            <PercentUnit />
          </Field>
        </div>
        {flag ? (
          <FlagField id={flag.id} label="Trigger / condition" value={trigger} why={flag.why} pdf={flag.pdf} />
        ) : (
          <Field label="Trigger / condition">
            <input placeholder="—" defaultValue={trigger || ''} />
          </Field>
        )}
      </Grid>
      <Grid style={{ marginTop: 22 }}>
        <RadioGroup label="Calculation" name={`f${n}calc`} options={['Gross', 'Net']} defaultValue={calc} />
        <EnumGroup label="Condition">
          <Radio name={`f${n}c`} value="U" checked={!conditional} onChange={() => { setCond('U'); setFulfilled(false) }}>
            Unconditional
          </Radio>
          <Radio name={`f${n}c`} value="C" checked={conditional} onChange={() => setCond('C')}>
            Conditional
          </Radio>
          <Checkbox
            className="fee-fulf"
            checked={fulfilled}
            disabled={!conditional}
            onChange={(e) => setFulfilled(e.target.checked)}
          >
            Fulfilled
          </Checkbox>
        </EnumGroup>
      </Grid>
    </div>
  )
}

export function Fees() {
  return (
    <Section id="sec-fees" title="FINANCIAL — FEES">
      <FeeSet n={1} type="Administration" pct="20" cond="U" calc="Gross" />
      <FeeSet
        n={2}
        type="Sync Commission"
        pct="25"
        cond="C"
        calc="Gross"
        trigger="Placements procured by the Administrator only"
        flag={{
          id: 'f-fee2',
          why: 'Fee basis ambiguous — of Gross vs of Net receipts',
          pdf: '§11.3 — SYNC COMMISSION',
        }}
      />
      <div style={{ marginTop: 24 }}>
        <AddButton>Add Fee</AddButton>
      </div>
    </Section>
  )
}
