"use client"

import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    doc,
    setDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase/index";
import { getDocRef } from "@/app/firebaseutils";
import styles from './topics.module.css';
import Header from "../../../../components/Header";
import Link from "next/link";

export default function TopicList({ params }: { params: { course: string } }) {
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
        <>
        <Header />
        <div>
            <Link href={"/instructor/courses/" + params.course} className={styles.backButton}>&lt; Regresar</Link>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-70p mx-auto">
                <div className="flex items-center mt-3">
                    <img src="/Book.svg" alt="" className="w-9 h-9 mr-2" />
                    <h1 className="text-5xl">{courseName}</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center mt-10">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <form onSubmit={addTopic} className="mb-4">
                    <div className="flex items-center space-x-2"> {/* Centered items */}
                        <input
                            type="text"
                            placeholder="Nombre del curso"
                            value={newTopic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" // Added "flex-1" for width
                        />
                        <button
                            type="submit"
                            className="bg-purple-400 text-white px-4 py-2 rounded-md hover-bg-purple-600 focus:outline-none focus-bg-purple-600" // Changed button color to purple
                        >
                            Agregar
                        </button>
                    </div>
                </form>
                <div>
                    <div className="space-y-2">
                        {topics?.map((topic, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 flex items-center justify-between shadow-md rounded-md"
                            >
                                <h1 className="text-lg font-semibold">{topic}</h1>
                                <button
                                    className="text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

function Topic({ topic }: any) {
    return (
        <div>
            <p>{topic}</p>
        </div>
    );
}
