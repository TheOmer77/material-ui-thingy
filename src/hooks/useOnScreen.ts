import { RefObject, useEffect, useMemo, useState } from 'react';

/** Source: https://stackoverflow.com/a/65008608 (modified) */
const useOnScreen = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    ref.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
};

export default useOnScreen;
