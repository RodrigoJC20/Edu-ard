'use client'
import Link from "next/link";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase/index";
import React, { useState, useEffect } from "react";
import TopicList from "../../topics/[course]/page";
import Charts from "@/components/Charts";
import StudentList from "@/components/StudentList";
import Header from "../../../../components/Header";
import styles from './page.module.css';

interface UserData {
    name: string;
    topics: {
        topic: string;
        count: number;
    }[];
}

export default function Instructor({ params } : {params: {course: string}}) {

    const [data, setData] = useState<UserData[]>([]);

    function countOccurrences(arr: any[], element: any) {
        return arr.reduce((count, currentElement) => {
            return currentElement === element ? count + 1 : count;
        }, 0);
    }
    

    useEffect(() => {
        const q = query(collection(db, 'course-student'), where('courseId', '==', params.course));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let newData: any[] = []; // Create a new array to hold the transformed data
    
            querySnapshot.forEach((doc) => {
                const { studentName, topicsList } = doc.data(); // Extract the 'name' property
    
                let userData = newData.find(item => item.name === studentName);
                if (!userData) {
                    userData = { name: studentName, topics: [] };
                    newData.push(userData);
                }
    
                topicsList.forEach((topic: any) => {
                    let existingTopic = userData.topics.find((item: { topic: any; }) => item.topic === topic);
                    if (!existingTopic) {
                        const count = countOccurrences(topicsList, topic);
                        userData.topics.push({ topic, count });
                    }
                });
            });
    
            setData(newData); // Assuming you have a state variable called `setData` to hold the transformed data
            console.log(newData); 
        });

    
        return () => unsubscribe();
    }, [params.course]);

    return (
        <>
            <Header />
            <div>
                <Link href={"/instructor/courses/" + params.course} className={styles.backButton}>&lt; Regresar</Link>
            </div>
            <div className={"flex"}>
                <main className={"flex-col w-1/2 mx-auto relative"}>
                    <h1 className={styles.stats}>Estadística General</h1>
                    <Charts data={data}/>
                    <StudentList users={data}/>
                </main>
            </div>
        </>
    );
}