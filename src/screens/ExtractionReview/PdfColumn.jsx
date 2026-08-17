import pdfPage from '../../assets/pdf-page.png'
import { LockIcon } from '../../ui/Icon.jsx'

const ToolIcon = ({ d }) => (
  <svg className="ti" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

/* PDF-зона по ноде 199:11932 — ровно 620×880: head 42 + toolbar 53 + page 785.
   Вьювер запиннен, запись скроллится рядом. */
export function PdfColumn() {
  return (
    <div className="pdfcol">
      <div className="pdf">
        <div className="pdf-head">
          <b>Reyes_Songs_CoPub_2026.pdf</b>
          <span className="immutable">
            <LockIcon />
            original stored immutably
          </span>
        </div>
        {/* панель инструментов вьювера — набор контролов с макета */}
        <div className="pdf-tools">
          <ToolIcon d="M3 6h14M3 10h14M3 14h14" />
          <span className="pg">
            <span className="box2">1</span> / 2
          </span>
          <ToolIcon d="M4 10h12" />
          <span className="box2">80%</span>
          <ToolIcon d="M10 4v12M4 10h12" />
          <span className="sp" />
          <ToolIcon d="M4 4h12v12H4zM4 8h12" />
          <ToolIcon d="M15 7a6 6 0 10-1.5 6M15 3v4h-4" />
          <ToolIcon d="M4 15l9-9 3 3-9 9H4z" />
          <ToolIcon d="M16 6a5 5 0 00-9.5-1.5A4 4 0 006 12h9a3 3 0 001-6z" />
          <ToolIcon d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15h12" />
          <ToolIcon d="M6 8V3h8v5M6 14H4V8h12v6h-2M6 11h8v6H6z" />
          <ToolIcon d="M10 5.2v.1M10 10v.1M10 14.8v.1" />
        </div>
        <div className="pdf-page">
          <img src={pdfPage} alt="Reyes_Songs_CoPub_2026.pdf page" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
      <div className="pdf-note">
        Viewer stays pinned while the record scrolls. "View in PDF" on a flag jumps the document here and highlights
        the source clause.
      </div>
    </div>
  )
}
