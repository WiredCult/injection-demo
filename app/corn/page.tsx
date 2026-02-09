import CommentBox from "../tools/CommentBox";
import { Comments, Comment } from "../tools/data.model";
import { getJSONData } from "../tools/Toolkit";

export default async function corn() {
    // define json path
    const CONNECTION_SCRIPT: string = "http://localhost:3000/api/comments/fetch"

    // fetch the comments
    let data: any = await getJSONData(CONNECTION_SCRIPT);
    console.log(data)

    let comments: Comment[] = data.comments;

    return (
        <CommentBox comments={comments} />
    )
}