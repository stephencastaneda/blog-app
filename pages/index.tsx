import { useEffect, useState } from "react";

import Head from "next/head";
import Layout from "../components/Layout";
import Date from "../components/Date";

// const blogData = fetch("http://localhost:3000/api/blogs/blogs")


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

// 

const Home: React.FC<HomeProps> = ({
  config,
  theme,
  toggleTheme,  
}) => {

  const [data, setData] = useState([])

  useEffect(() => { 
    
    const fetchBlogs = async () => {
    const response = await fetch("/api/blogs/blogs");
    console.log('duh response', response)
    
    if (!response.ok) {
      throw new Error (`Error: ${response.status}`);
    }

    const blogs = await response.json();
    setData(blogs);
  } 
  fetchBlogs()
}, []);



  return (
    <Layout config={config} theme={theme} toggleTheme={toggleTheme} home>
      <Head>
        <title>{config.title}</title>
      </Head>
      <section className="text-lg sm:text-xl mb-10 sm:mb-14">
        <p>
          Hello, I’m <strong>SpongeBob</strong>. I'm a sea sponge who works as a
          fry cook at the Krusty Krab, a fast food restaurant.
        </p>
      </section>
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12">Blog</h2>
        <ul className="space-y-8">
          {data.map((item, i) => {
           return ( 
             <>
             <li key={i} className="flex flex-col space-y-3">
              <a className="sm:w-min group">
                <h2 className="sm:w-max max-w-3xl text-2xl md:text-3xl font-medium leading-normal mb-1">
                  {item.title}
                </h2>
              <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-1 transform group-hover:translate-x-2 transition-transform"></div>
                <small className="text-lg text-gray-500 dark:text-gray-300">
                  <Date dateString={item.date}/>
                </small>             
              </a>
              <p>{item.text}</p>
             </li>
             </>
            )
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

export default Home;
