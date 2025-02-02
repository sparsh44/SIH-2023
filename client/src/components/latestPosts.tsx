import React, { useState, useEffect } from "react";
import Card from "../components/card";
import Crime from "../../public/categories/images/crime.jpg"
import Culture from "../../public/categories/images/culture.jpg"
import Entertainment from "../../public/categories/images/entertainment.jpg"
import International from "../../public/categories/images/international.jpg"
import Judiciary from "../../public/categories/images/judiciary.jpg"
import Politics from "../../public/categories/images/politics3.jpg"
import Science from "../../public/categories/images/science.jpg"
import Sports from "../../public/categories/images/sports.jpg"
import Technology from "../../public/categories/images/technology.jpg"
import Business from "../../public/categories/images/business.jpg"

const latestPosts = () => {
  const [newsData, setNewsData] = useState([]);
  const apiUrl = "http://127.0.0.1:8000/";
  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data["News"]);
        for (let i = 0; i < data["News"].length; i++){
          const negative = parseFloat((data["News"][i]["Sentiment_Score"]).split(' ')[1]);
          if (negative >= 0.5) {
            fetch("https://email-kcr3.onrender.com/sendEmail", {
     
                // Adding method type
                method: "POST",
                
                // Adding body or contents to send
                body: JSON.stringify({
                    title: data["News"][i]["Title"],
                    url: data["News"][i]["URL"],
                }),
                
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
 
              // Converting to JSON
              .then(response => response.json())
              
              // Displaying results to console
              .then(json => console.log(json));
          }
        }
    
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); // The empty array means this effect runs once after initial render

  const newsMap = {
    'Sports': 'Ministry of Youth Affairs and Sports',
    'Culture': 'Ministry of Culture',
    'International': 'Ministry of External Affairs',
    'Politics': 'Ministry of Home Affairs',
    'Science': 'Ministry of Science and Technology',
    'Technology': 'Ministry of Electronics and Information Technology',
    'Business': 'Ministry of Finance',
    'Entertainment': 'Ministry of Information and Broadcasting',
    'Judiciary': 'Ministry of Law and Justice',
    'Crime': 'Department of Internal Security'
  }

  return (
    <>
      {newsData?.length > 0 ? (
        <>
          <div className="flex justify-center items-center text-3xl font-bold m-6 libre">
            LATEST POSTS
          </div>
          <hr className="mb-3" />
          {
            /*<div className="grid grid-cols-3 gap-4">
              <Card
                imgUrl="https://source.unsplash.com/NyA2B7xovMw"
                Title={
                  <span style={{ fontWeight: "bold" }}>
                    Ministry of External Affairs News Headline
                  </span>
                }
                categories={
                  <span
                    style={{
                      backgroundColor: "#d3d3d3",
                      color: "black",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Ministry of Information and Broadcasting
                  </span>
                }
                description={
                  <span>
                    About- abcabacaacjkflndle jsncolofd swidnflfm skfnolfns
                    dfkf....
                  </span>
                }
                negative={
                  <span style={{ textDecoration: "underline", color: 'red' }}>
                    7
                  </span>
                }
                neutral={
                  <span style={{ textDecoration: "underline", color: 'orange' }}>
                    24
                  </span>
                }
                positive={
                  <span style={{ textDecoration: "underline", color: 'green' }}>
                    69
                  </span>
                }
                url='abc.com'
              />
            </div>*/
          }

          {<div className="grid grid-cols-3 gap-4">
            {newsData?.map((news) => (
              <Card
                imgUrl={news["Categories"]}
                // Title={news["Title"]}
                Title={<span style={{ fontWeight: 'bold' }}>{news["Title"]}</span>}
                // categories={news["Categories"]}
                categories={<span style={{ backgroundColor: '#d3d3d3', color: 'black', fontWeight: 'bold', padding: '5px' }}>{newsMap[news["Categories"]]}</span>}
                description={<span>About- {news["Description"].slice(0, 30) + '...'}</span>}
                // description={news["Description"].slice(0, 30) + '...'}
                // negative={Math.round(parseFloat(news["Sentiment_Score"].split(' ')[1]) * 100)}
                // neutral={Math.round(parseFloat(news["Sentiment_Score"].split(' ')[2]) * 100)}
                // positive={100 - Math.round(parseFloat(news["Sentiment_Score"].split(' ')[1]) * 100) - Math.round(parseFloat(news["Sentiment_Score"].split(' ')[2]) * 100)}
                negative={<span style={{ textDecoration: 'underline', color: 'red' }}>{Math.round(parseFloat(news["Sentiment_Score"].split(' ')[1]) * 100)}</span>}
                neutral={<span style={{ textDecoration: 'underline', color: 'orange' }}>{Math.round(parseFloat(news["Sentiment_Score"].split(' ')[2]) * 100)}</span>}
                positive={<span style={{ textDecoration: 'underline', color: 'green' }}>{100 - Math.round(parseFloat(news["Sentiment_Score"].split(' ')[1]) * 100) - Math.round(parseFloat(news["Sentiment_Score"].split(' ')[2]) * 100)}</span>}
                url={news["URL"]}
              />
            ))}
            </div>}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center text-3xl font-bold m-6">
            LATEST ARTICLES
          </div>
          <hr className="mb-3" />
          <div className="flex justify-center items-center text-2xl">
            Loading the latest articles...
          </div>
          {/* <div className="flex justify-center items-center space-x-8">
            <Card imgUrl="https://source.unsplash.com/NyA2B7xovMw" />
            <Card imgUrl="https://source.unsplash.com/2seMu5EqCDw" />
            <Card imgUrl="https://source.unsplash.com/cHvT5F8cW50" />
          </div> */}
        </>
      )}
    </>
  );
};

export default latestPosts;

// heading, body, catgeory, url
