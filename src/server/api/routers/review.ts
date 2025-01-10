import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        movieId: z.string().min(1),
        rating: z.number().min(0).max(10),
        comment: z.string(),
        reviewer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.review.create({
        data: {
          movieId: input.movieId,
          rating: input.rating,
          comment: input.comment,
          reviewer: input.reviewer,
        },
      });

      const reviews = await ctx.db.review.findMany({
        where: {
          movieId: input.movieId,
        },
      });

      const count = reviews.length;
      const sum = reviews.reduce((acc, cur) => {
        return acc + cur.rating;
      }, 0);

      await ctx.db.movie.update({
        where: {
          id: input.movieId,
        },
        data: {
          rating: sum / count,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.review.findMany({
        where: {
          movieId: input.id,
        },
      });
    }),
});
