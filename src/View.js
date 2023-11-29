import React, {useState, useEffect} from 'react';
import grapejs from 'grapesjs';
import gjsplugin from "grapesjs-blocks-basic";
import { useParams } from 'react-router-dom';
import { API_HOST } from './api_utils';
import axios from 'axios';
import "./styles/styles.css";

const View = () => {
    const [pageContent, setPageContent] = useState([])
    const [Page, setPage] = useState('')
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {pageId} = useParams();
    console.log('pageId :>>>', pageId)  

    useEffect(() => {
        async function getPage(){
          try {
            const response = await axios.get(`${API_HOST}/pages/${pageId}`);
            setPage(response.data);
            setPageContent(JSON.parse(response.data.content))
            console.log(JSON.parse(response.data.content))

            setIsLoading(false)
          } catch (error) {
            console.log("error :>>>", error);
            setError(error.message);
          }
        }
        getPage();
    }, [])

    // Recursive function to render components dynamically
  const renderComponent = (component) => {
    switch (component.type) {
      case "wrapper":
        return (
          <div style={component.style}>
            {component.components.map((childComponent, index) => (
              <React.Fragment key={index}>
                {renderComponent(childComponent)}
              </React.Fragment>
            ))}
          </div>
        );
      case "text":
        return <p>{component.content}</p>;
      case "link":
        return (
          <a href={component.attributes.href}>{component.content}</a>
        );
      // Handle other component types here
      default:
        return null;
    }
  };

  return (
    // <div></div>
    <div>
        {!isLoading ? (
        <div>
        {/* Iterate over styles and apply them */}
        {pageContent.styles.map((style, index) => (
            <style key={index}>{JSON.stringify(style)}</style>
        ))}

        {/* Iterate over frames and render components */}
        {pageContent.pages[0].frames.map((frame, index) => (
            <div key={index}>
            {frame.component && renderComponent(frame.component)}
            </div>
        ))}
        </div>
        ) : ''}
    </div>
  )
}

export default View