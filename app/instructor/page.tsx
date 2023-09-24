'use client'

import Link from "next/link";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore"; 
import { db } from "../../lib/firebase/index";
import React, { useState, useEffect, FormEvent } from "react";

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
          setNewCourse({ id: '', name: '', topics:[] })
        }
    }

    useEffect(() => {
        const q = query(collection(db, 'course'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let courseArr: any[] = [];

            querySnapshot.forEach((doc) => {
                courseArr.push({...doc.data(), id: doc.id})
            })
            setCourses(courseArr)
        })

        return () => unsubscribe()
    })

    return (
        <>
            <div>
                <h1 className='text-2xl'>Bienvenido Ryan!</h1>
                <div>
                    {courses?.map((course) => (
                        <div key={course.id} className="flex">
                            <Link href={`instructor/courses/${course.id}`}>{course.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={addCourse}>
            <h3>Agregar curso</h3>
            <input
                type="text"
                placeholder="Nombre del curso"
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
            />
            <button type="submit">Agregar</button>
            </form>
        </>
    );
}