/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';

/**
 * The DropdownPanel controller class.
 *
 *		const model = new Model( {
 *			isOn: false,
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
	 * @param {ui.dropdown.DropdownPanel} model Model of this DropdownPanel.
	 * @param {ui.View} view View of this DropdownPanel.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'isOn' ).to( model );

		this.collections.add( new ControllerCollection( 'content' ) );
	}
}

/**
 * The DropdownPanel model interface.
 *
 * @memberOf ui.dropdown
 * @interface ui.dropdown.DropdownPanelModel
 */

/**
 * Controls whether the DropdownPanel is "active", which means that the box is visible.
 *
 * @member {Boolean} ui.dropdown.DropdownPanelModel#isOn
 */
