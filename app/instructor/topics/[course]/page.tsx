'use client'
import { useState, useEffect } from "react";
import { db } from "../../../../lib/firebase/index";
import { doc, onSnapshot } from "firebase/firestore";

export default function TopicList({ params } : {params: {course: string}}) {

    const [topics, setTopics] = useState<string[]>([]);
    const [courseName, setCourseName] = useState<string>('');

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
        <div>
            <h1 className='text-2xl'>{courseName}</h1>
            <div>
                {topics?.map((topic, index) => (
                    <div key={index} className="flex">
                        <h1>{topic}</h1>
                        <button>X</button>
                    </div>
                ))}
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