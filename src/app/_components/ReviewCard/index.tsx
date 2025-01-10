export default function ReviewCard({
  review,
}: {
  review: {
    id: string;
    movieId: string;
    reviewer: string;
    rating: number;
    comment: string;
  };
}) {
  return (
    <div className="flex flex-col border border-gray-700  bg-white px-5 py-10">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="pb-4 text-xl">{review.comment}</p>
          <p className="pb-4 text-xl text-blue-700">{review.rating}/10</p>
        </div>
        <p className="italic">
          by: <span>{review.reviewer}</span>
        </p>
      </div>
    </div>
  );
}
