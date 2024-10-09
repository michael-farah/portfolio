import React from "react";

interface SvgIconProps {
  name: string;
  className?: string;
  title?: string;
  role?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, className = "", title, role = "img" }) => (
  <svg className={`inline-block w-7 h-7 ${className}`} role={role} aria-hidden={!title} aria-label={title}>
    {title && <title>{title}</title>}
    <use xlinkHref={`/sprite.svg#icon-${name}`} />
  </svg>
);

export default SvgIcon;