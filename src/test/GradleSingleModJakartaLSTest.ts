import { TextEditor, EditorView, SideBarView, VSBrowser } from 'vscode-extension-tester';
import * as constants from './definitions/constants';
import * as utils from './utils/testUtils';
import * as path from 'path';
import * as assert from 'assert';

describe('LSP4Jakarta LS test for snippet test', () => {

    let editor: TextEditor;

    it('check if correct code is inserted when rest_class snippet is triggered',  async() => {
        const section = await new SideBarView().getContent().getSection(constants.GRADLE_PROJECT);
        await VSBrowser.instance.openResources(path.join(utils.getGradleProjectPath(), "src", "main", "java", "test", "gradle", "liberty", "web", "app", "SystemResource.java"));
        //editor.clear();
        editor = await new EditorView().openEditor('SystemResource.java') as TextEditor;
        editor.typeText("rest");

        //open the assistant
        const assist = await editor.toggleContentAssist(true);
		// toggle can return void, so we need to make sure the object is present
		if (assist) {
			// to select an item use
			await assist.select('rest_class')
		}

		// close the assistant
		await editor.toggleContentAssist(false);

        const insertedCode = await editor.getText();
        assert(insertedCode.includes('public String methodname() {'), 'Snippet rest_class was not inserted correctly.');
    }).timeout(275000);

});