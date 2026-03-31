import React, { useState, useMemo } from "react";
import {Link} from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Layers } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCoins, faTools, faClock, faChartLine, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import './App.css'

const roadmap = [
  {
    title: "Introduction to DSA",
    children: [
      { title: "What is Data Structure?" },
      { title: "What is an Algorithm?" },
      { title: "Types of Data Structures (Primitive & Non-Primitive)" },
      { title: "Abstract Data Types (ADT)" },
      { title: "Importance of DSA in Software Development" },
      { title: "Real-world Applications of DSA" },
    ],
  },
  {
    title: "Algorithm Analysis",
    children: [
      { title: "Time & Space Complexity" },
      { title: "Big O, Omega, Theta" },
      { title: "Best, Worst, Average Case Analysis" },
    ],
  },
  {
    title: "Foundations",
    children: [
      { title: "Array & Dynamic Array" },
      { title: "Core Operations" },
      { title: "Searching" },
      { title: "Sorting" },
    ],
  },
  {
    title: "Linear Data Structures",
    children: [
      {
        title: "Linked List",
        children: [
          { title: "Singly Linked List" },
          { title: "Doubly Linked List" },
          { title: "Circular Linked List" },
          { title: "Insertion / Deletion / Traversal" },
          { title: "Solved Problems" },
        ],
      },
      {
        title: "Stack",
        children: [
          { title: "LIFO Principle" },
          { title: "Implementation" },
          { title: "Applications" },
        ],
      },
      {
        title: "Queue",
        children: [
          { title: "FIFO Principle" },
          { title: "Implementation" },
          { title: "Applications" },
        ],
      },
    ],
  },
  {
    title: "Non-Linear Data Structures",
    children: [
      {
        title: "Trees",
        children: [
          { title: "Terminology" },
          { title: "Binary Trees" },
          { title: "BST" },
          { title: "Traversals" },
        ],
      },
      {
        title: "Heaps",
        children: [
          { title: "Min Heap / Max Heap" },
          { title: "Heap Operations" },
          { title: "Heap Sort" },
        ],
      },
      {
        title: "Graphs",
        children: [
          { title: "Graph Types" },
          { title: "Adjacency Matrix/List" },
          { title: "BFS" },
          { title: "DFS" },
          { title: "Shortest Path Algorithms" },
        ],
      },
    ],
  },
];

const courseInfo = {
  duration: "3 Months",
  fees: "₹ 8000 /-",
  prerequisites: "Basic Programming Knowledge (C/C++/Java/Python)",
  schedule: "Mon - Fri (2 Hours Daily)",
  level: "Beginner to Intermediate",
  mode: "Offline Classes",
};

const SidebarNode = ({ node, level = 0, active, setActive }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        onClick={() => (hasChildren ? setOpen(!open) : setActive(node.title))}
        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
        ${active === node.title ? "bg-blue-600/30 text-blue-300" : "hover:bg-gray-700 text-gray-300"}`}
        style={{ marginLeft: level * 10 }}
      >
        <div className="flex items-center gap-2">
          {hasChildren && (open ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
          <span className="text-sm">{node.title}</span>
        </div>
      </div>

      <AnimatePresence>
        {hasChildren && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="ml-2 border-l border-gray-700 pl-2">
              {node.children.map((child, idx) => (
                <SidebarNode
                  key={idx}
                  node={child}
                  level={level + 1}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseCard = ({ icon, title, value }) => (
  <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:shadow-lg transition">
    <FontAwesomeIcon icon={icon} className="text-blue-400 mb-2" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm">{value}</p>
  </div>
);

export default function PremiumDSAUI() {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return roadmap;

    const filterTree = (nodes) => {
      return nodes
        .map((n) => {
          const match = n.title.toLowerCase().includes(search.toLowerCase());

          if (n.children) {
            const filteredChildren = filterTree(n.children);
            if (match || filteredChildren.length > 0) {
              return { ...n, children: filteredChildren };
            }
          } else if (match) {
            return n;
          }
          return null;
        })
        .filter(Boolean);
    };

    return filterTree(roadmap);
  }, [search]);

  return (
    <div className="flex h-screen bg-gray-950 text-white">

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <button onClick={() => setOpenSidebar(true)} className="text-xl">☰</button>
        <div className="title-header">
        <Layers className="site-header-logo text-blue-400" />
        <h1 className="text-blue-400 font-bold">Micron</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 p-5 overflow-y-auto z-50 transform transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h1 className="text-blue-400 font-bold">Syllabus</h1>
          <button onClick={() => setOpenSidebar(false)}>✖</button>
        </div>

        <div className="flex items-center gap-2 mb-6 hidden md:flex">
          <Layers className="text-blue-400" />
          <h1 className="text-lg font-bold text-blue-400">Micron</h1>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-3 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          {filtered.map((node, i) => (
            <SidebarNode
              key={i}
              node={node}
              active={active}
              setActive={(val) => {
                setActive(val);
                setOpenSidebar(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      {openSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40" onClick={() => setOpenSidebar(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 overflow-y-auto mt-14 md:mt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mt-6 mb-6 text-center">
            Data Structure & Algorithm
          </h2>

          <div className="icon-about-course grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <CourseCard icon={faCalendar} title="Duration" value={courseInfo.duration} />
            <CourseCard icon={faCoins} title="Fees" value={courseInfo.fees} />
            <CourseCard icon={faTools} title="Prerequisites" value={courseInfo.prerequisites} />
            <CourseCard icon={faClock} title="Class Schedule" value={courseInfo.schedule} />
            <CourseCard icon={faChartLine} title="Level" value={courseInfo.level} />
            <CourseCard icon={faDotCircle} title="Mode" value={courseInfo.mode} />
            <div className="flex justify-center gap-3">
            <Link to="/addmission" className="reg-btn"><button>Register Now</button></Link>
            <button className="reg-btn" onClick={() => setOpenSidebar(true)}>View Syllabus</button>
            </div>
          </div>

          {active && (
            <div className="mt-10">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3">
                Selected Topic
              </h3>
              <p className="text-gray-300 bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                {active}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


