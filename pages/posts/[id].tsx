import Head from "next/head";
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';



// import { getAllPostIds, getPostData, PostData } from "../../lib";

// import Posts from "../../blogPosts.json"

import Date from "../../components/Date";
import Layout from "../../components/Layout";

interface PostProps {
  // postData: PostData;
  theme: "light" | "dark";
  toggleTheme: () => void;
  config: {
    title: string;
    name: string;
    github: string;
    twitter: string;
  };
  data: []
}


const Post: React.FC<PostProps> = ({
  // postData,
  config,
  theme,
  toggleTheme,
  data,
  
}) => {
  return (
    <Layout config={config} theme={theme} toggleTheme={toggleTheme}>
      <Head>
        {/* <title>{postData.title}</title> */}
      </Head>
      <article>
        <div className="mb-6 sm:mb-12 sm:w-min">
          <h1 className="text-3xl leading-normal sm:text-4xl font-bold sm:w-max mb-2">
            {/* {postData.title} */}
          </h1>


          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-1 w-full"></div>
        </div>
        <div className="text-base sm:text-xl text-gray-500 dark:text-gray-300 mb-6 sm:mb-8">
          {/* <Date dateString={postData.date} /> */}
        </div>
        <div
                 
          // dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          className="text-base sm:text-lg leading-relaxed sm:leading-loose"
        />
        
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  // const paths = getAllPostIds();
  return {
    // paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // const postData = await getPostData(params.id);
  const config = await import("../../blogconfig.json");
  // const posts = await import("../../blogPosts.json")
  return {
    props: {
      // postData,
      config: config.default,
      // posts
    },
  };
}

export default Post;
