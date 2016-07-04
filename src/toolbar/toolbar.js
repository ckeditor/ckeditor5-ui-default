/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';

/**
 * The Toolbar controller class.
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
	 * @param {ui.Model} model Model of this Toolbar.
	 * @param {ui.View} view View of this Toolbar.
	 */
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'buttons' ) );
	}
}
