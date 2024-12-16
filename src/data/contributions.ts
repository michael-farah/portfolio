import type { Contribution } from "../types";

export const contributions: Contribution[] = [
  {
    repo: "open-chamber/openchamber-android",
    description: "Building the native Android client for OpenChamber — full Jetpack Compose implementation with MVVM architecture",
    url: "https://github.com/open-chamber/openchamber-android",
    type: "fork",
    technologies: ["Kotlin", "Jetpack Compose", "Android"],
  },
  {
    repo: "vercel-labs/agent-browser",
    description: "AI browser automation CLI for agents — contributed JSON Schema for config files",
    url: "https://github.com/vercel-labs/agent-browser",
    type: "pr",
    prCount: 1,
    technologies: ["TypeScript", "AI"],
  },
];
