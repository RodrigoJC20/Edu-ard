"use client"

import {lazy, Suspense, useState} from "react";
const RadarChartPlot = lazy(() => import("@/components/RadarChartPlot"));

interface UserData {
    name: string;
    topics: {
        topic: string;
        count: number;
    }[];
}

interface TransformedUserData {
    topic: string;
    amount: number;
}

function StudentBlock({user, onBlockClick}:{user:UserData, onBlockClick: (user:UserData) => void}){
    return (
        <div onClick={()=> onBlockClick(user)}>
            {user.name}
        </div>
    )
}

function StudentList({ users }: { users: UserData[] }) {
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [transformedData, setTransformedData] = useState<TransformedUserData[]>(
        []
    );

    const handleBlockClick = (user: UserData) => {
        setSelectedUser(user);

        // Check if user.topics is defined before mapping it
        if (user.topics) {
            const mappedData: TransformedUserData[] = user.topics.map((topicData) => ({
                topic: topicData.topic,
                amount: topicData.count,
            }));
            setTransformedData(mappedData);
        } else {
            // Handle the case where user.topics is undefined or null
            // You can set an empty array or handle it according to your requirements.
            setTransformedData([]);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <div>
                {users.map((user) => (
                    <StudentBlock
                        key={user.name}
                        user={user}
                        onBlockClick={handleBlockClick}
                    />
                ))}
                {selectedUser && (
                    <div>
                        {/* Wrap the RadarChartPlot in Suspense */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <RadarChartPlot data={transformedData} />
                        </Suspense>
                        <button onClick={() => setSelectedUser(null)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentList