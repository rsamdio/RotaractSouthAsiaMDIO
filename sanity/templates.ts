import { Template } from "sanity";
import { standardColors, standardCategories, standardTags } from "@/config/news";

export const initialValueTemplates: Template[] = [
  ...standardColors.map((c, i) => ({
    id: `brandColor-preset-${i}`,
    title: `Badge Color: ${c.name}`,
    schemaType: "brandColor",
    value: {
      name: c.name,
      hex: c.hex,
      description: c.description,
    },
  })),
  ...standardCategories.map((cat, i) => ({
    id: `category-preset-${i}`,
    title: `Category: ${cat.title}`,
    schemaType: "category",
    value: {
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
    },
  })),
  ...standardTags.map((t, i) => ({
    id: `tag-preset-${i}`,
    title: `Tag: ${t.title}`,
    schemaType: "tag",
    value: {
      title: t.title,
      slug: { _type: "slug", current: t.slug },
    },
  })),
];
