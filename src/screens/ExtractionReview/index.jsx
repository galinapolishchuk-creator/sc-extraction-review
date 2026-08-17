import { ReviewProvider, useReview } from './ReviewContext.jsx'
import { ContractProvider } from './ContractContext.jsx'
import { TotalReviewBar } from './TotalReviewBar.jsx'
import { PdfColumn } from './PdfColumn.jsx'
import { AppRail, AppBar } from './AppChrome.jsx'
import { BackButton, CommitButton } from '../../ui/Buttons.jsx'

import { Manual } from './sections/Manual.jsx'
import { Dates } from './sections/Dates.jsx'
import { Parties } from './sections/Parties.jsx'
import { Publisher } from './sections/Publisher.jsx'
import { Writers } from './sections/Writers.jsx'
import { Compositions } from './sections/Compositions.jsx'
import { Terms } from './sections/Terms.jsx'
import { Windows } from './sections/Windows.jsx'
import { PriorPublisher } from './sections/PriorPublisher.jsx'
import { Rates } from './sections/Rates.jsx'
import { Exclusions } from './sections/Exclusions.jsx'
import { Accounting } from './sections/Accounting.jsx'
import { Advances } from './sections/Advances.jsx'
import { Fees } from './sections/Fees.jsx'

function Toast() {
  const { toastMsg } = useReview()
  return <div className={'toast' + (toastMsg ? ' show' : '')}>{toastMsg}</div>
}

function Screen() {
  const { counts, toast } = useReview()
  const open = counts.rev + counts.nf

  /* флаги advisory — коммит не блокируется, открытые переезжают на запись */
  const commit = () =>
    toast(
      open
        ? `Committed with ${open} advisory flag${open > 1 ? 's' : ''} — they carry onto the record as open items (demo).`
        : 'Committed — clean record created (demo).'
    )

  return (
    <>
      <div className="appshell">
      <AppRail />
      <div className="shell">
      <AppBar />

      {/* крошки живут справа сверху, «Supply Chain» — акцентом */}
      <div className="pagehead">
        <div>
          <h1>Extraction Review</h1>
          <div className="subline">
            Structured draft record extracted from <b>Reyes_Songs_CoPub_2026.pdf</b> · Deal Type: Co-Publishing ·
            Client Type: Publisher (Parent)
          </div>
        </div>
        <div className="crumbs">
          <a href="#">Supply Chain</a> &rsaquo; Agreements &rsaquo; Extraction Review
        </div>
      </div>

      <div className="split">
        <PdfColumn />

        <div className="main">
          <TotalReviewBar onCommit={commit} />

          <Manual />
          <Dates />
          <Parties />
          <Publisher />
          <Writers />
          <Compositions />
          <Terms />
          <Windows />
          <PriorPublisher />
          <Rates />
          <Exclusions />
          <Accounting />
          <Advances />
          <Fees />

          <div className="actions">
            <BackButton />
            <span className="gate">
              {open
                ? `${open} advisory flag${open > 1 ? 's' : ''} still open — commit is not blocked; unresolved flags carry onto the record.`
                : 'All flags resolved — clean commit.'}
            </span>
            <CommitButton onClick={commit} />
          </div>
        </div>
      </div>
      </div>
      </div>

      <Toast />
    </>
  )
}

export function ExtractionReview() {
  return (
    <ReviewProvider>
      <ContractProvider>
        <Screen />
      </ContractProvider>
    </ReviewProvider>
  )
}
