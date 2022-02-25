import { commands, ExtensionContext } from "vscode";
import { CCVizzuPanel } from "./panels/CCVizzuPanel";

export function activate(context: ExtensionContext) {
  const showCommand = commands.registerCommand("ccVizzu.show", () => {
    CCVizzuPanel.render(context.extensionUri);
  });

  context.subscriptions.push(showCommand);
}
