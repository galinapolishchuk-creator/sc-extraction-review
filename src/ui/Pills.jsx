import { CheckIcon } from './Icon.jsx'
import { CaretSolidIcon } from './DsIcons.jsx'

/* PENDING REVIEW у заголовка страницы */
export const StatusChip = ({ children }) => <span className="chip-status">{children}</span>

/* EXTRACTED — Bold 10, белый фон, обводка text/tertiary, h20 r999 */
export const Subtag = ({ children = 'EXTRACTED' }) => <span className="subtag">{children}</span>

/* пилюли в шапке секции: «2 REVIEW» / «1 NOT FOUND» */
export const HeadPill = ({ kind, children }) => <span className={'hp ' + kind}>{children}</span>

/* «No flags ✓» — чистая секция */
export const NoFlags = () => (
  <span className="noflags">
    No flags <CheckIcon />
  </span>
)

/* счётчики классов флагов в баре */
export const CountTag = ({ kind, children }) => <span className={'ctag ' + kind}>{children}</span>

/* review/count-circle — кружок-счётчик в чипе секции */
export const CountCircle = ({ kind, children }) => <span className={'cntc ' + kind}>{children}</span>

/* Status / Priority — пилюля-дропдаун в Manual */
export const PillSelect = ({ prio = false, children }) => (
  <span className={'pillsel' + (prio ? ' prio' : '')}>
    {children} <span className="dv" />
  </span>
)

/* EFFECTIVE Q2 2026 · ORIGINAL · CURRENT */
export const PillInfo = ({ children }) => <span className="pillinfo">{children}</span>

/* таб-раскрывашка «More details» (361:18450): сплошной каретик-глиф из DS,
   в открытом состоянии развёрнут на 180° (смотрит вверх) */
export const MoreDetails = ({ open, onClick, children }) => (
  <button className={'md' + (open ? ' open' : '')} onClick={onClick}>
    <span>{children}</span>
    <span className="arr">
      <CaretSolidIcon />
    </span>
  </button>
)
