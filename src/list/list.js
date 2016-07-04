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
 * The list controller class.
 *
 *		const itemsCollection = new Collection();
 *
 *		itemsCollection.add( new Model( { label: 'foo' } ) );
 *		itemsCollection.add( new Model( { label: 'bar' } ) );
 *
 *		const model = new Model( {
 *			items: itemsCollection
 *		} );
 *
 *		// An instance of List filled up with the `itemsCollection`.
 *		// Any change to `itemsCollection` will be reflected in DOM.
 *		new List( model, new ListView() );
 *
 * See {@link ui.list.ListView}, {@link ui.list.ListItem}.
 *
 * @memberOf ui.list
 * @extends ui.Controller
 */
export default class List extends Controller {
	/**
	 * Creates an instance of {@link ui.list.List} class.
	 *
	 * @param {ui.list.ListModel} model Model of this list.
	 * @param {ui.View} view View of this list.
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
	 * between item view and the list.
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
	 * between item view and the list.
	 *
	 * @protected
	 * @param {utils.Observable} itemModel
	 */
	_removeListItem( itemModel ) {
		this.stopListening( itemModel, 'execute' );

		this.remove( 'list', itemModel.label );
	}
}

/**
 * The list component {@link ui.Model} interface.
 *
 * @interface ui.list.ListModel
 */

/**
 * The collection of {@link ui.list.ListItemModel} instances to be rendered.
 * Any change in the collection (add, remove) is reflected in the DOM associated
 * with this component.
 *
 * @member {utils.Collection.<ui.list.ListItemModel>} ui.list.ListModel#items
 */
