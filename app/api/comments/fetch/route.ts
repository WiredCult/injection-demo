import { getComments } from "@/app/tools/DataManager";

export async function GET() {
    return getComments();
}