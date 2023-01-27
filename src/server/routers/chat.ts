import { z } from 'zod';
import { procedure, router } from '../trpc';

const chatSchema = z.object({
  id: z.string(),
  name: z.string(),
  message: z.string(),
});

// get type of above chatSchema
type Chat = z.infer<typeof chatSchema>;

const messages: Chat[] = [];

export const chatRouter = router({
  list: procedure.query(() => {
    return messages;
  }),

  // this is a mutation
  add: procedure
    .input(z.object({ name: z.string(), message: z.string() }))
    .mutation(({ input }) => {
      const chat = { id: `${Date.now}`, ...input };
      messages.push(chat);
      return messages;
    }),
});
