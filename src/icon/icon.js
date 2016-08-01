/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The icon controller class.
 *
 *		const model = new Model( {
 *			name: 'bold'
 *		} );
 *
 *		// An instance of "bold" Icon.
 *		new Icon( model, new IconView() );
 *
 * See {@link ui.icon.IconView}, {@link ui.iconManager.IconManager}.
 *
 * @memberOf ui.icon
 * @extends ui.Controller
 */
export default class Icon extends Controller {
	/**
	 * Creates an instance of {@link ui.icon.Icon} class.
	 *
	 * @param {ui.icon.IconModel} model Model of this icon.
	 * @param {ui.View} view View of this icon.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'name' ).to( model );
	}
}

/**
 * The icon component {@link ui.Model} interface.
 *
 * @interface ui.icon.IconModel
 */

/**
 * The name of the icon. It corresponds with the name of the
 * file in the {@link ui.iconManager.IconManager}.
 *
 * @member {String} ui.icon.IconModel#name
 */
