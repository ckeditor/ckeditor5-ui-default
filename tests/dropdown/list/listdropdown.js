/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

import Collection from '/ckeditor5/utils/collection.js';
import Model from '/ckeditor5/ui/model.js';
import ListDropdown from '/ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from '/ckeditor5/ui/dropdown/list/listdropdownview.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

describe( 'ListDropdown', () => {
	let model, content, view, dropdown;

	beforeEach( () => {
		content = new Model( {
			items: new Collection()
		} );

		model = new Model( {
			isEnabled: true,
			content: content,
			isOn: false,
			label: 'foo'
		} );

		view = new ListDropdownView();
		dropdown = new ListDropdown( model, view );
	} );

	describe( 'constructor', () => {
		it( 'adds a list to the panel', () => {
			const contentCollection = dropdown.panel.collections.get( 'content' );

			expect( contentCollection ).to.have.length( 1 );

			expect( contentCollection.get( 0 ) ).to.be.instanceof( List );
			expect( contentCollection.get( 0 ).view ).to.be.instanceof( ListView );
			expect( contentCollection.get( 0 ).model ).to.equal( content );
		} );

		it( 'delegates model.content#execute to the model', ( done ) => {
			model.on( 'execute', ( evt ) => {
				expect( evt.source ).to.equal( content );
				expect( evt.path ).to.deep.equal( [ content, model ] );
				done();
			} );

			content.fire( 'execute' );
		} );

		it( 'changes view#isOpen on model#execute', () => {
			view.isOpen = true;

			model.fire( 'execute' );
			expect( view.isOpen ).to.be.false;

			model.fire( 'execute' );
			expect( view.isOpen ).to.be.false;
		} );
	} );
} );
