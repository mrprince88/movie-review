"use client";

import { useParams } from "next/navigation";
import Header from "~/app/_components/Header";
import ReviewCard from "~/app/_components/ReviewCard";
import Head from "next/head";
import { api } from "~/trpc/react";

const MovieReviews = () => {
  const {
    id,
  }: {
    id: string;
  } = useParams();

  const { data } = api.movie.getById.useQuery({ id });

  const { data: reviews } = api.review.get.useQuery({ id });

  return (
    <>
      <Head>
        <title>{data ? data.name : "Movie Critic"}</title>
        <meta name="description" content="Movie Critic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="container mx-auto pt-8">
        {data && (
          <div className="flex w-full place-items-center justify-between">
            <h2 className="mb-4 text-3xl font-normal">{data.name}</h2>
            {data.rating ? (
              <span className="text-3xl text-blue-700">
                {data.rating.toFixed(1)}/10
              </span>
            ) : (
              <span className="text-3xl text-blue-700">No ratings yet!</span>
            )}
          </div>
        )}
        <div className="mb-10 mt-10 flex w-full flex-col justify-center gap-8">
          {reviews?.length === 0 && (
            <p className="text-center">No reviews yet!</p>
          )}
          {reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>
    </>
  );
};

export default MovieReviews;
