'use client'

import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../../../lib/firebase/index";
import { getDocRef } from "@/app/firebaseutils";
import styles  from './topics.module.css';

export default function TopicList({ params } : {params: {course: string}}) {

    const [topics, setTopics] = useState<string[]>([]);
    const [courseName, setCourseName] = useState<string>('');
    const [newTopic, setTopic] = useState<string>('');

    const addTopic = async (e: any) => {
        e.preventDefault()
        const courseRef = getDocRef(params.course);
        const docSnapshot = await getDoc(courseRef);
        if (newTopic !== '' && docSnapshot.exists()) {
            await updateDoc(courseRef, {
                topics: [...topics, newTopic] // Use spread operator to update topics array immutably
            });
        }
        setTopic('');
    }

    useEffect(() => {
        const docRef = doc(db, "course", params.course);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                if (data) {
                    // Assuming there's a "topics" field in your document
                    const topicsArray: string[] = data.topics || [];
                    
                    setTopics(topicsArray);
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
        <div className={styles.main}>
            <form onSubmit={addTopic} className={styles.form}>
                <h3>{courseName}</h3>
                <input
                    type="text"
                    placeholder="Nombre del curso"
                    value={newTopic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <button type="submit">Agregar</button>
            </form>
            <div>
                <div className={styles.topic}>
                    {topics?.map((topic, index) => (
                        <div key={index}>
                            <h1>{topic}</h1>
                            <button>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Topic({ topic }: any) {
    return (
        <div>
        <p>{topic}</p>
        </div>
    );
}