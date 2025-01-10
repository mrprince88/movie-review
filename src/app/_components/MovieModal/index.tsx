"use client";

import { api } from "~/trpc/react";
import Loader from "~/app/_components/Loader";

import { cn } from "~/utils";

export default function MovieModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const utils = api.useUtils();

  const { mutate, isPending } = api.movie.create.useMutation({
    onSuccess: async () => {
      onClose();

      await utils.movie.invalidate();
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
          <h3 className="text-xl font-semibold text-gray-900">Add new movie</h3>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as typeof e.currentTarget & {
              name: { value: string };
              date: { value: string };
            };
            const name = form.name.value || "";
            const date = new Date(form.date.value || "");
            mutate({
              name,
              releasedAt: date,
            });
          }}
        >
          <div className="space-y-4 p-4 md:p-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 p-2"
              name="name"
            />
            <input
              type="date"
              placeholder="Release date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full rounded-md border border-gray-300 p-2"
              name="date"
            />
          </div>
          <div className="flex justify-end md:p-5">
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending && <Loader />}
              Add movie
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
