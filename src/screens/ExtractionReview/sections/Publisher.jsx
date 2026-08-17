import { Section } from '../Section.jsx'
import { TextField } from '../../../ui/Field.jsx'
import { Grid, SecBand } from '../../../ui/Layout.jsx'
import { FlagField } from '../FlagField.jsx'

export function Publisher() {
  return (
    <Section id="sec-publisher" title="PUBLISHER">
      <SecBand>No IPI match in existing records — a new Publisher entity will be created on commit.</SecBand>
      <Grid>
        <TextField label="Publisher Name" value="Reyes Songs LLC" />
        {/* NOT FOUND по макету: лейбл уходит в placeholder, снизу красная строка */}
        <FlagField
          id="f-pub-pro"
          label="Publisher PRO"
          placeholder="Publisher PRO"
          why="PRO affiliation not found in the document. Enter manually"
        />
        <FlagField
          id="f-pub-ipi"
          label="Publisher IPI"
          placeholder="Publisher IPI"
          why="Publisher IPI not found in the document. Enter manually"
        />
      </Grid>
    </Section>
  )
}
