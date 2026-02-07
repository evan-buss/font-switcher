"use strict";
import { QuickPickItem, window } from "vscode";
import { getConfig, parseFontString, Target } from "./utilities";

interface FontMenuItem extends QuickPickItem {
  type: "font" | "button";
}

// Show a quick pick menu for selecting font
export async function selectFont(target: Target): Promise<void> {
  const targetConfig = getConfig(target);
  const existingFonts = parseFontString(targetConfig.fontFamily).filter((x) => !!x);

  // Construct quick pick menu options.
  const menuItems: FontMenuItem[] = [
    ...existingFonts.map((font) => <FontMenuItem>{ label: font, type: "font" }),
    { alwaysShow: true, label: "$(add) Add Font", type: "button" },
    { alwaysShow: true, label: "$(trash) Remove Font", type: "button" },
  ];

  // Show the picker and display the currently selected font
  const selection = await window.showQuickPick(menuItems, {
    placeHolder: `Select ${target} Font`,
    onDidSelectItem: (selection: FontMenuItem) => {
      // Show original settings if button. Otherwise show selected font.
      targetConfig.update(
        "fontFamily",
        selection.type === "button" ? targetConfig.fontFamily : selection.label,
        true
      );
    },
  });

  // User cancelled, so apply the original settings
  if (!selection) {
    targetConfig.update("fontFamily", targetConfig.fontFamily, true);
    return;
  }

  if (selection.type === "button") {
    // Reset to default when user selects a button.
    targetConfig.update("fontFamily", targetConfig.fontFamily, true);

    if (selection.label === "$(add) Add Font") {
      await addFont(target, existingFonts);
    } else if (selection.label === "$(trash) Remove Font") {
      await removeFont(target, existingFonts);
    }
    return;
  }

  const index = existingFonts.indexOf(selection.label);
  if (index !== -1) {
    existingFonts.splice(index, 1);
    existingFonts.splice(0, 0, selection.label);
    targetConfig.update("fontFamily", existingFonts.join(", "), true);
  }
}

// Show an input box for font size
export async function selectFontSize(target: Target): Promise<void> {
  const targetConfig = getConfig(target);
  const currentFontSize = targetConfig.get<number>("fontSize");
  const value = await window.showInputBox({
    prompt: `Enter ${target} Font Size`,
    value: currentFontSize ? currentFontSize.toString() : "",
  });

  if (value) {
    const fontSize = Number.parseInt(value);

    if (isNaN(fontSize)) {
      window.showErrorMessage("Invalid font size!");
    } else {
      targetConfig.update("fontSize", fontSize, true);
    }
  }
}

// Add a font to the fontFamily and set it as active.
export async function addFont(target: Target, fonts: string[]): Promise<void> {
  const fontFamily = await window.showInputBox({ placeHolder: "Font Name" });
  if (fontFamily) {
    getConfig(target).update("fontFamily", [fontFamily, ...fonts].join(", "), true);
  }
}

// Removes a font from the fontFamily.
export async function removeFont(target: Target, fonts: string[]): Promise<void> {
  const selection = await window.showQuickPick(fonts, {
    placeHolder: `Remove ${target} Font`,
  });

  if (!selection) {
    return;
  }

  getConfig(target).update("fontFamily", fonts.filter((x) => x !== selection).join(", "), true);
}
