import Link from "next/link";

export default function Course({ params } : {params: {course: string}}) {

    return (
        <div>
            <h1 className='text-2xl'>Curso {params.course}</h1>
            <Link href={`/instructor/topics/${params.course}`}>Temas</Link>
            <Link href={`/instructor/students/${params.course}`}>Temas</Link>
        </div>
    );
}