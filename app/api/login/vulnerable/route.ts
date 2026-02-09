// vulnerable route
import { vulnerableQuery } from '@/app/tools/DataManager';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    return vulnerableQuery(request);
}