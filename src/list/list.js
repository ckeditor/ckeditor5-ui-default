/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

import ListItemView from './listitemview.js';

/**
 * The basic list controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */

export default class List extends Controller {
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'list' ) );
	}

	init() {
		// Initially populate with children from model.items.
		for ( let itemModel of this.model.items ) {
			this._addListItem( itemModel );
		}

		// Synchronize adding to model.items collection with child controllers.
		this.model.items.on( 'add', ( evt, itemModel, index ) => {
			this._addListItem( itemModel, index );
		} );

		// Synchronize removal from model.items collection with child controllers.
		this.model.items.on( 'remove', ( evt, itemModel ) => {
			this.remove( 'list', itemModel );
		} );

		return super.init();
	}

	_addListItem( itemModel, index ) {
		const view = new ListItemView( itemModel );

		this.listenTo( view, 'click', () => {
			this.model.fire( 'execute', itemModel );
		} );

		this.add( 'list', new Controller( itemModel, view ), index );
	}
}
