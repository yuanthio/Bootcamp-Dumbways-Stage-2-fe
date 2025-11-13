import { useParams } from "react-router-dom";

export function PostDetail() {
  const { postId } = useParams();
  return (
    <p className="text-center">
      Post Detail <span>{postId}</span>
    </p>
  );
}
