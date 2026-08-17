import { useState } from 'react'
import { Section } from '../Section.jsx'
import { TextField, Field } from '../../../ui/Field.jsx'
import { Grid, SetHead, SecBand } from '../../../ui/Layout.jsx'
import { AddButton, InlineLink } from '../../../ui/Buttons.jsx'
import { FlagField, MatchFlag } from '../FlagField.jsx'

/* DBA: пара «Name + IPI» — два поля внутри ОДНОЙ колонки, рядом.
   «+ ADD ANOTHER DBA PAIR» добавляет следующую пару в соседнюю колонку. */
function DbaPairs({ initial = [{ name: '', ipi: '' }] }) {
  const [pairs, setPairs] = useState(initial)
  return (
    <>
      <div className="dbagrid">
        {pairs.map((p, i) => (
          <div className="dbapair" key={i}>
            <Field label="DBA Name">
              <input defaultValue={p.name} placeholder="DBA Name" />
            </Field>
            <Field label="DBA IPI">
              <input defaultValue={p.ipi} placeholder="DBA IPI" />
            </Field>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <InlineLink onClick={() => setPairs([...pairs, { name: '', ipi: '' }])}>
          + ADD ANOTHER DBA PAIR
        </InlineLink>
      </div>
    </>
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
        linkedText="Linked to existing Writer — Maya Elena Reyes (WRT-2201 · BMI · IPI 00512873456). This agreement will be added to the existing record."
        createdText="New Writer entity will be created despite matching IPI 00512873456 (Maya Elena Reyes, WRT-2201). Both records will share this IPI."
      />
      <Grid>
        <TextField label="Writer Name" value="Maya Elena Reyes" />
        <TextField label="Writer IPI" value="00512873456" />
        <TextField label="Writer PRO" value="BMI" />
        <TextField label="Writer PKA" value="Maya Rey" />
      </Grid>
      <div style={{ marginTop: 25 }}>
        <DbaPairs />
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
        linkedText="Linked to existing Writer — Devon A. Carter (WRT-1187 · ASCAP · IPI 00873310992). This agreement will be added to the existing record."
        createdText="New Writer entity will be created despite matching IPI 00873310992 (Devon A. Carter, WRT-1187). Both records will share this IPI."
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
      {/* у Devon две DBA — пары стоят рядом, по одной на колонку */}
      <div style={{ marginTop: 25 }}>
        <DbaPairs
          initial={[
            { name: 'DC Songs LLC', ipi: '00931204471' },
            { name: 'Carter Cuts', ipi: '' },
          ]}
        />
      </div>

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
      <div style={{ marginTop: 25 }}>
        <DbaPairs />
      </div>

      <div style={{ marginTop: 24 }}>
        <AddButton>Add Writer</AddButton>
      </div>
    </Section>
  )
}
