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
 *			isEnabled: true,
 *			inOn: false
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

		this._createButton();
		this._createPanel();
	}

	/**
	 * Creates {@link ui.dropdown.Dropdown#button} of this dropdown.
	 *
	 * @protected
	 */
	_createButton() {
		const model = this.model;
		const viewModel = this.view.model;
		const buttonModel = new Model();

		// Button needs a separate Model because otherwise it would fire #execute event
		// on the model shared between multiple Dropdowns (they would all open at the same time).
		buttonModel.bind( 'label', 'isOn', 'isEnabled' ).to( model );

		/**
		 * Button of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.button.Button} ui.dropdown.Dropdown#button
		 */
		this.add( 'main', this.button = new Button( buttonModel, new DropdownButtonView() ) );

		// When ui.dropdown.Dropdown#button is clicked switch the open/closed state of the Dropdown.
		this.listenTo( buttonModel, 'execute', () => viewModel.isOpen = !viewModel.isOpen );
	}

	/**
	 * Creates {@link ui.dropdown.Dropdown#panel} of this dropdown.
	 *
	 * @protected
	 */
	_createPanel() {
		const panelModel = new Model();

		panelModel.bind( 'isVisible' ).to( this.view.model, 'isOpen' );

		/**
		 * Panel of this Dropdown.
		 *
		 * @readonly
		 * @member {ui.dropdown.DropdownPanel} ui.dropdown.Dropdown#panel
		 */
		this.add( 'main', this.panel = new DropdownPanel( panelModel, new DropdownPanelView() ) );
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
 * Controls whether the {@link ui.dropdown.Dropdown#button} is "pushed".
 *
 * @member {Boolean} ui.dropdown.DropdownModel#isOn
 */

/**
 * Fired when the {@link ui.dropdown.Dropdown#button} is executed.
 *
 * See {@link ui.button.ButtonModel#execute}.
 *
 * @event ui.dropdown.DropdownModel#execute
 */

