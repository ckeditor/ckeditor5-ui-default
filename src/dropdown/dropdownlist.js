/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

import DropdownListItemView from '/ckeditor5/ui/dropdown/dropdownlistitemview.js';

/**
 * The basic dropdown list controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */

export default class DropdownList extends Controller {
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'list' ) );
	}

	init() {
		for ( let itemModel of this.model.items ) {
			this._addListItem( itemModel );
		}

		this.model.items.on( 'add', ( evt, itemModel, index ) => {
			this._addListItem( itemModel, index );
		} );

		this.model.items.on( 'remove', ( evt, itemModel ) => {
			this.remove( 'list', itemModel );
		} );

		return super.init();
	}

	_addListItem( itemModel, index ) {
		this.add( 'list', new Controller( itemModel, new DropdownListItemView( itemModel ) ), index );
	}
}
