import React, { useState, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Loading from "../../../pages/loading/loading";

import "./style.css";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<{ email: string; body: string }[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const POSTS_PER_PAGE = 10;


  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FEEDBACK_API_ENDPOINT}?_page=${page}&_limit=${POSTS_PER_PAGE}`
      );
      const newPosts = response.data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className=" infinite-Scroll container">
      <h1 className="mt-5 mb-3">What User say about Us?</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<Loading/>}
        endMessage={<p>No more posts to show.</p>}
      >
        {posts.map((post, index) => (
          <div key={index} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{post.email}</h5>
              <p className="card-text">{post.body}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
