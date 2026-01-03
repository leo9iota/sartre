import type { ComponentProps } from 'solid-js';

import { styled } from '@styled-system/jsx';
import { absoluteCenter } from '@styled-system/recipes';

import { ark } from '@ark-ui/solid/factory';

export type AbsoluteCenterProps = ComponentProps<typeof AbsoluteCenter>;
export const AbsoluteCenter = styled(ark.div, absoluteCenter);
