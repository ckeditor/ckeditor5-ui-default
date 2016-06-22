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
 * The basic button controller class.
 *
 * @memberOf ui.button
 * @extends ui.Controller
 */
export default class Button extends Controller {
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'label', 'isOn', 'isEnabled' ).to( model );

		if ( model.icon ) {
			view.model.bind( 'icon', 'iconAlign' ).to( model );
		}

		view.model.on( 'click', () => model.fire( 'execute' ) );
	}

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
 * The basic button model interface.
 *
 * @memberOf ui.button
 * @interface ui.button.ButtonModel
 */

/**
 * The label of the button.
 *
 * @member {String} ui.button.ButtonModel#label
 */

/**
 * Whether the button is "on" (e.g. some feature which this button represents is currently enabled).
 *
 * @member {Boolean} ui.button.ButtonModel#isOn
 */

/**
 * Whether the button is enabled (can be clicked).
 *
 * @member {Boolean} ui.button.ButtonModel#isEnabled
 */

/**
 * The icon of the button.
 *
 * @member {String} ui.button.ButtonModel#icon
 */

/**
 * The alignment of the button icon.
 *
 * @member {'LEFT'|'RIGHT'} ui.button.ButtonModel#iconAlign
 */

/**
 * Fired when the button action should be executed.
 *
 * @event ui.button.ButtonModel#execute
 */
