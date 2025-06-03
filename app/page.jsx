import AnimeList from "@/components/List/AnimeList";
import AnimeCta from "@/components/card/AnimeCta";
import HeroSection from "@/components/home/HeroSection";
import { fetchApi, fetchNestedAnime } from "@/lib/api-lib";

export default async function Home() {
  const topAnime = await fetchApi("top/anime", "limit=8");
  let recomendAnime = await fetchNestedAnime("recommendations/anime", "entry");
  const topManga = await fetchApi("top/manga", "limit=6");

  const startRandom = Math.floor(
    Math.random() * (recomendAnime.length - 6) + 0
  );

  recomendAnime = { data: recomendAnime.slice(startRandom, startRandom + 6) };

  const heroData = topAnime.data[5];
  const animeCta = topAnime.data[1];

  const animeListData = topAnime.data.filter(
    (_, index) => index !== 1 && index !== 5
  );

  return (
    <>
      <HeroSection api={heroData} />
      <AnimeList
        title={"Top Anime"}
        show_all_url={"/animes"}
        maim_url={"/animes"}
        data={animeListData}
      />
      <AnimeList
        title={"Top Manga"}
        show_all_url={"/mangas"}
        maim_url={"/mangas"}
        data={topManga.data}
      />
      <AnimeList
        title={"Recomend Anime"}
        maim_url={"/animes"}
        show_all_url={"/animes"}
        data={recomendAnime.data}
      />
      <AnimeCta data={animeCta} />
    </>
  );
}
