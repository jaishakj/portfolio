import { cloneElement, type ReactElement } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

type Props = {
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  strength?: number;
};

/** Apply selectively — the main CTA, the GitHub badge, a handful of links. Not every button. */
export function Magnetic({ children, strength }: Props) {
  const ref = useMagnetic<HTMLElement>({ strength });
  return cloneElement(children, { ref });
}
