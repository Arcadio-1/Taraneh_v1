import GuaranteeIcon from "@/components/Util/ui/icons/GuaranteeIcon";
import TomanIcon from "@/components/Util/ui/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { urlMaker } from "@/util_functions/urlMaker";
import { OrderCartItems } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  order_items: OrderCartItems[];
}

const OrderItems = ({ order_items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {order_items.map((orderItem) => {
        return (
          <div className="flex border-b p-4" key={orderItem.id}>
            <div>
              <Link
                href={`/product/${orderItem.productId}/${urlMaker(orderItem.product.title)}`}
              >
                <Image
                  src={orderItem.product.image_url}
                  width={100}
                  height={100}
                  alt={orderItem.product.title}
                />
              </Link>
            </div>
            <div className="flex flex-col justify-between">
              <span className="font-iranyekan_bold text-lg">
                {orderItem.product.title}
              </span>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <GuaranteeIcon classess="h-5 w-5" />
                  <span>گارانتی سلامت واصالت کالا</span>
                </div>
                <div className="flex flex-col gap-2">
                  {!!orderItem.product.off_percent && (
                    <div className="flex items-center gap-1">
                      <span className="font-iransansnum font-bold text-g1_5">
                        {numberSeperator(
                          orderItem.product.price -
                            (orderItem.product.price -
                              (orderItem.product.price / 100) *
                                orderItem.product.off_percent),
                        )}
                      </span>
                      <TomanIcon classes="h-5 w-5 fill-g1_5" />
                      <span className="text-g1_5">تخفیف</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="font-iransansnum text-xl font-bold">
                      {numberSeperator(
                        orderItem.product.price -
                          (orderItem.product.price / 100) *
                            orderItem.product.off_percent,
                      )}
                    </span>
                    <TomanIcon classes="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItems;
