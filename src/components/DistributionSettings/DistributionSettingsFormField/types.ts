import { ComponentProps } from 'react';
import { TextField } from '@gpn-prototypes/vega-ui';

export type TextFieldProps = ComponentProps<typeof TextField>;
export type TextFieldOnChange = TextFieldProps['onChange'];
