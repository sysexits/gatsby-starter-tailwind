import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import frontImage from "../images/frontimage.jpg";
import kaistImage from "../images/Links/kaist.gif";
import sigmiImage from "../images/Links/sigmi_banner.gif";
import khcImage from "../images/Links/khc_banner.gif";
import hcikaistImage from "../images/Links/hci_kaist_banner.gif"
import {graphql,useStaticQuery,Link} from 'gatsby'

function IndexPage() {
  const data = useStaticQuery(graphql`
  query{
    allNewsJson(sort: {fields: date, order: DESC}, limit: 3) {
      edges {
        node {
          id
          content
          date(formatString:"MMMM DD, YYYY")
          to(formatString:"DD")
          type
        }
      }
    }
  }
  `)

  function fromToString(from, to)
  {
      var tokens = from.split(",")
      var mmdd = tokens[0];
      var mmddTokens = mmdd.split(" ");
      var mm = mmddTokens[0];
      var dd = mmddTokens[1];
      if (dd.charAt(0) === '0') dd = dd.replace("0", "");
      if (to.charAt(0) === '0') to = to.replace("0", "");
      return mm + " " + dd + " ~ " + to + ", " + tokens[1]
  }

  return (
    <Layout>
      <SEO
        keywords={[`medical imaging`, `computer graphics`, `haptics`]}
        title="Computer Graphics and Visualization Lab., KAIST"
      />

      <section className="text-left">
        <h2 className="bg-yellow-400 text-xl font-bold inline-block mb-8 p-3">
        Welcome to Computer Graphics and Visualization Lab.
        </h2>
        <img
          alt="Welcoming"
          className="block mx-auto w-1/2"
          src={frontImage}
        />
        <p className="text-l my-8 text-gray-800"><b>Computer Graphics</b> deals with the computational generation of images and image sequences from given data, and <b>Visualization</b> addresses the issues of casting data to suitable representations. Moreover, <b>Computer Haptics</b> allows users to feel the data by touching.</p>
        <p className="text-l my-4 text-gray-800">Our laboratory focuses on visualization and interaction researches by combining computer graphics and computer haptics. We are interested in medical data visualization, VR simulation, and 3D interface.</p>
      </section>
      <section className="text-left">
        <h2 className="bg-yellow-400 text-xl font-bold inline-block mb-8 p-3">
        Recent News Highlights
        </h2>
        {data.allNewsJson.edges.map(({node})=> {
          return (
            <div className="w-full">
                <div class="md:flex border-2 border-grey-400 hover:border-blue-500 px-5 py-2 my-1 rounded-lg">
                <div class="mt-4 md:mt-0 md:ml-6">
                    <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">{node.type}</div>
                    <div class="block mt-1 text-lg leading-tight font-semibold text-gray-900">
                    <span>{node.to !== "Invalid date" && fromToString(node.date, node.to)}</span>
                    <span>{node.to === "Invalid date" && node.date}</span>
                    </div>
                    <p class="mt-2 text-gray-600 font-medium">{node.content}</p>
                </div>
                </div>
            </div>
        )
        })}
      </section>
      <section className="text-left">
        <h2 className="w-full bg-yellow-400 text-xl font-bold inline-block mt-8 mb-8 p-3">
          Links
        </h2>
        <div class="flex flex-wrap">
        

        <a href="http://www.kaist.ac.kr" className="w-1/4">
        <img
          alt="KAIST"
          className="block mx-auto"
          src={kaistImage}
        />
        </a>
        <a href="http://cgv.kaist.ac.kr/sigmi/" className="w-1/4">
        <img
          alt="SIGMI"
          className="block mx-auto"
          src={sigmiImage}
        />
        </a>

        <a href="http://haptics.or.kr/" className="w-1/4">
        <img
          alt="KHC"
          className="block mx-auto"
          src={khcImage}
        />
        </a>
        
        <a href="http://haptics.or.kr/" className="w-1/4">
        <img
          alt="HCI@KAIST"
          className="block mx-auto"
          src={hcikaistImage}
        />
        </a>
        </div>
         
      </section>
    </Layout>
  );
}

export default IndexPage;
