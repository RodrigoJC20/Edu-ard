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
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <a href="/">Go Back</a> {/* Add an anchor tag for "Go Back" */}
                <form onSubmit={addTopic} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{courseName}</h3>
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
                            className="bg-purple-500 text-white px-4 py-2 rounded-md hover-bg-purple-600 focus:outline-none focus-bg-purple-600" // Changed button color to purple
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
    );
}

function Topic({ topic }: any) {
    return (
        <div>
            <p>{topic}</p>
        </div>
    );
}
