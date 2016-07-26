/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Toolbar from '../toolbar.js';

/**
 * The sticky toolbar controller class.
 *
 *		const model = new Model( {
 *			isActive: false
 *		} );
 *
 *		// An instance of StickyToolbar.
 *		new StickyToolbar( model, new StickyToolbarView() );
 *
 * See {@link ui.stickyToolbar.StickyToolbarView}.
 *
 * @memberOf ui.stickyToolbar
 * @extends ui.Controller
 */
export default class StickyToolbar extends Toolbar {
	/**
	 * Creates an instance of {@link ui.stickyToolbar.StickyToolbar} class.
	 *
	 * @param {ui.stickyToolbar.StickyToolbarModel} model Model of this sticky toolbar.
	 * @param {ui.View} view View of this sticky toolbar.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'isActive' ).to( model );
	}
}

/**
 * The sticky toolbar component {@link ui.Model} interface.
 *
 * @interface ui.stickyToobar.StickyToolbarModel
 */

/**
 * Controls whether the sticky toolbar should be active. When any editable
 * is focused in the editor, toolbar becomes active.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarModel#isActive
 */
