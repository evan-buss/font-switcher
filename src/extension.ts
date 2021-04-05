"use strict";
import * as vscode from "vscode";
import { selectFont, selectFontSize } from "./features";

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.commands.registerCommand("font-switcher.switchFont", () => selectFont("Editor")),
        vscode.commands.registerCommand("font-switcher.setFontSize", () => selectFontSize("Editor")),
        vscode.commands.registerCommand("font-switcher.switchTerminalFont", () => selectFont("Terminal")),
        vscode.commands.registerCommand("font-switcher.setTerminalFontSize", () => selectFontSize("Terminal"))
    );
}

export function deactivate() { }