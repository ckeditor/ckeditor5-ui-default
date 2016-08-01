/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The toolbar controller class.
 *
 *		const model = new Model();
 *
 *		// An instance of Toolbar.
 *		new Toolbar( model, new ToolbarView() );
 *
 * See {@link ui.toolbar.ToolbarView}.
 *
 * @memberOf ui.toolbar
 * @extends ui.Controller
 */
export default class Toolbar extends Controller {
	/**
	 * Creates an instance of {@link ui.toolbar.Toolbar} class.
	 *
	 * @param {ui.Model} model Model of this toolbar.
	 * @param {ui.View} view View of this toolbar.
	 */
	constructor( model, view ) {
		super( model, view );

		this.addCollection( 'buttons' );
	}
}
