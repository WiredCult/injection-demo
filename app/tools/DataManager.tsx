import { NextRequest, NextResponse } from "next/server";
// set up and define the postgres db connection
import { Client } from 'pg';
const CONNECTION_STRING = {   user: 'user',
  password: 'password',
  host: 'postgres',
  port: 5432,
  database: 'db',}

export async function vulnerableQuery(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()
  
  // grab the information from the json response
  const body:any = await request.json();
  // we aren't going to sanitize it, as per the demo
  let username = body.username;
  let password = body.password;
  
  // construct a rawdogged query,
  // its typically recommended to use query parameters here as inserting user inputs directly into a query string leads to bad news, as you'll see
  const unsafeQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
  ;`;
  
  // get the result
  try{
  const result: any = await client.query(unsafeQuery);
  
    if (result.rows.length) {
      return NextResponse.json({ message: `Welcome ${username}`}, {status:200});
    }else {
      return NextResponse.json({ error: 'Invalid credentials' }, {status: 406});
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }
  
  
  
};

export async function hardenedQuery(request: NextRequest) {

}