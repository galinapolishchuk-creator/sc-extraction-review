import { Section } from '../Section.jsx'
import { TextField } from '../../../ui/Field.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { RadioGroup } from '../../../ui/Controls.jsx'
import { FlagField } from '../FlagField.jsx'

export function Compositions() {
  return (
    <Section id="sec-compositions" title="COMPOSITIONS">
      <Grid>
        <TextField label="Catalog Compositions" value="Included — full back catalog (Schedule A)" />
        <RadioGroup
          label="Catalog Coverage"
          name="ccov"
          options={['Full', 'Partial', 'Future Only']}
          defaultValue="Full"
        />
        <RadioGroup label="Exclusive" name="excl" options={['Yes', 'No']} defaultValue="Yes" />
        <TextField label="Deliverable Components" value="10 new compositions per contract year" />
        <FlagField
          id="f-excl-comp"
          label="Excluded Compositions"
          value="2 compositions co-published with third parties (Schedule B)"
          why="Schedule B parsed with low fidelity"
          pdf="Excluded Compositions"
          width={565}
        />
      </Grid>
    </Section>
  )
}
