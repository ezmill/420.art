import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";

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
  if (gifs) {
    mainStyle.backgroundImage = `url("${gifs.data[curIndex].images.original.url}")`;
  }
  return (
    <div>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <main
        style={mainStyle}
        className="flex h-screen w-screen bg-gradient-to-b from-gray-100 to-gray-300"
      >
        <iframe
          src="https://www.solvency.art/view/420?fullscreen=true&embed=true&display=iframe&size=large"
          frameBorder="0"
          loading="lazy"
          allow="'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="h-1/2 w-1/2 m-auto"
        ></iframe>
      </main>
    </div>
  );
};

export default Index;
