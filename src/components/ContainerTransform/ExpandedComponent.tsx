import {
  cloneElement,
  DetailedHTMLProps,
  HTMLAttributes,
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';

import useTransformingContainer from 'hooks/useContainerTransform';
import timeoutFromTransitionString from 'utils/timeoutFromTransitionString';

const ExpandedComponent = <T extends HTMLElement>({
  children,
}: {
  children: ReactElement<
    DetailedHTMLProps<HTMLAttributes<T>, T>,
    string | JSXElementConstructor<DetailedHTMLProps<HTMLAttributes<T>, T>>
  >;
}) => {
  const { expanded, rootElementRef } = useTransformingContainer();

  const ref = useRef<T>(null);

  const timeouts = {
    componentsIn: rootElementRef?.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootElementRef.current).getPropertyValue(
            '--transition--componentsIn'
          )
        )
      : 0,
    componentsOut: rootElementRef?.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootElementRef.current).getPropertyValue(
            '--transition--componentsOut'
          )
        )
      : 0,
  };

  return (
    <CSSTransition
      in={expanded}
      timeout={expanded ? timeouts.componentsIn : timeouts.componentsOut}
      classNames={{
        enter: 'inner-container--expanded--enter',
        enterActive: 'inner-container--expanded--enter-active',
        exit: 'inner-container--expanded--exit',
        exitActive: 'inner-container--expanded--exit-active',
      }}
      unmountOnExit
      nodeRef={ref}
    >
      {isValidElement(children) && cloneElement(children, { ref })}
    </CSSTransition>
  );
};

export default ExpandedComponent;
