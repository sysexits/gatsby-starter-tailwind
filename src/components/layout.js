import PropTypes from "prop-types";
import React from "react";

import Header from "./header";

function Layout({ children }) {
  return (
    <div className="flex flex-col font-sans min-h-screen text-gray-900">
      <Header />

      <main className="flex flex-col flex-1 md:justify-center max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
        {children}
      </main>

      <footer className="bg-blue-700">
        <nav className="flex justify-between max-w-4xl mx-auto p-4 md:p-8 text-sm">
          <div>
            <p className="text-white">
              <a
                className="hover:underline font-bold no-underline text-white"
                href="https://www.kaist.ac.kr"
              >
                Korea Advanced Institute of Science and Technology (KAIST)
              </a>
              , All rights reserved.
            </p>
            <p className="text-white">
            Computer Graphics and Visualization Lab., School of Computing, KAIST (Director: Prof. Jinah Park)
            </p>
            <p className="text-white">
            291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea
            </p>
            <p className="text-white">
            Tel.: +82-(0)42-350-7755 / E-mail: cgv at cgv.kaist.ac.kr
            </p>
          </div>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
