/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

describe( 'DropdownPanel', () => {
	let panel;

	beforeEach( () => {
		panel = new DropdownPanel( null );
	} );

	describe( 'constructor', () => {
		it( 'creates "content" collection', () => {
			expect( panel.collections.get( 'content' ) ).to.be.instanceof( ControllerCollection );
		} );
	} );
} );
