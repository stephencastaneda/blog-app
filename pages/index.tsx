import { useEffect, useState } from "react";
import {fetchPosts} from '../lib/fetchPosts'
import Head from "next/head";
import Layout from "../components/Layout";
import Date from "../components/Date";

interface HomeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  config: {
    title: string;
    name: string;
    github: string;
    twitter: string;
  };
}

export const createHome = (fetchBlog: () => Promise<any[]>
): React.FC<HomeProps> =>
  function Home({ config, theme, toggleTheme }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetchBlog().then(setData).catch(Error).finally(function() {
          setIsLoading(false)
        })
    }, []);
    if (isLoading) return <div>Loading</div>
    return (
      <Layout config={config} theme={theme} toggleTheme={toggleTheme} home>
        <Head>
          <title>{config.title}</title>
        </Head>
        <section className="text-lg sm:text-xl mb-10 sm:mb-14">
          <p>
            Hello, I’m <strong>SpongeBob</strong>. I'm a sea sponge who works as
            a fry cook at the Krusty Krab, a fast food restaurant.
          </p>
        </section>
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12">
            Blog
          </h2>

          <ul className="space-y-8">
            {data.map((item) => {
              return (

                  <li key={item.title} className="flex flex-col space-y-3" data-testid="post" data-cy="blog-post">
                    <a className="sm:w-min group">
                      <h2 className="sm:w-max max-w-3xl text-2xl md:text-3xl font-medium leading-normal mb-1">
                        {item.title}
                      </h2>
                      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-1 transform group-hover:translate-x-2 transition-transform"></div>
                      <small className="text-lg text-gray-500 dark:text-gray-300">
                        <Date dateString={item.date} />
                      </small>
                    </a>
                    <p>{item.text}</p>
                  </li>
              );
            })}
          </ul>
        </section>
      </Layout>
    );
  };

export async function getStaticProps() {
  const config = await import("../blogconfig.json");
  return {
    props: {
      config: config.default,
    },
  };
}



export default createHome(fetchPosts);
