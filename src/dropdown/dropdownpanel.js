/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

/**
 * The basic dropdown panel controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */

export default class DropdownPanel extends Controller {
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'content' ) );

		// debugger;
		this.add( 'content', model.content );
	}
}
