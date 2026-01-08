import { For, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

import { Tabs as ArkTabs } from '@ark-ui/solid/tabs';

import * as styles from './tabs.css';

export interface TabItem {
  value: string;
  trigger: JSX.Element;
  content: JSX.Element;
  disabled?: boolean;
}

export interface TabsProps extends Omit<ArkTabs.RootProps, 'children'> {
  items: TabItem[];
  class?: string;
}

/**
 * Tabs component for organizing content into separate views.
 */
export const Tabs = (props: TabsProps) => {
  const [local, rest] = splitProps(props, ['items', 'class']);

  return (
    <ArkTabs.Root class={`${styles.tabsRoot} ${local.class ?? ''}`} {...rest}>
      <ArkTabs.List class={styles.tabsList}>
        <For each={local.items}>
          {item => (
            <ArkTabs.Trigger class={styles.tabsTrigger} value={item.value} disabled={item.disabled}>
              {item.trigger}
            </ArkTabs.Trigger>
          )}
        </For>
        <ArkTabs.Indicator class={styles.tabsIndicator} />
      </ArkTabs.List>
      <For each={local.items}>
        {item => (
          <ArkTabs.Content class={styles.tabsContent} value={item.value}>
            {item.content}
          </ArkTabs.Content>
        )}
      </For>
    </ArkTabs.Root>
  );
};
