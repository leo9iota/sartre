import { createSignal, splitProps } from 'solid-js';

import { css, cx } from '@styled-system/css';

import { Switch as ArkSwitch } from '@ark-ui/solid';
import type { SwitchRootProps } from '@ark-ui/solid';

export interface SwitchProps extends SwitchRootProps {
  class?: string;
}

export const Switch = (props: SwitchProps) => {
  const [local, rootProps] = splitProps(props, ['class']);
  const [isPressed, setIsPressed] = createSignal(false);

  return (
    <ArkSwitch.Root
      class={cx(
        css({
          display: 'inline-flex',
          alignItems: 'center',
          h: '6',
          w: '11',
          flexShrink: 0,
          cursor: 'pointer',
          rounded: 'full',
          borderWidth: '2px',
          borderColor: 'transparent',
          transition: 'colors',
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'neutral.900',
            outlineOffset: '2px'
          },
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.5
          },
          '&[data-state=checked]': {
            bg: 'primary'
          },
          '&[data-state=unchecked]': {
            bg: 'input'
          }
        }),
        local.class
      )}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      {...rootProps}
    >
      <ArkSwitch.Control>
        <ArkSwitch.Context>
          {context => (
            <ArkSwitch.Thumb
              class={css({
                display: 'block',
                h: '5',
                bg: 'background',
                rounded: 'full',
                boxShadow: 'sm',
                transitionProperty: 'transform, width, background-color',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like
                pointerEvents: 'none'
              })}
              style={{
                width: isPressed() ? '24px' : '20px',
                transform: context().checked
                  ? isPressed()
                    ? 'translateX(16px)'
                    : 'translateX(20px)'
                  : 'translateX(0)'
              }}
            />
          )}
        </ArkSwitch.Context>
      </ArkSwitch.Control>
    </ArkSwitch.Root>
  );
};
