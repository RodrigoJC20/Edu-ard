'use client'
import Link from "next/link";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase/index";
import React, { useState, useEffect } from "react";

export default function Instructor({ params } : {params: {course: string}}) {

    const [students, setStudents] = useState<string[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'course-student'), where('courseId', '==', params.course));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let studentArr: string[] = [];
    
            querySnapshot.forEach((doc) => {
                const { studentName } = doc.data(); // Extract the 'name' property
                studentArr.push(studentName);
            });
    
            setStudents(studentArr);
        });
    
        return () => unsubscribe()
    }, []);

    return (
        <div>
            <h1 className='text-2xl'>Estudiantes</h1>
            <div>
                    {students?.map((student, index) => (
                        <div key={index} className="flex">
                            <Link href={`/instructor/students/${params.course}/${student}`}>{student}</Link>
                        </div>
                    ))}
                </div>
        </div>
    );
}