'use client'

import Link from "next/link";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../lib/firebase/index";
import React, { useState, useEffect } from "react";
import styles from './page.module.css';
import Header from '../../components/Header';

type Course = {
    id: string;
    name: string;
    topics: string[];
}

export default function Instructor() {
    const [newCourse, setNewCourse] = useState<Course>({
        id: '',
        name: '',
        topics: []
    });

    const [courses, setCourses] = useState<Course[]>([]);

    const addCourse = async (e: any) => {
        e.preventDefault()

        if (newCourse.name !== '') {
            await addDoc(collection(db, 'course'), {
                name: newCourse.name.trim(),
                topics: newCourse.topics
            });
            setNewCourse({ id: '', name: '', topics: [] })
        }
    }

    useEffect(() => {
        const q = query(collection(db, 'course'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let courseArr: any[] = [];

            querySnapshot.forEach((doc) => {
                courseArr.push({ ...doc.data(), id: doc.id })
            })
            setCourses(courseArr)
        })

        return () => unsubscribe()
    })

    return (
        <>
            <div>
                <Header />
                <div>
                    <Link href="/" className={styles.backButton}>&lt;</Link>
                </div>
                <div className={styles.main}>
                    <h1 className='text-2xl $'>¡Bienvenido Mtro. López!</h1>
                    <div className={styles.info}>
                        <h3 className={styles.h3}>Tus cursos</h3>
                        <div className={styles.materias}>
                            {courses?.map((course) => (
                                <Link key={course.id} href={`instructor/courses/${course.id}`}>
                                    <div className={`flex ${styles.materia}`}>
                                        {course.name}
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.h3}>Agregar curso</h3>
                        <form className={styles.inp} onSubmit={addCourse}>
                            <input
                                type="text"
                                placeholder="Nombre del curso"
                                value={newCourse.name}
                                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                            />
                            <button className={styles.subtn} type="submit">Agregar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}