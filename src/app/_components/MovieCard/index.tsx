export default function MovieCard({
  movie,
}: {
  movie: {
    id: string;
    name: string;
    rating: number;
    releasedAt: Date;
  };
}) {
  return (
    <div className="flex flex-col rounded-md border bg-gray-200 px-5 py-10">
      <div className="flex flex-col">
        <p className="overflow-hidden text-ellipsis py-2 text-xl font-bold">
          {movie.name}
        </p>
        <p className="py-2 italic">
          Released at:{" "}
          <span className="normal">
            {movie.releasedAt.toLocaleDateString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="bold font-semibold">
          {movie.rating
            ? `Rating: ${movie.rating.toFixed(1)} / 10`
            : "No rating yet!"}
        </p>
      </div>
    </div>
  );
}
