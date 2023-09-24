import Link from "next/link";

export default function Instructor() {

    return (
        <div>
            <h1 className='text-2xl'>Bieenvenido user</h1>
            <Link href={`instructor/courses/algebra`}>curso1</Link>
            <Link href={`instructor/courses/algebra2`}>curso1</Link>
            <Link href={`instructor/courses/algebra3`}>curso1</Link>
        </div>
    );
}