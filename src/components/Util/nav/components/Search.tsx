import React from "react";
import SearchIcon from "../../icons/SearchIcon";
import { useRouter } from "next/navigation";
interface Props {
  searchProduct: (formData: FormData) => void;
}

const Search = () => {
  const router = useRouter();

  function searchProducts(formData: FormData) {
    const searchQuery = formData.get("searchQuery")?.toString();
    if (searchQuery) {
      router.push("/search?searchQuery=" + searchQuery);
    } else {
      router.push("/search");
    }
  }

  return (
    <form action={searchProducts} className="relative grow md:max-w-[50rem] ">
      <button type="submit" className="absolute right-2 top-2 opacity-50">
        <SearchIcon clasess="h-8 w-8 fill-dark_4 opacity-70 " />
      </button>
      <input
        className="leading-[3rem] w-full pr-11 bg-slate-100 rounded-xl text-lg"
        placeholder="جستجو کالا  "
        type="text"
        id="search"
        name="searchQuery"
      />
    </form>
  );
};

export default Search;
