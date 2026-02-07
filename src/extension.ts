"use strict";
import { commands, ExtensionContext } from "vscode";
import { selectFont, selectFontSize } from "./features";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("font-switcher.switchFont", () => selectFont("Editor")),
    commands.registerCommand("font-switcher.setFontSize", () => selectFontSize("Editor")),
    commands.registerCommand("font-switcher.switchTerminalFont", () => selectFont("Terminal")),
    commands.registerCommand("font-switcher.setTerminalFontSize", () => selectFontSize("Terminal"))
  );
}

export function deactivate() {}
