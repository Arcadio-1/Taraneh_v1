import { prisma } from "@/lib/db/prisma";
import { MainCat_with_Specific_cats } from "@/types_validation/type";
import { cache } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Drinks_cats from "@/components/Main_page__DrinkAndTools/drinks_cats/Drinks_cats";
import Show_all from "@/components/Main_page__DrinkAndTools/show_all/Show_all";
import Brands from "@/components/Main_page__DrinkAndTools/brands/Brands";
import Brand_top_sells from "@/components/Main_page__DrinkAndTools/brand_top_sells/Brand_top_sells";
import Hero from "@/components/Main_page__DrinkAndTools/drink_hero/Hero";
import Cat_by_statistics__drinks from "@/components/Main_page__DrinkAndTools/cat_by_statistics__drinks/Cat_by_statistics__drinks";

const getCategories = cache(async () => {
  const drinksSpecficCats: MainCat_with_Specific_cats | null =
    await prisma.main_cat.findFirst({
      where: { label: "drinks" },
      include: { Specific_cat: true },
    });
  if (!drinksSpecficCats) {
    return notFound();
  }
  return drinksSpecficCats;
});

export const metadata: Metadata = {
  title: " نوشیدنی ها",
  description:
    "انواع نوشیدنی ها از جمله قهوه اسپرسو قهوه ترک و کاپوچینو و هات چاکلت و قهوه فوری",
};

const DrinkPage = async () => {
  const drinks = await getCategories();

  return (
    <div>
      <Hero />
      <div className="m-auto mt-2 flex max-w-[90rem] flex-col gap-5 p-4">
        <Drinks_cats Main_cat={drinks} />
        <Show_all
          alt={drinks.label}
          image_url={drinks.image}
          label="نمایش همه نوشیدنی ها"
        />
        <Brands drinks_id={drinks.id} title="برترین برند ها" />
        <Cat_by_statistics__drinks />
        {/* <Brand_top_sells brand_titleEn="Farmand" /> */}
      </div>
    </div>
  );
};

export default DrinkPage;
