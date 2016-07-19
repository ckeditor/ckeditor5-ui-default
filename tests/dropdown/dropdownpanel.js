/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'DropdownPanel', () => {
	let panel, model;

	beforeEach( () => {
		model = new Model( {
			isVisible: true
		} );
		panel = new DropdownPanel( model, new DropdownPanelView() );
	} );

	describe( 'constructor', () => {
		it( 'creates "content" collection', () => {
			expect( panel.collections.get( 'content' ) ).to.be.instanceof( ControllerCollection );
		} );

		it( 'binds view#model attributes to the DropdownPanel#model', () => {
			expect( panel.view.model.isVisble ).to.equal( model.isVisble );
		} );
	} );
} );
