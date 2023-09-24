export default async function TopicList({ params } : {params: {course: string}}) {

    return (
        <div>
            <h1 className='text-2xl'>aquí va el chat de {params.course}</h1>
        </div>
    );
}