import React, {useState, setState} from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images';
import {graphql, StaticQuery, Link} from 'gatsby'
import Layout from "../components/layout";
import Img from 'gatsby-image'

export const query = graphql`
    query( $year: Int!, $year_next: Int! )
    {
        allPhotosJson (
            filter: {fields: {timestamp: {gt: $year, lt: $year_next}}}
            sort: {fields: fields___timestamp, order: DESC}
        ) 
        {
            edges {
                node { 
                    id
                    path {
                        publicURL
                        childImageSharp {
                            fixed (height:200, width:200, quality:100)
                            {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
        }
    }
`
const customStyles = {
    header: (base, state) => ({
      ...base,
      padding: 20,
    }),
    view: () => ({
      // none of react-images styles are passed to <View />
      maxWidth: '800px',
      height: 'auto',
      margin: 'auto',
      textAlign: 'center'
    }),
    footer: (base, state) => {
      const opacity = state.interactionIsIdle ? 0 : 1;
      const transition = 'opacity 900ms';
  
      return { ...base, opacity, transition };
    }
  }

const Photos=(props)=>{
    const [modalIsOpen, toggleModal] = useState(false);
    const [selectedIndex, setIndex] = useState(0)
    const entities = props.data.allPhotosJson.edges
    var images = []
    entities.map(({node})=> {
        images.push({source: node.path.publicURL} );
    })
    
    return(
        <Layout>
            <h3 className="bg-blue-800 text-white text-xl font-bold inline-block mb-4 p-3">Photos in {props.pathContext.year_string}</h3>
            
            <ModalGateway>
                    {modalIsOpen ? (
                    <Modal allowFullscreen={false} onClose={() => (toggleModal(!modalIsOpen))}>
                        <Carousel styles={customStyles} currentIndex={selectedIndex} views={images} />
                    </Modal>
                    ) : null}
                </ModalGateway>
            <div className="w-full">
                
                <div className="flex flex-wrap -mx-2">
                    {entities.map(({node}, index) => {
                            return (
                                <div key={node.id} className="max-w-4xl flex items-center flex-wrap mx-auto lg:my-0">
                                    <div className="w-full lg:w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white mx-6 my-2 lg:mx-0">
                                        <div className="text-center lg:text-left">
                                            <div onClick={() => (setIndex(index), toggleModal(!modalIsOpen))} className="flex items-center justify-center lg:justify-start">
                                                <Img 
                                                    fixed={node.path.childImageSharp.fixed} className="max-w-1/2">
                                                </Img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    )}
                </div>
            </div>
        </Layout>
    )
}
export default Photos