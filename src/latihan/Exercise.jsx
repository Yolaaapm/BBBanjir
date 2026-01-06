import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { getUsers, getPosts } from "./Services";
import PostCard from "./PostCard";

function Exercise() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("[Component] Gagal menampilkan data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 px-48">
        <h1 className="text-3xl font-bold text-center mb-6 text-special-red2">
          Post Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-full mx-auto">
          {getPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Exercise;
