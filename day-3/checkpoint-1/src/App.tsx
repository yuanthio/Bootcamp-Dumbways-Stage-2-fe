import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Posts } from "./pages/Posts";
import { PostDetail } from "./pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="flex gap-4 bg-slate-700 shadow-md w-full justify-center py-4">
        <Button asChild variant="secondary">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/about">Abouts</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/posts">Post</Link>
        </Button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
