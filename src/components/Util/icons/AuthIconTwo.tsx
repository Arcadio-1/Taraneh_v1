import React from "react";
import { cn } from "../../../lib/utils";

import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  isActive: boolean;
}

const AuthIconTwo = ({ className, isActive }: Props) => {
  return (
    <svg
      className={cn("h-10 w-10 fill-dark_4", className, {
        "fill-g1_7": isActive,
      })}
      viewBox="0 0 91 91"
    >
      <path d="M2.669,18.273c1.388,0,2.513-1.125,2.513-2.513V5.488h10.271c1.388,0,2.513-1.125,2.513-2.513s-1.125-2.513-2.513-2.513   H2.669c-1.388,0-2.513,1.125-2.513,2.513V15.76C0.156,17.148,1.281,18.273,2.669,18.273z" />
      <path d="M88.163,0.462H75.38c-1.389,0-2.514,1.125-2.514,2.513s1.125,2.513,2.514,2.513h10.27V15.76   c0,1.388,1.125,2.513,2.514,2.513c1.387,0,2.512-1.125,2.512-2.513V2.975C90.675,1.587,89.55,0.462,88.163,0.462z" />
      <path d="M15.452,85.818H5.182V75.547c0-1.388-1.125-2.513-2.513-2.513s-2.513,1.125-2.513,2.513v12.784   c0,1.388,1.125,2.513,2.513,2.513h12.783c1.388,0,2.513-1.125,2.513-2.513S16.84,85.818,15.452,85.818z" />
      <path d="M88.163,73.034c-1.389,0-2.514,1.125-2.514,2.513v10.271H75.38c-1.389,0-2.514,1.125-2.514,2.513s1.125,2.513,2.514,2.513   h12.783c1.387,0,2.512-1.125,2.512-2.513V75.547C90.675,74.159,89.55,73.034,88.163,73.034z" />
      <path d="M64.739,27.448c-1.023-0.935-2.613-0.862-3.549,0.163l-21.336,23.39l-5.68-6.096c-0.943-1.014-2.534-1.07-3.551-0.125   c-1.015,0.946-1.071,2.536-0.125,3.551l7.537,8.09c0.475,0.51,1.141,0.8,1.838,0.8c0.004,0,0.009,0,0.014,0   c0.701-0.004,1.369-0.301,1.843-0.819l23.173-25.404C65.837,29.972,65.765,28.383,64.739,27.448z" />
      <path d="M67.331,85.843c-1.951-0.275-3.305-1.038-4.139-2.331c-1.803-2.799-0.963-7.625-0.486-9.252   c0.002-0.005,0.002-0.009,0.004-0.014c4.549-4.255,8.139-9.403,10.385-15.005c3.082-7.684,4.588-16,4.604-25.457   c-0.004-0.298,0.002-0.596,0.006-0.894c0.01-0.539,0.018-1.078-0.01-1.619c-0.254-5.314-1.891-10.433-4.863-15.213   c-2.822-4.534-6.566-8.243-11.125-11.024c-4.67-2.848-9.742-4.38-15.076-4.554c-5.207-0.166-10.223,0.944-14.902,3.31   c-5.979,3.028-10.699,7.551-14.03,13.444c-2.625,4.655-4.011,9.542-4.118,14.523c-0.074,3.522,0.079,7.073,0.456,10.552   c0.649,6.027,1.818,11.305,3.574,16.135c2.521,6.927,7.02,12.341,10.978,16.081c0.292,1.172,1.34,6.027-0.551,8.975   c-0.833,1.3-2.189,2.066-4.145,2.342c-1.374,0.194-2.331,1.466-2.137,2.84c0.177,1.255,1.252,2.161,2.485,2.161   c0.117,0,0.235-0.008,0.354-0.024c3.395-0.479,6.048-2.072,7.672-4.605c1.406-2.192,1.858-4.749,1.898-7.045   c2.379,1.704,4.821,2.938,8.167,3.484c1.11,0.182,2.146,0.271,3.166,0.271c4.43,0,7.832-1.789,10.848-3.723   c0.24-0.153,0.473-0.314,0.707-0.473c-0.012,2.404,0.408,5.151,1.904,7.485c1.625,2.533,4.277,4.126,7.672,4.605   c0.119,0.017,0.238,0.024,0.355,0.024c1.232,0,2.307-0.906,2.484-2.161C69.661,87.309,68.706,86.037,67.331,85.843z M53.634,74.971   c-4.283,2.745-6.717,3.342-10.491,2.724c-3.719-0.607-5.877-2.303-9.093-5.019c-3.895-3.286-9.088-8.721-11.719-15.948   c-1.615-4.443-2.695-9.336-3.3-14.956c-0.354-3.267-0.498-6.601-0.428-9.906c0.09-4.144,1.258-8.236,3.471-12.16   c2.833-5.013,6.844-8.859,11.922-11.431c3.655-1.849,7.557-2.786,11.594-2.786c0.291,0,0.582,0.005,0.875,0.015   c4.457,0.145,8.703,1.43,12.623,3.821c3.885,2.369,7.072,5.528,9.475,9.389c2.516,4.043,3.9,8.349,4.111,12.798   c0.021,0.434,0.014,0.865,0.006,1.296c-0.006,0.345-0.012,0.69-0.008,1.002c-0.014,8.772-1.402,16.48-4.242,23.562   C65.606,64.415,60.351,70.666,53.634,74.971z" />
    </svg>
  );
};

export default AuthIconTwo;
