/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import Button from '../button/button.js';
import ControllerCollection from '../controllercollection.js';

import DropdownButtonView from './dropdownbuttonview.js';

import DropdownPanel from './dropdownpanel.js';
import DropdownPanelView from './dropdownpanelview.js';

/**
 * The Dropdown controller class.
 *
 *		const model = new Model( {
 *			label: 'Dropdown',
 *			isEnabled: true,
 *			isOn: false,
 *		} );
 *
 *		// An instance of Dropdown.
 *		new Dropdown( model, new DropdownView() );
 *
 * See {@link ui.dropdown.DropdownView}.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */
export default class Dropdown extends Controller {
	/**
	 * Creates an instance of {@link ui.dropdown.Dropdown} class.
	 *
	 * @param {ui.dropdown.DropdownModel} model Model of this Dropdown.
	 * @param {ui.View} view View of this Dropdown.
	 */
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'main' ) );

		/**
		 * Button of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.button.Button} ui.dropdown.Dropdown#button
		 */
		this.button = new Button( model, new DropdownButtonView() );

		/**
		 * Panel of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.dropdown.DropdownPanel} ui.dropdown.Dropdown#panel
		 */
		this.panel = new DropdownPanel( model, new DropdownPanelView() );

		// Execute event comes from ui.dropdown.Dropdown#button (see ui.button.ButtonModel#execute).
		this.listenTo( model, 'execute', () => {
			// There's no point of reacting to user actions when the component is disabled.
			if ( this.model.isEnabled ) {
				// Switch the state of the Dropdown when the Button is clicked.
				this.model.isOn = !this.model.isOn;
			}
		} );

		this.add( 'main', this.button );
		this.add( 'main', this.panel );
	}
}

/**
 * The basic Dropdown model interface.
 *
 * @memberOf ui.dropdown
 * @interface DropdownModel
 */

/**
 * The label of the Dropdown.
 *
 * @member {String} ui.dropdown.DropdownModel#label
 */

/**
 * Controls whether the Dropdown is "active", which means that the box with options is visible.
 *
 * @member {Boolean} ui.dropdown.DropdownModel#isOn
 */

/**
 * Controls whether the Dropdown is enabled (can be clicked).
 *
 * @member {Boolean} ui.dropdown.DropdownModel#isEnabled
 */

/**
 * Fired when the {@link ui.dropdown.Dropdown#button} is clicked.
 *
 * See {@link ui.button.ButtonModel#execute}.
 *
 * @event ui.dropdown.DropdownModel#execute
 */
