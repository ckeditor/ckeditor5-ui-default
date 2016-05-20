/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Dropdown from '../dropdown.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

/**
 * The basic list dropdown controller class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Controller
 */

export default class ListDropdown extends Dropdown {
	constructor( model, view ) {
		super( model, view );

		const content = this.model.content;

		content.on( 'execute', () => {
			this.close();
		} );

		this.panel.add( 'content', new List( content, new ListView( content ) ) );
	}
}
