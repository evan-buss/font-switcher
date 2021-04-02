# Font Switcher

Font Switcher allows you to quickly switch between fonts in your `settings.json` configuration file.

## Features

If you are like me, you are very indecisive about your font choices.

Font Switcher allows you to quickly switch your **editor** OR **terminal** font without having to manually reorder your `editor.fontFamily` or `terminal.integrated.fontFamily` setting. It also allows you to quickly change font size in the fly!

## Usage

### **\*New\* Live Preview Font Switcher**

Enable the live preview setting in `settings.json`

Set the `editor.fontFamily` to your desired fonts.

![live preview menu in action for editor font](https://i.imgur.com/ilB6LYv.gif)


![live preview menu in action for terminal font](https://github.com/HO-COOH/font-switcher/raw/master/screenshots/ChangeTerminalFont.gif)


![changing editor font size](https://github.com/HO-COOH/font-switcher/raw/master/screenshots/ChangeEditorFontSize.gif)


![changing terminal font size](https://github.com/HO-COOH/font-switcher/raw/master/screenshots/ChangeTerminalFontSize.gif)


### Static Font Switcher

This is the default setting because the live preview menu breaks existing functionality.

Make sure you have a few different fonts defined in your `settings.json` file under `editor.fontFamily` and `terminal.integrated.fontFamily`

![font settings](https://i.imgur.com/3nZpkup.png)

Simply open the command pallete `Ctrl+Shift+P` and select `Switch Font`.

![static menu in action](https://i.imgur.com/nhxH2uH.gif)

## Extension Settings

This extension contributes the following settings:

- `font-switcher.enableLivePreview`: Enable the new live preview menu functionality.

## Extension Commands

This extension contributes the following commands:

- `extension.switchFont`: Show a quickPick menu of the user defined editor font families.
- `extension.setFontSize`: Show an input dialog for setting the font size
- `extension.switchTerminalFont`: Show a quickPick menu of the user defined integrated terminal font families
- `extension.setTerminalFontSize`: Show an input dialog for setting the terminal font size