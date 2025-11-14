import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { MovieType } from "@/types/MovieType";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Movies() {
  const KEYWORD = "movie"; 
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const fetchMovies = async (currentPage: number) => {
    if (!hasMore) return;

    setLoading(true);

    try {
      const res = await api.get("", {
        params: { s: KEYWORD, page: currentPage },
      });

      if (res.data.Response === "False") {
        setHasMore(false);
        return;
      }

      setMovies((prev) => [...prev, ...res.data.Search]);
    } catch (e) {
      console.error("Error fetching movies", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;

      if (bottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="mt-6 px-6">
      <h1 className="text-3xl font-bold text-center mb-5">Movie List</h1>

      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Dialog key={movie.imdbID}>
            <DialogTrigger asChild>
              <Card
                onClick={() => setSelectedMovie(movie)}
                className="cursor-pointer hover:shadow-lg transition"
              >
                <CardHeader className="p-0">
                  <div className="w-full h-60 overflow-hidden">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{movie.Title}</CardTitle>
                  <p>{movie.Year}</p>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <img
                  src={selectedMovie?.Poster}
                  alt=""
                  className="w-full h-64 object-cover rounded-md"
                />
                <DialogTitle>{selectedMovie?.Title}</DialogTitle>
                <p className="text-gray-500">{selectedMovie?.Year}</p>
                <DialogDescription>{selectedMovie?.Type}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {loading && (
        <p className="text-center mt-4 text-gray-600">Loading more movies...</p>
      )}

      {!hasMore && (
        <p className="text-center mt-4 text-gray-400">
          No more movies to load 
        </p>
      )}
    </div>
  );
}
