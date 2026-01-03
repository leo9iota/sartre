import { Suspense } from 'solid-js';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';

import { css } from '@styled-system/css';

import './app.css';

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <nav
            class={css({
              display: 'flex',
              gap: '4',
              p: '4',
              bg: 'gray.1',
              borderBottomWidth: '1px'
            })}
          >
            <a
              href='/'
              class={css({
                color: 'fg.default',
                fontWeight: 'medium',
                _hover: { color: 'accent.text' }
              })}
            >
              Home
            </a>
            <a
              href='/about'
              class={css({
                color: 'fg.default',
                fontWeight: 'medium',
                _hover: { color: 'accent.text' }
              })}
            >
              About
            </a>
            <a
              href='/design'
              class={css({
                color: 'fg.default',
                fontWeight: 'medium',
                _hover: { color: 'accent.text' }
              })}
            >
              Design System
            </a>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
