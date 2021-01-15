import React from "react";

function LogoComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={108}
      viewBox="0 0 45 108"
      {...props}
    >
      <defs>
        <clipPath id="prefix__a">
          <path
            d="M2723 974v108l22.5-22.879L2768 1082V974z"
            transform="translate(-2065 -974)"
            fill="none"
            stroke="#707070"
          />
        </clipPath>
      </defs>
      <g transform="translate(-658)" clipPath="url(#prefix__a)">
        <path fill="#d92323" d="M658 0h45v108h-45z" />
      </g>
    </svg>
  );
}

export default LogoComponent;
