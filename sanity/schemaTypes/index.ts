import { story, announcement, chronicleEdition, event, programInitiative } from "./documents";
import { category, tag } from "./taxonomy";
import { brandColor } from "./brandColor";
import { seo } from "./seo";

export const schemaTypes = [
  seo,
  brandColor,
  category,
  tag,
  story,
  announcement,
  chronicleEdition,
  event,
  programInitiative,
];

