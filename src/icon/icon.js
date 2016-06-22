/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';

/**
 * The basic icon controller class.
 *
 * @memberOf ui.icon
 * @extends ui.Controller
 */
export default class Icon extends Controller {
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'name', 'align' ).to( model );
	}
}

/**
 * The basic icon model interface.
 *
 * @memberOf ui.icon
 * @interface ui.icon.IconModel
 */

/**
 * The name of the icon.
 *
 * @member {String} ui.icon.IconModel#name
 */

/**
 * The alignment of the icon.
 *
 * @member {'LEFT'|'RIGHT'} ui.icon.IconModel#align
 */
