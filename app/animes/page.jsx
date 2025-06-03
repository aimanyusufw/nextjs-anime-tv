"use client";

import AnimeList from "@/components/List/AnimeList";
import Pagination from "@/components/utils/Pagination";
import { fetchApi } from "@/lib/api-lib";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]);

  const fetchData = async () => {
    const response = await fetchApi("top/anime", `page=${page}`);
    setTopAnime(response);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section className="min-h-screen">
      <div className="py-24">
        <AnimeList data={topAnime.data} maim_url={"/animes"} />
        <Pagination
          setPage={setPage}
          page={page}
          lastPage={topAnime.pagination?.last_visible_page}
        />
      </div>
    </section>
  );
};

export default Page;
