/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The box controller class.
 *
 * 		const model = new Model( {
 *			alignRight: true,
 *		} );
 *
 *		new Box( model, new BoxView() );
 *
 * See {@link ui.box.BoxView}.
 *
 * @memberOf ui.box
 * @extends ui.Controller
 */
export default class Box extends Controller {
	/**
	 * Creates an instance of {@link ui.box.Box} class.
	 *
	 * @param {ui.box.BoxModel} model Model of this box.
	 * @param {ui.View} view View of this box.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'alignRight' ).to( model );

		this.addCollection( 'content' );
	}
}

/**
 * The Box component {@link ui.Model model} interface.
 *
 * @interface ui.box.BoxModel
 */

/**
 * (Optional) When `true` then children will be aligned to the right. When `false` then alignment will be inherited.
 *
 * @observable
 * @member {Boolean} ui.box.BoxModel#alignRight
 */
