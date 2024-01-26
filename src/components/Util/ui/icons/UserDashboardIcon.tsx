import React from "react";

interface Props {
  classess: string;
}

const UserDashboardIcon = ({ classess }: Props) => {
  // className={`${classess}`}
  return (
    <svg className={`${classess}`} viewBox="0 0 32 32">
      <polyline
        fill="none"
        points="   649,137.999 675,137.999 675,155.999 661,155.999  "
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polyline
        fill="none"
        points="   653,155.999 649,155.999 649,141.999  "
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polyline
        fill="none"
        points="   661,156 653,162 653,156  "
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path d="M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z  " />
    </svg>
  );
};

export default UserDashboardIcon;
