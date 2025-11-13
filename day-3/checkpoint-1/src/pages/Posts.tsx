import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import keyboardImg from "../assets/keyboard.jpg";

export function Posts() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "Content post 1",
      author: "Yuan",
      image: keyboardImg,
    },
    {
      id: 2,
      title: "Post 2",
      content: "Content post 2",
      author: "Daffa",
      image: keyboardImg,
    },
    {
      id: 3,
      title: "Post 3",
      content: "Content post 3",
      author: "Gunawan",
      image: keyboardImg,
    },
  ];
  return (
    <div className="mt-4">
      <h1 className="text-3xl text-slate-900 text-center mb-4">Posts</h1>
      <div className="flex justify-center gap-5 mb-5">
        {posts.map((post) => (
          <div className="w-48 bg-slate-700 flex flex-col rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="text-white mb-2">{post.title}</h3>
              <Button key={post.id} asChild variant="secondary">
                <Link to={post.id.toString()}>{post.title}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
