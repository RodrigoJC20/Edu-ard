import AddTopic from "./AddTopic";

async function getTopics() {
    return ['Tema 1', 'Tema 2', 'Tema 3'];
}


export default async function TopicList({ params } : {params: {course: string}}) {
    
    const topics = await getTopics();

    return (
        <div>
            <h1 className='text-2xl'>{params.course}</h1>
            <div>
                {topics?.map((topic, index) => (
                    <div key={index} className="flex">
                        <Topic topic={topic} />
                        <button>X</button>
                    </div>
                ))}
            </div>
            <AddTopic/>
        </div>
    );
}

function Topic({ topic }: any) {
    return (
        <div>
        <p>{topic}</p>
        </div>
    );
}