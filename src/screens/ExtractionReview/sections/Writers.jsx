import { Section } from '../Section.jsx'
import { TextField, Field } from '../../../ui/Field.jsx'
import { Grid, SetHead, SecBand } from '../../../ui/Layout.jsx'
import { AddButton, InlineLink } from '../../../ui/Buttons.jsx'
import { FlagField, MatchFlag } from '../FlagField.jsx'

/* Пустая DBA-пара: два поля по 273 в колонках + «+ ADD ANOTHER DBA PAIR» */
function DbaPair() {
  return (
    <Grid style={{ gridColumn: '1/-1', gridTemplateColumns: '1fr 1fr', gap: '25px 20px' }}>
      <Field label="DBA Name" width={273}>
        <input defaultValue="" placeholder="DBA Name" />
      </Field>
      <Field label="DBA IPI" width={273}>
        <input defaultValue="" placeholder="DBA IPI" />
      </Field>
    </Grid>
  )
}

export function Writers() {
  return (
    <Section id="sec-writers" title="WRITERS">
      <SecBand>
        Client Type is Publisher (Parent) — extraction attempted to capture every writer listed in the agreement. Add
        sets manually if any writer was missed. Writer entities are established on commit; IPIs are checked against
        existing records to prevent duplicates.
      </SecBand>

      <SetHead title="Writer 1" />
      <MatchFlag
        id="f-w1-match"
        why={
          <>
            Possible existing Writer entity — IPI 00512873456 matches Maya Elena Reyes (WRT-2201 · BMI · 1 agreement).
            <br />
            Link it to prevent a duplicate?
          </>
        }
      />
      <Grid>
        <TextField label="Writer Name" value="Maya Elena Reyes" />
        <TextField label="Writer IPI" value="00512873456" />
        <TextField label="Writer PRO" value="BMI" />
        <TextField label="Writer PKA" value="Maya Rey" />
        <DbaPair />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <InlineLink>+ ADD ANOTHER DBA PAIR</InlineLink>
      </div>

      <SetHead title="Writer 2" style={{ marginTop: 40 }} />
      <MatchFlag
        id="f-w2-match"
        why={
          <>
            Possible existing Writer entity — IPI 00873310992 matches Devon A. Carter (WRT-1187 · ASCAP · 2
            agreements).
            <br />
            Link it to prevent a duplicate?
          </>
        }
      />
      <Grid>
        <TextField label="Writer Name" value="Devon Carter" />
        <FlagField
          id="f-w2-ipi"
          label="Writer IPI"
          value="00873310992"
          why="Two candidate IPI numbers found near signature block"
          pdf="Writer IPI"
        />
        <TextField label="Writer PRO" value="ASCAP" />
        <TextField label="Writer PKA" placeholder="Writer PKA" />
      </Grid>

      <SetHead title="Writer 3" style={{ marginTop: 40 }} />
      <SecBand style={{ marginBottom: 20 }}>
        No IPI match in existing records — a new Writer entity will be created on commit.
      </SecBand>
      <Grid>
        <TextField label="Writer Name" value="Lena Ortiz" />
        <TextField label="Writer IPI" value="01144206738" />
        <TextField label="Writer PRO" value="SESAC" />
        <TextField label="Writer PKA" placeholder="Writer PKA" />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <InlineLink>+ ADD ANOTHER DBA PAIR</InlineLink>
      </div>

      <div style={{ marginTop: 24 }}>
        <AddButton>Add Writer</AddButton>
      </div>
    </Section>
  )
}
