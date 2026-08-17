import { Section } from '../Section.jsx'
import { Field, TextField, DurationField, Unit, UnitSelect } from '../../../ui/Field.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { Checkbox } from '../../../ui/Controls.jsx'
import { InfoIcon } from '../../../ui/Icon.jsx'
import { useContract } from '../ContractContext.jsx'

const UNITS = ['Days', 'Business Days', 'Months', 'Years']

/* посчитанное значение выделено цветом positive, пояснение — вторичным */
const Calc = ({ h }) => (
  <>
    <span className="cv">{h.lead}</span>
    {h.rest}
  </>
)

export function Terms() {
  const { initialTerm, setInitialTerm, collection, setCollection, rights, setRights, orUntil, setOrUntil, calc } =
    useContract()

  return (
    <Section id="sec-terms" title="TERMS">
      <Grid>
        <TextField label="Governing Law" value="State of New York" />
        <TextField
          label="Territory"
          value="World"
          after={
            <Unit>
              <InfoIcon />
            </Unit>
          }
        />

        {/* живой пересчёт End Date от Effective Date */}
        <DurationField
          label="Initial Term"
          value={initialTerm.val}
          units={UNITS}
          unit={initialTerm.unit}
          onValueInput={(e) => setInitialTerm({ ...initialTerm, val: e.target.value })}
          onUnitChange={(e) => setInitialTerm({ ...initialTerm, unit: e.target.value })}
          helperCalc={<Calc h={calc.initialHelp} />}
        />

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {/* «or Until» — селект + отдельный чекбокс Fulfilled (радио убраны) */}
          <Field label="or Until" width={457}>
            <UnitSelect
              value={orUntil}
              options={['Recoupment', 'Delivery', 'None']}
              onChange={(e) => setOrUntil(e.target.value)}
              style={{ flex: 1 }}
            />
            <Unit>
              <InfoIcon />
            </Unit>
          </Field>
          <Checkbox>Fulfilled</Checkbox>
        </div>

        <TextField
          label="Commitment Detail"
          className="colspan"
          value="Term continues until all Advances are recouped if recoupment has not occurred by the end of the Initial Term."
          after={
            <Unit>
              <InfoIcon />
            </Unit>
          }
        />

        <DurationField
          label="Collection Period"
          prefix="Term +"
          value={collection.val}
          units={UNITS}
          unit={collection.unit}
          onValueInput={(e) => setCollection({ ...collection, val: e.target.value })}
          onUnitChange={(e) => setCollection({ ...collection, unit: e.target.value })}
          helperCalc={<Calc h={calc.collectionHelp} />}
        />
        <DurationField
          label="Rights Period"
          prefix="Term +"
          value={rights.val}
          units={UNITS}
          unit={rights.unit}
          onValueInput={(e) => setRights({ ...rights, val: e.target.value })}
          onUnitChange={(e) => setRights({ ...rights, unit: e.target.value })}
          helperCalc={<Calc h={calc.rightsHelp} />}
        />

        <TextField
          label="Rights Granted"
          className="colspan"
          value="All musical compositions written, co-written, or owned by the Writer prior to and during the Term."
        />
      </Grid>
    </Section>
  )
}
