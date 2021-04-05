"use strict";
import * as vscode from "vscode";

export type Target = "Editor" | "Terminal";

// Parse a font string into an array.
export function parseFontString(fontString: String): string[] {
    return fontString.replace(/\s*,\s*/g, ",").split(",");
}

// Get appropriate vscode config based on the Target.
export function getConfig(target: Target): vscode.WorkspaceConfiguration {
    if (target === "Editor") {
        return vscode.workspace.getConfiguration("editor");
    }
    return vscode.workspace.getConfiguration("terminal.integrated");
}

