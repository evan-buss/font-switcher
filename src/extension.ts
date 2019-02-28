'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "font-switcher" is now active!');

    let disposable = vscode.commands.registerCommand('extension.switchFont', () => {
        let globalConfig = vscode.workspace.getConfiguration();
        let fontString = globalConfig.editor.fontFamily;

        fontString = fontString.replace(/\s*,\s*/g, ',');
        const fontArray = fontString.split(',');
        const currentFont = fontArray[0];

        vscode.window.showQuickPick(fontArray, {
            placeHolder: 'Select Editor Font (Up/Down Keys for Preview)',
            onDidSelectItem: (selection) => applyFont(selection, fontArray, globalConfig)
        }).then((selection) => {
            applyFont(selection || currentFont, fontArray, globalConfig);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}

function applyFont(selection, fontArray, globalConfig) {
    const index = fontArray.indexOf(selection);
    fontArray.splice(index, 1);
    fontArray.splice(0, 0, selection);

    const fontString = fontArray.join(', ');
    globalConfig.update('editor.fontFamily', fontString, true);
}
