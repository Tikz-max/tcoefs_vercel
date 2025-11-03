// Database types for TCoEFS Admin Content Management

export interface YouTubeVideo {
  id: string;
  video_id: string;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface SpotlightCard {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  video_id: string | null;
  full_content_title: string;
  full_content_text: string;
  full_content_details: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date_range: string;
  location: string;
  link: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

// Insert types (without auto-generated fields)
export interface YouTubeVideoInsert {
  video_id: string;
  updated_by?: string | null;
}

export interface SpotlightCardInsert {
  title: string;
  description: string;
  image: string;
  images?: string[];
  video_id?: string | null;
  full_content_title: string;
  full_content_text: string;
  full_content_details?: string[];
  display_order: number;
  updated_by?: string | null;
}

export interface UpcomingEventInsert {
  title: string;
  date_range: string;
  location: string;
  link?: string;
  is_active?: boolean;
  updated_by?: string | null;
}

// Update types (all fields optional except id)
export interface YouTubeVideoUpdate {
  video_id?: string;
  updated_by?: string | null;
}

export interface SpotlightCardUpdate {
  title?: string;
  description?: string;
  image?: string;
  images?: string[];
  video_id?: string | null;
  full_content_title?: string;
  full_content_text?: string;
  full_content_details?: string[];
  display_order?: number;
  updated_by?: string | null;
}

export interface UpcomingEventUpdate {
  title?: string;
  date_range?: string;
  location?: string;
  link?: string;
  is_active?: boolean;
  updated_by?: string | null;
}
