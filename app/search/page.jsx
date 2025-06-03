"use client";

import SearchInput from "@/components/Input/SearchInput";
import AnimeList from "@/components/List/AnimeList";
import { fetchApi } from "@/lib/api-lib";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchQuery = useSearchParams("query");
  const query = searchQuery.get("query");
  const tab = searchQuery.get("tab");
  const [searchResult, setSearchResult] = useState([]);

  const fetchData = async () => {
    let data;
    if (query) {
      data = await fetchApi("anime", `q=${query}`);
    } else
      data = await fetchApi(
        "top/anime",
        `page=${Math.floor(Math.random() * 10)}`
      );
    setSearchResult(data);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <section className="min-h-screen">
      <div className="container px-4 pt-32 md:pt-24">
        <SearchInput mobileMode={true} />
        <h1 className="text-center font-bold text-3xl capitalize">
          {query ? `Result of ${decodeURI(query)}` : "Search..."}
        </h1>
      </div>
      <main>
        <AnimeList data={searchResult.data} maim_url={"/animes"} />
      </main>
    </section>
  );
};

export default Page;
