/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Model from '../model.js';
import ButtonView from '../button/buttonview.js';
import DropdownView from './dropdownview.js';
import DropdownPanelView from './dropdownpanelview.js';

import createButton from '../button/createbutton.js';

/**
 * Creates an instance of {@link ui.dropdown.DropdownView} class using
 * defined model.
 *
 * @param {ui.dropdown.DropdownModel} model Model of this dropdown.
 * @param {utils.Locale} locale The {@link core.editor.Editor#locale editor's locale} instance.
 * @returns {ui.dropdown.DropdownView} The dropdown view instance.
 */
export default function createDropdown( model, locale ) {
	const buttonModel = new Model( {} );
	buttonModel.bind( 'label', 'isOn', 'isEnabled', 'withText', 'keystroke' ).to( model );

	const buttonView = createButton( buttonModel, locale, ButtonView );
	const panelView = new DropdownPanelView( locale );

	return new DropdownView( locale, buttonView, panelView );
}

/**
 * The basic dropdown model interface.
 *
 * @interface ui.dropdown.DropdownModel
 */

/**
 * The label of the dropdown.
 *
 * @observable
 * @member {String} ui.dropdown.DropdownModel#label
 */

/**
 * Controls whether the dropdown is enabled (can be clicked).
 *
 * @observable
 * @member {Boolean} ui.dropdown.DropdownModel#isEnabled
 */

/**
 * Controls whether the {@link ui.dropdown.DropdownView#buttonView} is "pushed".
 *
 * @observable
 * @member {Boolean} ui.dropdown.DropdownModel#isOn
 */

/**
 * (Optional) Whether the label of the dropdown is visible. See {@link ui.button.ButtonModel#withText}.
 *
 * @observable
 * @member {Boolean} ui.dropdown.DropdownModel#withText
 */
