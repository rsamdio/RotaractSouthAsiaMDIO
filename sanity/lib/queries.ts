export const seoProjection = `seo {
  title,
  description,
  "ogImage": ogImage.asset->url
}`;

export const storiesQuery = `*[_type == "story"] | order(date desc) {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Story"),
  "tags": tags[]->title,
  "customColor": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#D41B69"),
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const storyBySlugQuery = `*[_type == "story" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Story"),
  "tags": tags[]->title,
  "customColor": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#D41B69"),
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const announcementsQuery = `*[_type == "announcement"] | order(date desc) {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Announcement"),
  "tags": tags[]->title,
  "customColor": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#17458F"),
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const announcementBySlugQuery = `*[_type == "announcement" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Announcement"),
  "tags": tags[]->title,
  "customColor": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#17458F"),
  excerpt,
  body,
  date,
  featured,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const chroniclesQuery = `*[_type == "chronicleEdition"] | order(date desc) {
  "slug": slug.current,
  editionName,
  date,
  preview,
  "heroImage": coverImage.asset->url,
  readerUrl,
  "customAccent": colorRef->hex
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
  "accent": "custom",
  "customAccent": coalesce(colorRef->hex, "#D41B69"),
  signature,
  registrationUrl,
  registrationLabel,
  "image": image.asset->url,
  ${seoProjection}
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
  "accent": "custom",
  "customAccent": coalesce(colorRef->hex, "#D41B69"),
  signature,
  registrationUrl,
  registrationLabel,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const programsQuery = `*[_type == "programInitiative"] | order(title asc) {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Program"),
  status,
  summary,
  livingNote,
  icon,
  "accent": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#D41B69"),
  body,
  featured,
  ctaLabel,
  ctaUrl,
  "image": image.asset->url,
  ${seoProjection}
}`;

export const programBySlugQuery = `*[_type == "programInitiative" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  "category": coalesce(categoryRef->title, "Program"),
  status,
  summary,
  livingNote,
  icon,
  "accent": coalesce(colorRef->hex, categoryRef->colorRef->hex, "#D41B69"),
  body,
  featured,
  ctaLabel,
  ctaUrl,
  "image": image.asset->url,
  ${seoProjection}
}`;
