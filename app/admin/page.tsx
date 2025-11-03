"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LogOut,
  Video,
  Sparkles,
  Calendar,
  Plus,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import {
  getYouTubeVideo,
  updateYouTubeVideo,
  getSpotlightCards,
  addSpotlightCard,
  updateSpotlightCard,
  deleteSpotlightCard,
  getUpcomingEvent,
  addUpcomingEvent,
  updateUpcomingEvent,
  extractYouTubeVideoId,
} from "@/lib/services/admin";
import type {
  YouTubeVideo,
  SpotlightCard,
  UpcomingEvent,
  SpotlightCardInsert,
  UpcomingEventInsert,
} from "@/lib/types/database";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "spotlight" | "event">(
    "video",
  );
  const router = useRouter();
  const supabase = createClient();

  // YouTube Video State
  const [youtubeVideo, setYoutubeVideo] = useState<YouTubeVideo | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [videoSaving, setVideoSaving] = useState(false);

  // Spotlight Cards State
  const [spotlightCards, setSpotlightCards] = useState<SpotlightCard[]>([]);
  const [showSpotlightForm, setShowSpotlightForm] = useState(false);
  const [editingSpotlight, setEditingSpotlight] =
    useState<SpotlightCard | null>(null);
  const [spotlightSaving, setSpotlightSaving] = useState(false);

  // Upcoming Event State
  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent | null>(
    null,
  );
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventSaving, setEventSaving] = useState(false);

  // Form states
  const [spotlightForm, setSpotlightForm] = useState({
    title: "",
    description: "",
    image: "",
    images: "",
    video_id: "",
    full_content_title: "",
    full_content_text: "",
    full_content_details: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    date_range: "",
    location: "",
    link: "https://blog.tcoefs-unijos.org",
  });

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
        loadData();
      }
    };

    checkUser();
  }, [router, supabase]);

  const loadData = async () => {
    // Load YouTube video
    const video = await getYouTubeVideo();
    if (video) {
      setYoutubeVideo(video);
      setNewVideoUrl(video.video_id);
    }

    // Load spotlight cards
    const cards = await getSpotlightCards();
    setSpotlightCards(cards);

    // Load upcoming event
    const event = await getUpcomingEvent();
    setUpcomingEvent(event);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleUpdateVideo = async () => {
    if (!newVideoUrl.trim()) {
      alert("Please enter a YouTube URL or video ID");
      return;
    }

    setVideoSaving(true);
    const videoId = extractYouTubeVideoId(newVideoUrl) || newVideoUrl;

    const result = await updateYouTubeVideo(
      videoId,
      user?.user_metadata?.user_name || user?.email,
    );

    if (result.success) {
      alert("YouTube video updated successfully!");
      await loadData();
    } else {
      alert(`Error: ${result.error}`);
    }

    setVideoSaving(false);
  };

  const handleAddSpotlight = () => {
    setEditingSpotlight(null);
    setSpotlightForm({
      title: "",
      description: "",
      image: "",
      images: "",
      video_id: "",
      full_content_title: "",
      full_content_text: "",
      full_content_details: "",
    });
    setShowSpotlightForm(true);
  };

  const handleEditSpotlight = (card: SpotlightCard) => {
    setEditingSpotlight(card);
    setSpotlightForm({
      title: card.title,
      description: card.description,
      image: card.image,
      images: card.images.join("\n"),
      video_id: card.video_id || "",
      full_content_title: card.full_content_title,
      full_content_text: card.full_content_text,
      full_content_details: card.full_content_details.join("\n"),
    });
    setShowSpotlightForm(true);
  };

  const handleSaveSpotlight = async () => {
    if (
      !spotlightForm.title ||
      !spotlightForm.description ||
      !spotlightForm.image
    ) {
      alert("Please fill in all required fields (Title, Description, Image)");
      return;
    }

    setSpotlightSaving(true);

    const images = spotlightForm.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const details = spotlightForm.full_content_details
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingSpotlight) {
      // Update existing
      const result = await updateSpotlightCard(editingSpotlight.id, {
        title: spotlightForm.title,
        description: spotlightForm.description,
        image: spotlightForm.image,
        images,
        video_id: spotlightForm.video_id || null,
        full_content_title: spotlightForm.full_content_title,
        full_content_text: spotlightForm.full_content_text,
        full_content_details: details,
        updated_by: user?.user_metadata?.user_name || user?.email,
      });

      if (result.success) {
        alert("Spotlight card updated successfully!");
        setShowSpotlightForm(false);
        await loadData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } else {
      // Add new
      const newCard: SpotlightCardInsert = {
        title: spotlightForm.title,
        description: spotlightForm.description,
        image: spotlightForm.image,
        images,
        video_id: spotlightForm.video_id || null,
        full_content_title: spotlightForm.full_content_title,
        full_content_text: spotlightForm.full_content_text,
        full_content_details: details,
        display_order: spotlightCards.length + 1,
        updated_by: user?.user_metadata?.user_name || user?.email,
      };

      const result = await addSpotlightCard(newCard);

      if (result.success) {
        alert("Spotlight card added successfully!");
        setShowSpotlightForm(false);
        await loadData();
      } else {
        alert(`Error: ${result.error}`);
      }
    }

    setSpotlightSaving(false);
  };

  const handleDeleteSpotlight = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const result = await deleteSpotlightCard(id);

    if (result.success) {
      alert("Spotlight card deleted successfully!");
      await loadData();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleSaveEvent = async () => {
    if (!eventForm.title || !eventForm.date_range || !eventForm.location) {
      alert("Please fill in all required fields");
      return;
    }

    setEventSaving(true);

    const newEvent: UpcomingEventInsert = {
      title: eventForm.title,
      date_range: eventForm.date_range,
      location: eventForm.location,
      link: eventForm.link,
      updated_by: user?.user_metadata?.user_name || user?.email,
    };

    const result = await addUpcomingEvent(newEvent);

    if (result.success) {
      alert("Upcoming event updated successfully!");
      setShowEventForm(false);
      await loadData();
    } else {
      alert(`Error: ${result.error}`);
    }

    setEventSaving(false);
  };

  const handleResetEvent = () => {
    if (upcomingEvent) {
      setEventForm({
        title: upcomingEvent.title,
        date_range: upcomingEvent.date_range,
        location: upcomingEvent.location,
        link: upcomingEvent.link,
      });
    } else {
      setEventForm({
        title: "",
        date_range: "",
        location: "",
        link: "https://blog.tcoefs-unijos.org",
      });
    }
    setShowEventForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#316840] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f8f5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2f3e2f]">
                TCoEFS Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage site content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.user_name || user?.email}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
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
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("video")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "video"
                  ? "border-[#316840] text-[#316840]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                YouTube Video
              </div>
            </button>
            <button
              onClick={() => setActiveTab("spotlight")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "spotlight"
                  ? "border-[#316840] text-[#316840]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Spotlight Cards ({spotlightCards.length}/5)
              </div>
            </button>
            <button
              onClick={() => setActiveTab("event")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "event"
                  ? "border-[#316840] text-[#316840]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Event
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* YouTube Video Tab */}
        {activeTab === "video" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-6 h-6 text-[#316840]" />
              <h2 className="text-xl font-semibold text-[#2f3e2f]">
                YouTube Video Management
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Update the YouTube video displayed below the counter on the
              homepage.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Video ID
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <code className="text-sm text-gray-800">
                    {youtubeVideo?.video_id || "Not set"}
                  </code>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New YouTube URL or Video ID
                </label>
                <input
                  type="text"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="e.g., https://www.youtube.com/watch?v=VIDEO_ID or just VIDEO_ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                />
                <p className="mt-2 text-xs text-gray-500">
                  You can paste the full YouTube URL or just the video ID
                </p>
              </div>

              <button
                onClick={handleUpdateVideo}
                disabled={videoSaving}
                className="flex items-center gap-2 px-6 py-3 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {videoSaving ? "Updating..." : "Update Video"}
              </button>
            </div>
          </div>
        )}

        {/* Spotlight Cards Tab */}
        {activeTab === "spotlight" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#316840]" />
                  <h2 className="text-xl font-semibold text-[#2f3e2f]">
                    Spotlight Cards Management
                  </h2>
                </div>
                <button
                  onClick={handleAddSpotlight}
                  disabled={spotlightCards.length >= 5}
                  className="flex items-center gap-2 px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                  Add Card
                </button>
              </div>

              {spotlightCards.length >= 5 && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Maximum of 5 spotlight cards reached. Delete one to add a
                    new card.
                  </p>
                </div>
              )}

              <div className="grid gap-4">
                {spotlightCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#316840] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        {card.image && (
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {index + 1}. {card.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {card.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditSpotlight(card)}
                              className="px-3 py-1.5 text-sm text-[#316840] border border-[#316840] rounded-lg hover:bg-[#316840] hover:text-white transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSpotlight(card.id, card.title)
                              }
                              className="px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {spotlightCards.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>
                      No spotlight cards yet. Click "Add Card" to create one.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Spotlight Form Modal */}
            {showSpotlightForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-[#2f3e2f]">
                        {editingSpotlight
                          ? "Edit Spotlight Card"
                          : "Add Spotlight Card"}
                      </h3>
                      <button
                        onClick={() => setShowSpotlightForm(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={spotlightForm.description}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Image URL *
                        </label>
                        <input
                          type="text"
                          value={spotlightForm.image}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              image: e.target.value,
                            })
                          }
                          placeholder="/path/to/image.jpg"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gallery Images (one per line)
                        </label>
                        <textarea
                          value={spotlightForm.images}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              images: e.target.value,
                            })
                          }
                          rows={4}
                          placeholder="/path/to/image1.jpg&#10;/path/to/image2.jpg&#10;/path/to/image3.jpg"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent font-mono text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          YouTube Video ID (optional)
                        </label>
                        <input
                          type="text"
                          value={spotlightForm.video_id}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              video_id: e.target.value,
                            })
                          }
                          placeholder="e.g., dQw4w9WgXcQ"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Content Title
                        </label>
                        <input
                          type="text"
                          value={spotlightForm.full_content_title}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              full_content_title: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Content Text
                        </label>
                        <textarea
                          value={spotlightForm.full_content_text}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              full_content_text: e.target.value,
                            })
                          }
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Details/Bullet Points (one per line)
                        </label>
                        <textarea
                          value={spotlightForm.full_content_details}
                          onChange={(e) =>
                            setSpotlightForm({
                              ...spotlightForm,
                              full_content_details: e.target.value,
                            })
                          }
                          rows={4}
                          placeholder="First detail point&#10;Second detail point&#10;Third detail point"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleSaveSpotlight}
                        disabled={spotlightSaving}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-5 h-5" />
                        {spotlightSaving ? "Saving..." : "Save Card"}
                      </button>
                      <button
                        onClick={() => setShowSpotlightForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Event Tab */}
        {activeTab === "event" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#316840]" />
              <h2 className="text-xl font-semibold text-[#2f3e2f]">
                Upcoming Event Management
              </h2>
            </div>

            {upcomingEvent && !showEventForm && (
              <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {upcomingEvent.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    📅 {upcomingEvent.date_range}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    📍 {upcomingEvent.location}
                  </p>
                  <button
                    onClick={handleResetEvent}
                    className="px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors"
                  >
                    Update Event
                  </button>
                </div>
              </div>
            )}

            {(!upcomingEvent || showEventForm) && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, title: e.target.value })
                    }
                    placeholder="e.g., Annual Food Security Conference"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range *
                  </label>
                  <input
                    type="text"
                    value={eventForm.date_range}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date_range: e.target.value })
                    }
                    placeholder="e.g., 12th - 17th October 2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    placeholder="e.g., Plateau State, Nigeria"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    value={eventForm.link}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, link: e.target.value })
                    }
                    placeholder="https://blog.tcoefs-unijos.org"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={handleSaveEvent}
                    disabled={eventSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    {eventSaving ? "Saving..." : "Save Event"}
                  </button>
                  {showEventForm && upcomingEvent && (
                    <button
                      onClick={() => setShowEventForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}

            {!upcomingEvent && !showEventForm && (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="mb-4">No upcoming event set.</p>
                <button
                  onClick={handleResetEvent}
                  className="px-6 py-3 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] transition-colors"
                >
                  Add Event
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
