import ThemeInitializer from "./components/ThemeInitializer";
import "./wc-theme.css";

export default function WalkingClosetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeInitializer />
      {children}
    </>
  );
}
