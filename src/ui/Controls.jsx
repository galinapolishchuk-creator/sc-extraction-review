import { useEffect, useRef } from 'react'

/* checkbox_RS — 20px r4, border/control всегда; checked = accent + белая галочка;
   disabled = пустой белый бокс + серый лейбл (395:29976) */
export function Checkbox({ checked, defaultChecked, disabled, indeterminate = false, onChange, onClickCapture, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])
  const controlled = checked !== undefined
  return (
    <label className={'copt ' + className}>
      <input
        ref={ref}
        type="checkbox"
        {...(controlled ? { checked } : { defaultChecked: !!defaultChecked })}
        disabled={disabled}
        onChange={onChange || (() => {})}
        onClickCapture={onClickCapture}
      />
      <span>{children}</span>
    </label>
  )
}

/* radiobutton_RS — 22px, border/control остаётся и в checked, точка 8px accent */
export function Radio({ name, value, checked, defaultChecked, onChange, children }) {
  const controlled = checked !== undefined
  return (
    <label className="ropt">
      <input
        type="radio"
        name={name}
        value={value}
        {...(controlled ? { checked } : { defaultChecked: !!defaultChecked })}
        onChange={onChange || (() => {})}
      />
      {children != null && <span>{children}</span>}
    </label>
  )
}

/* Подпись группы + сама группа: «Catalog Coverage · Full / Partial / Future Only» */
export const EnumGroup = ({ label, children, style }) => (
  <div style={style}>
    {label && <div className="enum-l">{label}</div>}
    <div className="enum">{children}</div>
  </div>
)

/* Радио-группа по списку опций — самый частый вид enum в ревью */
export function RadioGroup({ name, options, value, defaultValue, onChange, extra, label, style }) {
  const controlled = value !== undefined
  return (
    <EnumGroup label={label} style={style}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value
        const text = typeof o === 'string' ? o : o.label
        return (
          <Radio
            key={v}
            name={name}
            value={v}
            {...(controlled
              ? { checked: value === v, onChange: () => onChange && onChange(v) }
              : { defaultChecked: defaultValue === v, onChange: () => onChange && onChange(v) })}
          >
            {text}
          </Radio>
        )
      })}
      {extra}
    </EnumGroup>
  )
}
