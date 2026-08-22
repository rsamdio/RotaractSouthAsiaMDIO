import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Colors & Accents")
        .schemaType("brandColor")
        .child(
          S.documentTypeList("brandColor")
            .title("Badge / Accent Colors")
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      S.listItem()
        .title("Tags")
        .schemaType("tag")
        .child(
          S.documentTypeList("tag")
            .title("Tags")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Stories")
        .schemaType("story")
        .child(S.documentTypeList("story").title("Stories").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.listItem()
        .title("Announcements")
        .schemaType("announcement")
        .child(
          S.documentTypeList("announcement")
            .title("Announcements")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("RSA Chronicles")
        .schemaType("chronicleEdition")
        .child(
          S.documentTypeList("chronicleEdition")
            .title("RSA Chronicles editions")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
      S.listItem()
        .title("Events")
        .schemaType("event")
        .child(
          S.documentTypeList("event")
            .title("Events")
            .defaultOrdering([{ field: "startDate", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Initiatives")
        .schemaType("programInitiative")
        .child(
          S.documentTypeList("programInitiative")
            .title("Initiatives")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
    ]);
