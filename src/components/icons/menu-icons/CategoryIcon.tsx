import { SvgIcon, SvgIconProps } from '@mui/material';

const CategoryIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon fill="current" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zM16 8H8v8l4-2l4 2z"
          strokeWidth="0.5"
          stroke="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};

export default CategoryIcon;
