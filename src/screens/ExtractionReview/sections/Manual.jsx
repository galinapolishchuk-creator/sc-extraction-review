import { Section } from '../Section.jsx'
import { Field, KV } from '../../../ui/Field.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { PillSelect } from '../../../ui/Pills.jsx'

export function Manual() {
  return (
    <Section id="sec-manual" title="MANUAL">
      <Grid>
        <Field
          label="Agreement Name"
          className="colspan"
          helper="Pre-filled with the derived name — edit to override, or clear to keep it derived."
        >
          <input defaultValue="Reyes Songs LLC — Co-Publishing (Publishing, 2026)" />
        </Field>
      </Grid>
      <Grid cols={4} style={{ marginTop: 25 }}>
        <KV label="Business Type">Publishing</KV>
        <KV label="Deal Type">Co-Publishing</KV>
        <KV label="Client Type">Publisher (Parent)</KV>
        <KV label="Agreement Status">
          <PillSelect>● Draft</PillSelect>
        </KV>
        <KV label="Priority">
          <PillSelect prio>● P4 - Low</PillSelect>
        </KV>
        <KV label="A&R Assignee">Priya Nair</KV>
        <KV label="Legal Assignee">Dana Whitfield</KV>
        <KV label="Client Manager Assignee">Tara Singh</KV>
      </Grid>
    </Section>
  )
}
