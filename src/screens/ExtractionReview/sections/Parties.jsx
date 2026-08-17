import { Section } from '../Section.jsx'
import { TextField } from '../../../ui/Field.jsx'
import { Grid, SetHead, SecBand } from '../../../ui/Layout.jsx'
import { AddButton, InlineLink } from '../../../ui/Buttons.jsx'
import { FlagField } from '../FlagField.jsx'

/* «Other Names (DBA)» — поле + ссылка «+ ADD ANOTHER» под ним (по макету) */
function DbaField({ value }) {
  return (
    <div>
      <TextField label="Other Names (DBA)" value={value} placeholder={value ? undefined : 'Other Names (DBA)'} />
      <div style={{ marginTop: 8 }}>
        <InlineLink>+ ADD ANOTHER</InlineLink>
      </div>
    </div>
  )
}

export function Parties() {
  return (
    <Section id="sec-parties" title="PARTIES">
      <SecBand>
        Every contact the agreement is negotiated or administered through — the client company plus the people acting
        for it. Extraction captures each party it finds; add sets manually for any it missed. The first set is the
        primary party and drives the derived Agreement Name and the attestation Point of Contact.
      </SecBand>

      <SetHead title="Party 1 · primary" />
      <Grid>
        <TextField label="Client / Company Name" value="Reyes Songs LLC" />
        <DbaField value="Reyes Songs Admin LLC · RS Admin West Corp" />
        <TextField label="Client / Company Address" value="4501 Sunset Blvd, Suite 210, Los Angeles, CA 90027" />
        <TextField label="Address" value="123 W 26th St, New York, NY 10001" />
        <TextField label="Point of Contact Name" value="Elena Vasquez" />
        <TextField label="Point of Contact Email" value="elena.vasquez@reyessongs.com" />
        <TextField label="Contact Role" value="Manager" />
      </Grid>

      <SetHead title="Party 2" className="setgap" />
      <Grid style={{ marginTop: 16 }}>
        <TextField label="Client / Company Name" value="Harlow & Reed LLP" />
        <DbaField />
        <TextField label="Client / Company Address" value="88 Pine Street, 14th Floor, New York, NY 10005" />
        <TextField label="Address" placeholder="Address" />
        <TextField label="Point of Contact Name" value="Daniel Harlow" />
        <TextField label="Point of Contact Email" value="d.harlow@harlowreed.com" />
        <FlagField
          id="f-contact-role"
          label="Contact Role"
          value="Attorney"
          why="Role inferred from the signature block - confirm the capacity"
          pdf="Contact Role"
          width={565}
        />
      </Grid>

      <div style={{ marginTop: 24 }}>
        <AddButton>Add Party</AddButton>
      </div>
    </Section>
  )
}
