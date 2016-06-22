/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, list */

'use strict';

import ListItem from '/ckeditor5/ui/list/listitem.js';
import ListItemView from '/ckeditor5/ui/list/listitemview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'ListItem', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			style: 'foo',
			label: 'bar'
		} );

		view = new ListItemView( model );

		return new ListItem( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the Button#model', () => {
			expect( view.model.label ).to.equal( model.label );
			expect( view.model.style ).to.equal( model.style );
		} );
	} );
} );
