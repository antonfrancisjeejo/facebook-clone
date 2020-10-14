import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import MessageSender from "../MessageSender/MessageSender";
import Post from "../Post/Post";
import StoryReel from "../StoryReel/StoryReel";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        setPosts(
          snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            profilePic={post.data.profilePic}
            message={post.data.message}
            timestamp={post.data.timestamp}
            username={post.data.username}
            image={post.data.image}
          />
        );
      })}
    </div>
  );
};

export default Feed;
