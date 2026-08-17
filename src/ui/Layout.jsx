import { Subtag } from './Pills.jsx'
import { RemoveButton } from './Buttons.jsx'

const cx = (...a) => a.filter(Boolean).join(' ')

/* сетки полей: 2 / 3 / 4 колонки, gap 25×20, max 1150 */
export const Grid = ({ cols = 2, className, style, children }) => (
  <div className={cx(cols === 2 ? 'grid' : 'grid' + cols, className)} style={style}>
    {children}
  </div>
)

/* Ряд полей фиксированной ширины (Dates, Prior Publisher) */
export const Row = ({ gap = 20, align, style, children }) => (
  <div style={{ display: 'flex', gap, ...(align ? { alignItems: align } : null), ...style }}>{children}</div>
)

/* Шапка сет-блока: «Writer 2» + EXTRACTED + Remove */
export const SetHead = ({ title, tag = true, onRemove, style, className }) => (
  <div className={cx('sethead', className)} style={style}>
    <b>{title}</b>
    {tag && <Subtag />}
    <RemoveButton onClick={onRemove} />
  </div>
)

/* Серая пояснительная полоса под шапкой секции */
export const SecBand = ({ children, style }) => (
  <div className="secband" style={style}>
    {children}
  </div>
)

export const Note = ({ children, style }) => (
  <p className="note" style={style}>
    {children}
  </p>
)

/* Вложенная серая панель (Earns against) */
export const Panel = ({ className, style, children }) => (
  <div className={cx('panel', className)} style={style}>
    {children}
  </div>
)
