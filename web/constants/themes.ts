export const THEMES = ["light", "dark", "light-contrast", "dark-contrast", "custom"];

export interface I_THEME_OPTION {
  value: string;
  label: string;
  type: string;
  icon: {
    border: string;
    color1: string;
    color2: string;
  };
}

export const THEME_OPTIONS: I_THEME_OPTION[] = [
  {
    value: "system",
    label: "System Preference",
    type: "light",
    icon: {
      border: "#DEE2E6",
      color1: "#FAFAFA",
      color2: "#f6ff00",
    },
  },
  {
    value: "light",
    label: "Light",
    type: "light",
    icon: {
      border: "#DEE2E6",
      color1: "#FAFAFA",
      color2: "#f6ff00",
    },
  },
  {
    value: "dark",
    label: "Dark",
    type: "dark",
    icon: {
      border: "#2E3234",
      color1: "#191B1B",
      color2: "#f6ff00",
    },
  },
  {
    value: "light-contrast",
    label: "Light High Contrast",
    type: "light",
    icon: {
      border: "#000000",
      color1: "#FFFFFF",
      color2: "#f6ff00",
    },
  },
  {
    value: "dark-contrast",
    label: "Dark High Contrast",
    type: "dark",
    icon: {
      border: "#FFFFFF",
      color1: "#030303",
      color2: "#f6ff00",
    },
  },
  {
    value: "custom",
    label: "Custom Theming",
    type: "light",
    icon: {
      border: "#FFC9C9",
      color1: "#FFF7F7",
      color2: "#FF5151",
    },
  },
];
