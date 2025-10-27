"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Upload,
  Plus,
  Trash2,
  Edit,
  Save,
  Calendar,
  Image as ImageIcon,
  Video,
  LogOut,
  User,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"news" | "spotlight" | "event">(
    "news",
  );
  const [commitMessage, setCommitMessage] = useState("");
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // News state
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "News",
    date: "",
    excerpt: "",
    content: "",
    images: [] as File[],
    videoId: "",
  });

  // Extract YouTube video ID from URL or return ID as-is
  const extractYouTubeId = (input: string): string => {
    if (!input.trim()) return "";

    // Already just an ID (11 characters, alphanumeric)
    if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
      return input.trim();
    }

    // Extract from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*&v=([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If no pattern matches, return as-is (might be just the ID)
    return input.trim();
  };

  // Spotlight state
  const [spotlightForm, setSpotlightForm] = useState({
    title: "",
    description: "",
    content: "",
    images: [] as File[],
    videoId: "",
  });

  // Event state
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    details: "",
    image: null as File | null,
  });

  const categories = ["News", "Research", "Partnership", "Training", "Policy"];

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "news" | "spotlight",
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    if (type === "news") {
      setNewsForm({ ...newsForm, images: files });
    } else {
      setSpotlightForm({ ...spotlightForm, images: files });
    }
  };

  const handleEventImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventForm({ ...eventForm, image: file });
    }
  };

  const addNews = () => {
    if (!newsForm.title || !newsForm.date || !newsForm.content) {
      alert("Please fill in all required fields (Title, Date, Content)");
      return;
    }

    const change = {
      type: "news",
      action: "add",
      data: {
        ...newsForm,
        videoId: extractYouTubeId(newsForm.videoId),
      },
    };
    setPendingChanges([...pendingChanges, change]);
    alert("News added to pending changes! Review and push when ready.");

    // Reset form
    setNewsForm({
      title: "",
      category: "News",
      date: "",
      excerpt: "",
      content: "",
      images: [],
      videoId: "",
    });
  };

  const addSpotlight = () => {
    if (
      !spotlightForm.title ||
      !spotlightForm.description ||
      !spotlightForm.content
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const change = {
      type: "spotlight",
      action: "add",
      data: {
        ...spotlightForm,
        videoId: extractYouTubeId(spotlightForm.videoId),
      },
    };
    setPendingChanges([...pendingChanges, change]);
    alert("Spotlight added to pending changes! Review and push when ready.");

    // Reset form
    setSpotlightForm({
      title: "",
      description: "",
      content: "",
      images: [],
      videoId: "",
    });
  };

  const updateEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.location) {
      alert("Please fill in all required fields");
      return;
    }

    const change = {
      type: "event",
      action: "update",
      data: { ...eventForm },
    };
    setPendingChanges([...pendingChanges, change]);
    alert("Event updated in pending changes! Review and push when ready.");
  };

  const setNoUpcomingEvents = () => {
    const change = {
      type: "event",
      action: "clear",
      data: {
        title: "No Upcoming Events",
        message: "Stay tuned",
      },
    };
    setPendingChanges([...pendingChanges, change]);
    alert("Event cleared! Will show 'No upcoming Events, Stay tuned' message.");
  };

  const removeChange = (index: number) => {
    setPendingChanges(pendingChanges.filter((_, i) => i !== index));
  };

  const pushChanges = async () => {
    if (pendingChanges.length === 0) {
      alert("No changes to push!");
      return;
    }
    if (!commitMessage.trim()) {
      alert("Please enter a commit message describing your changes");
      return;
    }

    // Here you would actually send to an API endpoint that handles Git commits
    console.log("Pushing changes:", pendingChanges);
    console.log("Commit message:", commitMessage);

    alert(
      `Changes would be pushed with message: "${commitMessage}"\n\n` +
        `Note: In production, this would:\n` +
        `1. Upload images to storage\n` +
        `2. Update JSON files\n` +
        `3. Commit to Git\n` +
        `4. Deploy to production\n\n` +
        `Contact your developer to set up the backend API.`,
    );

    setShowCommitDialog(false);
    setCommitMessage("");
    setPendingChanges([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#2f3e2f] mb-2">
                TCoEFS Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage news, spotlights, and events for the TCoEFS website
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user?.user_metadata?.user_name || user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === "news"
                  ? "text-[#2d5a2d] border-b-2 border-[#2d5a2d] bg-[#2d5a2d]/5"
                  : "text-gray-600 hover:text-[#2d5a2d]"
              }`}
            >
              Add News
            </button>
            <button
              onClick={() => setActiveTab("spotlight")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === "spotlight"
                  ? "text-[#2d5a2d] border-b-2 border-[#2d5a2d] bg-[#2d5a2d]/5"
                  : "text-gray-600 hover:text-[#2d5a2d]"
              }`}
            >
              Add Spotlight
            </button>
            <button
              onClick={() => setActiveTab("event")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === "event"
                  ? "text-[#2d5a2d] border-b-2 border-[#2d5a2d] bg-[#2d5a2d]/5"
                  : "text-gray-600 hover:text-[#2d5a2d]"
              }`}
            >
              Update Event
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* NEWS TAB */}
            {activeTab === "news" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2f3e2f]">
                  Add New News Article
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newsForm.title}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Enter news title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newsForm.category}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date * (e.g., September 25, 2025)
                    </label>
                    <input
                      type="text"
                      value={newsForm.date}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="September 25, 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube Video (Optional)
                    </label>
                    <input
                      type="text"
                      value={newsForm.videoId}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, videoId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Paste full YouTube link or just the video ID"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Examples: https://youtu.be/zRMCLGrrsR0 OR
                      youtube.com/watch?v=zRMCLGrrsR0 OR just zRMCLGrrsR0
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Excerpt
                  </label>
                  <textarea
                    value={newsForm.excerpt}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, excerpt: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                    placeholder="Brief summary (1-2 sentences)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Content *
                  </label>
                  <textarea
                    value={newsForm.content}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, content: e.target.value })
                    }
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                    placeholder="Write the full news article here. Use paragraphs to separate content."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Images (Max 10)
                  </label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 bg-[#2d5a2d] text-white rounded-lg cursor-pointer hover:bg-[#1e4a1e] transition-colors">
                        <ImageIcon className="w-5 h-5" />
                        Choose Images
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "news")}
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-600">
                        {newsForm.images.length} file(s) selected
                      </span>
                    </div>
                    {newsForm.images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {newsForm.images.map((file, i) => (
                          <div
                            key={i}
                            className="relative w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 text-center truncate">
                              {i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={addNews}
                  className="w-full px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#1e4a1e] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add News to Pending Changes
                </button>
              </div>
            )}

            {/* SPOTLIGHT TAB */}
            {activeTab === "spotlight" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2f3e2f]">
                  Add New Spotlight
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={spotlightForm.title}
                      onChange={(e) =>
                        setSpotlightForm({
                          ...spotlightForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Enter spotlight title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description * (Shows on card)
                    </label>
                    <textarea
                      value={spotlightForm.description}
                      onChange={(e) =>
                        setSpotlightForm({
                          ...spotlightForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Brief description for the card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Content *
                    </label>
                    <textarea
                      value={spotlightForm.content}
                      onChange={(e) =>
                        setSpotlightForm({
                          ...spotlightForm,
                          content: e.target.value,
                        })
                      }
                      rows={10}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Write the full spotlight content here"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube Video (Optional)
                    </label>
                    <input
                      type="text"
                      value={spotlightForm.videoId}
                      onChange={(e) =>
                        setSpotlightForm({
                          ...spotlightForm,
                          videoId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Paste full YouTube link or just the video ID"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste any YouTube URL format - we'll extract the ID
                      automatically
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Images (Max 10)
                    </label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 bg-[#2d5a2d] text-white rounded-lg cursor-pointer hover:bg-[#1e4a1e] transition-colors">
                          <ImageIcon className="w-5 h-5" />
                          Choose Images
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "spotlight")}
                            className="hidden"
                          />
                        </label>
                        <span className="text-sm text-gray-600">
                          {spotlightForm.images.length} file(s) selected
                        </span>
                      </div>
                      {spotlightForm.images.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {spotlightForm.images.map((file, i) => (
                            <div
                              key={i}
                              className="relative w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center"
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 text-center truncate">
                                {i + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={addSpotlight}
                    className="w-full px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#1e4a1e] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Spotlight to Pending Changes
                  </button>
                </div>
              </div>
            )}

            {/* EVENT TAB */}
            {activeTab === "event" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2f3e2f]">
                  Update Upcoming Event
                </h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This will replace the current
                    upcoming event shown on the website.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date * (e.g., October 2025)
                    </label>
                    <input
                      type="text"
                      value={eventForm.date}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="October 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="TCoEFS, University of Jos"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description * (Shows on preview card)
                    </label>
                    <textarea
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Brief description"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Details *
                    </label>
                    <textarea
                      value={eventForm.details}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, details: e.target.value })
                      }
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent"
                      placeholder="Write the full event details here"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Image (Max 1)
                    </label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 bg-[#2d5a2d] text-white rounded-lg cursor-pointer hover:bg-[#1e4a1e] transition-colors">
                          <ImageIcon className="w-5 h-5" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEventImageUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-sm text-gray-600">
                          {eventForm.image
                            ? eventForm.image.name
                            : "No file selected"}
                        </span>
                      </div>
                      {eventForm.image && (
                        <div className="flex gap-2">
                          <div className="relative w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(eventForm.image)}
                              alt="Event preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={updateEvent}
                    className="px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#1e4a1e] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Update Event in Pending Changes
                  </button>
                  <button
                    onClick={setNoUpcomingEvents}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Set No Upcoming Events
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pending Changes */}
        {pendingChanges.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-[#2f3e2f] mb-4">
              Pending Changes ({pendingChanges.length})
            </h2>
            <div className="space-y-3">
              {pendingChanges.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <span className="font-semibold text-[#2d5a2d]">
                      {change.type === "news" && "News"}
                      {change.type === "spotlight" && "Spotlight"}
                      {change.type === "event" &&
                        change.action === "clear" &&
                        "Clear Event"}
                      {change.type === "event" &&
                        change.action === "update" &&
                        "Event"}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-700">
                      {change.action === "clear"
                        ? `${change.data.title} - ${change.data.message}`
                        : change.data.title}
                    </span>
                  </div>
                  <button
                    onClick={() => removeChange(index)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCommitDialog(true)}
              className="w-full mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Push All Changes to Website
            </button>
          </div>
        )}

        {/* Commit Dialog */}
        {showCommitDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-[#2f3e2f] mb-4">
                Push Changes
              </h3>
              <p className="text-gray-600 mb-4">
                Describe what changes you're making (this helps track updates):
              </p>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a2d] focus:border-transparent mb-4"
                placeholder="e.g., Added workshop news and updated event"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCommitDialog(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={pushChanges}
                  className="flex-1 px-4 py-2 bg-[#2d5a2d] text-white rounded-lg hover:bg-[#1e4a1e] transition-colors"
                >
                  Push Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>Choose a tab above (News, Spotlight, or Event)</li>
            <li>Fill in all required fields marked with *</li>
            <li>Upload images (max 10 for news/spotlight, 1 for event)</li>
            <li>Click "Add to Pending Changes"</li>
            <li>Review your pending changes below</li>
            <li>Click "Push All Changes" when ready</li>
            <li>Enter a description of what you changed</li>
            <li>Click "Push" to publish to the website!</li>
          </ol>
          <p className="mt-4 text-xs text-blue-700">
            <strong>Note:</strong> Currently in demo mode. Contact your
            developer to connect this to the live website.
          </p>
        </div>
      </div>
    </div>
  );
}
