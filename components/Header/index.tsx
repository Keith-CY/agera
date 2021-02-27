import Link from 'next/link'
import { explorerTitle } from 'utils'

const Header = () => (
  <header className="h-14 bg-black flex">
    <div className="main-container items-center">
      <Link href="/">
        <a className="text-xl text-white font-bold no-underline flex-0">{explorerTitle}</a>
      </Link>
    </div>
  </header>
)
export default Header
