// challenge route
import { submitSearch } from '@/app/tools/DataManager';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    return submitSearch(request);
}