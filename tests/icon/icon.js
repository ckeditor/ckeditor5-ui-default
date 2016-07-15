/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, icon */

'use strict';

import Icon from '/ckeditor5/ui/icon/icon.js';
import IconView from '/ckeditor5/ui/icon/iconview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'Icon', () => {
	let model, icon, view;

	beforeEach( () => {
		model = new Model( {
			name: 'foo',
			align: 'right'
		} );

		view = new IconView();
		icon = new Icon( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the Icon#model', () => {
			expect( view.model.name ).to.equal( model.name );
			expect( view.model.align ).to.equal( model.align );
		} );
	} );
} );
