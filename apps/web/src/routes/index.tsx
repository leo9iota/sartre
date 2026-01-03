import { For, Show, Suspense } from 'solid-js';

import { createAsync } from '@solidjs/router';
import type { RouteDefinition } from '@solidjs/router';

import { getPosts } from '@/lib/api/posts';

// Preload data during route navigation
export const route = {
  load: () => getPosts()
} satisfies RouteDefinition;

export default function Home() {
  const posts = createAsync(() => getPosts());

  return (
    <main class='container mx-auto p-4'>
      <h1 class='text-4xl font-bold mb-8'>Sartre Blog</h1>
      <div class='space-y-4'>
        <h2 class='text-2xl font-bold'>Latest Posts</h2>
        <Suspense fallback={<div>Loading posts...</div>}>
          <Show when={posts()} fallback={<div>No posts found.</div>}>
            {postList => (
              <div class='grid gap-4'>
                <For each={postList()}>
                  {post => (
                    <article class='p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                      <a href={`/posts/${post.slug}`} class='block'>
                        <h3 class='text-xl font-semibold mb-2'>{post.title}</h3>
                        <p class='text-gray-600 line-clamp-3'>{post.content}</p>
                        <div class='mt-2 text-sm text-gray-400'>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </a>
                    </article>
                  )}
                </For>
              </div>
            )}
          </Show>
        </Suspense>
      </div>
    </main>
  );
}
