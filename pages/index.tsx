import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api'



const Index = (props: any) => {
  const [gifs, setGifs] = useState<GifsResult| undefined>(undefined);
  
  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  if (!apiKey) {
    throw new Error('no api key');
  }
  const gf = new GiphyFetch(apiKey);
  useEffect(() => {
    gf.search('weed', {
      limit: 50
    }).then((x) => {
      console.log('got gifs', x);
      setGifs(x);
    })
  });
  
  const res = gifs ? <div>{gifs.data.map(x => <div key={x.id}><img src={x.images.original.url}/></div>)}</div> : <div>no gifs</div>;
  
  return (
    <div>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
          <main>
            <div className="text-2xl">
            {res}..
            </div>
          </main>
    </div>
  );
};

export default Index;