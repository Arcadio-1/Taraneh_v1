import Link from "next/link";
import astronaut from "@/assets/images/util/404.png";
import Image from "next/image";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col-reverse items-center mt-10 gap-5 sm:flex-col md:flex-row md:justify-center md:items-start ">
      <div className="flex flex-col items-baseline gap-3">
        <h1 className="font-iransansbold text-[2.5rem]">
          صفحه مورد نظر یافت نشد!
        </h1>
        <Link className="ml-auto" href={"/"}>
          <div className="flex items-center justify-center gap-2 relative bg-g1_6 rounded-full py-2 pr-[3rem] pl-5">
            <svg
              className="h-16 w-1h-16 absolute top-7 right-[-7px]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
              <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
              <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
              <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
              <path d="M5 3l-1 -1" />
              <path d="M4 7h-1" />
              <path d="M14 3l1 -1" />
              <path d="M15 6h1" />
            </svg>
            <span className="text-2xl text-light_1">بازگشت به صفحه اصلی</span>
            <svg className="h-9 w-9 fill-light_1" viewBox="0 0 32 32">
              <path
                d="M30.854,16.548C30.523,17.43,29.703,18,28.764,18H28v11c0,0.552-0.448,1-1,1h-6v-7c0-2.757-2.243-5-5-5  s-5,2.243-5,5v7H5c-0.552,0-1-0.448-1-1V18H3.235c-0.939,0-1.759-0.569-2.09-1.451c-0.331-0.882-0.088-1.852,0.62-2.47L13.444,3.019  c1.434-1.357,3.679-1.357,5.112,0l11.707,11.086C30.941,14.696,31.185,15.666,30.854,16.548z"
                id="XMLID_219_"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="">
        <Image
          className="max-w-[30rem]"
          src={astronaut}
          width={300}
          height={300}
          alt="404"
        />
      </div>
    </div>
  );
}
