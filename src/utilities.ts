"use strict";
import { workspace, WorkspaceConfiguration } from "vscode";

export type Target = "Editor" | "Terminal" | "FontLigatures";

// Parse a font string into an array.
export function parseFontString(fontString: String): string[] {
    return fontString.replace(/\s*,\s*/g, ",").split(",");
}

// Get appropriate vscode config based on the Target.
export function getConfig(target: Target): WorkspaceConfiguration {
    if (target === "Editor") {
        return workspace.getConfiguration("editor");
    }
    if (target === "Terminal") {
        return workspace.getConfiguration("terminal.integrated");
    }
    if (target === "FontLigatures") {
        return workspace.getConfiguration("font-switcher.fontLigatures");
    }
    return workspace.getConfiguration();
}
