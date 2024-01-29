import { type } from "os";

export function getOperatingSystem() {
  const platform = type().toLowerCase();
  switch (platform) {
    case "darwin":
      return "apple-darwin";
    case "linux":
      return "unknown-linux-gnu";
    case "windows":
      return "pc-windows-msvc";
    default:
      throw new Error(`Unsupported OS: ${platform}`);
  }
}
