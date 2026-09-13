import { story, announcement, chronicleEdition, event, programInitiative } from "./documents";
import { category, tag, eventKind } from "./taxonomy";
import { brandColor } from "./brandColor";
import { seo } from "./seo";

export const schemaTypes = [
  seo,
  brandColor,
  category,
  tag,
  eventKind,
  story,
  announcement,
  chronicleEdition,
  event,
  programInitiative,
];

