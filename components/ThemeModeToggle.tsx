import { useTheme } from "next-themes";

import {
  useState,
  useEffect,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";

import { IconSun, IconMoon, IconSunMoon, IconProps } from "@tabler/icons-react";

const MODES = ["dark", "light", "system"];
type ThemeMode = (typeof MODES)[number];

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ThemeModeIconProps extends IconProps {
  mode: ThemeMode;
}

interface ThemeModeToggleProps extends ButtonProps {
  size?: number;
}

function ThemeModeIcon({ mode, ...props }: ThemeModeIconProps) {
  switch (mode) {
    case "dark":
      return <IconMoon {...props} />;
    case "light":
      return <IconSun {...props} />;
    case "system":
    default:
      return <IconSunMoon {...props} />;
  }
}

function ThemeModeToggle({ size = 16, ...props }: ThemeModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  function toggle() {
    setTheme(MODES[(MODES.indexOf(theme as ThemeMode) + 1) % MODES.length]);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button type="button" className="button">
        <IconSunMoon width={size} height={size} className="icon-outline" />
      </button>
    );
  }

  return (
    <button type="button" className="btn" onClick={toggle} {...props}>
      <ThemeModeIcon
        mode={theme as ThemeMode}
        className="icon-outline"
        title={`Toggle theme (${theme})`}
        width={size}
        height={size}
        suppressHydrationWarning
      />
    </button>
  );
}

export default ThemeModeToggle;
