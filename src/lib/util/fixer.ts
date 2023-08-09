import path from "path";
import { promises as fs } from "fs";

async function getData() {
  const jsonDirectory = path.join(process.cwd(), "json");
  const productFile = await fs.readFile(
    jsonDirectory + "/taraneh_db.products.json",
    "utf8"
  );
  const spacificFile = await fs.readFile(
    jsonDirectory + "/taraneh_db.products_specific_categories.json",
    "utf8"
  );

  const response = {
    status: 200,
    products: productFile,
    spacific: spacificFile,
  };
  return response;
}

const fixer = async () => {
  const request = await getData();
  const ProductJson = JSON.parse(request.products);
  const SpacificJson = JSON.parse(request.spacific);
  SpacificJson.map((cat: any) => {
    cat.products_id.map((id: any) => {
      ProductJson.map((product: any) => {
        if (product._id["$oid"] === id["$oid"]) {
          product.specific_cat_id["$oid"] = cat._id["$oid"];
        }
      });
    });
  });
  const json = JSON.stringify(ProductJson);
  // console.log(json);
};
