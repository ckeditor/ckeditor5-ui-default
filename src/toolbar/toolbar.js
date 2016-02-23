/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import CoreToolbar from '../../core/ui/toolbar/toolbar.js';

/**
 * The editor toolbar controller class.
 *
 * @memberOf ui-default.toolbar
 * @extends core.ui.toolbar.Toolbar
 */

export default class Toolbar extends CoreToolbar {
	/**
	 * Creates a new toolbar instance.
	 *
	 * @param {core.Editor} editor
	 * @param {core.ui.Model} model
	 * @param {core.ui.View} view
	 */
	constructor( editor, model, view ) {
		super( model, view );

		this.editor = editor;
	}

	/**
	 * Adds buttons to the toolbar. Buttons are taken from the {@link core.editorUI.EditorUI#featureComponents}
	 * factory.
	 *
	 * @param {String[]} buttons The name of the buttons to add to the toolbar.
	 */
	addButtons( buttons ) {
		for ( let button of buttons ) {
			this.add( 'buttons', this.editor.ui.featureComponents.create( button ) );
		}
	}
}
