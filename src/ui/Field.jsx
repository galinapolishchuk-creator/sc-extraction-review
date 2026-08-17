import { InfoIcon, ChevronIcon, CalendarIcon } from './Icon.jsx'
import { SelectChevronIcon, ErrorCircleIcon } from './DsIcons.jsx'

const cx = (...a) => a.filter(Boolean).join(' ')

/* ---------------------------------------------------------------
   inputs (мастер `inputs` в SC Library):
   .fld = контейнер, .nl = лейбл-нотч, .box = 42px r6 border/default
   --------------------------------------------------------------- */

export function Field({ label, width, className, style, helper, helperCalc, children, ...rest }) {
  return (
    <div className={cx('fld', className)} style={{ ...(width ? { width } : null), ...style }} {...rest}>
      {label != null && <span className="nl">{label}</span>}
      <div className="box">{children}</div>
      {helper != null && <div className="helper">{helper}</div>}
      {helperCalc != null && <div className="helper calc">{helperCalc}</div>}
    </div>
  )
}

/* Самый частый случай: лейбл + значение. `after` — то, что стоит справа
   внутри бокса (unit, %, chevron). */
export function TextField({ label, value, placeholder, after, inputProps, ...rest }) {
  return (
    <Field label={label} {...rest}>
      <input
        defaultValue={value ?? ''}
        {...(placeholder ? { placeholder } : null)}
        {...inputProps}
      />
      {after}
    </Field>
  )
}

/* Поле-селект (Accounting Frequency, Royalty Type…) — визуально текст + шеврон */
export const SelectField = (props) => <TextField {...props} after={<ChevronIcon />} />

/* Date-поле — значение + иконка календаря справа */
export const DateField = (props) => <TextField {...props} after={<CalendarIcon />} />

export const Unit = ({ children }) => <span className="unit">{children}</span>

/* тонкая линейка между ⓘ и юнитом — по макету это правило, а не символ «|» */
export const VSep = () => <span className="vsep" />

/* Юнит-дропдаун duration-поля: «24 | Months» */
export function UnitSelect({ value, options, onChange, style, id }) {
  return (
    <select className="u" id={id} style={style} defaultValue={value} onChange={onChange}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )
}

/* Композитное duration-поле: значение + ⓘ | + юнит. Повторяется в Windows,
   Terms и Accounting — вынесено, чтобы не расходилось между секциями. */
export function DurationField({ label, value, units, unit, prefix, onValueInput, onUnitChange, valueId, unitId, ...rest }) {
  return (
    <Field label={label} {...rest}>
      {prefix && <Unit>{prefix}</Unit>}
      <input id={valueId} defaultValue={value} inputMode="numeric" onInput={onValueInput} />
      <InfoIcon />
      <VSep />
      <UnitSelect id={unitId} value={unit ?? units[0]} options={units} onChange={onUnitChange} />
    </Field>
  )
}

/* Поле «квартал | год» (281:17342): значение слева, год отдельной секцией
   с разделительной чертой слева, справа — шеврон из DS. */
export function QuarterYearField({ label, quarter = 'Q2', year = '2026', width = 272.5, ...rest }) {
  return (
    <Field label={label} width={width} className="qyfield" {...rest}>
      <input defaultValue={quarter} />
      <span className="qy-year">{year}</span>
      <SelectChevronIcon />
    </Field>
  )
}

/* Поле в состоянии конфликта (277:17454): красная рамка и лейбл, под полем —
   своя строка ошибки с кружком-крестиком. Текст ошибки уникален для поля. */
export function ErrorField({ label, value, error, after = <ChevronIcon />, ...rest }) {
  return (
    <div className={cx('fld', 'errf', rest.className)} style={{ ...(rest.width ? { width: rest.width } : null), ...rest.style }}>
      <span className="nl">{label}</span>
      <div className="box">
        <input defaultValue={value ?? ''} />
        {after}
      </div>
      <div className="errline">
        <ErrorCircleIcon />
        <span>{error}</span>
      </div>
    </div>
  )
}

/* Read-only пара «подпись / значение» в Manual */
export const KV = ({ label, children }) => (
  <div className="kv">
    <div className="nlk">{label}</div>
    {children}
  </div>
)
