import { TrashIcon, UndoIcon, BackArrowIcon } from './Icon.jsx'
import { DeleteXIcon } from './DsIcons.jsx'

/* action/primary — CONTINUE TO COMMIT (h42 r6 Bold 14 ls1.5 + стрелка) */
export const CommitButton = ({ onClick, children = 'CONTINUE TO COMMIT' }) => (
  <button className="btn-commit" onClick={onClick}>
    {children} <span className="arr" />
  </button>
)

/* мастер `Button / back` — h42, Bold 14, чёрная рамка, стрелка ← */
export const BackButton = ({ onClick, children = 'BACK' }) => (
  <button className="btn-back" onClick={onClick}>
    <BackArrowIcon /> {children}
  </button>
)

export const SaveButton = ({ onClick, children }) => (
  <button className="btn-save" onClick={onClick}>
    {children}
  </button>
)

/* библиотечный Button outlined/42, сжатый под матрицу ставок */
export const ApplyButton = ({ onClick, children = 'APPLY', id }) => (
  <button id={id} className="btn-apply" onClick={onClick}>
    {children}
  </button>
)

/* «+ Add Party» — плюс-иконка + caps, подчёркнутый лейбл */
export const AddButton = ({ onClick, children }) => (
  <button className="addbtn" onClick={onClick}>
    {children}
  </button>
)

/* инлайновая голубая ссылка: + ADD ANOTHER DBA PAIR · + TERRITORY SPLIT */
export const InlineLink = ({ onClick, children }) => (
  <button className="inlink" onClick={onClick}>
    {children}
  </button>
)

export const ALink = ({ onClick, children }) => (
  <button className="alink" onClick={onClick}>
    {children}
  </button>
)

/* ✕ DELETE — мастер `Button` 362:26014: рамка и текст action/outline/negative,
   Bold 14 / tracking 1.5 / uppercase, h42 r6, глиф ✕ 11px */
export const DeleteButton = ({ onClick, children = 'Delete' }) => (
  <button className="delbtn" onClick={onClick}>
    <DeleteXIcon />
    {children}
  </button>
)

/* Remove у сет-блока — корзина + Regular 13 */
export const RemoveButton = ({ onClick, children = 'Remove' }) => (
  <button className="rmbtn" onClick={onClick}>
    <TrashIcon /> {children}
  </button>
)

/* полоса флага: View in PDF (outlined) + Confirm (заливка icon/success) */
export const MiniButton = ({ variant = 'out', onClick, children }) => (
  <button className={'btn btn-' + variant} onClick={onClick}>
    {children}
  </button>
)

export const UndoButton = ({ onClick }) => (
  <button className="btn-undo" onClick={onClick}>
    <UndoIcon /> Undo
  </button>
)

/* Link Existing (outlined) / Create New (тёмная #423C34) в баннере совпадения */
export const MatchButton = ({ tone = 'w', onClick, children }) => (
  <button className={'mbtn ' + tone} onClick={onClick}>
    {children}
  </button>
)
