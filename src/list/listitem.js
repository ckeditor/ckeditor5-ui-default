/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';

/**
 * The basic list item controller class.
 *
 * @memberOf ui.list
 * @extends ui.Controller
 */
export default class ListItem extends Controller {
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'style', 'label' ).to( model );
	}
}

/**
 * The basic list item model interface.
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
 * The DOM style attribute of the item.
 *
 * @member {String} ui.list.ListItemModel#style
 */
