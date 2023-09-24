import OpenAI from "openai";
import Form from "@/components/Form";
import { getTopicList } from "@/app/firebaseutils";
import { get } from "http";

function getBaseURL() {
    if (typeof process.env.VERCEL_URL === 'string') {
        return `https://chatgpt.shivanshu.in`
    }
    return 'http://localhost:3000'
}

export default async function Home({ params } : {params: {course: string}}) {

    //const topics = ['topic1', 'topic2', 'topic3']
    const topics = await getTopicList(params.course) 
    console.log(topics)
    
    const modelsList = (await (
        await fetch(`https://chatgpt.shivanshu.in/api/models`)
    ).json()) as OpenAI.ModelsPage
    // console.log(modelsList)
    return (
        <div>
            
            <Form modelsList={modelsList} topicsArray={topics || ['']} courseId={params.course}/>
        </div>
    );
}