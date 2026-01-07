import { createSignal, splitProps } from 'solid-js';
import type { ParentProps } from 'solid-js';

import * as KobalteSwitch from '@kobalte/core/switch';

import { useTheme } from '../../../lib/theme-context';
import * as styles from './theme-switch.css';

export interface ThemeSwitchProps
  extends Omit<KobalteSwitch.SwitchRootProps, 'children' | 'checked' | 'onChange'>, ParentProps {
  class?: string;
  /**
   * Show label with sun/moon emoji
   * @default true
   */
  showLabel?: boolean;
}

/**
 * Theme switch component for toggling between light and dark modes.
 * Uses the ThemeProvider context for state management.
 */
export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const [local, rest] = splitProps(props, ['class', 'children', 'showLabel']);
  const [isPressed, setIsPressed] = createSignal(false);
  const { theme, toggleTheme } = useTheme();

  const showLabel = () => local.showLabel !== false;

  return (
    <KobalteSwitch.Root
      class={`${styles.switchRoot} ${local.class ?? ''}`}
      {...rest}
      checked={theme() === 'dark'}
      onChange={toggleTheme}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      data-pressed={isPressed() ? '' : undefined}
    >
      <KobalteSwitch.Input class={styles.switchInput} />
      <KobalteSwitch.Control class={styles.switchControl}>
        <KobalteSwitch.Thumb class={styles.switchThumb} />
      </KobalteSwitch.Control>
      {showLabel() && (
        <KobalteSwitch.Label class={styles.switchLabel}>
          {theme() === 'dark' ? '🌙' : '☀️'}
        </KobalteSwitch.Label>
      )}
      {local.children && (
        <KobalteSwitch.Label class={styles.switchLabel}>{local.children}</KobalteSwitch.Label>
      )}
    </KobalteSwitch.Root>
  );
};
