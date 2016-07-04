/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Model from '../model.js';
import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';
import Icon from '../icon/icon.js';
import IconView from '../icon/iconview.js';

/**
 * The button controller class. It uses {@link ui.icon.Icon} component
 * to display an icon.
 *
 *		const model = new Model( {
 *			label: 'Bold',
 *			isEnabled: true,
 *			isOn: false,
 *			icon: 'bold',
 *			iconAlign: 'LEFT'
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

		view.model.bind( 'label', 'isOn', 'isEnabled' ).to( model );

		if ( model.icon ) {
			view.model.bind( 'icon', 'iconAlign' ).to( model );
		}

		view.model.on( 'click', () => model.fire( 'execute' ) );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		if ( this.model.icon ) {
			this.collections.add( new ControllerCollection( 'children' ) );

			const iconModel = new Model();
			iconModel.bind( 'name', 'align' ).to( this.model, 'icon', 'iconAlign' );

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
 *
 * @member {String} ui.button.ButtonModel#label
 */

/**
 * Whether the label of the button is hidden (e.g. button with icon only).
 *
 * @member {String} ui.button.ButtonModel#noText
 */

/**
 * Whether the button is "on" (e.g. some feature which this button represents is currently enabled).
 *
 * @member {Boolean} ui.button.ButtonModel#isOn
 */

/**
 * Controls whether the button is enabled (can be clicked).
 *
 * @member {Boolean} ui.button.ButtonModel#isEnabled
 */

/**
 * (Optional) The name of the icon of the button.
 * See {@link ui.icon.Icon} and {@link ui.iconManager.IconManager}.
 *
 * @member {String} ui.button.ButtonModel#icon
 */

/**
 * (Optional) The alignment of the Button icon.
 *
 * @member {'LEFT'|'RIGHT'} ui.button.ButtonModel#iconAlign
 */

/**
 * Fired when the Button action should be executed, usually when
 * the view has been clicked.
 *
 * @event ui.button.ButtonModel#execute
 */
