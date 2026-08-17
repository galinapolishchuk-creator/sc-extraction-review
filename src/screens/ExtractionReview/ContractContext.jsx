import { createContext, useContext, useMemo, useState } from 'react'
import { addUnit, termEndDate } from './lib/dates.js'

/* Значения, которые живут сразу в нескольких секциях:
   Effective Date (Dates → Terms), сроки (Terms), Wraparound (Prior Publisher → Rates). */
const ContractContext = createContext(null)
export const useContract = () => useContext(ContractContext)

export function ContractProvider({ children }) {
  const [effDate, setEffDate] = useState('2026-04-01')
  const [initialTerm, setInitialTerm] = useState({ val: '3', unit: 'Years' })
  const [collection, setCollection] = useState({ val: '24', unit: 'Months' })
  const [rights, setRights] = useState({ val: '2', unit: 'Years' })
  const [orUntil, setOrUntil] = useState('Recoupment')
  const [wraparound, setWraparound] = useState(false)

  const calc = useMemo(() => {
    const te = termEndDate(effDate, initialTerm.val, initialTerm.unit)
    const clause = orUntil === 'None' ? '' : ` — or until ${orUntil.toLowerCase()}, whichever is later`
    const laterNote = orUntil === 'None' ? '' : ' (later if the term extends)'
    const cp = te ? addUnit(te, collection.val, collection.unit) : ''
    const rp = te ? addUnit(te, rights.val, rights.unit) : ''
    /* хелпер двухцветный: lead — посчитанная дата (positive), rest — пояснение */
    return {
      termEnd: te,
      initialHelp: te
        ? { lead: `End Date ${te}`, rest: ` · ${effDate} + ${initialTerm.val} ${initialTerm.unit}${clause}` }
        : { lead: 'End Date', rest: ' — needs a value' },
      collectionHelp: cp
        ? { lead: `Collection End ${cp}`, rest: ` · Term end ${te} + ${collection.val} ${collection.unit}${laterNote}` }
        : { lead: 'Collection End', rest: ' — needs Initial Term' },
      rightsHelp: rp
        ? { lead: `Rights End ${rp}`, rest: ` · Term end ${te} + ${rights.val} ${rights.unit}${laterNote}` }
        : { lead: 'Rights End', rest: ' — needs Initial Term' },
    }
  }, [effDate, initialTerm, collection, rights, orUntil])

  const value = {
    effDate,
    setEffDate,
    initialTerm,
    setInitialTerm,
    collection,
    setCollection,
    rights,
    setRights,
    orUntil,
    setOrUntil,
    wraparound,
    setWraparound,
    calc,
  }
  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}
