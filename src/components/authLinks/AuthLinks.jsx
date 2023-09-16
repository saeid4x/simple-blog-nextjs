"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './auth-links.module.css'

const AuthLinks = () => {

  const [open, setOpen] = useState(false)

    // temporary
    const {status} = useSession()
    return ( 
        <>
          {status === "unauthenticated" ? (
            <Link href="/login" className={styles.link}>Login</Link>
          ) : (
            <>
                <Link href="/write" className={styles.link} >write</Link>
                <span className={styles.link} onClick={signOut}>Logout</span>
            </>
          )}

          <div className={styles.burger} onClick={() =>setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>             
          </div>

          {open && (
            <div className={styles.responsiveMenu}>
               <Link href="/">Homepage</Link>
               <Link href="/">About</Link>
               <Link href="/">Contact</Link>

               {status === "unauthenticated" ? (
                    <Link href="/login">Login</Link>
                  ) : (
                    <>
                        <Link href="/write">write</Link>
                        <span className={styles.link}>Logout</span>
                    </>
                  )}
                  
            </div>
          )}
        
        </>
    );
}
 
export default AuthLinks;