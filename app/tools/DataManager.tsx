import { NextRequest, NextResponse } from "next/server";
// set up and define the postgres db connection
import { Client } from 'pg';
import sanitizeHtml from "sanitize-html";

const CONNECTION_STRING = {
  user: 'user',
  password: 'password',
  host: 'postgres',
  port: 5432,
  database: 'db',
}

export async function vulnerableQuery(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()

  // grab the information from the json response
  const body: any = await request.json();
  // we aren't going to sanitize it, as per the demo
  let username = body.username;
  let password = body.password;

  // this time we'll 
  const unsafeQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
  ;`;

  // get the result
  try {
    const result: any = await client.query(unsafeQuery);

    // if the query returns something, welcome the user and give the okay status
    if (result.rows.length) {
      return NextResponse.json({ message: `Welcome ${username}`, query: unsafeQuery }, { status: 200 });
      // else, give invalid credentials
    } else {
      return NextResponse.json({ error: 'Invalid credentials', query: unsafeQuery }, { status: 406 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }
};

export async function hardenedQuery(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()

  // grab the information from the json response
  const body: any = await request.json();

  let username: string = body.username;
  let password: string = body.password;

  // this is a parameterized query
  const safeQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';

  // set the value array
  let values: string[] = [username, password];

  // get the result
  try {
    const result: any = await client.query(safeQuery, values);

    if (result.rows.length) {
      return NextResponse.json({ message: `Welcome ${username}` }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials', query: safeQuery }, { status: 406 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }
}

export async function getComments() {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect();

  const commentQuery = `SELECT * FROM comments;`;
  try {

    const result: any = await client.query(commentQuery);
    let comments: any = result.rows;

    if (result.rows.length) {
      return NextResponse.json({ comments: comments }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No comments found' }, { status: 406 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }


}

export async function submitCommentVulnerable(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()

  // grab the information from the json response
  const body: any = await request.json();

  let username: string = body.username;
  let comment: string = body.comment;

  const insertQuery = 'INSERT INTO comments(username, comment) VALUES($1, $2)';
  // query to refresh the comments
  const commentQuery = `SELECT * FROM comments;`;

  // set the value array
  let values: string[] = [username, comment];

  // try to insert the comments and refresh the comments
  try {
    const result: any = await client.query(insertQuery, values);

    // grab the latest comments and send them back as json
    const refreshComments: any = await client.query(commentQuery);
    let comments: any = refreshComments.rows;

    (result.rows.length)
    return NextResponse.json({ comments: comments, result: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }

}

export async function submitCommentHardened(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()

  // grab the information from the json response
  const body: any = await request.json();

  // the key take away here is santization
  let username: string = sanitizeHtml(body.username);
  let comment: string = sanitizeHtml(body.comment);

  const insertQuery = 'INSERT INTO comments(username, comment) VALUES($1, $2)';

  // query to refresh the comments
  const commentQuery = `SELECT * FROM comments;`;

  // set the value array
  let values: string[] = [username, comment];

  // try to insert the comments
  try {
    const result: any = await client.query(insertQuery, values);

    // grab the latest comments and send them back as json
    const refreshComments: any = await client.query(commentQuery);
    let comments: any = refreshComments.rows;

    return NextResponse.json({ comments: comments, result: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  } finally {
    client.end();
  }

}

// the challenge route handler
export async function submitSearch(request: NextRequest) {
  const client = new Client(CONNECTION_STRING)
  // open database connection
  await client.connect()

  // grab the information from the json response
  const body: any = await request.json();
  // we aren't going to sanitize it, as per the demo
  let search = body.search;

  const unsafeSearch =
    `SELECT type FROM corn WHERE LOWER(type) LIKE '%' || LOWER('${search}') || '%';`;


  try {
    const result: any = await client.query(unsafeSearch);
    if (result.rows.length > 0) {

      return NextResponse.json(
        { types: result.rows, query: unsafeSearch },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Not found", query: unsafeSearch },
        { status: 404 }
      );
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message, query: unsafeSearch });
  } finally {
    client.end();
  }

}