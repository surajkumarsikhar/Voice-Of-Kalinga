import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
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

  const handleApprove = async (id) => {
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
      })
      .catch(() => {
        window.location.href = "/admin";
      })
      .finally(() => {
        setVerifying(false);
      });
  }, []);

  if (verifying) {
    return <div className="text-white text-center pt-32">Verifying admin session...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-28 pb-10 font-nunito">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("unapproved")}
          className={`px-4 py-2 rounded ${
            activeTab === "unapproved"
              ? "bg-white text-black font-bold"
              : "bg-red-500/80 text-white hover:bg-white/20"
          }`}
        >
          Unapproved Blogs
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 rounded ${
            activeTab === "approved"
              ? "bg-white text-black font-bold"
              : "bg-green-500/80 text-white hover:bg-white/20"
          }`}
        >
          Approved Blogs
        </button>
      </div>

      {loading ? (
        <p className="text-white/70 text-center">Loading blogs...</p>
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
                <p className="text-sm text-white/70 line-clamp-3">{blog.content}</p>
                <p className="mt-4 text-xs text-white/50">
                  Submitted on {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )
      ) : approvedBlogs.length === 0 ? (
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
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-xl max-w-xl w-full relative shadow-lg">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{selectedBlog.body}</p>
            <div className="text-sm text-gray-500 mt-4 space-y-1">
              <p><strong>Author:</strong> {selectedBlog.author}</p>
              <p><strong>Email:</strong> {selectedBlog.email}</p>
              <p><strong>Phone:</strong> {selectedBlog.phoneNumber}</p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(selectedBlog.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => handleApprove(selectedBlog._id)}
                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
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
