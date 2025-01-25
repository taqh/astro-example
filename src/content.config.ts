import { z, defineCollection } from 'astro:content';

const key = import.meta.env.MARBLE_WORKSPACE_KEY;
const url = import.meta.env.MARBLE_API_URL;

const postSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string(),
  coverImage: z.string().url(),
  publishedAt: z.coerce.date(),
  author: z.object({
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
  attribution: z
    .object({
      author: z.string(),
      url: z.string().url(),
    })
    .nullable(),
});
type Post = z.infer<typeof postSchema>;

const articleCollection = defineCollection({
  loader: async () => {
    const response = await fetch(`${url}/${key}/posts`);
    const data: Post[] = await response.json();
    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return data.map((post) => ({
      ...post,
    }));
  },
  schema: postSchema,
});

export const collections = {
  posts: articleCollection,
};
