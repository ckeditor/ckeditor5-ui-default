/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';

import ListItem from './listitem.js';
import ListItemView from './listitemview.js';

/**
 * The basic list controller class.
 *
 * @memberOf ui.list
 * @extends ui.Controller
 */
export default class List extends Controller {
	/**
	 * Creates a List instance.
	 *
	 * @param {utils.Observable} model
	 * @param {ui.View} view
	 */
	constructor( model, view ) {
		super( model, view );

		this.collections.add( new ControllerCollection( 'list' ) );
	}

	init() {
		// Initially populate "list" controller collection with children from model.items.
		for ( let itemModel of this.model.items ) {
			this._addListItem( itemModel );
		}

		// Synchronize adding to model#items collection with "list" controller collection.
		this.model.items.on( 'add', ( evt, itemModel, index ) => {
			this._addListItem( itemModel, index );
		} );

		// Synchronize removal from model#items collection with "list" controller collection.
		this.model.items.on( 'remove', ( evt, itemModel ) => {
			this._removeListItem( itemModel );
		} );

		return super.init();
	}

	/**
	 * Adds an item to "list" collection and activates event bubbling
	 * between item view and the List.
	 *
	 * @protected
	 * @param {utils.Observable} itemModel
	 * @param {Number} index
	 */
	_addListItem( itemModel, index ) {
		const listItemController = new ListItem( itemModel, new ListItemView() );

		// Save model#label in controller instance so it can be later
		// retrieved from "list" collection easily by that model.
		listItemController.id = itemModel.label;

		// TODO: Some event delegation?
		this.listenTo( itemModel, 'execute', () => {
			this.model.fire( 'execute', itemModel );
		} );

		this.add( 'list', listItemController, index );
	}

	/**
	 * Removes an item from "list" collection and deactivates event bubbling
	 * between item view and the List.
	 *
	 * @protected
	 * @param {utils.Observable} itemModel
	 */
	_removeListItem( itemModel ) {
		this.stopListening( itemModel, 'execute' );

		this.remove( 'list', itemModel.label );
	}
}
