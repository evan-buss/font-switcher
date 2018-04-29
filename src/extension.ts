'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "font-switcher" is now active!');

    let disposable = vscode.commands.registerCommand('extension.switchFont', () => {
        let globalConfig = vscode.workspace.getConfiguration();
        let fontString = globalConfig.editor.fontFamily;

        fontString = fontString.replace(/\s*,\s*/g, ",");
        var fontArray = fontString.split(",");

        vscode.window.showQuickPick(fontArray).then(selection => {
            if (selection) {
                var index = fontArray.indexOf(selection);
                fontArray.splice(index, 1);
                fontArray.splice(0, 0, selection);
                fontString = fontArray.join(", ");
                globalConfig.update("editor.fontFamily", fontString, true);
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}