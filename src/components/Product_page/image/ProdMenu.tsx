import React from "react";

const ProdMenu = () => {
  return (
    <div className="absolute top-0 right-0 flex flex-col">
      <button>
        <svg viewBox="0 0 24 24" className="h-10 w-10 fill-gray-600">
          <path
            fillRule="evenodd"
            d="M7.5 3a6 6 0 00-3.844 10.607l6.982 6.492a2 2 0 002.724 0l6.993-6.503C21.685 12.504 22.5 10.818 22.5 9A6 6 0 0012 5.03 5.995 5.995 0 007.5 3zm-2.502 9.124l-.044-.039a4 4 0 116.147-4.83 1 1 0 001.799 0A4 4 0 0120.5 9a3.99 3.99 0 01-1.461 3.091L12 18.634l-7.002-6.51z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <button>
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-gray-600">
          <path d="M15.917 14.16l-6.94 3.47a3 3 0 11-.895-1.789l6.94-3.47a3.021 3.021 0 010-.742l-6.94-3.47a3 3 0 11.895-1.789l6.94 3.47a3 3 0 110 4.319z"></path>
        </svg>
      </button>
      <button>
        <svg className="w-10 h-10 fill-gray-600" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M3.667 13.886A2.001 2.001 0 005 12V9a7 7 0 0114 0v3c0 .854.54 1.606 1.333 1.886a1 1 0 01.667.943V19a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.17a1 1 0 01.667-.944zM19 18v-2.535A4 4 0 0117 12V9A5 5 0 007 9v3a4 4 0 01-2 3.465V18h14zm-7 5c-1.385 0-2.563-.835-3-2h6c-.437 1.165-1.615 2-3 2zm6.02-19.262l1.504-1.318a9.964 9.964 0 012.477 6.589h-2a7.964 7.964 0 00-1.981-5.27zM4 9.008c0-1.966.711-3.82 1.981-5.27L4.477 2.42A9.964 9.964 0 002 9.009h2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <button>
        <svg className="w-10 h-10 fill-gray-600" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M4 18V4H2v15a1 1 0 001 1h19v-2H4zM22 8a2 2 0 10-3.933.517l-2.55 2.55a2.003 2.003 0 00-1.034 0l-1.55-1.55A2.003 2.003 0 0011 7a2 2 0 00-1.933 2.517l-1.55 1.55A2.003 2.003 0 005 13a2 2 0 103.933-.517l1.55-1.55a2.003 2.003 0 001.035 0l1.55 1.55A2.003 2.003 0 0015 15a2 2 0 001.933-2.517l2.55-2.55A2.002 2.002 0 0022 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <button>
        <svg className="w-10 h-10 fill-gray-600" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M13 2h-2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h7v2h2V2zm1 16v2h6a2 2 0 002-2V6a2 2 0 00-2-2h-6v2h6v12h-6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ProdMenu;
