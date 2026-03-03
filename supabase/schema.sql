-- Admin Content Management Tables for TCoEFS

-- 1. YouTube Video Table (stores the video below the counter)
CREATE TABLE IF NOT EXISTS youtube_video (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default video
INSERT INTO youtube_video (video_id)
VALUES ('katKpm79Zus')
ON CONFLICT DO NOTHING;

-- 2. Spotlight Cards Table (max 5 cards)
CREATE TABLE IF NOT EXISTS spotlight_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  video_id TEXT,
  full_content_title TEXT NOT NULL,
  full_content_text TEXT NOT NULL,
  full_content_details JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Create index on display_order for sorting
CREATE INDEX IF NOT EXISTS idx_spotlight_cards_display_order ON spotlight_cards(display_order);

-- Insert default spotlight cards
INSERT INTO spotlight_cards (title, description, image, images, video_id, full_content_title, full_content_text, full_content_details, display_order)
VALUES
  (
    'Four-Day Capacity Building Workshop Concludes',
    'TCoEFS successfully concludes transformational workshop focused on teaching, research, innovation excellence, and institutional sustainability.',
    '/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img1.webp',
    '["/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img1.webp", "/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img2.webp", "/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img3.webp", "/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img4.webp", "/news/tcoefs-concludes-capacity-building-workshop-day-four/images/img5.webp"]'::jsonb,
    'zRMCLGrrsR0',
    'TCoEFS Concludes Four-Day Capacity Building Workshop',
    'The TETFund Centre of Excellence in Food Security (TCoEFS), University of Jos, successfully concluded its Four-Day Capacity Building Workshop on Thursday, 25th September 2025, at Miango Rest Home, Jos, Plateau State. The final day focused on consolidation, networking, and action planning, marking the close of an intensive training and strategic realignment programme designed to reposition the Centre for greater institutional impact.\n\nDay Four featured interactive sessions on Monitoring and Evaluation (M&E), strategic planning, and thematic group presentations, where participants outlined actionable programmes and income-generating ideas aligned with the Centre''s mandate on teaching, research, innovation, and sustainability.\n\nEach thematic team presented its roadmap covering Agricultural Economics, Animal Sciences, Crop Sciences, and Environmental Sciences. A special virtual session was delivered by Professor Olukayode Akinyemi, Deputy Vice-Chancellor (Academic), FUNAAB, who emphasized the importance of collaboration across thematic areas, international partnerships, and focus on DLI-driven performance.\n\nThe workshop achieved over 90% participant satisfaction, with strong commendation for its relevance, quality of facilitation, and practical focus. Participants described the training as ''transformational,'' noting that it provided clarity, motivation, and strategic direction for the Centre''s next phase.',
    '["Four-day intensive workshop at Miango Rest Home (Sept 22-25, 2025)", "Focus on repositioning TCoEFS for teaching, research, and innovation excellence", "Thematic group presentations on postgraduate programmes and income generation", "Over 90% participant satisfaction with transformational outcomes", "Strategic commitment to DLI implementation and institutional sustainability"]'::jsonb,
    1
  ),
  (
    'A New Home for TCoEFS Laboratory',
    'University of Jos allocates a dedicated building for TCoEFS'' future laboratory facility.',
    '/spotlight-images/spotlight-card1/img1.png',
    '["/spotlight-images/spotlight-card1/img1.png", "/spotlight-images/spotlight-card1/img2.png", "/spotlight-images/spotlight-card1/img3.png"]'::jsonb,
    NULL,
    'A New Home for TCoEFS Laboratory',
    'The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, has taken a major step forward with the allocation of a dedicated building that will serve as the Centre''s future laboratory facility. In a recent inspection, the Vice-Chancellor of the University of Jos and the Deputy Administrator visited the building, reaffirming the University''s strong commitment to advancing research, innovation, and academic excellence. Although the facility is yet to be equipped, this development marks a significant milestone for TCoEFS. Once fully furnished with modern laboratory equipment, the building will become a hub for cutting-edge research, capacity building, and collaborative projects that address critical issues in food environments, nutrition, and public health. This milestone not only strengthens the University''s commitment to impactful research but also positions TCoEFS as a leading centre of excellence in food environment studies within Africa and globally.',
    '["Dedicated building allocated for TCoEFS'' future laboratory facility", "Leadership visit reaffirmed the University''s commitment to research and innovation", "Facility will support cutting-edge research, training, and collaboration", "Strengthens TCoEFS'' position as a leading Centre of Excellence"]'::jsonb,
    2
  ),
  (
    '4.9 hectares Allocated to TCoEFS',
    'University of Jos allocates 4.9 hectares to strengthen research, innovation, and sustainable development.',
    '/spotlight-images/spotlight-card2/greenhouse-facility.webp',
    '["/spotlight-images/spotlight-card2/greenhouse-facility.webp", "/spotlight-images/spotlight-card2/img1.png", "/spotlight-images/spotlight-card2/img2.png", "/spotlight-images/spotlight-card2/img3.png", "/spotlight-images/spotlight-card2/img4.png"]'::jsonb,
    NULL,
    '4.9 hectares Allocated to TCoEFS',
    'The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, has been allocated 4.9 hectares  of land by the University management. This strategic allocation reflects the University''s commitment to strengthening research capacity, innovation, and sustainable development.\n\nThe land will serve as a research and innovation hub, supporting activities such as:\n• Development of climate-smart agricultural practices.\n• Field-based experiments and demonstration projects.\n• Practical training for students and early-career researchers.\n• Collaborative initiatives with industry, policymakers, and communities.\n\nThis milestone provides TCoEFS with a unique platform to translate research into practice and to drive transformative solutions in food environments, nutrition, and public health.',
    '["Strategic 4.9 hectare of land allocation by University of Jos", "Supports field experiments, training, and demonstration projects", "Platform for climate-smart agriculture and innovation", "Enables deeper collaboration with industry and policymakers"]'::jsonb,
    3
  ),
  (
    'TETFund M&E Team Visits TCoEFS',
    'Monitoring and Evaluation visit highlights progress, engagement, and future plans.',
    '/spotlight-images/spotlight-card3/img1.png',
    '["/spotlight-images/spotlight-card3/img1.png", "/spotlight-images/spotlight-card3/img2.png", "/spotlight-images/spotlight-card3/img3.png"]'::jsonb,
    NULL,
    'TETFund M&E Team Visits TCoEFS',
    'The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, recently welcomed the Monitoring and Evaluation (M&E) team from the TETFund Head Office. The visit was part of TETFund''s continuous effort to ensure accountability, monitor progress, and support the effective implementation of its Centres of Excellence.\n\nDuring the visit, the team held interactive sessions with students of the Centre, who shared their experiences, learning opportunities, and aspirations for the future. This engagement provided valuable feedback on how the Centre is shaping academic and research capacity.\n\nThe M&E team also met with the Vice-Chancellor of the University of Jos and the Director of the Centre, who highlighted achievements so far, outlined ongoing projects, and discussed future plans for expanding the Centre''s impact. The discussions emphasized the University''s commitment to advancing TCoEFS as a hub for innovation, research, and policy engagement in food environment studies.\n\nIn their remarks, the TETFund team commended the progress recorded by the Centre and shared insights on strategies to further strengthen implementation and enhance collaboration. Their visit underscored the importance of accountability and forward-looking planning in sustaining the Centre''s growth.',
    '["Interactive sessions with students and leadership", "Progress review and forward plans for impact", "Strengthened accountability and collaboration pathways"]'::jsonb,
    4
  )
ON CONFLICT DO NOTHING;

-- 3. Upcoming Event Table (single active event)
CREATE TABLE IF NOT EXISTS upcoming_event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date_range TEXT NOT NULL,
  location TEXT NOT NULL,
  link TEXT DEFAULT 'https://blog.tcoefs-unijos.org',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default upcoming event
INSERT INTO upcoming_event (title, date_range, location, link, is_active)
VALUES (
  'USLGE and RSG Delegation Visit for SRDEP Evaluation',
  '12th - 17th October 2025',
  'Plateau State, Nigeria',
  'https://blog.tcoefs-unijos.org',
  true
)
ON CONFLICT DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_youtube_video_updated_at
  BEFORE UPDATE ON youtube_video
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spotlight_cards_updated_at
  BEFORE UPDATE ON spotlight_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_upcoming_event_updated_at
  BEFORE UPDATE ON upcoming_event
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 4. Newsletters Table
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  volume TEXT NOT NULL,
  issue TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Create index on display_order for sorting
CREATE INDEX IF NOT EXISTS idx_newsletters_display_order ON newsletters(display_order);

-- Create trigger for updated_at
CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE youtube_video ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE upcoming_event ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access on youtube_video"
  ON youtube_video FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on spotlight_cards"
  ON spotlight_cards FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on upcoming_event"
  ON upcoming_event FOR SELECT
  USING (true);

-- Authenticated users can insert/update/delete (admins will be filtered in app logic)
CREATE POLICY "Allow authenticated insert on youtube_video"
  ON youtube_video FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on youtube_video"
  ON youtube_video FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on spotlight_cards"
  ON spotlight_cards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on spotlight_cards"
  ON spotlight_cards FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on spotlight_cards"
  ON spotlight_cards FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on upcoming_event"
  ON upcoming_event FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on upcoming_event"
  ON upcoming_event FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on upcoming_event"
  ON upcoming_event FOR DELETE
  TO authenticated
  USING (true);

-- Newsletters policies
CREATE POLICY "Allow public read access on newsletters"
  ON newsletters FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert on newsletters"
  ON newsletters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on newsletters"
  ON newsletters FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on newsletters"
  ON newsletters FOR DELETE
  TO authenticated
  USING (true);

-- 5. Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  r2_key TEXT NOT NULL,
  year TEXT NOT NULL DEFAULT '2025',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_resources_display_order ON resources(display_order);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_is_featured ON resources(is_featured);

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on resources"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert on resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on resources"
  ON resources FOR DELETE
  TO authenticated
  USING (true);
