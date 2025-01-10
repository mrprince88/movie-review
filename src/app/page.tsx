"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "~/app/_components/Header";
import MovieCard from "~/app/_components/MovieCard";
import { api } from "~/trpc/react";

const Home = () => {
  const [text, setText] = useState("");
  const { data, refetch } = api.movie.get.useQuery(
    { query: text },
    { enabled: false },
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      refetch().catch((err) => {
        console.error(err);
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [text, refetch]);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Header />

      <main className="container mx-auto px-2 pt-8">
        <section className="mb-2">
          <h2 className="mb-4 text-3xl font-bold">
            The best movie reviews site!
          </h2>
          <input
            placeholder="Search for your favorite movie"
            className="w-1/2 rounded-md border border-gray-300 p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </section>

        <section className="mt-10">
          {!data ||
            (data.length === 0 && (
              <p className="text-center">No movies found!</p>
            ))}
          <div className="grid grid-cols-3 gap-4">
            {data?.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
