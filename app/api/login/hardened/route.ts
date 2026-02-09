// hardened route
import { hardenedQuery } from '@/app/tools/DataManager';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    return hardenedQuery(request);
}