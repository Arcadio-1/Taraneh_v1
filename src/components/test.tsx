"use client";
import React, { useState } from "react";

const Test = () => {
  function calculateUSPassportMRZChecksum(number: string): number {
    const weightsLine: number[] = [
      7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7,
      3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1,
    ];

    let sum = 0;

    for (let i = 0; i < number.length; i++) {
      const digit = Number(number[i]);
      const weight = weightsLine[i];
      sum += digit * weight;
    }

    const checksum = sum % 10;

    return checksum;
  }
  // function calculateUSPassportMRZChecksum(number: string): number {
  //   // Ensure that the input number has the same length as the MRZ format (10 characters).
  //   if (number.length !== 10) {
  //     throw new Error("Input number length does not match the MRZ format.");
  //   }

  //   // Define the weights for Line 1 and Line 2.
  //   const weightsLine1 = [7, 3, 1, 7, 3, 1, 7, 3, 1, 7];
  //   const weightsLine2 = [7, 3, 1, 7, 3, 1, 7, 3, 1, 7];

  //   // Initialize the checksum sum.
  //   let sum = 0;

  //   // Calculate the checksum for Line 1.
  //   for (let i = 0; i < number.length; i++) {
  //     const digit = parseInt(number[i], 10);
  //     const weight = weightsLine1[i];
  //     sum += digit * weight;
  //   }

  //   // Calculate the modulo 10 of the sum.
  //   const checksumLine1 = sum % 10;

  //   // Reset the sum for Line 2.
  //   sum = 0;

  //   // Calculate the checksum for Line 2.
  //   for (let i = 0; i < number.length; i++) {
  //     const digit = parseInt(number[i], 10);
  //     const weight = weightsLine2[i];
  //     sum += digit * weight;
  //   }

  //   // Calculate the modulo 10 of the sum for Line 2.
  //   const checksumLine2 = sum % 10;

  //   return checksumLine1 * 10 + checksumLine2; // Combine the checksums for Line 1 and Line 2.
  // }
  const [number, setnumber] = useState<string>("");
  const runer = () => {
    const inputNumber = "570910";
    const checksum = calculateUSPassportMRZChecksum(inputNumber);
  };

  const numberSeter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnumber((prev) => {
      return (prev = e.target.value);
    });
    const checksum = calculateUSPassportMRZChecksum(e.target.value);
  };

  return (
    <div className="flex items-center w-full border justify-center flex-col gap-10">
      <button
        className="bg-green-800 text-white py-2 px-10"
        onClick={() => {
          runer();
        }}
      >
        run
      </button>
      <input
        value={number}
        onChange={numberSeter}
        className="border h-20 w-full text-center text-2xl"
      />
    </div>
  );
};

export default Test;
