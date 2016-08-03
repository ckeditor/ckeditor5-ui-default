/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The dropdown panel controller class.
 *
 *		const model = new Model( {
 *			isVisible: false,
 *		} );
 *
 *		// An instance of DropdownPanelView.
 *		new DropdownPanel( model, new DropdownPanelView() );
 *
 * See {@link ui.dropdown.DropdownPanelView}.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */
export default class DropdownPanel extends Controller {
	/**
	 * Creates an instance of {@link ui.dropdown.DropdownPanel} class.
	 *
	 * @param {ui.dropdown.DropdownPanel} model Model of this dropdown panel.
	 * @param {ui.View} view View of this dropdown panel.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'isVisible' ).to( model );

		this.addCollection( 'content' );
	}
}

/**
 * The dropdown panel model interface.
 *
 * @interface ui.dropdown.DropdownPanelModel
 */

/**
 * Controls whether the panel is visible.
 *
 * @observable
 * @member {Boolean} ui.dropdown.DropdownPanelModel#isVisible
 */
