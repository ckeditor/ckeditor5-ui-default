/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { getEnvKeystrokeText } from '../../utils/keyboard.js';

/**
 * Creates an instance of {@link ui.button.ButtonView} class using
 * defined model.
 *
 * @param {ui.button.ButtonModel} model Model of this button.
 * @param {utils.Locale} locale The {@link core.editor.Editor#locale editor's locale} instance.
 * @returns {ui.button.ButtonView} The button view instance.
 */
export default function createButton( model, locale, ButtonView ) {
	const buttonView = new ButtonView( locale );

	buttonView.bind( 'label', 'isOn', 'isEnabled', 'withText', 'type', 'icon' ).to( model );
	buttonView.bind( 'title' ).to( model, 'label', model, 'keystroke', ( label, keystroke ) => {
		if ( keystroke ) {
			label += ` (${ getEnvKeystrokeText( keystroke ) })`;
		}

		return label;
	} );

	buttonView.on( 'click', () => model.fire( 'execute' ) );

	return buttonView;
}

/**
 * The button component {@link ui.Model} interface.
 *
 * @interface ui.button.ButtonModel
 */

/**
 * The label of the button visible to the user.
 * Also present in the button tooltip.
 *
 * @observable
 * @member {String} ui.button.ButtonModel#label
 */

/**
 * The HTML type of the button. Default `button`.
 *
 * @observable
 * @member {'button'|'submit'|'reset'|'menu'} ui.button.ButtonModel#type
 */

/**
 * Whether the button is "on" (e.g. some feature which this button represents is currently enabled).
 *
 * @observable
 * @member {Boolean} ui.button.ButtonModel#isOn
 */

/**
 * Controls whether the button is enabled (can be clicked).
 *
 * @observable
 * @member {Boolean} ui.button.ButtonModel#isEnabled
 */

/**
 * (Optional) Whether the label of the button is visible. At default the label is hidden (e.g. button with icon only).
 *
 * @observable
 * @member {Boolean} ui.button.ButtonModel#withText
 */

/**
 * (Optional) The name of the icon of the button.
 * See {@link ui.icon.Icon} and {@link ui.iconManager.IconManager}.
 *
 * @observable
 * @member {String} ui.button.ButtonModel#icon
 */

/**
 * (Optional) The keystroke associated with the button, i.e. <kbd>CTRL+B</kbd>,
 * in the string format compatible with {@link utils.keyboard}.
 *
 * @observable
 * @member {String} ui.button.ButtonModel#keystroke
 */
