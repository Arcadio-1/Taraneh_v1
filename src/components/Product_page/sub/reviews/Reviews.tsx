"use client";
import Red_under from "@/components/Util/ui/Red_under";
import React from "react";
import Add_review from "./Add_review";
import ReviewItem from "./ReviewItem";
import { CommentWithUser } from "@/types_validation/type";
import { Session } from "next-auth";
import { Element } from "react-scroll";
import ReviewItem_mobile from "./ReviewItem_mobile";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import ArrowLongIcon, { Arrow } from "@/components/Util/icons/ArrowLongIcon";
import ArrowIcon from "@/components/Util/icons/ArrowIcon";
interface Props {
  comments: CommentWithUser[];
  product_id: string;
  product_title: string;
  rate: number;
  session: Session | null;
  reviews_ref: React.RefObject<HTMLDivElement>;
}

const Reviews = ({
  comments,
  rate,
  product_id,
  product_title,
  session,
  reviews_ref,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Element name="Reviews">
      <div className="flex flex-col gap-10">
        <div className="sticky top-0">
          <div className="mb-8 flex items-center justify-between py-4">
            <div>
              <h1 className="font-iranyekan_bold text-2xl">
                امتیاز ودیدگاه کاربران
              </h1>
              <Red_under />
            </div>
            <div className="sticky top-0 z-30 sm:hidden">
              <Add_review
                product_title={product_title}
                product_id={product_id}
                rate={rate}
                session={session}
                short={true}
              />
            </div>
          </div>
        </div>
        <div className="relative flex gap-4">
          <div className="sticky top-10 hidden min-w-[22rem] shrink self-start bg-white px-5 py-[4rem] sm:flex">
            <Add_review
              product_title={product_title}
              product_id={product_id}
              rate={rate}
              session={session}
              short={false}
            />
          </div>
          <div className="hidden grow flex-col gap-4 sm:flex">
            {comments.map((item) => {
              return (
                <ReviewItem
                  session={session}
                  review={item}
                  key={item.id}
                  product_id={product_id}
                />
              );
            })}
          </div>
          <div className="flex w-[calc(100vw-4rem)] grow items-stretch gap-4 overflow-hidden sm:hidden ">
            <div className=" flex items-stretch gap-4 overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={2}
                slidesPerView={"auto"}
                className={`sliderSection-swiper items-stretch !px-4`}
                // navigation
              >
                {comments.map((item, index) => {
                  if (index > 2) {
                    return;
                  }
                  return (
                    <SwiperSlide
                      id={item.id}
                      key={item.id}
                      className="!h-auto !max-w-[25rem] py-5"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <ReviewItem_mobile
                        session={session}
                        review={item}
                        product_id={product_id}
                      />
                    </SwiperSlide>
                  );
                })}
                <SwiperSlide className="!h-auto !max-w-[25rem] py-5">
                  <Sheet open={open} onOpenChange={setOpen}>
                    <div className="h-full">
                      <SheetTrigger asChild className="">
                        <div className="grid h-full items-center">
                          <span className="flex items-center justify-center gap-2 text-center text-2xl text-g1_7">
                            مشاهده همه نظارت
                            <ArrowIcon
                              classes="h-6 w-6 fill-g1_7"
                              direction={Arrow.left}
                            />
                          </span>
                        </div>
                      </SheetTrigger>
                    </div>
                    <SheetContent side={"bottom"} className="h-full">
                      <SheetHeader className="mb-5 flex items-start justify-between">
                        <SheetTitle className="flex w-full items-center justify-between gap-2 font-iranyekan_bold text-xl text-dark_4">
                          <div className="flex items-center gap-2">
                            <div
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <ArrowLongIcon
                                classes="h-10 w-10 fill-dark_5"
                                direction={Arrow.right}
                              />
                            </div>
                            <span className="font-iransansnum text-xl">
                              {comments.length}
                            </span>
                            <span>دیدگاه</span>
                          </div>
                          <div className="pl-8">
                            <Add_review
                              product_title={product_title}
                              product_id={product_id}
                              rate={rate}
                              session={session}
                              short={true}
                            />
                          </div>
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex h-full grow flex-col gap-4 overflow-scroll ">
                        {comments.map((item) => {
                          return (
                            <ReviewItem
                              session={session}
                              review={item}
                              key={item.id}
                              product_id={product_id}
                            />
                          );
                        })}
                      </div>
                    </SheetContent>
                  </Sheet>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Reviews;
