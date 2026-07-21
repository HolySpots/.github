-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.achievements (
  name text NOT NULL UNIQUE,
  description text,
  icon_url text,
  criteria jsonb,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT achievements_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cities (
  name_eng text,
  name jsonb NOT NULL,
  info jsonb,
  spots_count integer,
  routes_count integer,
  events_count integer,
  country uuid,
  images jsonb,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  favorites_count bigint DEFAULT 0,
  CONSTRAINT cities_pkey PRIMARY KEY (id),
  CONSTRAINT new_cities_country_fkey FOREIGN KEY (country) REFERENCES public.countries(id)
);
CREATE TABLE public.comment_likes (
  user_id uuid NOT NULL,
  comment_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comment_likes_pkey PRIMARY KEY (user_id, comment_id),
  CONSTRAINT comment_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id),
  CONSTRAINT comment_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.comments (
  user_id uuid,
  entity_type text NOT NULL CHECK (entity_type = ANY (ARRAY['city'::text, 'place'::text, 'route'::text, 'event'::text])),
  entity_id uuid NOT NULL,
  text text NOT NULL,
  photo_url ARRAY,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.countries (
  name jsonb NOT NULL,
  info jsonb,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  images ARRAY DEFAULT ARRAY[]::text[],
  cities_count integer DEFAULT 0,
  CONSTRAINT countries_pkey PRIMARY KEY (id)
);
CREATE TABLE public.documents (
  content text,
  metadata jsonb,
  embedding USER-DEFINED,
  id bigint NOT NULL DEFAULT nextval('documents_id_seq'::regclass),
  CONSTRAINT documents_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events (
  name jsonb NOT NULL,
  info jsonb,
  type text,
  time timestamp with time zone,
  images jsonb,
  city_id uuid,
  event_category text,
  culture text,
  end_time timestamp with time zone,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  has_online_stream boolean DEFAULT false,
  views_count integer NOT NULL DEFAULT 0,
  favorites_count integer NOT NULL DEFAULT 0,
  status USER-DEFINED DEFAULT 'draft'::event_status,
  contact_info text,
  registration_deadline timestamp with time zone,
  capacity integer,
  price text,
  teacher_info text,
  location_details text,
  requirements ARRAY,
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id)
);
CREATE TABLE public.goals (
  user_id uuid NOT NULL,
  title text NOT NULL,
  start_date date,
  end_date date,
  total_duration interval,
  total_distance numeric,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  priority integer DEFAULT 3 CHECK (priority >= 1 AND priority <= 5),
  status text DEFAULT 'planned'::text CHECK (status = ANY (ARRAY['planned'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])),
  cities jsonb,
  places jsonb,
  routes jsonb,
  events jsonb,
  total_items integer,
  completion_percentage numeric DEFAULT 0,
  visited_items integer DEFAULT 0,
  last_updated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  planned_items jsonb,
  CONSTRAINT goals_pkey PRIMARY KEY (id),
  CONSTRAINT goals_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.guru_plans (
  user_id uuid,
  title text,
  planned_event_items jsonb,
  start_date date,
  end_date date,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT guru_plans_pkey PRIMARY KEY (id),
  CONSTRAINT guru_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.language (
  code character varying NOT NULL UNIQUE,
  name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT language_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  avatar_url text,
  cities_like ARRAY,
  routes_like ARRAY,
  events_like ARRAY,
  places_like ARRAY,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.route_event (
  route_id uuid NOT NULL,
  event_id uuid NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT route_event_pkey PRIMARY KEY (route_id, event_id),
  CONSTRAINT route_event_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id),
  CONSTRAINT route_event_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id)
);
CREATE TABLE public.routes (
  type text,
  city_id ARRAY,
  name jsonb NOT NULL,
  info jsonb,
  images jsonb,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  CONSTRAINT routes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.x_sm_bot_users (
  telegram_ID numeric,
  name text,
  surname text,
  user text,
  lang text,
  status text,
  guideline integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT x_sm_bot_users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.x_sm_guidelines (
  text text,
  author text,
  topic text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT x_sm_guidelines_pkey PRIMARY KEY (id)
);
CREATE TABLE public.spot_event (
  spot_id uuid NOT NULL,
  event_id uuid NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT spot_event_pkey PRIMARY KEY (spot_id, event_id),
  CONSTRAINT spot_event_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id),
  CONSTRAINT spot_event_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.spots(id)
);
CREATE TABLE public.spot_route (
  spot_id uuid NOT NULL,
  route_id uuid NOT NULL,
  order integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT spot_route_pkey PRIMARY KEY (spot_id, route_id),
  CONSTRAINT spot_route_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id),
  CONSTRAINT spot_route_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.spots(id)
);
CREATE TABLE public.spots (
  name jsonb NOT NULL,
  city uuid,
  point USER-DEFINED,
  type bigint,
  id_old bigint,
  info jsonb,
  cityeng_old text,
  images jsonb,
  raiting numeric,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT spots_pkey PRIMARY KEY (id)
);
CREATE TABLE public.spots_backup (
  id bigint,
  created_at timestamp with time zone,
  city bigint,
  spotype smallint,
  orderby bigint,
  name jsonb,
  info jsonb,
  imagesdf jsonb,
  latitude double precision,
  longitude double precision,
  cityeng text,
  spotypeng text,
  coordinates jsonb,
  images ARRAY,
  uuid uuid,
  routes ARRAY,
  new_id uuid,
  city_uuid uuid
);
CREATE TABLE public.stories (
  entity_type text NOT NULL CHECK (entity_type = ANY (ARRAY['city'::text, 'place'::text, 'route'::text, 'event'::text])),
  entity_id uuid NOT NULL,
  text_content jsonb,
  audio_url jsonb,
  title jsonb,
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT stories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.titles (
  name jsonb,
  description jsonb,
  element text,
  img jsonb,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT titles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_achievements (
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT user_achievements_pkey PRIMARY KEY (id),
  CONSTRAINT user_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievements(id),
  CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.x_n8n_chat_histories (
  session_id character varying NOT NULL,
  message jsonb NOT NULL,
  id integer NOT NULL DEFAULT nextval('x_n8n_chat_histories_id_seq'::regclass),
  create timestamp with time zone DEFAULT now(),
  CONSTRAINT x_n8n_chat_histories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.x_sm_bot_payments (
  tm_payment_id text,
  provider_payment_id text,
  amount bigint,
  currency text,
  user_id bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT x_sm_bot_payments_pkey PRIMARY KEY (id)
);
CREATE TABLE public.route_track (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  point USER-DEFINED,
  route uuid,
  order bigint,
  CONSTRAINT route_track_pkey PRIMARY KEY (id)
);
CREATE TABLE public.x_sm_bot_doc (
  content text,
  metadata jsonb,
  embedding USER-DEFINED,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT x_sm_bot_doc_pkey PRIMARY KEY (id)
);
CREATE TABLE public.x_sm_books_3072 (
  content text,
  metadata jsonb,
  embedding USER-DEFINED,
  id bigint NOT NULL DEFAULT nextval('x_sm_books_3072_id_seq'::regclass),
  CONSTRAINT x_sm_books_3072_pkey PRIMARY KEY (id)
);