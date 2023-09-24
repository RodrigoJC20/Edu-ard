import {RadarChart, Radar, PolarAngleAxis, PolarGrid, Legend, Tooltip, ResponsiveContainer} from "recharts";

interface UserData {
    name: string;
    topics: {
        topic: string;
        count: number;
    }[];
}

const RadarChartPlot = ({data}: {data:UserData[]}) => {
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

    const topicDataMap: { [key: string]: { topic: string; amount: number } } = {};

    for (const user of data) {
        for (const topicData of user.topics) {
            const { topic, count } = topicData;

            if (topic in topicDataMap) {
                topicDataMap[topic].amount += count;
            } else {
                topicDataMap[topic] = { topic, amount: count };
            }
        }
    }

    const transformedData = Object.values(topicDataMap);

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={transformedData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="topic" />
                    <Radar name="Questions" dataKey="amount" stroke="#919191" fill="#933cfe" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip/>
                </RadarChart>
            </ResponsiveContainer>
        </>
    );
};
export default RadarChartPlot;