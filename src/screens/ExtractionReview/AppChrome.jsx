/* Хром приложения по эталону 199:11794.
   Рейл — нода `navigations` (199:11796): белый, с правой границей,
   лого-растр 48×33 и 11 контурных иконок 22×22 (#5A5A5A).
   Логотип и иконки — оригинальные ассеты из Figma, не перерисованные. */
import logo from '../../assets/nav/logo.png'
import nav1 from '../../assets/nav/nav-1.svg'
import nav2 from '../../assets/nav/nav-2.svg'
import nav3 from '../../assets/nav/nav-3.svg'
import nav4 from '../../assets/nav/nav-4.svg'
import nav5 from '../../assets/nav/nav-5.svg'
import nav6 from '../../assets/nav/nav-6.svg'
import nav7 from '../../assets/nav/nav-7.svg'
import nav8 from '../../assets/nav/nav-8.svg'
import nav9 from '../../assets/nav/nav-9.svg'
import nav10 from '../../assets/nav/nav-10.svg'
import nav11 from '../../assets/nav/nav-11.svg'

const NAV = [nav1, nav2, nav3, nav4, nav5, nav6, nav7, nav8, nav9, nav10, nav11]

export function AppRail() {
  return (
    <div className="rail">
      <div className="rail-logo">
        <img src={logo} alt="SC" />
      </div>
      <div className="rail-items">
        {NAV.map((src, i) => (
          <span className="rail-item" key={i}>
            <img src={src} alt="" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function AppBar() {
  return (
    <div className="appbar">
      <span className="sp" />
      <span className="theme">
        <span>
          <svg viewBox="0 0 16 16" fill="#F0B429">
            <circle cx="8" cy="8" r="3.4" />
            <path
              d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4"
              stroke="#F0B429"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M13.4 9.8A5.8 5.8 0 016.2 2.6a5.8 5.8 0 107.2 7.2z" fill="#CFCAC5" />
          </svg>
        </span>
      </span>
      <span className="help">HELP CENTER</span>
      <span className="user">
        <span className="ava">UN</span>
        User Name
        <svg viewBox="0 0 10 10" width="10" height="10" fill="#fff">
          <path d="M1.2 3.4h7.6L5 8z" />
        </svg>
      </span>
    </div>
  )
}
