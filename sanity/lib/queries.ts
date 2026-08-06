export const storiesQuery = `*[_type == "story"] | order(date desc) {
  "slug": slug.current,
  title,
  category,
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url
}`;

export const storyBySlugQuery = `*[_type == "story" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  category,
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url
}`;

export const announcementsQuery = `*[_type == "announcement"] | order(date desc) {
  "slug": slug.current,
  title,
  category,
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url
}`;

export const announcementBySlugQuery = `*[_type == "announcement" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  category,
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url
}`;

export const chroniclesQuery = `*[_type == "chronicleEdition"] | order(date desc) {
  "slug": slug.current,
  editionName,
  date,
  preview,
  "heroImage": coverImage.asset->url,
  readerUrl
}`;

export const eventsQuery = `*[_type == "event"] | order(startDate asc) {
  "slug": slug.current,
  title,
  tagline,
  description,
  body,
  startDate,
  endDate,
  startTime,
  endTime,
  timezoneLabel,
  location,
  venue,
  kind,
  accent,
  signature,
  registrationUrl,
  registrationLabel,
  "image": image.asset->url
}`;

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  tagline,
  description,
  body,
  startDate,
  endDate,
  startTime,
  endTime,
  timezoneLabel,
  location,
  venue,
  kind,
  accent,
  signature,
  registrationUrl,
  registrationLabel,
  "image": image.asset->url
}`;

export const programsQuery = `*[_type == "programInitiative"] | order(title asc) {
  "slug": slug.current,
  title,
  category,
  status,
  summary,
  livingNote,
  icon,
  accent,
  body,
  featured,
  ctaLabel,
  "image": image.asset->url
}`;

export const programBySlugQuery = `*[_type == "programInitiative" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  category,
  status,
  summary,
  livingNote,
  icon,
  accent,
  body,
  featured,
  ctaLabel,
  "image": image.asset->url
}`;
