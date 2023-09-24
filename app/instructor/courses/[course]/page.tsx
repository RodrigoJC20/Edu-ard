'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../../../lib/firebase/index";
import { doc, onSnapshot } from "firebase/firestore";

export default function Course({ params } : {params: {course: string}}) {

    const [courseName, setCourseName] = useState<string>('');

    useEffect(() => {
        const docRef = doc(db, "course", params.course);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                if (data) {
                    setCourseName(data.name);
                }
            } else {
                // Handle the case when the document doesn't exist
                console.log("Document does not exist");
            }
        });

        return () => unsubscribe();
    }, [params.course]);

    return (
        <div>
            <h1 className='text-2xl'>Curso {courseName}</h1>
            <Link href={`/instructor/topics/${params.course}`}>Topics</Link>
            <Link href={`/instructor/students/${params.course}`}>Students</Link>
        </div>
    );
}