"use strict";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "font-switcher" is now active!');

  let disposable = vscode.commands.registerCommand(
    "extension.switchFont",
    () => {
      let fontSwitcherConfig = vscode.workspace.getConfiguration(
        "font-switcher"
      );
      let editorConfig = vscode.workspace.getConfiguration("editor");

      //   Determine what setting the user wants to use
      //   By default, the fontString is received from the editor.fontFamily
      //   User has to manually set the font-switcher.enableLivePreview to true
      let fontString: String;
      if (fontSwitcherConfig.enableLivePreview) {
        fontString = fontSwitcherConfig.fontFamily; // get custom setting string
        let fontArray = parseFontString(fontString); // convert to array

        // Show the picker and display the currently selected font
        vscode.window
          .showQuickPick(fontArray, {
            placeHolder: "Select Editor Font (Up/Down Keys for Preview)",
            onDidSelectItem: selection => applyFont(selection)
          })
          .then(selection => {
            applyFont(selection);
          });
      } else {
        //   User wishes to use the existing switcher
        fontString = editorConfig.fontFamily;
        let fontArray = parseFontString(fontString);

        // Show the picker but don't update on selection.
        vscode.window
          .showQuickPick(fontArray, {
            placeHolder: "Select Editor Font"
          })
          .then(selection => {
            if (selection) {
              var index = fontArray.indexOf(selection);
              fontArray.splice(index, 1);
              fontArray.splice(0, 0, selection);
              fontString = fontArray.join(", ");
              editorConfig.update("fontFamily", fontString, true);
            }
          });
      }
    }
  );

  context.subscriptions.push(disposable);
}
//   Parse a font string into an array
function parseFontString(fontString: String): Array<string> {
  fontString = fontString.replace(/\s*,\s*/g, ",");
  return fontString.split(",");
}

// Set the editor.fontFamily string to the current selection
function applyFont(selection: any) {
  vscode.workspace
    .getConfiguration("editor")
    .update("fontFamily", selection, true);
}

export function deactivate() { }
