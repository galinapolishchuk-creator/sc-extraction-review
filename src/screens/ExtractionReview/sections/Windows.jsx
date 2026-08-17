import { Section } from '../Section.jsx'
import { DurationField } from '../../../ui/Field.jsx'
import { Grid } from '../../../ui/Layout.jsx'
import { FlagField } from '../FlagField.jsx'

export function Windows() {
  return (
    <Section id="sec-windows" title="WINDOWS">
      <Grid cols={4}>
        <DurationField label="Audit / Objection Window" value="24" units={['Months']} />
        {/* Cure Period стартует Confirmed — как на канвасе; Undo возвращает флаг */}
        <FlagField
          id="f-cure"
          label="Cure Period"
          value="30 · Days · from written notice"
          why="Conflicting values found in §9.2 and §14.1"
          pdf="§9.2 — CURE PERIOD · 30 days"
        />
        <DurationField label="Statement Objection" value="2" units={['Years']} />
        <DurationField label="Notice Window" value="60" units={['Days']} />
        <DurationField label="Option Notice Window" value="90" units={['Days']} />
        <DurationField label="Option Period Duration" value="365" units={['Days']} />
        <FlagField
          id="f-winddown"
          label="Wind Down Period"
          value="6 · Months · from termination"
          why="Low-fidelity source text (scanned page)"
          pdf="§14.1 — WIND DOWN"
        />
        <DurationField label="Approval Window" value="10" units={['Business Days']} />
        <DurationField label="Bonus Deadline" value="18" units={['Months']} />
      </Grid>
    </Section>
  )
}
