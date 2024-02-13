"use client";
// import {
//   Player,
//   PlayerScheme,
//   RoolerEnum,
// } from "@/types_validation/validation";
import React from "react";
// import useSWR from "swr";

const TestingEnvirment2 = () => {
  // const { data, error, isLoading, isValidating, mutate } = useSWR(
  //   "/api/user",
  //   getCities,
  // );

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  // useEffect(() => {
  //   console.log("error", error);
  // }, [error]);

  // useEffect(() => {
  //   console.log("isLoading", isLoading);
  // }, [isLoading]);

  // useEffect(() => {
  //   console.log("isValidating", isValidating);
  // }, [isValidating]);

  const testHandler = () => {
    // const user: Player = {
    //   active: true,
    //   name: "john",
    //   role: RoolerEnum.user,
    //   age: 27,
    // };
    // console.log(PlayerScheme.safeParse(user).success);
  };

  return (
    <div>
      <button onClick={testHandler}>update</button>
    </div>
  );
};

export default TestingEnvirment2;
