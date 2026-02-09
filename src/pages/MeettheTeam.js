import React, { useState } from "react";
import CyberpunkNavbar from "./Navbar";
import { Cpu, Zap, Box } from "lucide-react";
import Footer from "./Footer";
const img9 =`${process.env.REACT_APP_BUCKET}2.png`;
const img10 =`${process.env.REACT_APP_BUCKET}image2.jpg`;
const img11 =`${process.env.REACT_APP_BUCKET}image3.jpg`;
const img12 =`${process.env.REACT_APP_BUCKET}image4.jpg`;
const img13 =`${process.env.REACT_APP_BUCKET}image5.jpg`;
const img14 =`${process.env.REACT_APP_BUCKET}image61.jpg`;
const img15 =`${process.env.REACT_APP_BUCKET}image7.jpeg`;
const img16 =`${process.env.REACT_APP_BUCKET}image8.jpg`;
const img17 =`${process.env.REACT_APP_BUCKET}image9.jpg`;
const img18 =`${process.env.REACT_APP_BUCKET}image10.jpg`;
const img19 =`${process.env.REACT_APP_BUCKET}image11.jpeg`;
const img20 =`${process.env.REACT_APP_BUCKET}image12.jpg`;
const img21 =`${process.env.REACT_APP_BUCKET}image13.png`;
const img22 =`${process.env.REACT_APP_BUCKET}image14.jpg`;
const img23 =`${process.env.REACT_APP_BUCKET}image15.png`;
const img24 =`${process.env.REACT_APP_BUCKET}image16.jpeg`;
const img25 =`${process.env.REACT_APP_BUCKET}image17.jpeg`;
const img26 =`${process.env.REACT_APP_BUCKET}image18.jpg`;
const img27 =`${process.env.REACT_APP_BUCKET}image19.jpg`;
const img28 =`${process.env.REACT_APP_BUCKET}image20.jpg`;
const img29 =`${process.env.REACT_APP_BUCKET}image21.jpg`;
const img0 =`${process.env.REACT_APP_BUCKET}image22.jpg`;
const img30 =`${process.env.REACT_APP_BUCKET}ayush.jpeg`;
const img31 =`${process.env.REACT_APP_BUCKET}ganesh.jpg`;
const img32 =`${process.env.REACT_APP_BUCKET}sanchi.jpg`;
const img33 =`${process.env.REACT_APP_BUCKET}padam.jpeg`;
const img34 =`${process.env.REACT_APP_BUCKET}shubh.webp`;
const img35 =`${process.env.REACT_APP_BUCKET}aaditi.jpg`;
const img36 =`${process.env.REACT_APP_BUCKET}Addhar.jpg`;
const img37 =`${process.env.REACT_APP_BUCKET}atri.jpg`;
const img38 =`${process.env.REACT_APP_BUCKET}divanyanshu.jpg`;

const teamMembers = [
  {
    category: "Executive Board",
    name: "Vinay Kumar",
    title: "Chairperson",
    image: img9,
    linkedin: "https://www.linkedin.com/in/vinay-kumar-100a94311/",
    instagram: "https://www.instagram.com/vinay.mav?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    category: "Executive Board",
    name: "Parth Bansal",
    title: "Vice Chairperson",
    image: img10,
    linkedin: "https://www.linkedin.com/in/parth-bansal-627724290  ",
    instagram:
      "https://www.instagram.com/parth._.04/profilecard/?igsh=MW5vYWozamtxc2pqNw==",
  },
  {
    category: "Executive Board",
    name: "Vinayak Sharma",
    title: "Club Co-ordinator",
    image: img11,
    linkedin: "https://www.linkedin.com/in/vinayak-sharma-b8379a302/",
    instagram:
      "https://www.instagram.com/ig.vinayaksharma/?utm_source=ig_web_button_share_sheet",
  },
  {
    category: "Executive Board",
    name: "Prashant Singh",
    title: "Secretary",
    image: img12,
    linkedin: "https://www.linkedin.com/in/prashant-singh-30314a2a9/",
    instagram: "https://www.instagram.com/_prashant__4646/",
  },
  {
    category: "Executive Board",
    name: "Saksham Rathore",
    title: "Treasurer",
    image: img13,
    linkedin: "https://www.linkedin.com/in/saksham-rathore-2330ba305",
    instagram: "https://www.instagram.com/sakshamrathore214/#",
  },
  {
    category: "Executive Board",
    name: "Gaurav Patel",
    title: "Software & IT Chair",
    image: img14,
    linkedin: "https://www.linkedin.com/in/gaurav-patel-50a6041b5/",
    instagram: "https://www.instagram.com/gaurav6.0/",
  },
  {
    category: "Executive Board",
    name: "Harsh Bassal",
    title: "Technical Chair",
    image: img15,
    linkedin: "https://www.linkedin.com/in/harsh-bassal-3a47811b0/",
    instagram: "https://www.instagram.com/harsh_bassal_/",
  },
  {
    category: "Executive Board",
    name: "Shubham Kumar",
    title: "Program Chair",
    image: img16,
    linkedin: "#",
    instagram: "https://www.linkedin.com/in/shubhamkumar56018/",
  },
  {
    category: "Executive Board",
    name: "Yeeshu",
    title: "Finance Chair",
    image: img17,
    linkedin: "https://www.linkedin.com/in/yeeshu-nayak-314787251",
    instagram:
      "https://www.instagram.com/yeeshu0111/profilecard/?igsh=MXBycjRqMjdoa2UzMg==",
  },
  {
    category: "Core Committee",
    name: "Ambar Chaurasiya",
    title: " Member",
    image: img18,
    linkedin: "https://www.linkedin.com/in/ambar-chaurasiya-5759242a9",
    instagram:
      "https://www.instagram.com/ambar_chaurasiya?igsh=MW1pZDAyNGRkZnhhcg==",
  },
  {
    category: "Core Committee",
    name: "Moksh Garg",
    title: " Member",
    image: img19,
    linkedin: "https://www.linkedin.com/in/moksh-garg-6092b7291",
    instagram:
      "https://www.instagram.com/mokshgarrg/profilecard/?igsh=d3MzZDhoaWhudjJ3",
  },
  {
    category: "Core Committee",
    name: "Nikhil Mathuriya",
    title: " Member",
    image: img20,
    linkedin: "#",
    instagram:
      "https://www.instagram.com/nikhilmathuriya9/profilecard/?igsh=YWQ4Mzk0MjFsaDd1",
  },
  {
    category: "Core Committee",
    name: "Pratimaan Tripathi",
    title: "Member",
    image: img21,
    linkedin: "http://linkedin.com/in/pratimaan-tripathi-9a80b2294",
    instagram: "https://www.instagram.com/_pratimaannnn/profilecard",
  },
  {
    category: "Core Committee",
    name: "Rounak Kumar Jha",
    title: " Member",
    image: img22,
    linkedin: "https://www.linkedin.com/in/rounak-jha-92a867333/",
    instagram: "https://www.instagram.com/jharounak13/",
  },
  {
    category: "Core Committee",
    name: "Sahil Minz",
    title: " Member",
    image: img23,
    linkedin:
      "https://www.linkedin.com/in/sahil-minz-939655275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/sahil_minz13/profilecard/?igsh=MWJkOW45cmo0aG16ZQ==",
  },
  {
    category: "Core Committee",
    name: "Shivangi Jha",
    title: " Member",
    image: img0,
    linkedin: "https://www.linkedin.com/in/shivangi-jha-a32938258",
    instagram:
      "https://www.instagram.com/__enchanted_.11?igsh=MXMyNnZnOWhyZ2oycA==",
  },
  {
    category: "Core Committee",
    name: "Shubham Garg",
    title: " Member",
    image: img25,
    linkedin: "https://www.linkedin.com/in/shubham-garg-48ab3a289",
    instagram:
      "https://www.instagram.com/shubham_garg4444/profilecard/?igsh=MXYwYmg2MnlhYjFkZw==",
  },
  {
    category: "Core Committee",
    name: "Vinay Kumar",
    title: " Member",
    image: img27,
    linkedin: "https://www.linkedin.com/in/vinay-kumar-100a94311",
    instagram:
      "https://www.instagram.com/hii_i_am_vinay/profilecard/?igsh=N3BubzN4bjYzNWsx",
  },
  {
    category: "Core Committee",
    name: "Waquee Mubarak",
    title: " Member",
    image: img28,
    linkedin: "https://www.linkedin.com/in/waquee-mubarak-a69041208",
    instagram:
      "https://www.instagram.com/waquee_mk/profilecard/?igsh=dTUwejdsdnpicGRw",
  },
  {
    category: "Core Committee",
    name: "Yatharth Pal",
    title: " Member",
    image: img29,
    linkedin: "https://www.linkedin.com/in/yatharth-pal-3b31a4226",
    instagram:
      "https://www.instagram.com/yattharrthh/profilecard/?igsh=MXZvbzZhYjUyMXBqZg==",
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

const MeetTheTeam = () => {
  const [selectedCategory, setSelectedCategory] = useState("Executive Board");

  const filteredMembers = teamMembers.filter(
    (member) => member.category === selectedCategory
  );

  return (
    <section className="min-h-screen flex flex-col items-center bg-black text-white overflow-hidden relative z-0">
      {/* Background Decorations */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center mt-4">
        <h1 className="text-5xl font-bold">
          <GlowingText>Meet Our Team</GlowingText>
        </h1>
        <div className="flex justify-center mb-8 space-x-4 pt-12">
          <button
            onClick={() => setSelectedCategory("Executive Board")}
            className={`px-1 py-2 sm:px-4 rounded-full ${
              selectedCategory === "Executive Board"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Executive Board
          </button>
          <button
            onClick={() => setSelectedCategory("Core Committee")}
            className={`px-1 py-2 sm:px-4 rounded-full ${
              selectedCategory === "Core Committee"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Core Committee
          </button>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-12 py-12">
        {filteredMembers.map((member, index) => (
          <div
            key={index}
            className="relative group bg-gray-900 rounded-lg  hover:shadow-cyan-500/50 transform transition duration-500 shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105"
          >
            {/* Member Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[30rem] object-cover rounded-t-lg"
            />
            {/* Always Visible Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <div className="p-6 absolute inset-x-0 bottom-0 text-center">
              <h3 className="text-2xl font-semibold opacity-50 group-hover:opacity-0 transition-opacity duration-300 text-white mb-2">
                {member.name}
              </h3>
              <p className="text-sm text-cyan-400 opacity-50 group-hover:opacity-0 transition-opacity duration-300">
                {member.title}
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
              <h3 className="text-2xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-cyan-400 font-medium">{member.title}</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <i className="fab fa-linkedin text-white text-xl"></i>
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <i className="fab fa-instagram text-white text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Decorations */}
      <div className="absolute top-1/4 right-1/4 z-[-1]">
        <Box className="w-8 h-8 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 z-[-1]">
        <Zap className="w-10 h-10 text-blue-400 animate-ping" />
      </div>
      <div className="absolute top-1/2 right-1/3 z-[-1]">
        <Cpu className="w-6 h-6 text-blue-300 animate-bounce" />
      </div>
    </section>
  );
};

export default MeetTheTeam;
