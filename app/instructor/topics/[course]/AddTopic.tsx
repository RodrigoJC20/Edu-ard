'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
    const [topic, setTopic] = useState('');

    const router = useRouter();

    const add = async(e : any) => {
        e.preventDefault();
        //add post
        const body = JSON.stringify({ topic });
        console.log(body);

        setTopic('');

        router.refresh();
    }

    return (
        <form onSubmit={add}>
        <h3>Agregar tema</h3>
        <input
            type="text"
            placeholder="Tema"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
        />
        <button type="submit">Agregar</button>
        </form>
    );
}