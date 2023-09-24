"use client"

import React, { useState } from "react";
import RadarChartPlot from "@/components/RadarChartPlot";

interface UserData {
    name: string;
    topics: {
        topic: string;
        count: number;
    }[];
}

function StudentList({ users }: { users: UserData[] }) {
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    return (
        <div className="bg-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user, index) => (
                    <div key={index} className="relative">
                        <div
                            className="cursor-pointer p-4 bg-blue-200 hover:bg-blue-300 rounded-lg"
                            onClick={() => setSelectedUser(user)}
                        >
                            {user.name}
                        </div>
                        {selectedUser === user && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="p-4 bg-white rounded-lg shadow-lg max-w-3xl w-full relative">
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    >
                                        Close
                                    </button>
                                    <div className="w-full h-[250px] bg-white rounded mt-10">
                                        <RadarChartPlot
                                            data={user.topics.map((topicData) => ({
                                                topic: topicData.topic,
                                                amount: topicData.count,
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentList;
