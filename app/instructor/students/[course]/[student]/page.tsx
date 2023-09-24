import Link from "next/link";

export default function Course({ params } : {params: {course: string, student: string}}) {

    return (
        <div>
            <h1 className='text-2xl'>Estudiante {params.student}</h1>

            <h2>clase {params.course}</h2>
        </div>
    );
}