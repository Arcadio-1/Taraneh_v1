import { cookies } from "next/headers";
import React from "react";

const TestingEnvirment1 = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          const test = cookies().set("XXXXXXwXXXX", "cipherText");
          //   const test2 = cookies().get("XXdXXXXXXX");
          //   const test2 = cookies().delete("XXXXXXXXXX");
          console.log(test.has("XXXXXXwXXXX"));
        }}
      >
        <button type="submit">test create Cookeis</button>
      </form>
    </div>
  );
};

export default TestingEnvirment1;
