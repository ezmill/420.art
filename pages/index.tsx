import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import Marquee from "react-fast-marquee";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const Index = (props: any) => {
  const [gifs, setGifs] = useState<GifsResult | undefined>(undefined);
  const [curIndex, setCurIndex] = useState<number>(0);

  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  if (!apiKey) {
    throw new Error("no api key");
  }
  const gf = new GiphyFetch(apiKey);
  useEffect(() => {
    gf.search("plants", {
      limit: 50,
      sort: "recent",
    }).then((x) => {
      setGifs(x);
    });
  });

  const setRandom = () => {
    const randomNumber = getRandomInt(49);
    setCurIndex(randomNumber);
  };

  useEffect(() => {
    const interval = window.setInterval(setRandom, 5000);
    setRandom();

    return () => {
      window.clearInterval(interval);
    };
  }, [gifs]);

  let mainStyle: React.CSSProperties = {};
  // if (gifs && gifs.data[0]) {
  //   mainStyle.backgroundImage = `url("smoke.mp4")`;
  // }

  const marqueeItems: string[] = [];
  for (let i = 0; i < 25; ++i) {
    marqueeItems.push("SOLVENCY #420");
  }
  const marqueeText = marqueeItems.join(" ");

  return (
    <div>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {/* <div className="relative flex overflow-x-hidden">
        <div
          className="py-2 whitespace-nowrap"
          style={{
            color: "white",
            backgroundPosition: "250px 600px",
            backgroundImage:
              "url('https://solvency.s3.amazonaws.com/420-1619139823837.jpg')",
          }}
        >
          <span className="text-2xl mx-4">
            <Marquee>{marqueeText}</Marquee>
          </span>
        </div>
      </div> */}
      <main style={mainStyle} className="absolute flex h-screen w-screen bg-cover">

        <video className="object-cover absolute z-0 w-full h-full top-0 left-0"  muted autoPlay loop src="smoke.mp4"></video>
        <iframe
          src="https://www.solvency.art/view/420?fullscreen=true&embed=true&display=iframe&size=large"
          frameBorder="0"
          loading="lazy"
          allow="'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="h-3/4 w-3/4 m-auto z-10"
        ></iframe>
      </main>
    </div>
  );
};

export default Index;
