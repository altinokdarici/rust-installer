import { install } from "rust-installer-tool";
import packageJson from "./package.json" assert { type: "json" };

export async function installRust() {
  const rustVersion = packageJson.version;
  console.log(`Installing Rust ${rustVersion}...`);

  await install(packageJson.version);

  console.log(`Rust ${rustVersion} installed!`);
}
