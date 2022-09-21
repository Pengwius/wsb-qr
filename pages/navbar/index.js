import React from 'react';
import style from './Navbar.module.css';
import Link from 'next/link';

export function Navbar() {
    return (
        <>
            <nav className={style.navbar}>
                <h1 className={style.logo}>Logo</h1>
                <div className={style.options}>
                    <Link href="/login">
                        <a className={style.login}>Login</a>
                    </Link>
                </div>
            </nav>
        </>
    )
}


export default Navbar;
