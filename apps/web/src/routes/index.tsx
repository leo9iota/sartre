import { For, Show, Suspense } from 'solid-js';

import { createAsync } from '@solidjs/router';
import type { RouteDefinition } from '@solidjs/router';

import { css } from '@styled-system/css';

import { getPosts } from '@/lib/api/posts';

// Preload data during route navigation
export const route = {
  load: () => getPosts()
} satisfies RouteDefinition;

export default function Home() {
  const posts = createAsync(() => getPosts());

  return (
    <main class={css({ maxW: '6xl', mx: 'auto', p: '4' })}>
      <h1 class={css({ textStyle: '4xl', fontWeight: 'bold', mb: '8' })}>Sartre Blog</h1>
      <div class={css({ spaceY: '4' })}>
        <h2 class={css({ textStyle: '2xl', fontWeight: 'bold' })}>Latest Posts</h2>
        <Suspense fallback={<div>Loading posts...</div>}>
          <Show when={posts()} fallback={<div>No posts found.</div>}>
            {postList => (
              <div class={css({ display: 'grid', gap: '4' })}>
                <For each={postList()}>
                  {post => (
                    <article
                      class={css({
                        p: '4',
                        borderWidth: '1px',
                        rounded: 'lg',
                        shadow: 'sm',
                        _hover: { shadow: 'md' },
                        transition: 'shadows'
                      })}
                    >
                      <a href={`/posts/${post.slug}`} class={css({ display: 'block' })}>
                        <h3 class={css({ textStyle: 'xl', fontWeight: 'semibold', mb: '2' })}>
                          {post.title}
                        </h3>
                        <p class={css({ color: 'fg.muted', lineClamp: 3 })}>{post.content}</p>
                        <div class={css({ mt: '2', textStyle: 'sm', color: 'fg.subtle' })}>
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
