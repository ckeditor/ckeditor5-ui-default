/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import Button from '../button/button.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

import DropdownButtonView from './dropdownbuttonview.js';

import DropdownPanel from './dropdownpanel.js';
import DropdownPanelView from './dropdownpanelview.js';

/**
 * The basic dropdown controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */

export default class Dropdown extends Controller {
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'dropdown' ) );

		/**
		 * Button of this Dropdown.
		 *
		 * @member {ui.button.Button} ui.dropdown.Dropdown#button
		 */
		this.button = new Button( model, new DropdownButtonView( model ) );

		/**
		 * Panel of this Dropdown.
		 *
		 * @member {ui.dropdown.DropdownPanel} ui.dropdown.Dropdown#panel
		 */
		this.panel = new DropdownPanel( model, new DropdownPanelView( model ) );

		this.add( 'dropdown', this.button );
		this.add( 'dropdown', this.panel );
	}
}

/**
 * The basic dropdown model interface.
 *
 * @memberOf ui.dropdown
 * @interface DropdownModel
 */

/**
 * The label of the dropdown.
 *
 * @member {String} ui.dropdown.DropdownModel#label
 */

/**
 * Indicated whether the dropdown is "active", which means that the box with options is visible.
 *
 * @member {Boolean} ui.dropdown.DropdownModel#isOn
 */

/**
 * Whether the dropdown is enabled (can be clicked).
 *
 * @member {Boolean} ui.dropdown.DropdownModel#isEnabled
 */
