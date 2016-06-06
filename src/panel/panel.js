/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';

/**
 * The basic panel controller class.
 *
 * @memberOf ui.panel
 * @extends ui.Controller
 */
export default class Panel extends Controller {
	/**
	 * Creates a Panel instance.
	 *
	 * @param {utils.Observable} model
	 * @param {ui.View} view
	 */
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'content' ) );
	}

}
