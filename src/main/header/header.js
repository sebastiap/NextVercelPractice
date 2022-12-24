import Styles from '/styles/Home.module.css'

import Link from 'next/link';

const Header = () => {

return (
    <header className={Styles.header}>
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/about">About</Link>
    </header>
)

}    

export default Header;