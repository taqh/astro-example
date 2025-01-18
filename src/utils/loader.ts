import type { Loader, LoaderContext } from 'astro/loaders';
import { z } from 'astro:content';

// Define any options that the loader needs
export function marbleLoader(options: {
  url: string;
  collection: string;
  apiKey: string;
}): Loader {
  // Configure the loader
  const apiUrl = new URL(options.url);
  // Return a loader object
  return {
    name: 'marble-client',
    // Called when updating the collection.
    load: async (context: LoaderContext): Promise<void> => {
      // Load data and update the store
      const response = await fetch(
        `${apiUrl}/${options.collection}/${options.apiKey}`
      );
    },
    // Optionally, define the schema of an entry.
    // It will be overridden by user-defined schema.
    schema: async () =>
      z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        content: z.string(),
        description: z.string(),
        coverImage: z.string().url(),
        publishedAt: z.string().date(),
        author: z.object({
          id: z.string(),
          name: z.string(),
          image: z.string().url(),
        }),
        category: z.object({
          id: z.string(),
          name: z.string(),
          slug: z.string(),
        }),
        tags: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            slug: z.string(),
          })
        ),
      }),
  };
}
