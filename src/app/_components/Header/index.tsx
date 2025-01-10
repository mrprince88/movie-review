"use client";

import { useState } from "react";
import Link from "next/link";
import MovieModal from "~/app/_components/MovieModal";
import ReviewModal from "~/app/_components/ReviewModal";

export default function Header() {
  const [isMovieModalOpen, setisMovieModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-200 pb-10 pl-24 pr-24 pt-10">
      <div className="mr-6 flex flex-shrink-0 items-center text-black">
        <Link href="/" className="text-xl uppercase tracking-tight">
          MovieCritic
        </Link>
      </div>
      <div className="flex items-center">
        <button
          className="border border-blue-700 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          onClick={() => setisMovieModalOpen(true)}
        >
          Add new movie
        </button>
        <MovieModal
          isOpen={isMovieModalOpen}
          onClose={() => setisMovieModalOpen(false)}
        />
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="ml-4 bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Add new review
        </button>
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </div>
    </nav>
  );
}
