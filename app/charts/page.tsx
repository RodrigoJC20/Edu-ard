import Charts from "../../components/Charts"
import StudentList from "@/components/StudentList";

export default function Home(){

    // const data = [
    //     {
    //         "day": "Monday",
    //         "amount": 500
    //     },
    //     {
    //         "day": "Tuesday",
    //         "amount": 300
    //     },
    //     {
    //         "day": "Wednesday",
    //         "amount": 240
    //     },
    //     {
    //         "day": "Thursday",
    //         "amount": 230
    //     },
    //     {
    //         "day": "Friday",
    //         "amount": 150
    //     },
    //     {
    //         "day": "Saturday",
    //         "amount": 300
    //     }
    // ];

    const data = [
        {
            name: "Juan",
            topics: [
                {
                    topic: "math",
                    count: 12
                },
                {
                    topic: "history",
                    count: 11
                },
                {
                    topic: "programming",
                    count: 5
                }
            ]
        },
        {
            name: "Jose",
            topics: [
                {
                    topic: "math",
                    count: 4
                },
                {
                    topic: "history",
                    count: 11
                }
            ]
        },
            {
                name: "Juan",
                topics: [
                    {
                        topic: "math",
                        count: 12
                    },
                    {
                        topic: "history",
                        count: 11
                    },
                    {
                        topic: "programming",
                        count: 5
                    }
                ]
            },
            {
                name: "Jose",
                topics: [
                    {
                        topic: "math",
                        count: 4
                    },
                    {
                        topic: "history",
                        count: 11
                    }
                ]
            }
        ]

    return (
        <>
            <div className={"flex"}>
                <main className={"flex-col w-1/2 mx-auto relative"}>
                    <h1 className={"text-center"}>Subject</h1>
                    <h2>Overall Statistics</h2>
                    <Charts data={data}/>
                    <StudentList users={data}/>
                </main>
            </div>
        </>
    )
}