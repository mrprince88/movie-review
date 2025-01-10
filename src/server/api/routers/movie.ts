import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        releasedAt: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.movie.create({
        data: {
          name: input.name,
          releasedAt: input.releasedAt,
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.movie.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.movie.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
