"use strict";
import * as vscode from "vscode";

//  Get vscode config
function getConfig(isEditor: boolean)
{
    if (isEditor)
        return vscode.workspace.getConfiguration("editor");
    return vscode.workspace.getConfiguration("terminal.integrated");
}

//  Apply Font Size
function applyFontSize(applyToEditor: boolean, fontSize: number)
{
    if (isNaN(fontSize))
        vscode.window.showErrorMessage("Invalid font size!");
    else
        getConfig(applyToEditor).update("fontSize", fontSize, true);
}

//   Parse a font string into an array
function parseFontString(fontString: String): Array<string>
{
    fontString = fontString.replace(/\s*,\s*/g, ",");
    return fontString.split(",");
}

//  Set the editor or terminal fontFamily string to the current selection
function applyFontFamily(selection: any, applyToEditor = false) 
{
    getConfig(applyToEditor).update("fontFamily", selection, true);
}

//  Show an input box for font size
function selectFontSize(applyToEditor: boolean)
{
    const currentFontSize = getConfig(applyToEditor).get<number>("fontSize");
    const target = applyToEditor ? "Editor" : "Terminal";
    vscode.window.showInputBox({
        prompt: `Enter ${target} Font Size`,
        value: currentFontSize ? currentFontSize.toString() : ""
    }).then(value =>
    {
        if (value)
            applyFontSize(applyToEditor, Number.parseInt(value));
    });
}

//  Show a quick pick menu for selecting font
async function selectFont(applyToEditor: boolean)
{
    const fontSwitcherConfig = vscode.workspace.getConfiguration("font-switcher");
    const targetConfig = getConfig(applyToEditor);  
    const target = applyToEditor ? "Editor" : "Terminal";

    //   Determine what setting the user wants to use
    //   By default, the fontString is received from the editor.fontFamily
    //   User has to manually set the font-switcher.enableLivePreview to true
    const oldFontString = targetConfig.fontFamily;
    const oldFontArray = parseFontString(oldFontString);
    let selectionString = "";

    if (fontSwitcherConfig.enableLivePreview)
    {
        // Show the picker and display the currently selected font
        await vscode.window.showQuickPick(oldFontArray, {
            placeHolder: `Select ${target} Font (Up/Down Keys for Preview)`,
            onDidSelectItem: selection => applyFontFamily(selection, applyToEditor)
        }).then(selection => selectionString = selection? selection : "");
    }
    else
    {
        // Show the picker but don't update on selection.
        await vscode.window.showQuickPick(oldFontArray, {
            placeHolder: `Select ${target} Font`
        }).then(selection => selectionString = selection? selection : "");
    }

    const index = oldFontArray.indexOf(selectionString);
    if (index !== -1)
    {
        oldFontArray.splice(index, 1);
        oldFontArray.splice(0, 0, selectionString);
        const newFontString = oldFontArray.join(", ");
        targetConfig.update("fontFamily", newFontString, true);
    }
    else //user cancelled, so apply the original settings
        targetConfig.update("fontFamily", oldFontString, true);
}


export function activate(context: vscode.ExtensionContext) 
{
    //console.log('Congratulations, your extension "font-switcher" is now active!');

    vscode.commands.registerCommand("extension.switchFont", () => selectFont(true));
    vscode.commands.registerCommand("extension.setFontSize", () => selectFontSize(true));
    vscode.commands.registerCommand("extension.switchTerminalFont", () => selectFont(false));
    vscode.commands.registerCommand("extension.setTerminalFontSize", () => selectFontSize(false));
}


export function deactivate() { }
