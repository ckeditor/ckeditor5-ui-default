/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Model from '../model.js';
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
 *			isEnabled: true
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
		 * An internal Model interface shared between sub–components of the Dropdown.
		 *
		 * @member {ui.dropdown.DropdownSharedModel} ui.dropdown.Dropdown#sharedModel
		 */
		this.sharedModel = new Model( {
			isOn: false
		} );

		this.sharedModel.bind( 'isEnabled', 'label' ).to( model );

		/**
		 * Button of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.button.Button} ui.dropdown.Dropdown#button
		 */
		this.button = new Button( this.sharedModel, new DropdownButtonView() );

		/**
		 * Panel of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.dropdown.DropdownPanel} ui.dropdown.Dropdown#panel
		 */
		this.panel = new DropdownPanel( this.sharedModel, new DropdownPanelView() );

		// Execute event comes from ui.dropdown.Dropdown#button (see ui.button.ButtonModel#execute).
		this.listenTo( this.sharedModel, 'execute', ( evt, ...args ) => {
			// There's no point of reacting to user actions when the component is disabled.
			if ( this.sharedModel.isEnabled ) {
				// Switch the state of the Dropdown when the Button is clicked.
				this.sharedModel.isOn = !this.sharedModel.isOn;

				// Pass #execute event to the external Model interface.
				model.fire( 'execute', ...args );
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
 * @interface ui.dropdown.DropdownModel
 */

/**
 * The label of the Dropdown.
 *
 * @member {String} ui.dropdown.DropdownModel#label
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

/**
 * The shared Dropdown model interface.
 *
 * @memberOf ui.dropdown
 * @interface ui.dropdown.DropdownSharedModel
 */

/**
 * Controls whether the Dropdown is "active", which means that the {@link ui.dropdown.Dropdown#panel}
 * is visible and the {@link ui.dropdown.Dropdown#button} is "pushed".
 *
 * @member {Boolean} ui.dropdown.DropdownSharedModel#isOn
 */
