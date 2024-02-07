import { Order, Prisma } from "@prisma/client";
import { z } from "zod";
import { OtpNumberScheme } from "./validation";

export enum IsValid {
  true = "200",
  false = "500",
}

export enum Sign {
  undefined,
  signin,
  signUp,
  error,
}
// export enum Role {
//   ADMIN,
//   USER,
// }
export type AdWithProducts = Prisma.AdGetPayload<{
  select: {
    product: true;
  };
}>;
export type DrinksBrands = Prisma.ProductGetPayload<{
  select: {
    brand: true;
  };
}>;

export type MainCat_with_Specific_cats = Prisma.Main_catGetPayload<{
  include: { Specific_cat: true };
}>;

export type AllCatsTopsViewProducts = Prisma.ProductGetPayload<{
  include: { main_cat: true };
}>[];

export type ProductsWithBrands = Prisma.ProductGetPayload<{
  include: { brand: true };
}>;
export type Product_full = Prisma.ProductGetPayload<{
  include: { brand: true; specific_cat: true; main_cat: true };
}>;

export type MainCatsWithSpecificCats = Prisma.Main_catGetPayload<{
  include: { Specific_cat: true };
}>;

export type Drinks_products = Prisma.Main_catGetPayload<{
  where: { label: "drinks" };
  include: { Product: { include: { brand: true; specific_cat: true } } };
}>;

export type CartWithCartItemWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithCartItemWithProducts & {
  size: number;
  subtotal: number;
  subTotalWithDiscount: number;
  subDiscount: number;
};

export type Address_Full = Prisma.UserAddressGetPayload<{
  include: { city: true; state: true };
}>;

export enum Operate {
  increment,
  decrement,
  remove,
}

export type OrderType = Omit<Order, "id" | "createdAt">;

export enum SortValue {
  grtPrice = "0",
  lwrPrice = "1",
  grtView = "2",
  grtSale = "3",
  fav = "4",
  newst = "5",
}
export interface SortItem {
  id: string;
  title: string;
  value: SortValue;
}
export type SortItems = SortItem[];

export type CommentWithUser = Prisma.CommentsGetPayload<{
  include: { user: { select: { name: true; family: true; id: true } } };
}>;

export enum LikeMethod {
  Like,
  Dislike,
}

export type Specifications_select_specifications =
  Prisma.SpecificationsGetPayload<{
    select: { specifications: true };
  }> | null;

export type IResponse =
  | {
      status: "Success";
      ok: true;
      message: string;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
    };

export enum OtpType {
  changePassword = "changePassword",
  changePhone = "changePhone",
  login = "login",
}

export interface RedisOtpValue {
  number: z.infer<typeof OtpNumberScheme>;
  type: OtpType;
}
