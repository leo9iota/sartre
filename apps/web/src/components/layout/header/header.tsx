import { Button } from '@/components/ui/button/button';
import { ThemeSwitch } from '@/components/ui/theme-switch';

import * as styles from './header.css';

export function Header() {
  return (
    <header class={styles.header}>
      <div class={styles.container}>
        <nav class={styles.nav}>
          <a href='/' class={styles.navLink}>
            Home
          </a>
          <a href='/about' class={styles.navLink}>
            About
          </a>
          <a href='/design' class={styles.navLink}>
            Design System
          </a>
        </nav>
        <div class={styles.spacer} />
        <div class={styles.actions}>
          <a href='/sign-in'>
            <Button variant='ghost' size='sm'>
              Sign In
            </Button>
          </a>
          <a href='/sign-up'>
            <Button variant='solid' size='sm'>
              Sign Up
            </Button>
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
