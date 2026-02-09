// vulnerable comment submit route
import { submitCommentVulnerable } from '@/app/tools/DataManager';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    return submitCommentVulnerable(request);
}