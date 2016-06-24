/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';

/**
 * The ListItem controller class.
 *
 * @memberOf ui.list
 * @extends ui.Controller
 */
export default class ListItem extends Controller {
	/**
	 * Creates an instance of {@link ui.list.ListItem} class.
	 *
	 * @param {ui.list.ListItemModel} model Model of this ListItem.
	 * @param {ui.View} view View of this ListItem.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'label' ).to( model );

		if ( model.style ) {
			view.model.bind( 'style' ).to( model );
		}

		view.model.on( 'click', () => model.fire( 'execute' ) );
	}
}

/**
 * The ListItem component {@link ui.Model} interface.
 *
 * @memberOf ui.list
 * @interface ui.list.ListItemModel
 */

/**
 * The label of the item.
 *
 * @member {String} ui.list.ListItemModel#label
 */

/**
 * (Optional) The DOM style attribute of the item.
 *
 * @member {String} ui.list.ListItemModel#style
 */
