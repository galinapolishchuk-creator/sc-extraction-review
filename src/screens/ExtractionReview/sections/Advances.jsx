import { useMemo, useState } from 'react'
import { Section } from '../Section.jsx'
import { Field, Unit } from '../../../ui/Field.jsx'
import { Grid, SetHead, Panel } from '../../../ui/Layout.jsx'
import { Checkbox, Radio, EnumGroup } from '../../../ui/Controls.jsx'
import { AddButton } from '../../../ui/Buttons.jsx'
import { InfoIcon, ChevronIcon } from '../../../ui/Icon.jsx'
import { FlagField } from '../FlagField.jsx'
import { ADVANCES, WRITER_NAMES } from '../data.js'

const fmt = (n) => '$' + n.toLocaleString('en-US')

/* AdvancesSummary Galera: тотал ExtraBold 30 + композиционный бар 6px
   + три тонированные стат-карточки. Пересчитывается живьём. */
function AdvancesSummary({ list }) {
  const { total, unc, ful, nf } = useMemo(() => {
    let total = 0
    let unc = 0
    let ful = 0
    let nf = 0
    list.forEach((a) => {
      total += a.amount
      if (a.cond === 'Unconditional') unc += a.amount
      else if (a.fulfilled) ful += a.amount
      else nf += a.amount
    })
    return { total, unc, ful, nf }
  }, [list])
  const pct = (v) => (total ? Math.round((v / total) * 100) : 0)

  /* нулевые сегменты не рисуем — иначе от них остаётся белая линия-разделитель */
  const segments = [
    { key: 'unc', v: unc, color: 'var(--adv-unc)' },
    { key: 'ful', v: ful, color: 'var(--adv-ful)' },
    { key: 'nf', v: nf, color: 'var(--adv-nf)' },
  ].filter((s) => s.v > 0)

  return (
    <div className="totals">
      <div className="advtot">
        <div className="grp">
          <div className="n">{fmt(total)}</div>
          <div className="l">
            Total · {list.length} advances
          </div>
        </div>
        <div className="sbar">
          {segments.map((s) => (
            <i key={s.key} style={{ width: pct(s.v) + '%', background: s.color }} />
          ))}
        </div>
      </div>
      <div className="statcards">
        <div className="statcard unc">
          <div className="n">{fmt(unc)}</div>
          <div className="l">Unconditional</div>
        </div>
        <div className="statcard ful">
          <div className="n">{fmt(ful)}</div>
          <div className="l">Fulfilled</div>
        </div>
        <div className="statcard nf">
          <div className="n">{fmt(nf)}</div>
          <div className="l">Not Fulfilled</div>
        </div>
      </div>
    </div>
  )
}

/* Список райтеров с Select All: частичный выбор = indeterminate,
   клик по минусу снимает всё выделение (244:18163) */
function EarnsAgainst({ writers, onToggle, onToggleAll }) {
  const checked = writers.filter(Boolean).length
  const all = writers.length
  const readout =
    checked === all ? 'all writers earn against this advance' : `${checked} of ${all} writers earn against this advance`

  return (
    <Panel className="earns">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <b style={{ fontSize: 14 }}>Earns against</b>
        <InfoIcon />
        <span className="helper wcount" style={{ margin: 0 }}>
          {readout}
        </span>
      </div>
      <div className="wlist">
        <Checkbox
          checked={checked === all}
          indeterminate={checked > 0 && checked < all}
          onChange={() => onToggleAll(!(checked === all) && !(checked > 0 && checked < all))}
        >
          Select All
        </Checkbox>
        {WRITER_NAMES.map((w, i) => (
          <Checkbox key={w} checked={writers[i]} onChange={() => onToggle(i)}>
            {w}
          </Checkbox>
        ))}
      </div>
    </Panel>
  )
}

function AdvanceSet({ adv, update }) {
  const conditional = adv.cond === 'Conditional'
  const writers = adv.earns ? adv.earns.writers : WRITER_NAMES.map(() => true)

  const setCond = (cond) =>
    update({
      cond,
      fulfilled: cond === 'Conditional' ? adv.fulfilled : false,
      earns: cond === 'Conditional' && !adv.earns ? { writers: WRITER_NAMES.map(() => true) } : adv.earns,
    })

  return (
    <div className="advset">
      <SetHead title={`Advance ${adv.n}`} />
      <Grid>
        <div style={{ display: 'flex', gap: 20 }}>
          <Field label="Advance Type" width={273}>
            <input defaultValue={adv.type} />
            <ChevronIcon />
          </Field>
          <Field label="Amount" width={273}>
            <input
              defaultValue={adv.amount.toLocaleString('en-US')}
              onInput={(e) => update({ amount: parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0 })}
            />
            <Unit>$</Unit>
          </Field>
        </div>
        {adv.flag ? (
          <FlagField
            id={adv.flag.id}
            label="Trigger / condition"
            value={adv.trigger}
            why={adv.flag.why}
            pdf={adv.flag.pdf}
          />
        ) : (
          <Field label="Trigger / condition">
            <input defaultValue={adv.trigger || '—'} />
          </Field>
        )}
      </Grid>

      <div style={{ marginTop: 18 }}>
        <EnumGroup label="Condition">
          <Radio
            name={`a${adv.n}c`}
            value="Unconditional"
            checked={!conditional}
            onChange={() => setCond('Unconditional')}
          >
            Unconditional
          </Radio>
          <Radio
            name={`a${adv.n}c`}
            value="Conditional"
            checked={conditional}
            onChange={() => setCond('Conditional')}
          >
            Conditional
          </Radio>
          <Checkbox
            className="fulf"
            checked={adv.fulfilled}
            disabled={!conditional}
            onChange={(e) => update({ fulfilled: e.target.checked })}
          >
            Fulfilled
          </Checkbox>
        </EnumGroup>
      </div>

      {conditional && (
        <EarnsAgainst
          writers={writers}
          onToggle={(i) =>
            update({ earns: { ...adv.earns, writers: writers.map((v, k) => (k === i ? !v : v)) } })
          }
          onToggleAll={(on) => update({ earns: { ...adv.earns, writers: writers.map(() => on) } })}
        />
      )}
    </div>
  )
}

export function Advances() {
  const [list, setList] = useState(ADVANCES)
  const update = (n, patch) => setList((l) => l.map((a) => (a.n === n ? { ...a, ...patch } : a)))

  return (
    <Section id="sec-advances" title="FINANCIAL — ADVANCES">
      <AdvancesSummary list={list} />
      <div>
        {list.map((a) => (
          <AdvanceSet key={a.n} adv={a} update={(patch) => update(a.n, patch)} />
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <AddButton>Add advance</AddButton>
      </div>
    </Section>
  )
}
