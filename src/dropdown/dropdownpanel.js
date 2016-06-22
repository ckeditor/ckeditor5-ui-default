/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';

/**
 * The basic dropdown panel controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */
export default class DropdownPanel extends Controller {
	/**
	 * @inheritDoc
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'isOn' ).to( model );

		this.collections.add( new ControllerCollection( 'content' ) );
	}
}
