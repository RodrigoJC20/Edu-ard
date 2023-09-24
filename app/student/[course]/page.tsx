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
            
            <h1 className='text-2xl'>aquí va el chat de {params.course}</h1>
            <Form modelsList={modelsList} topicsArray={topics || ['']} courseId={params.course}/>
        </div>
    );
}