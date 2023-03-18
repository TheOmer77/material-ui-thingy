import { cloneElement, isValidElement, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import useTransformingContainer from 'hooks/useContainerTransform';
import timeoutFromTransitionString from 'utils/timeoutFromTransitionString';

const ExpandedComponent = ({ children }: { children: ReactNode }) => {
  const { expanded, rootElementRef } = useTransformingContainer();

  const ref = useRef<HTMLDivElement>(null);

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
