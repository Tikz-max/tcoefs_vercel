// Admin service functions for TCoEFS content management
import { createClient } from "@/lib/supabase/client";
import type {
  YouTubeVideo,
  YouTubeVideoUpdate,
  SpotlightCard,
  SpotlightCardInsert,
  SpotlightCardUpdate,
  UpcomingEvent,
  UpcomingEventInsert,
  UpcomingEventUpdate,
} from "@/lib/types/database";

const supabase = createClient();

// ============================================
// YouTube Video Management
// ============================================

/**
 * Get the current YouTube video
 */
export async function getYouTubeVideo(): Promise<YouTubeVideo | null> {
  const { data, error } = await supabase
    .from("youtube_video")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching YouTube video:", error);
    return null;
  }

  return data;
}

/**
 * Update the YouTube video ID
 */
export async function updateYouTubeVideo(
  videoId: string,
  updatedBy?: string,
): Promise<{ success: boolean; error?: string }> {
  // Get the current video record
  const current = await getYouTubeVideo();

  if (!current) {
    return { success: false, error: "No video record found" };
  }

  const updates: YouTubeVideoUpdate = {
    video_id: videoId,
    updated_by: updatedBy || null,
  };

  const { error } = await supabase
    .from("youtube_video")
    .update(updates)
    .eq("id", current.id);

  if (error) {
    console.error("Error updating YouTube video:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ============================================
// Spotlight Cards Management
// ============================================

/**
 * Get all spotlight cards ordered by display_order
 */
export async function getSpotlightCards(): Promise<SpotlightCard[]> {
  const { data, error } = await supabase
    .from("spotlight_cards")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching spotlight cards:", error);
    return [];
  }

  return data || [];
}

/**
 * Add a new spotlight card (enforces max 5 limit)
 */
export async function addSpotlightCard(
  card: SpotlightCardInsert,
): Promise<{ success: boolean; error?: string; data?: SpotlightCard }> {
  // Check current count
  const current = await getSpotlightCards();

  if (current.length >= 5) {
    return {
      success: false,
      error: "Maximum of 5 spotlight cards allowed. Please delete one first.",
    };
  }

  const { data, error } = await supabase
    .from("spotlight_cards")
    .insert([card])
    .select()
    .single();

  if (error) {
    console.error("Error adding spotlight card:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Update a spotlight card
 */
export async function updateSpotlightCard(
  id: string,
  updates: SpotlightCardUpdate,
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("spotlight_cards")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating spotlight card:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a spotlight card
 */
export async function deleteSpotlightCard(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("spotlight_cards")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting spotlight card:", error);
    return { success: false, error: error.message };
  }

  // Reorder remaining cards
  const cards = await getSpotlightCards();
  const reorderPromises = cards.map((card, index) =>
    updateSpotlightCard(card.id, { display_order: index + 1 }),
  );

  await Promise.all(reorderPromises);

  return { success: true };
}

/**
 * Reorder spotlight cards
 */
export async function reorderSpotlightCards(
  cardIds: string[],
): Promise<{ success: boolean; error?: string }> {
  const updatePromises = cardIds.map((id, index) =>
    updateSpotlightCard(id, { display_order: index + 1 }),
  );

  try {
    await Promise.all(updatePromises);
    return { success: true };
  } catch (error: any) {
    console.error("Error reordering spotlight cards:", error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Upcoming Event Management
// ============================================

/**
 * Get the active upcoming event
 */
export async function getUpcomingEvent(): Promise<UpcomingEvent | null> {
  const { data, error } = await supabase
    .from("upcoming_event")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching upcoming event:", error);
    return null;
  }

  return data;
}

/**
 * Get all upcoming events (including inactive)
 */
export async function getAllUpcomingEvents(): Promise<UpcomingEvent[]> {
  const { data, error } = await supabase
    .from("upcoming_event")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all upcoming events:", error);
    return [];
  }

  return data || [];
}

/**
 * Add a new upcoming event (deactivates previous events)
 */
export async function addUpcomingEvent(
  event: UpcomingEventInsert,
): Promise<{ success: boolean; error?: string; data?: UpcomingEvent }> {
  // Deactivate all existing events first
  await supabase
    .from("upcoming_event")
    .update({ is_active: false })
    .eq("is_active", true);

  // Insert new event as active
  const { data, error } = await supabase
    .from("upcoming_event")
    .insert([{ ...event, is_active: true }])
    .select()
    .single();

  if (error) {
    console.error("Error adding upcoming event:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Update an upcoming event
 */
export async function updateUpcomingEvent(
  id: string,
  updates: UpcomingEventUpdate,
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("upcoming_event")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating upcoming event:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete an upcoming event
 */
export async function deleteUpcomingEvent(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("upcoming_event")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting upcoming event:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Set an event as active (deactivates others)
 */
export async function setActiveEvent(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  // Deactivate all events
  await supabase
    .from("upcoming_event")
    .update({ is_active: false })
    .eq("is_active", true);

  // Activate the selected event
  const { error } = await supabase
    .from("upcoming_event")
    .update({ is_active: true })
    .eq("id", id);

  if (error) {
    console.error("Error setting active event:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
