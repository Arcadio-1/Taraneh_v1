"use client";
import Red_under from "@/components/Util/ui/Red_under";
import React from "react";
import Add_review from "./Add_review";
import ReviewItem from "./ReviewItem";
import { CommentWithUser } from "@/types/type";
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
          <div className="py-4 mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-iranyekan_bold">
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
        <div className="flex gap-4 relative">
          <div className="hidden sm:flex sticky top-10 px-5 py-[4rem] bg-white self-start shrink min-w-[22rem]">
            <Add_review
              product_title={product_title}
              product_id={product_id}
              rate={rate}
              session={session}
              short={false}
            />
          </div>
          <div className="hidden sm:flex flex-col gap-4 grow">
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
          <div className="sm:hidden flex gap-4 items-stretch grow overflow-hidden w-[calc(100vw-4rem)] ">
            <div className=" flex gap-4 items-stretch overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={2}
                slidesPerView={"auto"}
                className={`sliderSection-swiper !px-4 items-stretch`}
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
                      className="py-5 !max-w-[25rem] !h-auto"
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
                <SwiperSlide className="py-5 !max-w-[25rem] !h-auto">
                  <Sheet open={open} onOpenChange={setOpen}>
                    <div className="h-full">
                      <SheetTrigger asChild className="">
                        <div className="h-full grid items-center">
                          <span className="text-g1_7 text-center text-2xl flex items-center justify-center gap-2">
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
                      <SheetHeader className="flex justify-between items-start mb-5">
                        <SheetTitle className="font-iranyekan_bold text-xl text-dark_4 flex gap-2 items-center justify-between w-full">
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
                      <div className="flex flex-col gap-4 grow overflow-scroll h-full ">
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
