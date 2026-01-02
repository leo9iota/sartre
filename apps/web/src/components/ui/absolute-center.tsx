import type { ComponentProps } from 'solid-js';

import { ark } from '@ark-ui/solid/factory';
import { styled } from 'styled-system/jsx';
import { absoluteCenter } from 'styled-system/recipes';

export type AbsoluteCenterProps = ComponentProps<typeof AbsoluteCenter>;
export const AbsoluteCenter = styled(ark.div, absoluteCenter);
