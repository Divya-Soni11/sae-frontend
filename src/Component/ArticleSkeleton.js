import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ArticleSkeleton = () => {
  const location = useLocation();
  const [respData, setRespData] = useState({ data: null });
  const [moreNewsletter, setMoreNewsletter] = useState([]);
  const [subscribeStatus, setSubscribeStatus] = useState("Subscribe");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("") || queryParams.get("title");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch main article data
        const resp = await axios(
          `${process.env.REACT_APP_BASE_URL}/getData?title=${encodeURIComponent(title)}`,
          {
            headers: {
              "X-API-KEY": process.env.REACT_APP_AUTH_KEY,
            },
          }
        );
        setRespData(resp.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article content");
      } finally {
        setLoading(false);
      }
    };

    const onLoad = async () => {
      try {
        // Fetch more newsletters
        const resp = await axios(`${process.env.REACT_APP_BASE_URL}/getAllData`, {
          headers: {
            "X-API-KEY": process.env.REACT_APP_AUTH_KEY,
          },
        });
        const data = resp.data.data;
        const updatedData = removeObjectByTitle(data, title);
        setMoreNewsletter(updatedData);
      } catch (err) {
        console.error("Error fetching more newsletters:", err);
      }
    };

    if (title) {
      fetchContent();
      onLoad();
    }
  }, [title]);

  function removeObjectByTitle(array, titleToRemove) {
    if (!Array.isArray(array)) return [];
    return array.filter((item) => item.title !== titleToRemove).reverse();
  }

  function convertTagsToArray(tagsString) {
    if (!tagsString || typeof tagsString !== "string") {
      return [];
    }
    return tagsString.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0);
  }

  async function onSubscribe() {
    if (!input.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    setSubscribeStatus("Subscribing...");
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addSub`,
        {
          submail: input,
        },
        {
          headers: {
            "X-API-KEY": process.env.REACT_APP_AUTH_KEY,
          },
        }
      );
      const data = resp.data.status_code;
      if (data === 200) {
        setSubscribeStatus("Subscribed");
        setInput(""); // Clear input after successful subscription
      } else {
        alert("Subscription failed due to network issue! Try again!");
        setSubscribeStatus("Subscribe");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Subscription failed! Please try again.");
      setSubscribeStatus("Subscribe");
    }
  }

  function onClickArticle(article) {
    if (!article) return;
    const parsedTitle = article.trim();
    window.open(`/techblog/?=${encodeURIComponent(parsedTitle)}`, "_blank");
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  // Helper function to check if a field has content
  const hasContent = (field) => {
    if (field === null || field === undefined) return false;
    if (typeof field === 'string') return field.trim().length > 0;
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === 'object') {
      // For objects, check if they have meaningful content
      return Object.values(field).some(value => hasContent(value));
    }
    return true;
  };

  // Helper function to render video content
  const renderVideo = (video) => {
    if (!hasContent(video) || !hasContent(video.embed_url)) return null;

    return (
      <div className="mb-6">
        <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
          <iframe
            src={video.embed_url}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video content"
            onError={() => console.warn("Video failed to load")}
          ></iframe>
        </div>
        {hasContent(video.url) && (
          <p className="text-sm text-gray-400 mt-2 text-center">
            Source: {video.url}
          </p>
        )}
      </div>
    );
  };

  // Helper function to render image content
  const renderImage = (image) => {
    if (!hasContent(image) || !hasContent(image.url)) return null;

    return (
      <div className="mb-6">
        <img
          src={image.url}
          alt={hasContent(image.alt) ? image.alt : "Article image"}
          className="w-full rounded-lg shadow-lg"
          onError={(e) => {
            console.warn("Image failed to load:", image.url);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            // Image loaded successfully
          }}
        />
        {hasContent(image.caption) && (
          <p className="text-sm text-gray-400 mt-2 text-center italic">
            {image.caption}
          </p>
        )}
      </div>
    );
  };

  // Helper function to render table content
  const renderTable = (table) => {
    if (!hasContent(table) || !hasContent(table.headers) || !hasContent(table.rows)) return null;

    return (
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border border-blue-500/20 rounded-lg overflow-hidden">
          <thead className="bg-blue-900/20">
            <tr>
              {table.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-blue-400 font-semibold border-b border-blue-500/20"
                >
                  {header || `Column ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-blue-500/10 hover:bg-blue-900/10"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-gray-300"
                  >
                    {cell || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper function to render CTA button
  const renderCTA = (cta) => {
    if (!hasContent(cta) || !hasContent(cta.text) || !hasContent(cta.link)) return null;

    return (
      <div className="mb-6 text-center">
        <a
          href={cta.link}
          target={hasContent(cta.target) ? cta.target : "_self"}
          rel={cta.target === "_blank" ? "noopener noreferrer" : undefined}
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-300 transition-all active:scale-95"
        >
          {cta.text}
        </a>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  const MAX_MORE_ARTICLES = 4;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative z-0">
      {/* Background grid with gradient overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
      </div>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Article Title - only show if exists */}
        {hasContent(respData.data?.title) && (
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            {respData.data.title}
          </h1>
        )}

        {/* Category - only show if exists */}
        {hasContent(respData.data?.category) && (
          <div className="text-center mb-4">
            <span className="bg-purple-900/20 text-purple-400 px-4 py-2 rounded-full text-sm border border-purple-500/20">
              {respData.data.category}
            </span>
          </div>
        )}

        {/* Date - only show if exists */}
        {hasContent(respData.data?.date) && (
          <p className="text-center text-gray-400 mb-6">
            {formatDate(respData.data.date)}
          </p>
        )}

        {/* Tags Container - only show if tags exist */}
        {hasContent(respData.data?.tag) && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {convertTagsToArray(respData.data.tag).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-900/20 text-blue-400 px-4 py-1.5 rounded-full text-sm border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-gray-400">Newsletter AI</span>
          <span className="bg-blue-900/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20">
            Brief In
          </span>
        </div>

        {/* Article Content - Dynamic rendering based on backend data */}
        <div className="prose prose-invert prose-lg max-w-none">
          {respData.data?.content?.length > 0 ? (
            respData.data.content.map((section, index) => {
              // Check if section has any content to render
              const hasAnyContent = hasContent(section.subtitle) ||
                hasContent(section.paragraph) ||
                hasContent(section.image) ||
                hasContent(section.video) ||
                hasContent(section.table) ||
                hasContent(section.cta);

              // Only render section if it has content
              if (!hasAnyContent) return null;

              return (
                <div key={index} className="mb-8">
                  {/* Subtitle - only show if exists and not null */}
                  {hasContent(section.subtitle) && (
                    <h2 className="text-2xl font-semibold mb-4 text-white">
                      {section.subtitle}
                    </h2>
                  )}

                  {/* Paragraph - only show if exists and not null */}
                  {hasContent(section.paragraph) && (
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {section.paragraph}
                    </p>
                  )}

                  {/* Image - only show if exists and not null */}
                  {section.image && renderImage(section.image)}

                  {/* Video - only show if exists and not null */}
                  {section.video && renderVideo(section.video)}

                  {/* Table - only show if exists and not null */}
                  {section.table && renderTable(section.table)}

                  {/* CTA - only show if exists and not null */}
                  {section.cta && renderCTA(section.cta)}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl mb-4">No content available</p>
              <p>Please check back later or try refreshing the page.</p>
            </div>
          )}
        </div>

        {/* More Newsletters Section - only show if data exists */}
        {moreNewsletter.length > 0 && (
          <div className="mt-16 border-t border-blue-900/30 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">More Articles</h2>
            <div className="space-y-4">
              {moreNewsletter.slice(0, MAX_MORE_ARTICLES).map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 hover:bg-blue-900/20 transition-colors cursor-pointer"
                  onClick={() => onClickArticle(item.title)}
                >
                  {hasContent(item.title) && (
                    <h3 className="text-lg text-blue-400 hover:text-blue-300 mb-1">
                      {item.title}
                    </h3>
                  )}
                  {hasContent(item.category) && (
                    <span className="text-sm text-gray-400 block">
                      {item.category}
                    </span>
                  )}
                  {hasContent(item.date) && (
                    <span className="text-xs text-gray-500 block mt-1">
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribe Section */}
        <div className="mt-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-center mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-center mb-4 text-sm">
              Subscribe to get the latest articles delivered to your inbox
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-1 bg-white/10 border border-blue-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSubscribe();
                  }
                }}
              />
              <button
                onClick={onSubscribe}
                disabled={subscribeStatus === "Subscribing..."}
                className="w-[40%] bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;