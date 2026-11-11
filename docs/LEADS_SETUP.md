# Lead storage setup (Supabase)

The enquiry form posts to Supabase's REST API with the **public anon key**. Until
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, the form validates but tells the
visitor honestly that the enquiry was NOT saved and offers WhatsApp instead.

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  company text not null check (char_length(company) between 1 and 160),
  phone text not null check (phone ~ '^\+91[6-9][0-9]{9}$'),
  email text check (char_length(email) <= 200),
  location text not null check (char_length(location) <= 200),
  plots text not null check (char_length(plots) <= 10),
  project_type text not null,
  has_layout text not null check (has_layout in ('yes','no')),
  notes text check (char_length(notes) <= 2000),
  language text not null,
  source_page text
);
alter table public.leads enable row level security;
-- Anonymous visitors may INSERT only. They cannot read leads.
create policy "anon can insert leads" on public.leads for insert to anon with check (true);
```

Read leads from the Supabase dashboard or a server using the service-role key (never in frontend code).

Spam protection in the app: hidden honeypot, minimum fill time, 60s client cooldown. For stronger
protection add Cloudflare Turnstile verified in a Supabase Edge Function and post through it.

## Other settings
See `.env.example`: video URL, WhatsApp number, contact details, site URL, GA4 / GTM / Meta Pixel IDs.
Hosting must rewrite `/hi` to `index.html` (a Netlify `_redirects` file is included).
