"use strict";
import { QuickPickItem, window, WorkspaceConfiguration } from "vscode";
import { getConfig, parseFontString, Target } from "./utilities";
import { getFonts } from 'font-list';

interface FontMenuItem extends QuickPickItem {
    type: "font" | "button";
}

// Reorder the array so that item becomes the first element
function reorderArray<T>(item: T, arr: T[]) {
    const index = arr.indexOf(item);
    if (index !== -1) {
        arr.splice(index, 1);
        arr.splice(0, 0, item);
    }
    else {
        arr.unshift(item);
    }
}

// Restore the original font setting
function restoreFonts(targetConfig: WorkspaceConfiguration) {
    targetConfig.update("fontFamily", targetConfig.fontFamily, true);
}

// Strip out any single quote and double quote in the string
function removeQuote(str: string): string {
    return str.replace(/\"/g, "").replace(/\'/g, "");
}

// Strip out any single quote and double quote in the font array
export async function preprocessFontString(target: Target): Promise<void> {
    await getConfig(target).update("fontFamily", removeQuote(getConfig(target).fontFamily), true);
}

// Show a quick pick menu for selecting font
export async function selectFont(target: Target): Promise<void> {
    await preprocessFontString(target);
    const targetConfig = getConfig(target);
    const existingFonts = parseFontString(targetConfig.fontFamily).filter(x => !!x);

    // Construct quick pick menu options.
    const menuItems: FontMenuItem[] = [
        ...existingFonts.map((font) => <FontMenuItem>{ label: font, type: "font" }),
        { alwaysShow: true, label: "$(add) Add Font", type: "button" },
        { alwaysShow: true, label: "$(trash) Remove Font", type: "button" }
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
        restoreFonts(targetConfig);
        return;
    }

    if (selection.type === "button") {
        // Reset to default when user selects a button.
        restoreFonts(targetConfig);

        if (selection.label === "$(add) Add Font") {
            await addFont(target, existingFonts);
        } else if (selection.label === "$(trash) Remove Font") {
            await removeFont(target, existingFonts);
        }
        return;
    }

    // Update the fonts setting, so selection becomes the first font in the array
    reorderArray(selection.label, existingFonts);
    targetConfig.update("fontFamily", existingFonts.join(", "), true);
}


// Show an input box for font size
export async function selectFontSize(target: Target): Promise<void> {
    const targetConfig = getConfig(target);
    const currentFontSize = targetConfig.get<number>("fontSize");
    const value = await window.showInputBox({
        prompt: `Enter ${target} Font Size`,
        value: currentFontSize ? currentFontSize.toString() : ""
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
    const targetConfig = getConfig(target);
    const fontFamily = await window.showQuickPick(await getFonts(), {
        onDidSelectItem: (selection) => {
            targetConfig.update(
                "fontFamily",
                selection,
                true
            );
        }
    });
    if (fontFamily) {
        const fontStripped = removeQuote(fontFamily);
        reorderArray(fontStripped, fonts);
        getConfig(target).update("fontFamily", fonts.join(", "), true);
    }
    else { // User cancelled, so restore the original
        restoreFonts(targetConfig);
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

    getConfig(target).update("fontFamily", fonts.filter(x => x !== selection).join(", "), true);
}
