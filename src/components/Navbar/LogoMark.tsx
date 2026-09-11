import { forwardRef } from 'react';

/* Traced directly from the uploaded logo via OpenCV contour detection
   (findContours + approxPolyDP), not hand-guessed — see build notes.
   viewBox matches the source image's native 500x500 canvas so the two
   shapes keep their real relative scale and position. */
const TRIANGLE_PATH =
  'M341,258 L259,114 L253,107 L247,107 L243,110 L152,262 L154,265 L186,265 L191,262 L249,164 L255,170 L287,229 L284,231 L244,232 L225,263 L228,265 L338,264 Z';
const BRACKET_PATH =
  'M95,357 L96,362 L204,362 L209,357 L231,319 L239,315 L251,315 L255,317 L256,341 L285,362 L286,318 L289,315 L330,315 L337,321 L360,361 L379,363 L396,362 L398,360 L359,290 L353,284 L348,283 L216,284 L210,289 L187,327 L117,328 L110,332 Z';

/* Real bounding box across both shapes, used to crop the viewBox tight
   instead of carrying the source canvas's empty margins around. */
const BBOX = { x: 95, y: 107, w: 398 - 95, h: 364 - 107 };

type Props = {
  className?: string;
  /** When true, paths render stroke-only (for the draw-on intro); when false, solid fill (normal/navbar state). */
  strokeMode?: boolean;
};

export const LogoMark = forwardRef<SVGSVGElement, Props>(function LogoMark(
  { className, strokeMode = false },
  ref
) {
  return (
    <svg
      ref={ref}
      viewBox={`${BBOX.x} ${BBOX.y} ${BBOX.w} ${BBOX.h}`}
      className={className}
      aria-hidden="true"
    >
      <path
        d={TRIANGLE_PATH}
        fill="var(--color-accent)"
        fillOpacity={strokeMode ? 0 : 1}
        stroke="var(--color-accent)"
        strokeWidth={strokeMode ? 4 : 0}
        data-logo-part="triangle"
      />
      <path
        d={BRACKET_PATH}
        fill="var(--color-ink)"
        fillOpacity={strokeMode ? 0 : 1}
        stroke="var(--color-ink)"
        strokeWidth={strokeMode ? 4 : 0}
        data-logo-part="bracket"
      />
    </svg>
  );
});
