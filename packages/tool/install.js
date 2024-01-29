import axios from "axios";
import { mkdir, symlink } from "fs/promises";
import path from "path";
import { extract } from "tar";
import { fileURLToPath } from "url";
import { getArchitecture } from "./getArchitecture.js";
import { getOperatingSystem } from "./getOperatingSystem.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "https://static.rust-lang.org/dist";

async function downloadFile(url, destinationPath) {
  const response = await axios({ url, responseType: "stream" });
  return response.data.pipe(extract({ strip: 1, cwd: destinationPath }));
}

export async function install(version) {
  const nodeModulesPath = path.join(__dirname, "..", "node_modules");

  const os = getOperatingSystem();
  const binaryName = `rust-${version}-${getArchitecture()}-${os}`;
  const binaryUrl = `${url}/${binaryName}.tar.gz`;
  console.log("Binary URL", binaryUrl);

  const destinationFolderPath = path.join(nodeModulesPath, ".temp");
  const destinationPath = path.join(destinationFolderPath, binaryName);

  // Make sure that .temp directory exists
  await mkdir(destinationPath, { recursive: true });

  // Download the binary to .temp directory
  await downloadFile(binaryUrl, destinationPath);

  const dotBinPath = path.join(nodeModulesPath, ".bin");
  // Create .bin directory if it doesn't exist
  await mkdir(dotBinPath, { recursive: true });

  const extension = os == "pc-windows-msvc" ? ".exe" : "";

  await Promise.all([
    symlink(
      path.join(destinationPath, "cargo", "bin", `cargo${extension}`),
      path.join(dotBinPath, `cargo${extension}`),
    ),
    symlink(
      path.join(destinationPath, "rustc", "bin", `rustc${extension}`),
      path.join(dotBinPath, `rustc${extension}`),
    ),
    symlink(
      path.join(destinationPath, "rustc", "bin", `rustdoc${extension}`),
      path.join(dotBinPath, `rustdoc${extension}`),
    ),
  ]);
}
