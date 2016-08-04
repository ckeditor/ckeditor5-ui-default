/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

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

		const list = this.addCollection( 'list' );

		list.bind( model.items ).as( ListItem, ListItemView );
		list.pipe( 'execute' ).to( model );
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
 * @observable
 * @member {utils.Collection.<ui.list.ListItemModel>} ui.list.ListModel#items
 */

/**
 * Fired when the list should be executed, usually when
 * one of the list items has been executed.
 *
 * @event ui.list.ListModel#execute
 */
