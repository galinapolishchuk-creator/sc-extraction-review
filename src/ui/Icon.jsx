/* Иконки DS. Часть живёт CSS-фоном (ico-*), часть — инлайновым SVG,
   ровно как в v3-прототипе: менять форму нельзя, это снято с нод. */
import { HintIcon, PercentIcon, SelectChevronIcon, DsCalendarIcon } from './DsIcons.jsx'

export {
  HintIcon,
  PercentIcon,
  AddFieldIcon,
  SelectChevronIcon,
  DsCalendarIcon,
  DeleteXIcon,
  CaretSolidIcon,
  ErrorCircleIcon,
} from './DsIcons.jsx'

/* Информационная иконка — глиф из DS (`inouts/icon 14*14`, вариант hint).
   Одна точка правды: меняется здесь — меняется на всей странице. */
export const InfoIcon = ({ nf = false }) => <HintIcon color={nf ? '#C75757' : '#414141'} />

/* «%» в полях — тоже глиф из DS, а не текстовый символ */
export const PercentUnit = ({ muted = false }) => <PercentIcon color={muted ? '#B5B5B5' : '#414141'} />

export const CaretIcon = ({ className = '' }) => (
  <span className={'ico ico-caret ' + className} />
)

/* Шеврон селекта и календарь — глифы DS (`inouts/icon 14*14`).
   Свои нарисованные версии убраны: форма и вес штриха отличались. */
export const ChevronIcon = SelectChevronIcon
export const CalendarIcon = DsCalendarIcon

export const LockIcon = () => <span className="ico ico-lock" />

export const CheckIcon = ({ style }) => (
  <svg className="ico-ok" style={style} viewBox="0 0 16 16">
    <path d="M3.2 8.6l3.1 3.1L12.8 5" />
  </svg>
)

/* корзина из мастера `services link` — 12px, stroke 1 */
export const TrashIcon = () => (
  <svg viewBox="0 0 12 12">
    <path d="M1.5 2.7h9M4.2 2.7v-.9c0-.5.4-.9.9-.9h1.8c.5 0 .9.4.9.9v.9M2.7 2.7v6.6c0 .55.45 1 1 1h4.6c.55 0 1-.45 1-1V2.7M4.9 5v3M7.1 5v3" />
  </svg>
)

export const UndoIcon = () => (
  <svg viewBox="0 0 12 12">
    <path
      d="M4.5 2L2 4.5 4.5 7M2 4.5h5a3 3 0 010 6H5"
      fill="none"
      stroke="#000"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CrossIcon = () => (
  <svg viewBox="0 0 16 16">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const BackArrowIcon = () => (
  <svg viewBox="0 0 16 16">
    <path d="M13 8H3M6.5 4.5L3 8l3.5 3.5" />
  </svg>
)
