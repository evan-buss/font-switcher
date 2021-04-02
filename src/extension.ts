"use strict";
import * as vscode from "vscode";

type Target = "Editor" | "Terminal";

// Get vscode config
function getConfig(target: Target): vscode.WorkspaceConfiguration {
    if (target === "Editor") {
        return vscode.workspace.getConfiguration("editor");
    }
    return vscode.workspace.getConfiguration("terminal.integrated");
}

// Apply Font Size
function applyFontSize(target: Target, fontSize: number): void {
    if (isNaN(fontSize)) {
        vscode.window.showErrorMessage("Invalid font size!");
    } else {
        getConfig(target).update("fontSize", fontSize, true);
    }
}

// Parse a font string into an array
function parseFontString(fontString: String): string[] {
    fontString = fontString.replace(/\s*,\s*/g, ",");
    return fontString.split(",");
}

// Set the editor or terminal fontFamily string to the current selection
function applyFontFamily(target: Target, selection: any): void {
    getConfig(target).update("fontFamily", selection, true);
}

// Show an input box for font size
async function selectFontSize(target: Target): Promise<void> {
    const currentFontSize = getConfig(target).get<number>("fontSize");
    const value = await vscode.window.showInputBox({
        prompt: `Enter ${target} Font Size`,
        value: currentFontSize ? currentFontSize.toString() : ""
    })

    if (value) {
        applyFontSize(target, Number.parseInt(value));
    }
}

// Show a quick pick menu for selecting font
async function selectFont(target: Target): Promise<void> {
    const fontSwitcherConfig = vscode.workspace.getConfiguration("font-switcher");
    const targetConfig = getConfig(target);
    
    // Determine what setting the user wants to use
    // By default, the fontString is received from the editor.fontFamily
    // User has to manually set the font-switcher.enableLivePreview to true
    const oldFontString = targetConfig.fontFamily;
    const oldFontArray = parseFontString(oldFontString);
    let selection = "";

    if (fontSwitcherConfig.enableLivePreview) {
        // Show the picker and display the currently selected font
        selection = await vscode.window.showQuickPick(oldFontArray, {
            placeHolder: `Select ${target} Font (Up/Down Keys for Preview)`,
            onDidSelectItem: selection => applyFontFamily(target, selection)
        });
    } else {
        // Show the picker but don't update on selection.
        selection = await vscode.window.showQuickPick(oldFontArray, {
            placeHolder: `Select ${target} Font`
        });
    }

    if (!selection) {
        selection = "";
    }

    const index = oldFontArray.indexOf(selection);
    if (index !== -1) {
        oldFontArray.splice(index, 1);
        oldFontArray.splice(0, 0, selection);
        const newFontString = oldFontArray.join(", ");
        targetConfig.update("fontFamily", newFontString, true);
    } else {
        // User cancelled, so apply the original settings
        targetConfig.update("fontFamily", oldFontString, true);
    }
}

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.commands.registerCommand("extension.switchFont", () => selectFont("Editor")),
        vscode.commands.registerCommand("extension.setFontSize", () => selectFontSize("Editor")),
        vscode.commands.registerCommand("extension.switchTerminalFont", () => selectFont("Terminal")),
        vscode.commands.registerCommand("extension.setTerminalFontSize", () => selectFontSize("Terminal"))
    );
}

export function deactivate() { }
