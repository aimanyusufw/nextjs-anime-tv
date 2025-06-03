import YoutubePlayer from "@/components/utils/YoutubePlayer";
import { fetchApi } from "@/lib/api-lib";
import React from "react";
import { IoLayers } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import Link from "next/link";
import BackButton from "@/components/utils/BackButton";
import { authUserSession } from "@/lib/user-data-lib";
import prisma from "@/lib/prisma";
import CommentInput from "@/components/Input/CommentInput";
import CommentList from "@/components/List/CommentList";
import AddToCollectionButton from "@/components/utils/AddToCollectionButton";
import Image from "next/image";
import RankStar from "@/components/utils/RankStar";
import { getOrdinalSuffix } from "@/lib/utils";
import { MdUpdate, MdVerified } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";

const Page = async ({ params }) => {
  const { data: animeData, status } = await fetchApi(`anime/${params.mal_id}`);
  const user = await authUserSession();

  if (status === 404) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white text-center py-40">
        <div>
          <h1 className="text-2xl font-semibold mb-4">404 | Not Found</h1>
          <Link href="/" className="text-sm underline text-slate-400">
            Back to homepage
          </Link>
        </div>
      </section>
    );
  }

  const {
    mal_id,
    title,
    trailer,
    images,
    aired,
    score,
    rank,
    episodes,
    type,
    status: animeStatus,
    source: animeSource,
    year,
    season,
    airing,
    synopsis,
    genres,
    approved,
  } = animeData;

  const allComents = await prisma.comment.findMany({
    where: { animeMalId: mal_id },
    orderBy: { id: "desc" },
    include: { user: true },
  });

  const addCollectData = {
    animeMalId: mal_id,
    title,
    image: images?.webp?.image_url || images?.jpg?.image_url || "",
    episodes,
    score,
    userId: user?.id,
  };

  return (
    <section className="min-h-screen">
      <div className="container">
        <div className="w-full md:w-3/4 mx-auto px-4 py-20">
          <BackButton />
          {trailer?.youtube_id !== null ? (
            <YoutubePlayer
              videoId={trailer.youtube_id}
              opts={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              src={images.webp.large_image_url}
              width={1600}
              height={900}
            />
          )}
          <div className="flex justify-between items-start mt-6 mb-3">
            <div className="w-full max-w-[85%] space-y-4">
              <h1 className="text-3xl font-bold text-white">
                {title}
                {approved && (
                  <MdVerified
                    color="#00a6f4"
                    className="inline ms-2 w-5 h-5 md:w-6 md:h-6"
                  />
                )}
              </h1>
              <p className="text-sm text-slate-400">
                Aired {aired?.string || "Unknown"}
              </p>
              <RankStar score={score} />
              <p className="text-sm text-slate-400">
                {rank}
                {getOrdinalSuffix(rank)} global rankings
              </p>
            </div>
            {user?.id && <AddToCollectionButton data={addCollectData} />}
          </div>
          <div className="flex flex-wrap gap-2 my-5">
            {genres?.length > 0 ? (
              genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="bg-red-900 text-red-300 text-sm font-medium px-3 py-1 rounded-sm"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No genres</span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap mb-6">
            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Status"
            >
              <GrStatusGoodSmall
                className={airing ? "text-green-500" : "text-red-500"}
              />
              {animeStatus || "N/A"}
            </div>

            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Episodes"
            >
              <IoLayers />
              {episodes || "N/A"} eps
            </div>

            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Season"
            >
              <MdUpdate />
              {season || "N/A"}
            </div>

            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Year"
            >
              <FaRegCalendarAlt />
              {year || "N/A"}
            </div>

            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Category"
            >
              <BiSolidCategory />
              {type || "N/A"}
            </div>

            <div
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
              title="Source"
            >
              <GiFilmSpool />
              {animeSource || "N/A"}
            </div>
          </div>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
            <div className="text-sm md:text-base text-white md:leading-relaxed space-y-4">
              {synopsis
                ?.split("\n")
                .filter((para) => para.trim() !== "")
                .map((para, index) => (
                  <p key={index}>{para.trim()}</p>
                ))}
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Replies</h2>
            <CommentList allComents={allComents} />
            {user?.id && (
              <CommentInput animeMalId={mal_id} animeTitle={title} />
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Page;
