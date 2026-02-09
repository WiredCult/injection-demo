// hardened comment submit route
import { submitCommentHardened } from '@/app/tools/DataManager';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    return submitCommentHardened(request);
}