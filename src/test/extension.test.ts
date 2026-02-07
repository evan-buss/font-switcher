import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { parseFontString } from "../utilities";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Test Font String Parsing", () => {
    const fontString = "Consolas, Hack, Ubuntu Mono";
    const fonts = parseFontString(fontString);

    assert.strictEqual("Consolas", fonts[0]);
    assert.strictEqual("Hack", fonts[1]);
    assert.strictEqual("Ubuntu Mono", fonts[2]);
    assert.strictEqual(3, fonts.length);
  });
});
