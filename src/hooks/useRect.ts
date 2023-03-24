// Based on: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// Slightly modified by me

import { useLayoutEffect, useCallback, useState, RefObject } from 'react';
import getScrollableParent from 'utils/getScrollableParent';
import isElementInViewport from 'utils/isElementInViewport';

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

const getRect = <T extends HTMLElement>(element?: T) =>
  ['bottom', 'height', 'left', 'right', 'top', 'width'].reduce(
    (obj, key) => ({
      ...obj,
      [key]: element?.getBoundingClientRect?.()?.[key as keyof RectResult]
        ? Math.floor(
            element?.getBoundingClientRect?.()?.[key as keyof RectResult]
          )
        : 0,
    }),
    {}
  ) as RectResult;

const addListeners = (
  element: HTMLElement,
  callback: EventListenerOrEventListenerObject
) => {
  window.addEventListener('resize', callback);

  const scrollableParent = getScrollableParent(element);

  if (scrollableParent === document.body)
    return window.addEventListener('scroll', callback);
  scrollableParent.addEventListener('scroll', callback);
};

const removeListeners = (
  element: HTMLElement,
  callback: EventListenerOrEventListenerObject
) => {
  window.removeEventListener('resize', callback);

  const scrollableParent = getScrollableParent(element);

  if (scrollableParent === document.body)
    return window.removeEventListener('scroll', callback);
  scrollableParent.removeEventListener('scroll', callback);
};

const useRect = <T extends HTMLElement>(ref: RefObject<T>): RectResult => {
  const [rect, setRect] = useState<RectResult>(
    ref?.current ? getRect(ref.current) : getRect()
  );

  const handleResize = useCallback(() => {
    if (!ref.current || !isElementInViewport(ref.current)) return;
    setRect(getRect(ref.current)); // Update client rect
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();

    addListeners(element, handleResize);

    return () => removeListeners(element, handleResize);
  }, [handleResize, ref]);

  return rect;
};

export default useRect;
