import { Octokit } from "@octokit/core";

export async function getLatestRustVersion() {
  const octokit = new Octokit();

  const result = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner: "rust-lang",
    repo: "rust",
  });

  return result.data[0].tag_name;
}
