import { Section } from '../Section.jsx'
import { Field } from '../../../ui/Field.jsx'
import { Row } from '../../../ui/Layout.jsx'
import { useContract } from '../ContractContext.jsx'

export function Dates() {
  const { effDate, setEffDate } = useContract()
  return (
    <Section id="sec-dates" title="DATES">
      <Row>
        {/* Effective Date — якорь для всей дата-математики Terms */}
        <Field label="Effective Date" width={273}>
          <input value={effDate} onChange={(e) => setEffDate(e.target.value)} />
        </Field>
        <Field label="Execution Date" width={273}>
          <input defaultValue="2026-03-28" />
        </Field>
      </Row>
    </Section>
  )
}
