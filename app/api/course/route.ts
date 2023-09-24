import { db } from "../../../lib/firebase/index";

export async function GET(request: Request) {
    return new Response('hi')
}
