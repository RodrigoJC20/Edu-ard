'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from './page.module.css';

export default function Home() {
  const [course, setCourse] = useState('');
  const router = useRouter();

  const launchChat = async (e: any) => {
    e.preventDefault();
    router.push(`/student/${course}`);
  }

  return (
    <main className={styles.main}>
      <div>
        <img className={styles.logo} src="/logoEdu1.gif" alt="logo" />
      </div>

      <section className={styles.info}>

        <img src="/Edu-ard.svg" alt="logo" />
          <h3>Join an Edu-ard chatbot course with a link</h3>
        <form className={styles.form} onSubmit={launchChat}>
          <input
          className={styles.input}
            type="text"
            placeholder="Paste a link in here.."
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
        <Link href="/instructor/" className={styles.instructor}>I’m a professor</Link>
      </section>

    </main>
  )
}
