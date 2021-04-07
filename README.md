# Font Switcher

## Description

If you are like me, you are very indecisive about your font choices. Font Switcher allows you to quickly configure your font settings.

## Features

- Add / remove / reorder editor and terminal fonts.
    - Modifies the `editor.fontFamily` and `terminal.integrated.fontFamily` settings respectively.
- Adjust size of editor and terminal fonts.
    - Modifies the `editor.fontSize` and `terminal.integrated.fontSize` respectively.

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