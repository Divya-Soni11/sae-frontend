import { useState, useEffect } from "react";
import { Globe, Clock, Share2 } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Technology",
  "Space Research",
  "New Innovation",
  "Web technology",
];

const newsData = [
  {
    id: 1,
    title: "Latest developments in Motor Technology",
    category: "Motor-technology",
    date: new Date(2024, 1, 5),
    isLive: true,
  },
  {
    id: 2,
    title: "Advances in AI Research",
    category: "AI-technology",
    date: new Date(2024, 1, 4),
  },
  {
    id: 3,
    title: "Space Research Updates",
    category: "Space Research",
    date: new Date(2024, 1, 4),
  },
  {
    id: 4,
    title: "ISRO's Latest Mission",
    category: "ISRO",
    date: new Date(2024, 0, 15),
  },
];

const GlowingText = ({ children }) => (
  <span className="relative">
    <span className="absolute inset-0 -z-10 blur-[2px] text-blue-500 opacity-70">
      {children}
    </span>
    <span className="relative">{children}</span>
  </span>
);

const NewsCard = ({ title, category, date, onClick }) => (
  <div
    onClick={onClick}
    className="border-b border-blue-500/20 p-4 hover:bg-blue-900/10 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-blue-400 text-sm">{category}</span>
    </div>
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-gray-400">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="p-1 hover:bg-blue-900/30 rounded"
          onClick={(e) => {
            e.stopPropagation();
            // Add share functionality here
          }}
        >
          <Share2 className="w-4 h-4 text-blue-400" />
        </button>
      </div>
    </div>
  </div>
);

export default function Newsletter() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  const onLoad = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllData`, {
      headers: {
        "X-API-KEY": process.env.REACT_APP_AUTH_KEY,
      },
    });
    setFilteredNews(response.data.data);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [
    ...new Set(filteredNews.map((news) => new Date(news.date).getFullYear())),
  ].sort((a, b) => b - a);

  useEffect(() => {
    filterNews();
  }, [selectedMonth, selectedYear]);

  const filterNews = () => {
    let filtered = [...filteredNews];
    if (selectedMonth) {
      filtered = filtered.filter(
        (news) => news.date.getMonth() === months.indexOf(selectedMonth)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (news) => news.date.getFullYear() === parseInt(selectedYear)
      );
    }
    setFilteredNews(filtered);
  };

  const handleNewsClick = (news) => {
    const parsedTitle = news.title.trim() 
    window.open(`/techblog/?=${parsedTitle}`, "_blank");
  };

  const groupedNews = filteredNews.reverse().reduce((groups, news) => {
    const datastr = news.date;
    const data = new Date(datastr)
    const date = data.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(news);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative z-0">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
      </div>

      <div className="flex">
        {/* <div className="w-64 min-h-screen border-r border-blue-500/20 p-4 space-y-6">
          <div className="flex flex-col items-baseline gap-5 mt-[44%]">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-blue-900/20 rounded-lg cursor-pointer"
              >
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex-1 p-6 space-y-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            <GlowingText>SAE Blogs</GlowingText>
          </h1>
          {Object.entries(groupedNews).map(([date, newsItems]) => (
            <div
              key={date}
              className="p-6 border border-blue-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-blue-500 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-4">
                {date}
              </h2>
              {newsItems.map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  category={news.category}
                  date={new Date(news.date)}
                  onClick={() => handleNewsClick(news)}
                />
              ))}
            </div>
          ))}
          {filteredNews.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              No news found for the selected date
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
