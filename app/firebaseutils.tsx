import { db } from "../lib/firebase/index";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";

type Course = {
    id: string;
    name: string;
    topics: string[];
}

export const addCourse = async (c: Course) => { // Fixing the parameter syntax here
    await addDoc(collection(db, 'course'), {
        name: c.name.trim(),
        topics: c.topics
    });
}

export const getDocRef = (courseId: string) => {
    return doc(db, 'course', courseId);
}

export const getTopicList = async (courseId: string) => {   
    const courseRef = getDocRef(courseId);
    const docSnapshot = await getDoc(courseRef);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data) {
            const topicsArray: string[] = data.topics || [];
            return topicsArray;
        }
    } else {
        console.log("Document does not exist");
    }
}

export const updateStudentCourse = async (cid: string, sn: string, tl: string[]) => {
    await addDoc(collection(db, 'course-student'), {
        studentName: sn.trim(),
        courseId: cid,
        topicsList: tl
    });
}

