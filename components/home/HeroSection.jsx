import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = async ({ api }) => {
  const styling = {
    backgroundImage: `url('${api.trailer.images.maximum_image_url}')`,
  };

  return (
    <>
      <section
        className="h-screen md:h-[60vh] w-full relative bg-cover flex justify-center items-center bg-center"
        style={styling}
      >
        <div className="bg-black -z-1 absolute top-0 right-0 left-0 bottom-0 bg opacity-50"></div>
        <div className="container z-10">
          <div className="w-full px-4">
            <h5 className="mb-3 uppercase opacity-70">
              {api.genres.map(
                (data, i) =>
                  data.name + (i === api.genres.length - 1 ? "." : ", ")
              )}
            </h5>
            <h5 className="text-xs md:text-sm mb-3">
              {`${api.aired.string} ·  ${api.duration}`}
            </h5>
            <Link href={`/animes/${api.mal_id}`}>
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-10 leading-relaxed">
                {api.title}
              </h1>
            </Link>
            <Link
              href={api.trailer.url ? api.trailer.url : ""}
              target="_blank"
              className="px-5 py-3 text-sm bg-primary rounded-2xl"
            >
              <Image
                src="/images/play-circle.svg"
                width={20}
                height={20}
                alt="Play icon"
                className="inline me-2"
              />
              <span className="font-semibold">Play Trailer</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
