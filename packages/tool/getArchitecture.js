import { arch } from "os";

export function getArchitecture() {
  const architecture = arch();
  switch (architecture) {
    case "x64":
      return "x86_64";
    case "arm64":
      return "aarch64";
    default:
      throw new Error(`Unsupported architecture: ${architecture}`);
  }
}
