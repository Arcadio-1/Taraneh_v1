import React from "react";

interface Props {
  classes?: string;
}

const LogoIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 511.502 78.503">
      <path
        d="M 482.402 44.101 L 482.402 51.401 L 483.502 74.901 L 470.002 77.401 L 471.202 53.101 L 470.002 2.501 L 483.702 0.001 L 482.402 25.901 L 482.402 37.601 A 35.926 35.926 0 0 1 485.275 34.237 A 40.171 40.171 0 0 1 485.802 33.701 A 17.371 17.371 0 0 1 487.194 32.465 Q 488.705 31.25 490.948 29.86 A 62.592 62.592 0 0 1 491.702 29.401 Q 495.702 27.001 500.252 27.001 A 9.671 9.671 0 0 1 507.459 30.069 A 12.484 12.484 0 0 1 507.902 30.551 Q 511.002 34.101 511.002 40.201 L 510.402 51.401 L 511.502 75.401 L 498.002 77.901 L 499.202 52.101 Q 499.202 45.636 498.148 43.209 A 4.791 4.791 0 0 0 498.002 42.901 Q 496.854 40.701 492.779 40.605 A 16.049 16.049 0 0 0 492.402 40.601 A 13.514 13.514 0 0 0 488.629 41.179 Q 486.996 41.654 485.23 42.519 A 31.52 31.52 0 0 0 482.402 44.101 Z M 47.602 10.501 L 49.402 11.601 L 42.602 25.501 A 16.382 16.382 0 0 0 40.61 24.036 Q 39.55 23.366 38.257 22.727 A 36.978 36.978 0 0 0 36.102 21.751 A 26.392 26.392 0 0 0 32.943 20.651 Q 31.258 20.189 29.724 20.055 A 14.096 14.096 0 0 0 28.502 20.001 A 13.408 13.408 0 0 0 22.463 21.338 Q 19.861 22.629 17.859 25.163 A 17.293 17.293 0 0 0 17.452 25.701 A 19.209 19.209 0 0 0 14.689 31.374 Q 13.876 33.998 13.54 37.178 A 45.429 45.429 0 0 0 13.302 41.951 A 42.453 42.453 0 0 0 13.903 49.311 Q 14.627 53.419 16.221 56.757 A 23.428 23.428 0 0 0 17.602 59.251 Q 21.902 66.001 29.302 66.001 Q 34.102 66.001 38.002 63.001 A 15.813 15.813 0 0 0 43.32 55.542 A 19.324 19.324 0 0 0 43.502 55.001 L 51.802 59.801 A 32.187 32.187 0 0 1 47.468 67.852 A 27.095 27.095 0 0 1 41.702 73.551 Q 34.902 78.501 26.302 78.501 A 22.828 22.828 0 0 1 9.119 70.929 A 31.633 31.633 0 0 1 7.602 69.201 A 33.491 33.491 0 0 1 0.28 51.415 A 44.033 44.033 0 0 1 0.002 46.401 Q 0.002 29.901 9.152 18.601 A 32.824 32.824 0 0 1 16.933 11.498 A 26.66 26.66 0 0 1 31.602 7.301 A 45.248 45.248 0 0 1 37.735 7.701 A 37.356 37.356 0 0 1 41.252 8.351 Q 44.766 9.18 46.69 10.041 A 9.863 9.863 0 0 1 47.602 10.501 Z M 385.302 44.101 L 385.302 51.401 L 386.402 74.901 L 373.002 77.401 L 374.202 53.101 A 208.098 208.098 0 0 0 373.486 40.777 Q 372.965 34.955 372.116 29.787 A 126.465 126.465 0 0 0 372.002 29.101 L 384.102 26.501 A 173.937 173.937 0 0 1 385.063 37.112 A 159.286 159.286 0 0 1 385.102 37.801 Q 386.602 35.801 388.502 33.851 A 16.538 16.538 0 0 1 389.904 32.583 Q 391.433 31.339 393.73 29.92 A 61.083 61.083 0 0 1 394.502 29.451 Q 398.602 27.001 403.152 27.001 A 9.671 9.671 0 0 1 410.359 30.069 A 12.484 12.484 0 0 1 410.802 30.551 Q 413.902 34.101 413.902 40.201 L 413.302 51.401 L 414.402 75.401 L 400.902 77.901 L 402.102 52.101 Q 402.102 45.636 401.048 43.209 A 4.791 4.791 0 0 0 400.902 42.901 Q 399.754 40.701 395.679 40.605 A 16.049 16.049 0 0 0 395.302 40.601 A 13.514 13.514 0 0 0 391.529 41.179 Q 389.896 41.654 388.13 42.519 A 31.52 31.52 0 0 0 385.302 44.101 Z M 207.002 18.501 L 189.302 19.901 L 190.402 8.401 L 237.902 8.401 L 236.802 19.901 L 219.402 18.401 L 219.002 51.401 L 220.202 77.401 L 206.202 77.401 L 207.402 53.101 L 207.002 18.501 Z M 134.602 0.901 L 131.502 12.301 Q 127.802 11.401 124.802 11.401 Q 122.741 11.401 121.459 12.25 A 4.037 4.037 0 0 0 120.452 13.201 A 5.138 5.138 0 0 0 119.74 14.589 Q 119.102 16.407 119.102 19.501 L 119.002 29.001 L 129.802 29.001 L 128.702 37.201 L 119.002 37.201 L 118.902 51.401 L 120.002 74.901 L 106.502 77.401 L 107.702 53.101 L 107.302 37.201 L 100.702 37.201 L 101.802 29.001 L 107.102 29.001 L 107.002 21.401 A 23.916 23.916 0 0 1 108.42 13.045 A 21.512 21.512 0 0 1 112.502 6.251 A 18.976 18.976 0 0 1 117.876 1.924 A 16.927 16.927 0 0 1 125.902 0.001 A 43.052 43.052 0 0 1 132.647 0.55 A 49.467 49.467 0 0 1 134.602 0.901 Z M 74.402 47.901 L 81.202 47.901 L 81.202 46.201 Q 81.202 42.11 79.808 40.18 A 4.282 4.282 0 0 0 79.202 39.501 A 5.293 5.293 0 0 0 77.61 38.552 Q 76.01 37.912 73.472 37.753 A 28.462 28.462 0 0 0 71.702 37.701 A 13.902 13.902 0 0 0 69.734 37.852 Q 68.742 37.994 67.63 38.271 A 29.105 29.105 0 0 0 66.252 38.651 A 33.531 33.531 0 0 0 63.352 39.683 Q 61.885 40.278 60.284 41.059 A 61.38 61.38 0 0 0 59.202 41.601 L 56.302 33.701 Q 60.329 30.891 65.978 28.608 A 69.256 69.256 0 0 1 66.752 28.301 Q 72.759 25.957 76.715 25.902 A 13.585 13.585 0 0 1 76.902 25.901 Q 92.602 25.901 92.602 41.101 L 92.602 60.701 A 21.378 21.378 0 0 0 93.272 65.85 Q 93.857 68.208 94.954 70.757 A 42.933 42.933 0 0 0 96.102 73.201 L 85.502 77.701 A 71.385 71.385 0 0 1 83.685 73.966 Q 82.514 71.357 81.802 69.101 A 22.337 22.337 0 0 1 78.081 73.478 A 14.845 14.845 0 0 1 67.902 77.401 A 15.145 15.145 0 0 1 63.306 76.734 A 12.315 12.315 0 0 1 58.252 73.651 A 12.498 12.498 0 0 1 54.832 67.092 A 18.081 18.081 0 0 1 54.502 63.551 Q 54.502 57.201 60.302 52.551 Q 66.102 47.901 74.402 47.901 Z M 260.202 47.901 L 267.002 47.901 L 267.002 46.201 Q 267.002 42.11 265.608 40.18 A 4.282 4.282 0 0 0 265.002 39.501 A 5.293 5.293 0 0 0 263.41 38.552 Q 261.81 37.912 259.272 37.753 A 28.462 28.462 0 0 0 257.502 37.701 A 13.902 13.902 0 0 0 255.534 37.852 Q 254.542 37.994 253.43 38.271 A 29.105 29.105 0 0 0 252.052 38.651 A 33.531 33.531 0 0 0 249.152 39.683 Q 247.685 40.278 246.084 41.059 A 61.38 61.38 0 0 0 245.002 41.601 L 242.102 33.701 Q 246.129 30.891 251.778 28.608 A 69.256 69.256 0 0 1 252.552 28.301 Q 258.559 25.957 262.515 25.902 A 13.585 13.585 0 0 1 262.702 25.901 Q 278.402 25.901 278.402 41.101 L 278.402 60.701 A 21.378 21.378 0 0 0 279.072 65.85 Q 279.657 68.208 280.754 70.757 A 42.933 42.933 0 0 0 281.902 73.201 L 271.302 77.701 A 71.385 71.385 0 0 1 269.485 73.966 Q 268.314 71.357 267.602 69.101 A 22.337 22.337 0 0 1 263.881 73.478 A 14.845 14.845 0 0 1 253.702 77.401 A 15.145 15.145 0 0 1 249.106 76.734 A 12.315 12.315 0 0 1 244.052 73.651 A 12.498 12.498 0 0 1 240.632 67.092 A 18.081 18.081 0 0 1 240.302 63.551 Q 240.302 57.201 246.102 52.551 Q 251.902 47.901 260.202 47.901 Z M 342.702 47.901 L 349.502 47.901 L 349.502 46.201 Q 349.502 42.11 348.108 40.18 A 4.282 4.282 0 0 0 347.502 39.501 A 5.293 5.293 0 0 0 345.91 38.552 Q 344.31 37.912 341.772 37.753 A 28.462 28.462 0 0 0 340.002 37.701 A 13.902 13.902 0 0 0 338.034 37.852 Q 337.042 37.994 335.93 38.271 A 29.105 29.105 0 0 0 334.552 38.651 A 33.531 33.531 0 0 0 331.652 39.683 Q 330.185 40.278 328.584 41.059 A 61.38 61.38 0 0 0 327.502 41.601 L 324.602 33.701 Q 328.629 30.891 334.278 28.608 A 69.256 69.256 0 0 1 335.052 28.301 Q 341.059 25.957 345.015 25.902 A 13.585 13.585 0 0 1 345.202 25.901 Q 360.902 25.901 360.902 41.101 L 360.902 60.701 A 21.378 21.378 0 0 0 361.572 65.85 Q 362.157 68.208 363.254 70.757 A 42.933 42.933 0 0 0 364.402 73.201 L 353.802 77.701 A 71.385 71.385 0 0 1 351.985 73.966 Q 350.814 71.357 350.102 69.101 A 22.337 22.337 0 0 1 346.381 73.478 A 14.845 14.845 0 0 1 336.202 77.401 A 15.145 15.145 0 0 1 331.606 76.734 A 12.315 12.315 0 0 1 326.552 73.651 A 12.498 12.498 0 0 1 323.132 67.092 A 18.081 18.081 0 0 1 322.802 63.551 Q 322.802 57.201 328.602 52.551 Q 334.402 47.901 342.702 47.901 Z M 164.202 62.701 L 166.002 61.201 L 170.602 66.801 A 14.565 14.565 0 0 1 169.741 68.087 Q 169.294 68.69 168.734 69.343 A 34.222 34.222 0 0 1 167.502 70.701 A 33.614 33.614 0 0 1 164.99 73.084 A 27.347 27.347 0 0 1 163.252 74.451 A 16.491 16.491 0 0 1 161.284 75.655 Q 160.273 76.187 159.068 76.678 A 33.927 33.927 0 0 1 157.552 77.251 Q 154.002 78.501 150.202 78.501 Q 142.102 78.501 137.002 72.351 A 21.628 21.628 0 0 1 132.504 62.75 A 30.843 30.843 0 0 1 131.902 56.501 Q 131.902 44.301 139.002 35.101 A 28.439 28.439 0 0 1 143.889 30.078 A 18.513 18.513 0 0 1 155.602 25.901 A 20.854 20.854 0 0 1 160.23 26.384 Q 163.435 27.113 165.767 28.944 A 12.587 12.587 0 0 1 166.952 30.001 A 13.429 13.429 0 0 1 170.359 36.128 Q 170.921 38.25 170.992 40.772 A 26.159 26.159 0 0 1 171.002 41.501 Q 171.002 45.901 169.502 51.501 L 167.502 53.601 L 142.502 55.901 Q 144.141 66.801 152.48 67.187 A 13.437 13.437 0 0 0 153.102 67.201 A 12.639 12.639 0 0 0 156.459 66.726 A 17.247 17.247 0 0 0 159.202 65.701 A 34.756 34.756 0 0 0 161.236 64.67 Q 162.212 64.131 163.007 63.593 A 14.991 14.991 0 0 0 164.202 62.701 Z M 454.502 62.701 L 456.302 61.201 L 460.902 66.801 A 14.565 14.565 0 0 1 460.041 68.087 Q 459.594 68.69 459.034 69.343 A 34.222 34.222 0 0 1 457.802 70.701 A 33.614 33.614 0 0 1 455.29 73.084 A 27.347 27.347 0 0 1 453.552 74.451 A 16.491 16.491 0 0 1 451.584 75.655 Q 450.573 76.187 449.368 76.678 A 33.927 33.927 0 0 1 447.852 77.251 Q 444.302 78.501 440.502 78.501 Q 432.402 78.501 427.302 72.351 A 21.628 21.628 0 0 1 422.804 62.75 A 30.843 30.843 0 0 1 422.202 56.501 Q 422.202 44.301 429.302 35.101 A 28.439 28.439 0 0 1 434.189 30.078 A 18.513 18.513 0 0 1 445.902 25.901 A 20.854 20.854 0 0 1 450.53 26.384 Q 453.735 27.113 456.067 28.944 A 12.587 12.587 0 0 1 457.252 30.001 A 13.429 13.429 0 0 1 460.659 36.128 Q 461.221 38.25 461.292 40.772 A 26.159 26.159 0 0 1 461.302 41.501 Q 461.302 45.901 459.802 51.501 L 457.802 53.601 L 432.802 55.901 Q 434.441 66.801 442.78 67.187 A 13.437 13.437 0 0 0 443.402 67.201 A 12.639 12.639 0 0 0 446.759 66.726 A 17.247 17.247 0 0 0 449.502 65.701 A 34.756 34.756 0 0 0 451.536 64.67 Q 452.512 64.131 453.307 63.593 A 14.991 14.991 0 0 0 454.502 62.701 Z M 289.502 29.101 L 301.602 26.501 Q 302.502 34.201 302.802 41.101 A 65.162 65.162 0 0 1 306.73 35.607 Q 311.066 30.216 315.139 28.202 A 10.695 10.695 0 0 1 319.902 27.001 L 318.802 42.601 Q 313.002 42.601 309.652 43.651 A 15.315 15.315 0 0 0 306.481 45.084 Q 305.117 45.885 303.73 47.013 A 28.61 28.61 0 0 0 302.802 47.801 L 302.802 51.401 L 303.902 74.901 L 290.502 77.401 L 291.702 53.101 A 208.098 208.098 0 0 0 290.986 40.777 Q 290.465 34.955 289.616 29.787 A 126.465 126.465 0 0 0 289.502 29.101 Z M 142.202 48.801 L 159.202 46.701 A 45.792 45.792 0 0 0 159.373 45.214 Q 159.502 43.885 159.502 42.901 A 10.129 10.129 0 0 0 159.195 40.29 Q 158.301 36.945 154.792 36.337 A 9.901 9.901 0 0 0 153.102 36.201 A 9.192 9.192 0 0 0 146.228 39.167 A 12.243 12.243 0 0 0 145.702 39.751 A 14.508 14.508 0 0 0 142.809 45.364 A 19.755 19.755 0 0 0 142.202 48.801 Z M 432.502 48.801 L 449.502 46.701 A 45.792 45.792 0 0 0 449.673 45.214 Q 449.802 43.885 449.802 42.901 A 10.129 10.129 0 0 0 449.495 40.29 Q 448.601 36.945 445.092 36.337 A 9.901 9.901 0 0 0 443.402 36.201 A 9.192 9.192 0 0 0 436.528 39.167 A 12.243 12.243 0 0 0 436.002 39.751 A 14.508 14.508 0 0 0 433.109 45.364 A 19.755 19.755 0 0 0 432.502 48.801 Z M 81.202 63.101 L 81.202 56.401 A 66.506 66.506 0 0 0 78.085 55.768 Q 75.084 55.239 72.907 55.204 A 18.915 18.915 0 0 0 72.602 55.201 A 10.32 10.32 0 0 0 70.224 55.45 Q 67.011 56.214 66.43 59.318 A 8.071 8.071 0 0 0 66.302 60.801 A 8.532 8.532 0 0 0 66.522 62.795 A 5.902 5.902 0 0 0 67.902 65.451 A 5.299 5.299 0 0 0 71.545 67.18 A 7.266 7.266 0 0 0 72.102 67.201 Q 76.102 67.201 81.202 63.101 Z M 267.002 63.101 L 267.002 56.401 A 66.506 66.506 0 0 0 263.885 55.768 Q 260.884 55.239 258.707 55.204 A 18.915 18.915 0 0 0 258.402 55.201 A 10.32 10.32 0 0 0 256.024 55.45 Q 252.811 56.214 252.23 59.318 A 8.071 8.071 0 0 0 252.102 60.801 A 8.532 8.532 0 0 0 252.322 62.795 A 5.902 5.902 0 0 0 253.702 65.451 A 5.299 5.299 0 0 0 257.345 67.18 A 7.266 7.266 0 0 0 257.902 67.201 Q 261.902 67.201 267.002 63.101 Z M 349.502 63.101 L 349.502 56.401 A 66.506 66.506 0 0 0 346.385 55.768 Q 343.384 55.239 341.207 55.204 A 18.915 18.915 0 0 0 340.902 55.201 A 10.32 10.32 0 0 0 338.524 55.45 Q 335.311 56.214 334.73 59.318 A 8.071 8.071 0 0 0 334.602 60.801 A 8.532 8.532 0 0 0 334.822 62.795 A 5.902 5.902 0 0 0 336.202 65.451 A 5.299 5.299 0 0 0 339.845 67.18 A 7.266 7.266 0 0 0 340.402 67.201 Q 344.402 67.201 349.502 63.101 Z"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default LogoIcon;
