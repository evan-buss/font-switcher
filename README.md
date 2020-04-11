# Font Switcher

Font Switcher allows you to quickly switch between fonts in your settings.json configuration file.

## Features

If you are like me, you are very indecisive about your font choices.

Font Switcher allows you to quickly switch your editor's font without having to manually reorder your `editor.fontFamily` setting.

With Font Switcher’s default settings, where live preview is turned off, the extension preserves the whole list of fonts in your `editor.fontFamily` setting, including the order of fonts you don’t switch to. For example, if your `editor.fontFamily` is `"Hack, Consolas, DejaVu Sans Mono, monospace"` and you switch the font to “DejaVu Sans Mono” using Font Switcher, your new `editor.fontFamily` will be `"DejaVu Sans Mono, Hack, Consolas, monospace"`. Those are the same four fonts in the same order, except that your chosen font has moved to the front.

After you set up and turn on Live Preview, your whole list of fonts is stored in a `font-switcher.fontFamily` setting, and the `editor.fontFamily` setting is set to just the font you chose.

## Usage

### **\*New\* Live Preview Font Switcher**

#### Setup

Enable the live preview setting in `settings.json`

Set the `font-switcher.fontFamily` settings to your desired fonts.

![font settings](https://i.imgur.com/Sn93UKk.png)

#### Demonstration

![live preview menu in action](https://i.imgur.com/ilB6LYv.gif)

### Static Font Switcher

This is the default setting because the live preview menu breaks existing functionality.

#### Setup

Make sure you have a few different fonts defined in your `settings.json` file under `editor.fontFamily`

![font settings](https://i.imgur.com/3nZpkup.png)

#### Usage

Simply open the command pallete `Ctrl+Shift+P` and select `Switch Font`.

![static menu in action](https://i.imgur.com/nhxH2uH.gif)

## Extension Settings

This extension contributes the following settings:

- `font-switcher.enableLivePreview`: Enable the new live preview menu functionality.
- `font-switcher.fontFamily`: Font string that holds your font options. This setting's value is only used when `font-switcher.enableLivePreview` is set to `true`.

## Extension Commands

This extension contributes the following commands:

- `extension.switchFont`: Show a quickPick menu of the user defined font families.

## Release Notes

### 3.1

Fix icon resolution.

### 3.0

Updated extension icon!

### 2.0

Added live preview functionality. User has to explicity enable this new setting.

### 1.0.3

Added preview using up/down keys (similar to the "Select Theme" behavior)

### 1.0.2

Fixed bug that would delete a font option if the menu was cancelled.

### 1.0.0

Initial release of Font Switcher
