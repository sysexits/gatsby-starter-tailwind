import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Configure,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import qs from 'qs';
import PropTypes from 'prop-types';

const DEBOUNCE_TIME = 700;
const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
);

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = location => (console.log(location), qs.parse(location.search.slice(1)));

class SearchComponent extends Component {
  state = {
    searchState: urlToSearchState(this.props.location),
    lastLocation: this.props.location,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.location !== state.lastLocation) {
      return {
        searchState: urlToSearchState(props.location),
        lastLocation: props.location,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
  clearTimeout(this.debouncedSetState);
    this.setState({ searchState });
  };

  render() {
    return (
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="cgv_homepage"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
        >
            <Configure
                    hitsPerPage={10}
                    distinct
                />
            <SearchBox searchAsYouType={false} className="search-bar" placeholder="Search" />

            <h3 className="bg-blue-800 text-white w-full text-xl font-bold inline-block mt-4 mb-4 p-3">Search Results</h3>
            <Hits hitComponent={Hit} />

            <div className="pagination">
            <Pagination />
            </div>
        </InstantSearch>
      </div>
    );
  }
}

const Hit = ({ hit }) =>  (

    <div className="w-full">
        
        <div className="border-2 border-grey-400 hover:border-blue-500">
            <div className="m-2">
                {hit.type === "International Journal" && <h3 className="bg-red-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
                {hit.type === "International Conference" && <h3 className="bg-blue-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
                {hit.type === "Domestic Journal" && <h3 className="bg-green-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
                {hit.type === "Domestic Conference" && <h3 className="bg-purple-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
                
                <div className="text-gray-900 font-semibold text-lg mb-1"><Highlight attribute="title" hit={hit} /></div>
                {hit.subtitle !== "" && <div className="text-gray-700 font-semibold text-sm mb-1"><Highlight attribute="subtitle" hit={hit} /></div>}
                <p className="text-gray-700 font-medium text-sm">{hit.date}</p>
                <p className="font-medium mb-4"><Highlight attribute="author" hit={hit} /></p>
                
                {hit.doi !== "" && <div className="inline-flex">
                    <a href={hit.doi} className="no-underline hover:underline"><span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-gray-800 mr-2">Available here</span></a>
                </div>}
            </div>
        </div>                        
    </div>
    )
    

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

SearchComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default SearchComponent;
