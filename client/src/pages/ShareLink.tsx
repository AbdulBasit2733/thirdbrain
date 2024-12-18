import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_BACKEND_URL } from "../config/config";
import Loading from "../components/Loading";
import { ContentProps } from "../store/content-slice/contentTypes";
import Card from "../components/Card";

const ShareLink = () => {
  const [shareLinkData, setShareLinkData] = useState([]);
  const [loading, setLoading] = useState(false);

  const youtubeData =
    shareLinkData.length > 0 &&
    shareLinkData.filter(
      (c) => c.contentType !== "twitter" && c.contentType !== "document"
    );
  const twitterData =
    shareLinkData.length > 0 &&
    shareLinkData.filter(
      (c) => c.contentType !== "youtube" && c.contentType !== "document"
    );
  const docData =
    shareLinkData.length > 0 &&
    shareLinkData.filter(
      (c) => c.contentType !== "twitter" && c.contentType !== "youtube"
    );

  const params = useParams();
  const fetchSharedContent = async () => {
    setLoading(true);
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/contents/brain/${params.id}`
    );
    if (response.data?.success) {
      setLoading(false);
      setShareLinkData(response.data.content);
    } else {
      setLoading(false);
      setShareLinkData([]);
    }
  };
  useEffect(() => {
    fetchSharedContent();
  }, [params.id]);

  return (
    <div className="min-h-screen flex justify-center py-20">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full text-black px-20">
          <>
            <h1 className="text-2xl font-bold my-5">Youtube Data</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {youtubeData && youtubeData.length === 0 ? <h1>Not Found</h1> : youtubeData &&
                youtubeData.map((con, index) => (
                  <Card
                    key={index}
                    link={con.contentLink}
                    type={con.contentType}
                    title={con.title}
                    tags={con.tags}
                    username={con.userId.username}
                  />
                ))}
            </div>
            <h1 className="text-2xl font-bold my-5">Twitter Data</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {twitterData && twitterData.length === 0 ? <h1>Not Found</h1> : twitterData &&
                twitterData.map((con, index) => (
                  <div key={index} className="row-span-3">
                    <Card
                      link={con.contentLink}
                      type={con.contentType}
                      title={con.title}
                      tags={con.tags}
                      username={con.userId.username}
                    />
                  </div>
                ))}
            </div>
            <h1 className="text-2xl font-bold my-5">Doc Data</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {docData && docData.length === 0 ? <h1>Not Found</h1> : docData &&
                docData.map((con, index) => (
                  <div key={index} className="row-span-3">
                    <Card
                      link={con.contentLink}
                      type={con.contentType}
                      title={con.title}
                      tags={con.tags}
                      username={con.userId.username}
                    />
                  </div>
                ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default ShareLink;
