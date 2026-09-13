import { buildLegacyTheme, type StudioTheme } from "sanity";

type SelectableState = {
  bg?: string;
  border?: string;
  fg?: string;
  icon?: string;
  muted?: { fg?: string };
};

type SelectableTone = {
  selected?: SelectableState;
  pressed?: SelectableState;
  enabled?: SelectableState;
  hovered?: SelectableState;
  disabled?: SelectableState;
};

/**
 * Crimson selected rows need white muted text. Sanity's pressed state (list
 * item highlighted while the document pane is focused) uses a dark muted
 * magenta that disappears on the brand pink/crimson fill.
 */
function patchListSelectionContrast(theme: StudioTheme): StudioTheme {
  if (!theme.color) return theme;

  const schemes = [theme.color.light, theme.color.dark].filter(Boolean);

  for (const scheme of schemes) {
    for (const tone of Object.values(scheme)) {
      const selectable = (
        tone as { selectable?: Record<string, SelectableTone> } | undefined
      )?.selectable;
      if (!selectable) continue;

      for (const states of Object.values(selectable)) {
        if (!states?.selected && !states?.pressed) continue;

        if (states.selected?.muted) {
          states.selected.muted.fg = "#ffffff";
        }

        if (states.pressed && states.selected) {
          states.pressed.bg = states.selected.bg;
          states.pressed.border = states.selected.border;
          states.pressed.fg = states.selected.fg;
          states.pressed.icon = states.selected.icon;
          if (states.pressed.muted) {
            states.pressed.muted.fg = "#ffffff";
          }
        } else if (states.pressed?.muted) {
          states.pressed.muted.fg = "#ffffff";
        }
      }
    }
  }

  return theme;
}

const legacy = buildLegacyTheme({
  "--black": "#0B1426",
  "--white": "#ffffff",
  /* Darker muted gray so idle list subtitles stay readable on ice white */
  "--gray": "#334155",
  "--gray-base": "#334155",
  "--component-bg": "#FAFAF8",
  "--component-text-color": "#0B1426",
  "--brand-primary": "#D41B69",
  "--default-button-color": "#475569",
  "--default-button-primary-color": "#D41B69",
  "--state-info-color": "#17458F",
  "--state-success-color": "#0f766e",
  "--state-warning-color": "#F7A81B",
  "--state-danger-color": "#D41B69",
  "--main-navigation-color": "#0B1426",
  "--main-navigation-color--inverted": "#ffffff",
  "--focus-color": "#D41B69",
});

export const brandTheme = patchListSelectionContrast(legacy);
