/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Model from '../model.js';
import Controller from '../controller.js';
import Icon from '../icon/icon.js';
import IconView from '../icon/iconview.js';
import { getEnvKeystrokeText } from '../../utils/keyboard.js';

/**
 * The button controller class. It uses {@link ui.icon.Icon} component
 * to display an icon.
 *
 *		const model = new Model( {
 *			label: 'Bold',
 *			isEnabled: true,
 *			isOn: false,
 *			icon: 'bold'
 *		} );
 *
 *		// An instance of Button with a label and an icon.
 *		new Button( model, new ButtonView() );
 *
 * See {@link ui.button.ButtonView}.
 *
 * @memberOf ui.button
 * @extends ui.Controller
 */
export default class Button extends Controller {
	/**
	 * Creates an instance of {@link ui.button.Button} class.
	 *
	 * @param {ui.button.ButtonModel} model Model of this Button.
	 * @param {ui.View} view View of this Button.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'label', 'isOn', 'isEnabled', 'withText', 'type' ).to( model );
		view.model.bind( 'title' ).to( model, 'label', model, 'keystroke', ( label, keystroke ) => {
			if ( keystroke ) {
				label += ` (${ getEnvKeystrokeText( keystroke ) })`;
			}

			return label;
		} );

		if ( model.icon ) {
			view.model.bind( 'icon' ).to( model );
		}

		view.model.on( 'click', () => model.fire( 'execute' ) );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		if ( this.model.icon ) {
			this.addCollection( 'children' );

			const iconModel = new Model();
			iconModel.bind( 'name' ).to( this.model, 'icon' );

			this.add( 'children', new Icon( iconModel, new IconView() ) );
		}

		return super.init();
	}
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

/**
 * Fired when the Button action should be executed, usually when
 * the view has been clicked.
 *
 * @event ui.button.ButtonModel#execute
 */
