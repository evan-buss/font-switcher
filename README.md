# Font Switcher

Font Switcher allows you to quickly switch between fonts configured in your `settings.json` configuration file.

## Features

If you are like me, you are very indecisive about your font choices.

Font Switcher allows you to quickly switch your **editor** OR **terminal** font without having to manually reorder your `editor.fontFamily` or `terminal.integrated.fontFamily` setting. It also allows you to quickly change font size in the fly!

## Usage

Make sure you have a few different fonts defined in your `settings.json` file under `editor.fontFamily` and `terminal.integrated.fontFamily`

![font settings](https://github.com/evan-buss/font-switcher/blob/master/screenshots/EditorFontFamily.png)

### Switch Font Family
#### Switch Editor Font Family

<img src="https://github.com/evan-buss/font-switcher/blob/master/screenshots/ChangeEditorFont.gif?raw=true" alt="live preview menu in action for editor font" width="800">

#### Switch Integrated Terminal Font Family

<img src="https://github.com/evan-buss/font-switcher/blob/master/screenshots/ChangeTerminalFont.gif?raw=true" alt="live preview menu in action for terminal font" width="800">

### Change Font Size

#### Change Editor Font Size

<img src="https://github.com/evan-buss/font-switcher/blob/master/screenshots/ChangeEditorFontSize.gif?raw=true" alt="changing editor font size" width="800">

#### Change Integrated Terminal Font Size

<img src="https://github.com/evan-buss/font-switcher/blob/master/screenshots/ChangeTerminalFontSize.gif?raw=true" alt="changing terminal font size" width="800">

## Extension Settings

This extension contributes the following settings:

- `font-switcher.enableLivePreview`: Enable the live font preview functionality (enabled by default).

## Extension Commands

This extension contributes the following commands:

- `extension.switchFont`: Show a quickPick menu of the user defined editor font families.
- `extension.setFontSize`: Show an input dialog for setting the font size
- `extension.switchTerminalFont`: Show a quickPick menu of the user defined integrated terminal font families
- `extension.setTerminalFontSize`: Show an input dialog for setting the terminal font size