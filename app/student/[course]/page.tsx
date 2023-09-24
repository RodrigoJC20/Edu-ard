import OpenAI from "openai";
import Form from "@/components/Form";
import Link from "next/link";

function getBaseURL() {
    if (typeof process.env.VERCEL_URL === 'string') {
        return `https://chatgpt.shivanshu.in`
    }
    return 'http://localhost:3000'
}

const topics = ['sum', 'subtracions', 'functions', 'algebra multiplication']



export default async function Home({ params } : {params: {course: string}}) {
    const modelsList = (await (
        await fetch(`https://chatgpt.shivanshu.in/api/models`)
    ).json()) as OpenAI.ModelsPage
    // console.log(modelsList)
    return (
        <div>
            <Link href="/" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg">&lt;</Link>
            <h1 className='text-2xl'>aquí va el chat de {params.course}</h1>
            <Form modelsList={modelsList} topicsArray={topics}/>
        </div>
    );
}