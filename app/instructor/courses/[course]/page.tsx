'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../../../lib/firebase/index";
import { doc, onSnapshot } from "firebase/firestore";
import Header from "../../../../components/Header";
import styles from './styles.module.css';

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
        <>
        <Header />
        <div>
            <Link href="/instructor/" className={styles.backButton}>&lt;</Link>
        </div>
        <div>
            <div className={styles.cont1}>
                <div className="flex justify-center items-center">
                    <div className="w-70p mx-auto">
                        <div className="flex items-center mt-3">
                            <img src="/Book.svg" alt="" className="w-9 h-9 mr-2" />
                            <h1 className="text-5xl">{courseName}</h1>
                        </div>
                    </div>
                </div>

                <section className={styles.info}>
                    <h3>Comparte este ID con tus alumnos</h3>
                    <form className={styles.form}>
                    <input
                    className={styles.input}
                        type="text"
                        value={params.course}
                    />
                    <button id="copyButton" type="button">Copiar</button>
                    </form>
                </section>

                <div className="text-center">
                    <h1 className="text-2xl mb-10">Contenido de <b>{courseName}</b></h1>
                    <div className="flex justify-center items-center mt-3 gap-10">
                        <Link href={`/instructor/students/${params.course}`}>
                            <div className="flex flex-col items-center mx-8">
                                <img src="/student.svg" alt="" className={styles.img1} />
                                <h1 className="text-4xl mt-3">Estudiantes</h1>
                            </div>
                        </Link>
                        <Link href={`/instructor/topics/${params.course}`}>
                            <div className="flex flex-col items-center mx-8">
                                <img src="/syllabus.svg" alt="" className={styles.img1} />
                                <h1 className="text-4xl mt-3">Temario</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );    
}