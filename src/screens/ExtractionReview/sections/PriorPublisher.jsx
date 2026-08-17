import { Section } from '../Section.jsx'
import { TextField, DateField, Field } from '../../../ui/Field.jsx'
import { CalendarIcon } from '../../../ui/Icon.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { Checkbox } from '../../../ui/Controls.jsx'
import { useContract } from '../ContractContext.jsx'
import { useReview } from '../ReviewContext.jsx'

export function PriorPublisher() {
  const { wraparound, setWraparound } = useContract()
  const { toast } = useReview()

  const onWrap = (e) => {
    const on = e.target.checked
    setWraparound(on)
    toast(
      on
        ? 'Wraparound terms apply — the Wraparound rate row is now in the matrix.'
        : 'Wraparound off — the rate row is hidden.'
    )
  }

  return (
    <Section id="sec-prior" title="PRIOR PUBLISHER">
      <Grid>
        <TextField label="Prior Publisher Name" value="Harmonia Music Group" />
        <TextField label="Prior Publisher Contact Name" value="Miriam Castell" />
        <TextField label="Prior Publisher Contact Email" value="m.castell@harmoniamusic.com" />
        <DateField label="Termination Date" value="2029-03-31" />
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Field label="Rights Retention End Date" width={273}>
            <input defaultValue="2031-03-31" />
            <CalendarIcon />
          </Field>
          <Field label="Collection End Date" width={273}>
            <input defaultValue="2031-09-30" />
            <CalendarIcon />
          </Field>
        </div>
        {/* Wraparound — чекбокс (не радио); включает ряд в матрице ставок */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={wraparound} onChange={onWrap}>
            Wraparound
          </Checkbox>
        </div>
      </Grid>
      <div className="helper" style={{ marginTop: 8 }}>
        Whether prior-publisher wraparound terms apply. Setting it adds the Wraparound rate row to the Rates matrix
        below.
      </div>
    </Section>
  )
}
