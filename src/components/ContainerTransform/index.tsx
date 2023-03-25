import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { styled } from '@mui/material';

import timeoutFromTransitionString from 'utils/timeoutFromTransitionString';
import useRect from 'hooks/useRect';
import { ContainerTransformContext } from 'contexts/containerTransformContext';

export interface ContainerTransformProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  expanded?: boolean;
  expandedClassName?: string;
  scrimClassName?: string;
}

const Root = styled('div')(({ theme }) => ({
  '--transition--containerIn': `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms`,
  '--transition--containerOut': `${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms`,
  '--transition--componentsIn': '60ms linear 60ms',
  '--transition--componentsOut': '67ms linear 50ms',
  '--transition--scrimIn': '90ms linear 0ms',
  '--transition--scrimOut': `250ms ${theme.transitions.easing.easeInOut} 0ms`,

  /* OUTER TRANSFORMING CONTAINER */

  /*
  Default collapsed state
  Top, bottom, left, right, width, height are always the same as the collapsed
  component.
  */
  '& .transforming-container--collapsed': {
    top: 'var(--collapsedTop)',
    bottom: 'var(--collapsedBottom)',
    left: 'var(--collapsedLeft)',
    right: 'var(--collapsedRight)',
    width: 'var(--collapsedWidth)',
    height: 'var(--collapsedHeight)',
  },

  /*
  Default expanded state
  */
  '& .transforming-container--expanded': {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: theme.zIndex.drawer - 1,
    position: 'fixed',
  },

  /* State while expanding, before collapsing */
  [`& .transforming-container--enter-active,
& .transforming-container--exit`]: { overflow: 'hidden' },

  /* State during collapsing + exit transition */
  '& div.transforming-container--exit-active': {
    position: 'fixed',
    overflow: 'hidden',

    top: 'var(--collapsedTop)',
    bottom: 'var(--collapsedBottom)',
    left: 'var(--collapsedLeft)',
    right: 'var(--collapsedRight)',
    width: 'var(--collapsedWidth)',
    height: 'var(--collapsedHeight)',
  },

  /* Enter transition */
  '& .transforming-container--transition': {
    transition: 'all var(--transition--containerIn)',
  },

  /* INNER CONTAINER */

  [`& .transforming-container .inner-container--collapsed--enter,
& .transforming-container .inner-container--expanded--enter`]: {
    opacity: 0,
  },

  [`& .transforming-container .inner-container--collapsed--enter-active,
& .transforming-container .inner-container--expanded--enter-active`]: {
    opacity: 1,
  },

  [`& .transforming-container .inner-container--collapsed--exit,
& .transforming-container .inner-container--expanded--exit`]: {
    opacity: 1,
  },

  [`& .transforming-container .inner-container--collapsed--exit-active,
& .transforming-container .inner-container--expanded--exit-active`]: {
    opacity: 0,
  },

  [`& .transforming-container .inner-container--expanded--enter-active,
& .transforming-container .inner-container--expanded--exit-active`]: {
    position: 'relative',
    bottom: 'var(--collapsedHeight)',
  },

  /* Enter transition - collapsed component exit, expanded component enter */
  [`& .transforming-container .inner-container--collapsed--exit-active,
& .transforming-container .inner-container--expanded--enter-active`]: {
    transition: `opacity var(--transition--componentsIn),
    top var(--transition--componentsIn)`,
  },

  /* Exit transition - collapsed component enter, expanded component exit */
  [`& .transforming-container .inner-container--collapsed--enter-active,
& .transforming-container .inner-container--expanded--exit-active`]: {
    transition: `opacity var(--transition--componentsOut),
    top var(--transition--componentsOut)`,
  },

  /* DEFAULT SCRIM */

  /* Default scrim styles */
  '& .scrim': {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: theme.zIndex.drawer - 2,

    pointerEvents: 'none',
  },

  /* Scrim transition classes */
  '& .scrim--enter': {
    opacity: 0,
  },
  '& .scrim--enter-active': {
    opacity: 1,
    transition: 'opacity var(--transition--scrimIn)',
  },
  '& .scrim--exit': {
    opacity: 1,
  },
  '& .scrim--exit-active': {
    opacity: 0,
    transition: 'opacity var(--transition--scrimOut)',
  },
}));

const ContainerTransform = ({
  expanded = false,
  className,
  expandedClassName = 'transforming-container--expanded',
  scrimClassName,
  style,
  ...props
}: ContainerTransformProps) => {
  const rootRef = useRef<HTMLDivElement>(null),
    containerRef = useRef<HTMLDivElement>(null),
    placeholderContainerRef = useRef<HTMLDivElement>(null),
    // Extra refs to fix 'Warning: findDOMNode is deprecated in StrictMode.'
    scrimRef = useRef<HTMLDivElement>(null);

  const containerRect = useRect(containerRef);

  const [placeholderRect, setPlaceholderRect] = useState(containerRect);

  const containerVariables = useMemo(
    () =>
      ({
        '--collapsedTop': `${placeholderRect?.top}px`,
        '--collapsedBottom': `${placeholderRect?.bottom}px`,
        '--collapsedLeft': `${placeholderRect?.left}px`,
        '--collapsedRight': `${placeholderRect?.right}px`,
        '--collapsedWidth': `${placeholderRect?.width}px`,
        '--collapsedHeight': `${placeholderRect?.height}px`,
      } as CSSProperties),
    [
      placeholderRect?.bottom,
      placeholderRect?.height,
      placeholderRect?.left,
      placeholderRect?.right,
      placeholderRect?.top,
      placeholderRect?.width,
    ]
  );

  const timeouts = {
    containerIn: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--containerIn'
          )
        )
      : 0,
    containerOut: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--containerOut'
          )
        )
      : 0,
    scrimIn: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--scrimIn'
          )
        )
      : 0,
    scrimOut: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--scrimOut'
          )
        )
      : 0,
  };

  useLayoutEffect(() => {
    if (!expanded && containerRef && containerRect)
      setPlaceholderRect(containerRect);
  }, [containerRect, expanded]);

  useLayoutEffect(() => {
    return () => {
      if (expanded) document.body.style.removeProperty('overflow');
    };
  }, [expanded]);

  return (
    <ContainerTransformContext.Provider
      value={{ expanded, rootElementRef: rootRef }}
    >
      {/* Root div including variables */}
      <Root ref={rootRef}>
        {/* Scrim */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.scrimIn : timeouts.scrimOut}
          classNames={{
            enter: 'scrim--enter',
            enterActive: 'scrim--enter-active',
            exit: 'scrim--exit',
            exitActive: 'scrim--exit-active',
          }}
          unmountOnExit
          nodeRef={scrimRef}
        >
          <div className={classNames('scrim', scrimClassName)} ref={scrimRef} />
        </CSSTransition>
        {/* Transforming container */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.containerIn : timeouts.containerOut}
          classNames={{
            enter: 'transforming-container--collapsed',
            enterActive: classNames(
              expandedClassName,
              'transforming-container--enter-active',
              'transforming-container--transition'
            ),
            enterDone: classNames(
              expandedClassName,
              'transforming-container--enter-active'
            ),
            exit: classNames(expandedClassName, 'transforming-container--exit'),
            exitActive: classNames(
              'transforming-container--exit-active',
              'transforming-container--transition'
            ),
          }}
          onEntering={() => (document.body.style.overflow = 'hidden')}
          onExited={() => document.body.style.removeProperty('overflow')}
          nodeRef={containerRef}
        >
          <div
            {...props}
            ref={containerRef}
            className={classNames('transforming-container', className)}
            style={{ ...containerVariables, ...style }}
          />
        </CSSTransition>
        {/* Placeholder container */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.containerIn : timeouts.containerOut}
          classNames={{}}
          unmountOnExit
          nodeRef={placeholderContainerRef}
        >
          <div
            ref={placeholderContainerRef}
            style={{
              width: placeholderRect?.width,
              height: placeholderRect?.height,
            }}
          />
        </CSSTransition>
      </Root>
    </ContainerTransformContext.Provider>
  );
};

export default ContainerTransform;
