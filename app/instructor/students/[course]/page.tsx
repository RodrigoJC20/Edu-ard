import Link from "next/link";

export default function Instructor({ params } : {params: {course: string}}) {

    return (
        <div>
            <h1 className='text-2xl'>Estudiantes</h1>
            <Link href={`/instructor/students/${params.course}/juan`}>juan</Link>
        </div>
    );
}