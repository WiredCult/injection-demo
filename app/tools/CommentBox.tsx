"use client"

import { useState } from "react";
import { Comments, Comment } from "./data.model";
import { sendJSONData } from "./Toolkit";
import Image from "next/image";

export const dynamic = "force-dynamic";

// vulnerable version
export default function CommentBox(commentArray: Comments) {
  const [comments, setComments] = useState<Comment[]>(commentArray.comments);
  const [vulnerable, setVulnerable] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [vulnerableRoute, setVulnerableRoute] = useState<boolean>(true);

  const onCommentSubmit = async () => {
    if (username.length && comment.length) {
      let commentJson = { "username": username, "comment": comment }


      let response: any = await sendJSONData(`/api/comments/submit/${vulnerableRoute ? 'vulnerable' : 'hardened'}`, commentJson, "POST");
      console.log(commentJson)

      setComments(response.data.comments)
    }
  }


  return (
    <div className="flex align-center justify-center mt-5 mb-5">

      <div className="flex flex-col items-center gap-5">
        <Image
          src={"/images/chub.png"}
          alt={"got corn??"}
          width={200}
          height={150}
        />

        <div className="relative w-100 h-100">
          <Image
            src={vulnerable ? ('/images/cornUnsafe.png') : ('/images/cornSafe.png')}
            alt={vulnerable ? ('corn') : ('safecorn')}
            fill={true}
          />
        </div>

        {vulnerable ? (
          <div>
            {/* vulnerable method:

          this method sets the inner html of each element to be the respective string. In doing this, we render the string as html, which is very dangerous (as implied by reacts renaming of the "setInnerHtml" function)
          */}
            <div className="flex flex-col max-w-2xl gap-4 bg-gray-500 rounded pb-2">
              {comments.map(comment => (
                <div key={comment.id} className="flex flex-col gap-2">
                  <div id="username" dangerouslySetInnerHTML={{ __html: comment.username }} className="bg-amber-500 p-2 text-black"></div>
                  <div id="comment" dangerouslySetInnerHTML={{ __html: comment.comment }} className="pl-2"></div>
                </div>
              ))}
            </div>

            {/* hardened method:

            this method displays the respective comments strings as strings, and not html.

          */}
          </div>) : (<div className="flex flex-col max-w-2xl gap-4 bg-gray-500 rounded pb-2">
            {comments.map(comment => (
              <div key={comment.id} className="flex flex-col gap-2">
                <div id="username" className="bg-amber-500 p-2 text-black">{comment.username}</div>
                <div id="comment" className="pl-2">{comment.comment}</div>
              </div>
            ))}
          </div>)
        }

        <div className="display flex flex-col text-center gap-2">
          {/* comment form */}
          <p> Like what you see, farmer? Leave a comment:</p>
          <label htmlFor="comment-username"> Display name</label>
          <input type="text" id="comment-username" onChange={(e) => setUsername(e.target.value)} className="bg-white text-black rounded p-1"></input>
          <label htmlFor="comment-text"> Comment</label>
          <textarea id="comment-text" onChange={(e) => setComment(e.target.value)} className="bg-white text-black rounded p-1"></textarea>
        </div>

        {/* display the current mode */}
        <p className={`${vulnerable ? 'text-red-600' : 'text-green-500'}`}>Current display mode: {vulnerable ? 'unsafe' : 'safe'}</p>

        {/* display the current route */}
        <p className={`${vulnerableRoute ? 'text-red-600' : 'text-green-500'}`}>Current route: {vulnerableRoute ? 'vulnerable' : 'hardened'}</p>

        {/* button container */}
        <div className="flex flex-col gap-5">

          <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={onCommentSubmit}> Submit </button>

          <div className="flex flex-row gap-2">
            <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={(e) => setVulnerable(!vulnerable)}> Switch display mode </button>

            <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={(e) => setVulnerableRoute(!vulnerableRoute)}> Switch route </button>
          </div>

        </div>
      </div>
    </div>

  )
}