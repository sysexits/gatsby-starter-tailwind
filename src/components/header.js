import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import "../css/logo.css"

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="bg-black">
      <div className="flex flex-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-8">
        <Link className="flex items-center no-underline text-white" to="/">
          <svg
            className="fill-current h-8 mr-2 w-8"
            height="54"
            viewBox="0 0 3134.79 1581.61"
            width="54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="cls-1" d="M1344.11,1200l-172.61,180,85.93,89.61c143.21,149.33,375.39,149.33,518.6,0l402-419.21c143.21-149.33,143.21-391.45,0-540.79l-28-29.21c-143.21-149.33-375.39-149.33-518.6,0L1545.49,570l172.62,180,86.31-90c47.67-49.7,124.95-49.7,172.61,0l28.77,30c47.67,49.7,47.67,130.29,0,180L1603,1290c-47.67,49.7-124.95,49.7-172.61,0l-86.31-90Z"/><path className="cls-2" d="M1862,960l-172.61,180L1430.41,870c-47.67-49.7-47.67-130.29,0-180l86.31-90L1862,960Z"/><path className="cls-2" d="M2351,1290c-47.67,49.7-124.95,49.7-172.61,0l-86.31-90-172.62,180,85.93,89.61c143.21,149.33,375.39,149.33,518.6,0l482.16-502.79-172.62-180Z"/><path className="cls-2" d="M2926.42,690l-92.85,96.82,172.62,180L3099,870c47.67-49.7,47.67-130.29,0-180h0C3051.37,640.29,2974.08,640.29,2926.42,690Z"/><path className="cls-3" d="M1430.42,90c-47.67-49.7-124.95-49.7-172.61,0L1057,299.39h0L855.41,509.6c-143.21,149.33-143.21,391.45,0,540.79L941.34,1140,1114,960l-86.31-90c-47.67-49.7-47.67-130.29,0-180l202-210.61h0L1430.42,270c47.67-49.7,47.67-130.29,0-180Z"/><line className="cls-4" x1="807.56" y1="479.39" x2="1481.72" y2="479.39"/><line className="cls-4" x1="1057" y1="52.5" x2="1057" y2="517"/><line className="cls-4" x1="1344.1" x2="125.89"/><path className="cls-5" d="M681.54,270.91l.87-.91c47.67-49.7,47.67-130.29,0-180h0c-47.67-49.7-124.95-49.7-172.61,0L367.16,238.74l172.62,180Z"/><path className="cls-5" d="M1142.72,990,855,1290c-47.67,49.7-124.95,49.7-172.61,0L279.64,870c-47.67-49.7-47.67-130.29,0-180L539.77,418.74l-172.62-180L107.41,509.6c-143.21,149.33-143.21,391.45,0,540.79l402,419.22c143.21,149.33,375.39,149.33,518.6,0L1315.34,1170Z"/>
          </svg>
          <div className="hidden lg:block">
            <span className="font-bold text-xl tracking-tight">
              {site.siteMetadata.title}
            </span>
          </div>

          
        </Link>

        <button
          className="block md:hidden border border-white flex items-center px-3 py-2 rounded text-white"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: `/`,
              title: `News`
            },
            {
              route: `/`,
              title: `Photos`
            },
            {
              route: `/members`,
              title: `Members`
            },
            {
              route: `/`,
              title: `Research Area`
            },
            {
              route: `/publication`,
              title: `Publications`
            }
          ].map(link => (
            <Link
              className="block md:inline-block mt-4 md:mt-0 md:ml-3 no-underline text-white"
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
