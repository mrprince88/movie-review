"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Loader from "~/app/_components/Loader";

import { cn } from "~/utils";

const ReviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    movieId: "",
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const utils = api.useUtils();

  const { data: movies } = api.movie.get.useQuery({ query: "" });
  const { mutate: addReview, isPending } = api.review.create.useMutation({
    onSuccess: async () => {
      await utils.review.get.invalidate({ id: formData.movieId });
      await utils.movie.getById.invalidate({ id: formData.movieId });
      await utils.movie.get.invalidate();
      onClose();
    },
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black bg-opacity-50",
        !isOpen && "hidden",
      )}
    >
      <dialog
        open={isOpen}
        className="fixed inset-0"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
          <h3 className="text-xl font-semibold text-gray-900">
            Add new review
          </h3>
          <button
            type="button"
            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form>
          <div className="space-y-4 p-4 md:p-5">
            <select
              className="w-full rounded-md border border-gray-300 bg-white p-2"
              value={formData.movieId}
              name="movieId"
              onChange={(e) => {
                setFormData({ ...formData, movieId: e.target.value });
              }}
            >
              <option disabled value="">
                -- select an option --
              </option>
              {movies?.map((movie) => (
                <option key={`option${movie.id}`} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-md border border-gray-300 p-2"
              name="name"
              value={formData.reviewer}
              onChange={(e) =>
                setFormData({ ...formData, reviewer: e.target.value })
              }
            />
            <input
              type="number"
              max={10}
              min={0}
              placeholder="Rating out of 10"
              className="w-full rounded-md border border-gray-300 p-2"
              name="rating"
              value={formData.rating}
              onChange={(e) => {
                const value = Math.min(10, Math.max(0, Number(e.target.value)));

                setFormData({ ...formData, rating: value });
              }}
            />
            <textarea
              rows={3}
              placeholder="Comment"
              className="w-full rounded-md border border-gray-300 p-2"
              name="comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end md:p-5">
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                addReview(formData);
              }}
              disabled={isPending}
            >
              {isPending && <Loader />} Add review
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ReviewModal;
