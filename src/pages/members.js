import React from 'react'
import Layout from '../components/layout'
import {graphql,useStaticQuery,Link} from 'gatsby'
const MemberPage = () =>{
    const data = useStaticQuery(graphql`
    query{
        allMembersJson(filter: {graduate: {eq: false}}) {
            edges {
            node {
                id
                img
                interest
                bio
                name
                status
                affiliation
                email
                graduate
                affiliation
                sitePrefix
            }
            }
        }
    }
    `)
    const {edges} = data.allMembersJson
    var professorNode = [];
    var phdNode = [];
    var msNode = [];
    edges.map(({node}) => {
        if(node.status === "professor")
        {
            professorNode.push(node);
        }
        if(node.status === "phd")
        {
            phdNode.push(node);
        }
        if(node.status === "ms")
        {
            msNode.push(node);
        }
    })

    // console.log(edges)
    return(
        <Layout>
        <div className="w-full">
        <h3 className="bg-blue-800 w-full text-white text-lg font-bold inline-block p-3 mb-4">Professor</h3>
        <div class="flex flex-wrap -mb-4">
            {professorNode.map((node,index) => {
            return (
                <div className="w-full px-2 mb-4">
                    <img class="w-64 h-64 rounded-full object-none object-center object-cover" src={node.img}></img>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{node.name}</div>
                        <div class="text-sm mb-2">{node.email}</div>
                        {node.affiliation !== "KAIST" && 
                            <div class="text-sm text-red-800 mb-2">* {node.affiliation}</div>
                        }
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            <Link
                            key={node.name}
                            to={`/members/${node.sitePrefix}`}>More</Link>
                            </button>
                    </div>
                </div>
                )}
            )}
            </div>
        </div>

        <div className="w-full">
        <h3 className="bg-blue-800 w-full text-white text-lg font-bold inline-block p-3 mb-4">Ph.D. Students</h3>

            <div class="flex flex-wrap -mb-4">
            {phdNode.map((node,index) => {
            return (
                <div className="w-1/2 px-2 mb-4">
                    <img class="w-48 h-48 rounded-full object-none object-center object-cover" src={node.img}></img>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{node.name}</div>
                        <div class="text-sm mb-2">{node.email}</div>
                        {node.affiliation !== "KAIST" && 
                            <div class="text-sm text-red-800 mb-2">* {node.affiliation}</div>
                        }
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            <Link
                            key={node.name}
                            to={`/members/${node.sitePrefix}`}>More</Link>
                            </button>
                    </div>
                </div>
                )}
            )}
            </div>


        
        </div>


        <div className="w-full">
        <h3 className="bg-blue-800 w-full text-white text-lg font-bold inline-block p-3 mb-4">M.S. Students</h3>
        <div class="flex flex-wrap -mb-4">
            {msNode.map((node,index) => {
            return (
                <div className="w-1/2 px-2 mb-4">
                    <img class="w-48 h-48 rounded-full object-none object-center object-cover" src={node.img}></img>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{node.name}</div>
                        <div class="text-sm mb-2">{node.email}</div>
                        {node.affiliation !== "KAIST" && 
                            <div class="text-sm text-red-800 mb-2">* {node.affiliation}</div>
                        }
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            <Link
                            key={node.name}
                            to={`/members/${node.sitePrefix}`}>More</Link>
                            </button>
                    </div>
                </div>
                )}
            )}
            </div>
        </div>
        </Layout>
    )
}
export default MemberPage