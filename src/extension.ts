import * as vs from 'vscode';
import { SfcsetSetting } from './setting';
import { getSfcText, getTestText } from './template';

const notValidName = new RegExp(/([^A-Z^a-z])/);

export function activate(context: vs.ExtensionContext) {
	
	
	const disposable = vs.commands.registerCommand('vue-sfc-set.createSet', (path: vs.Uri) => {
		const setting = vs.workspace.getConfiguration('sfcset');
		const createFile = (name: string) => {
			const ws = new vs.WorkspaceEdit();

			const sfcFilePath = vs.Uri.joinPath(path, `${name}.vue`);
			const testFilePath = vs.Uri.joinPath(path, `${name}.spec.${setting.sfcLang}`);

			ws.createFile(sfcFilePath, {overwrite: false, ignoreIfExists: true});
			ws.createFile(testFilePath, {overwrite: false, ignoreIfExists: true});

			ws.insert(sfcFilePath, new vs.Position(0, 0), getSfcText(name, setting as SfcsetSetting));
			ws.insert(testFilePath, new vs.Position(0, 0), getTestText(name));

			vs.workspace.applyEdit(ws);
		};

		const input = vs.window.createInputBox();
		input.placeholder = "Provide a Single File Component Name";
		input.onDidHide(() => input.dispose());
		input.onDidChangeValue((val) => {
			if(notValidName.test(val)){
				input.validationMessage = 'Name should only contain alphabet';
			} else {
				input.validationMessage = '';
			}
		});
		input.onDidAccept(() => {
			if(input.validationMessage){
				// ignore invalid
				return;
			}
			vs.window.showInformationMessage('Create sets: ' + input.value);
			createFile(input.value);
			input.hide();
		});
		input.show();
	});
	
	context.subscriptions.push(disposable);
}

export function deactivate() {
	// pass
}
