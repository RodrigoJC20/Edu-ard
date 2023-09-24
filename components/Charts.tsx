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
    return (
        <>
            <section className="flex my-4 px-4 gap-2">
                <div className=" w-full h-[250px] bg-amber-50 rounded"><RadarChartPlot data={data}/></div>
            </section>
        </>
    );
};

export default Charts;