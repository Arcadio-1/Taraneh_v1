import { prisma } from "@/lib/db/prisma";
import { Specfic_cat } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: { mainLabel: string };
}

const getCategories = cache(async (cat: string) => {
  const toolsSpecficCats: Specfic_cat[] = await prisma.main_cat.findMany({
    where: { label: cat },
    select: {
      Specific_cat: true,
      id: true,
      label: true,
      title: true,
      image: true,
    },
  });
  if (toolsSpecficCats.length === 0) {
    return notFound();
  }
  return toolsSpecficCats;
});

export async function generateMetadata({
  params: { mainLabel },
}: Props): Promise<Metadata> {
  const toolsSpecficCats: Specfic_cat[] = await getCategories(mainLabel);
  // console.log(toolsSpecficCats[0].image);
  return {
    title: toolsSpecficCats[0].title + " - ترانه",
    description: "هولی شت",
    openGraph: {
      images: [{ url: toolsSpecficCats[0].image }],
    },
  };
}

const MainCategoryPage = async ({ params: { mainLabel } }: Props) => {
  // const toolsSpecficCats: Specfic_cat[] = await prisma.main_cat.findMany({
  //   where: { label: mainLabel },
  //   select: {
  //     Specific_cat: true,
  //     id: true,
  //     label: true,
  //     title: true,
  //     image: true,
  //   },
  // });
  const toolsSpecficCats = await getCategories(mainLabel);
  // console.log(toolsSpecficCats);
  return (
    <div>
      MainCategoryPage {mainLabel}
      <div>
        {toolsSpecficCats.map((main) => {
          return (
            <ul key={main.id} className="mt-5">
              <li className="font-bold text-red-700">
                <Link href={main.label}>{main.title}</Link>
              </li>
              {main.Specific_cat.map((spcfic) => {
                return (
                  <li key={spcfic.id}>
                    <Link href={`/search/${spcfic.label}`}>
                      <div>
                        <Image
                          src={spcfic.hero_image}
                          width={250}
                          height={250}
                          alt={spcfic.title}
                        />
                        <span>{spcfic.title}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategoryPage;
