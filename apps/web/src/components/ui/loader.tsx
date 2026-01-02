import { Show, splitProps, type JSX } from 'solid-js';

import { styled, type HTMLStyledProps } from 'styled-system/jsx';

import { AbsoluteCenter } from './absolute-center';
import { Spinner } from './spinner';

export interface LoaderProps extends HTMLStyledProps<'span'> {
  /**
   * Whether the loader is visible
   * @default true
   */
  visible?: boolean | undefined;
  /**
   * The spinner to display when loading
   */
  spinner?: JSX.Element | undefined;
  /**
   * The placement of the spinner
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end' | undefined;
  /**
   * The text to display when loading
   */
  text?: JSX.Element | undefined;

  children?: JSX.Element;
}

const Span = styled('span');

export const Loader = (props: LoaderProps) => {
  const [local, rest] = splitProps(props, [
    'spinner',
    'spinnerPlacement',
    'children',
    'text',
    'visible'
  ]);

  const spinner = () =>
    local.spinner ?? <Spinner size='inherit' borderWidth='0.125em' color='inherit' />;
  const spinnerPlacement = () => local.spinnerPlacement ?? 'start';

  return (
    <Show when={local.visible ?? true} fallback={local.children}>
      <Show
        when={local.text}
        fallback={
          <Show
            when={local.spinner !== undefined}
            fallback={
              <Span display='contents' {...rest}>
                {local.children}
              </Span>
            }
          >
            <Span display='contents' {...rest}>
              <AbsoluteCenter display='inline-flex'>{spinner()}</AbsoluteCenter>
              <Span visibility='hidden' display='contents'>
                {local.children}
              </Span>
            </Span>
          </Show>
        }
      >
        <Span display='contents' {...rest}>
          {spinnerPlacement() === 'start' && spinner()}
          {local.text}
          {spinnerPlacement() === 'end' && spinner()}
        </Span>
      </Show>
    </Show>
  );
};
