'use client'

import RadarChartPlot from "@/components/RadarChartPlot";

interface UserData {
    name: string;
    topics: {
        topic: string;
        count: number;
    }[];
}

const Charts = ({data}: {data:UserData[]}) => {

    const topicDataArray: { topic: string; amount: number }[] = [];

    for (const user of data) {
        for (const topicData of user.topics) {
            const { topic, count } = topicData;
            const existingTopicIndex = topicDataArray.findIndex((item) => item.topic === topic);

            if (existingTopicIndex !== -1) {
                topicDataArray[existingTopicIndex].amount += count;
            } else {
                topicDataArray.push({ topic, amount: count });
            }
        }
    }

    // Sort the array in descending order based on 'amount'
    topicDataArray.sort((a, b) => b.amount - a.amount);

    // Get the top 6 topics (or all if there are fewer than 6)
    const transformedData = topicDataArray.slice(0, 6);


    return (
        <>
            <section className="flex my-4 px-4 gap-2">
                <div className="w-full h-[250px] bg-white rounded"><RadarChartPlot data={transformedData}/></div>
            </section>
        </>
    );
};

export default Charts;