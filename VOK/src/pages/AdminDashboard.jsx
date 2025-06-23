import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import HeroCard from "../components/HeroCard";

const baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [approvedHeroes, setApprovedHeroes] = useState([]);
  const [unapprovedHeroes, setUnapprovedHeroes] = useState([]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);

  const [activeTab, setActiveTab] = useState("unapproved");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);

  const fetchBlogs = async () => {
    try {
      const [approvedRes, unapprovedRes] = await Promise.all([
        axios.get(`${baseURL}/blogs`),
        axios.get(`${baseURL}/blogs/unapproved`),
      ]);
      setApprovedBlogs(approvedRes.data);
      setUnapprovedBlogs(unapprovedRes.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroes = async () => {
    try {
      const [approvedRes, unapprovedRes] = await Promise.all([
        axios.get(`${baseURL}/heroes`),
        axios.get(`${baseURL}/heroes/unapproved`),
      ]);
      setApprovedHeroes(approvedRes.data);
      setUnapprovedHeroes(unapprovedRes.data);
    } catch (err) {
      console.error("Error fetching heroes", err);
    }
  };

  const handleApproveBlog = async (id) => {
    try {
      await axios.patch(`${baseURL}/blogs/${id}/approve`);
      const justApproved = unapprovedBlogs.find((b) => b._id === id);
      setApprovedBlogs((prev) => [justApproved, ...prev]);
      setUnapprovedBlogs((prev) => prev.filter((b) => b._id !== id));
      setSelectedBlog(null);
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const approveHero = async (id) => {
    try {
      await axios.patch(`${baseURL}/heroes/${id}/approve`);
      const approved = unapprovedHeroes.find((h) => h._id === id);
      setApprovedHeroes((prev) => [approved, ...prev]);
      setUnapprovedHeroes((prev) => prev.filter((h) => h._id !== id));
      setSelectedHero(null);
    } catch (err) {
      console.error("Hero approval failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/admin/logout`);
      window.location.href = "/admin";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/admin/verify`)
      .then(() => {
        fetchBlogs();
        fetchHeroes();
      })
      .catch(() => (window.location.href = "/admin"))
      .finally(() => setVerifying(false));
  }, []);

  if (verifying) {
    return <div className="text-white text-center pt-32">Verifying admin session...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 pt-24 pb-10 font-nunito">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["unapproved", "approved", "heroes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-white text-black font-bold"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {tab === "unapproved" && "Unapproved Blogs"}
            {tab === "approved" && "Approved Blogs"}
            {tab === "heroes" && "Hero Nominations"}
          </button>
        ))}
      </div>

      {/* Blog / Hero List */}
      {loading ? (
        <p className="text-white/70 text-center">Loading...</p>
      ) : activeTab === "unapproved" ? (
        unapprovedBlogs.length === 0 ? (
          <p className="text-white/50 text-center">No blogs to approve.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unapprovedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/5 p-6 rounded-xl border border-white/10 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-white/70 line-clamp-3">{blog.body}</p>
                <p className="mt-4 text-xs text-white/50">
                  Submitted on {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )
      ) : activeTab === "approved" ? (
        approvedBlogs.length === 0 ? (
          <p className="text-white/50 text-center">No approved blogs.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/5 p-6 rounded-xl border border-white/10 shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-white/70 line-clamp-3">{blog.body}</p>
                <div className="text-xs text-white/50 space-y-1 mt-2">
                  <p><strong>Author:</strong> {blog.author}</p>
                  <p><strong>Email:</strong> {blog.email}</p>
                  <p><strong>Phone:</strong> {blog.phoneNumber}</p>
                  <p><strong>Submitted:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          {unapprovedHeroes.length === 0 ? (
            <p className="text-white/50 text-center">No hero nominations pending.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unapprovedHeroes.map((hero) => (
                <HeroCard key={hero._id} hero={hero} onClick={setSelectedHero} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-white text-black max-h-[90vh] overflow-y-auto w-full max-w-xl p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="whitespace-pre-wrap text-gray-800">{selectedBlog.body}</p>
            <div className="text-sm text-gray-500 mt-4 space-y-1">
              <p><strong>Author:</strong> {selectedBlog.author}</p>
              <p><strong>Email:</strong> {selectedBlog.email}</p>
              <p><strong>Phone:</strong> {selectedBlog.phoneNumber}</p>
              <p><strong>Submitted:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => handleApproveBlog(selectedBlog._id)}
                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Modal */}
      {selectedHero && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-white text-black max-h-[90vh] overflow-y-auto w-full max-w-xl p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setSelectedHero(null)}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedHero.heroName}</h2>
            <p className="text-sm text-gray-700 mb-2">{selectedHero.whatTheyDo}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Why:</strong> {selectedHero.whyNominate}</p>
            <p className="text-xs text-gray-500 mb-4">
              Nominated by {selectedHero.yourName} ({selectedHero.yourEmail}, {selectedHero.yourPhone})
            </p>
            {selectedHero.photoUrl && (
              <img src={selectedHero.photoUrl} alt="Hero" className="w-full rounded mb-4" />
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedHero(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => approveHero(selectedHero._id)}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
