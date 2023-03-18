// Based on: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// Slightly modified by me

import { useLayoutEffect, useCallback, useState } from 'react';
import getScrollableParent from 'utils/getScrollableParent';
import isElementInViewport from 'utils/isElementInViewport';

const scrollEvents = ['scroll', 'touchmove'];

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

DOMRect;

const getRect = <T extends HTMLElement>(element?: T): RectResult => {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
};

const addListeners = (
  element: HTMLElement,
  callback: EventListenerOrEventListenerObject
) => {
  window.addEventListener('resize', callback);

  const scrollableParent = getScrollableParent(element);
  scrollEvents.forEach((event) => {
    if (scrollableParent === document.body)
      return window.addEventListener(event, callback);
    scrollableParent.addEventListener(event, callback);
  });
};

const removeListeners = (
  element: HTMLElement,
  callback: EventListenerOrEventListenerObject
) => {
  window.removeEventListener('resize', callback);

  const scrollableParent = getScrollableParent(element);
  scrollEvents.forEach((event) => {
    if (scrollableParent === document.body)
      return window.removeEventListener(event, callback);
    scrollableParent.removeEventListener(event, callback);
  });
};

const useRect = <T extends HTMLElement>(
  ref: React.RefObject<T>
): RectResult => {
  const [rect, setRect] = useState<RectResult>(
    ref && ref.current ? getRect(ref.current) : getRect()
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
