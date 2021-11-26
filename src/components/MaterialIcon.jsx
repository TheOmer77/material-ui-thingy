import React from 'react';
import classNames from 'classnames';

/** @param {{ iconName: string, className: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props */
const MaterialIcon = ({ iconName, className, ...props }) => (
  <i className={classNames('material-icons', className)} {...props}>
    {iconName}
  </i>
);

export default MaterialIcon;
