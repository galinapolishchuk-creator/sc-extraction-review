import { Section } from '../Section.jsx'
import { Field, TextField, DurationField, Unit } from '../../../ui/Field.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { RadioGroup } from '../../../ui/Controls.jsx'
import { ChevronIcon, PercentUnit } from '../../../ui/Icon.jsx'

export function Accounting() {
  return (
    <Section id="sec-accounting" title="ACCOUNTING">
      <Grid cols={4}>
        <TextField label="Accounting Frequency" value="Quarterly" after={<ChevronIcon />} />
        <TextField label="Payment Threshold" value="250" after={<Unit>| USD</Unit>} />
        <Field label="Infringement Withholding" helper="Of disputed amounts">
          <input defaultValue="25" />
          <PercentUnit />
        </Field>
        <DurationField label="Statement Delay" value="45" units={['Days']} />
      </Grid>
      <div style={{ marginTop: 25 }}>
        <RadioGroup label="Allow Bespoke Sync" name="bsync" options={['Yes', 'No']} defaultValue="Yes" />
      </div>
    </Section>
  )
}
