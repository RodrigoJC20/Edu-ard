'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [course, setCourse] = useState('');
  const router = useRouter();

  const launchChat = async(e : any) => {
    e.preventDefault();
    router.push(`/student/${course}`);
  }

  return (
    <main>
      <h1>Hello, World!</h1>
      <form onSubmit={launchChat}>
          <h3>Curso</h3>
          <input
              type="text"
              placeholder="Tema"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
          />
          <button type="submit">Ir</button>
      </form>
      <Link href="/instructor/">Soy maestro</Link>
    </main>
  )
}
