import BackButton from "@/components/utils/BackButton";
import { fetchApi } from "@/lib/api-lib";
import Image from "next/image";
import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoLayers } from "react-icons/io5";

const Page = async ({ params }) => {
  const manga = await fetchApi(`manga/${params.mal_id}`);

  return (
    <section className="min-h-screen">
      <div className="container">
        <div className="w-full md:w-1/2 mx-auto py-32">
          <BackButton />
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 relative h-[500px] overflow-hidden rounded-lg px-4">
              <Image
                src={manga.data.images.webp.image_url}
                fill
                alt={manga.data.title}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h1 className="font-bold text-3xl mb-3">{manga.data.title}</h1>
              <span className="text-sm">
                {manga.data.published.string} · ⭐ {manga.data.score} · 🏆{" "}
                {manga.data.rank}
              </span>
              <div className="flex flex-wrap gap-5 my-5">
                {manga.data.genres.map((data, i) => (
                  <span
                    key={i}
                    className="px-5 py-3 rounded-full border border-primary text-primary text-sm whitespace-nowrap"
                  >
                    {data.name}
                  </span>
                ))}
              </div>
              <h3 className="font-medium mb-4">Detail :</h3>
              <div className="mb-5 flex gap-2">
                <div
                  className="px-5 py-3 flex gap-2 text-sm font-medium  items-center rounded-full border "
                  title="Episodes"
                >
                  <IoLayers />
                  {manga.data.chapters || "N/A"}
                </div>
                <div
                  className="px-5 py-3 flex gap-2 text-sm font-medium  items-center rounded-full border"
                  title="Category"
                >
                  <BiSolidCategory />
                  {manga.data.type || "N/A"}
                </div>
                <div
                  className="px-5 py-3 flex gap-2 text-sm font-medium  items-center rounded-full border whitespace-nowrap"
                  title="Status"
                >
                  <GrStatusGoodSmall
                    className={`${
                      manga.data.publishing ? "text-green-500" : "text-red-500"
                    } `}
                  />
                  {manga.data.status}
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-5 font-medium text-xl">Synopsis :</h2>
          <p className="mt-3">{manga.data.synopsis}</p>
        </div>
      </div>
    </section>
  );
};

export default Page;
