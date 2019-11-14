import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import frontImage from "../images/frontimage.jpg";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`medical imaging`, `computer graphics`, `haptics`]}
        title="Computer Graphics and Visualization Lab., KAIST"
      />

      <section className="text-left">
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
        Welcome to Computer Graphics and Visualization Lab.
        </h2>
        <img
          alt="Welcoming"
          className="block mx-auto w-1/2"
          src={frontImage}
        />
        <p class="text-lg my-4 text-gray-800"><b>Computer Graphics</b> deals with the computational generation of images and image sequences from given data, and <b>Visualization</b> addresses the issues of casting data to suitable representations. Moreover, <b>Computer Haptics</b> allows users to feel the data by touching.</p>
        <p class="text-lg my-4 text-gray-800">Our laboratory focuses on visualization and interaction researches by combining computer graphics and computer haptics. We are interested in medical data visualization, VR simulation, and 3D interface.</p>
      </section>
    </Layout>
  );
}

export default IndexPage;
