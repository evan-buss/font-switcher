# Font Switcher

 Font Switcher allows you to quickly configure your font settings from the command palette.

## Features

- Add / remove / reorder editor and terminal fonts.
    - Modifies the `editor.fontFamily` and `terminal.integrated.fontFamily` settings respectively.
- Adjust size of editor and terminal fonts.
    - Modifies the `editor.fontSize` and `terminal.integrated.fontSize` respectively.
- Automatically update `editor.fontLigature` for different fonts.
    - In `settings.json`, set `font-switcher.fontLigatures` to an object with the font family as the key and the ligature setting as the value. For example: `{ "Fira Code": "'ss01'", "JetBrains Mono": "'ss19'", __default__: false }`. `__default__` is used when the font family is not found in the object.

## Commands

### > Switch Font

![live preview menu in action for editor font](screenshots/ChangeEditorFont.gif)

### > Switch Terminal Font

![live preview menu in action for terminal font](screenshots/ChangeTerminalFont.gif)

### > Font Size

![changing editor font size](screenshots/ChangeEditorFontSize.gif)

### > Terminal Font Size

![changing terminal font size](screenshots/ChangeTerminalFontSize.gif)

## Extension Commands

This extension contributes the following commands:

- `font-switcher.switchFont`: Show a quickPick menu of the user defined editor font families.
- `font-switcher.setFontSize`: Show an input dialog for setting the font size
- `font-switcher.switchTerminalFont`: Show a quickPick menu of the user defined integrated terminal font families
- `font-switcher.setTerminalFontSize`: Show an input dialog for setting the terminal font size