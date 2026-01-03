import type { ComponentProps } from 'solid-js';

import { styled } from '@styled-system/jsx';
import { spinner } from '@styled-system/recipes';

import { ark } from '@ark-ui/solid/factory';

export type SpinnerProps = ComponentProps<typeof Spinner>;
export const Spinner = styled(ark.span, spinner);
