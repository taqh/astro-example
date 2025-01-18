import rss from '@astrojs/rss';
import { SITE } from '@/utils/site';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts');

  const items = [...posts].sort(
    (a, b) =>
      new Date(b.data.publishedAt).valueOf() -
      new Date(a.data.publishedAt).valueOf()
  );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.publishedAt,
      link: `/blog/${item.data.slug}/`,
    })),
  });
}
