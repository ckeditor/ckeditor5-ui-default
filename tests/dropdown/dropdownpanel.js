/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'DropdownPanel', () => {
	let panel, view, model;

	beforeEach( () => {
		model = new Model( {
			isOn: true
		} );
		view = new DropdownPanelView();
		panel = new DropdownPanel( model, view );
	} );

	describe( 'constructor', () => {
		it( 'creates "content" collection', () => {
			expect( panel.collections.get( 'content' ) ).to.be.instanceof( ControllerCollection );
		} );

		it( 'binds view#model attributes to the Button#model', () => {
			expect( view.model.isOn ).to.equal( model.isOn );
		} );
	} );
} );
