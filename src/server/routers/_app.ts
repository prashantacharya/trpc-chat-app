import { z } from 'zod';
import { procedure, router } from '../trpc';
import { chatRouter } from './chat';

export const appRouter = router({
  hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return `Hello ${input.name}`;
  }),
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
