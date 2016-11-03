/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document, Event */
/* bender-tags: ui, dropdown */

import ListDropdown from 'ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from 'ckeditor5/ui/dropdown/list/listdropdownview.js';
import Model from 'ckeditor5/ui/model.js';
import Collection from 'ckeditor5/utils/collection.js';

describe( 'ListDropdownView', () => {
	let model, dropdown, view;

	beforeEach( () => {
		model = new Model( {
			isEnabled: true,
			content: new Model( {
				items: new Collection()
			} ),
			isOn: false,
			label: 'foo'
		} );

		view = new ListDropdownView();
		dropdown = new ListDropdown( model, view );

		return dropdown.init().then( () => {
			document.body.appendChild( view.element );
		} );
	} );

	describe( 'constructor', () => {
		it( 'listens to model#isOn and reacts to DOM events (valid target)', () => {
			// Open the dropdown.
			view.isOpen = true;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 2 );

			// Fire event from outside of the dropdown.
			document.body.dispatchEvent( new Event( 'click', {
				bubbles: true
			} ) );

			// Closed the dropdown.
			expect( view.isOpen ).to.be.false;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 1 );

			// Fire event from outside of the dropdown.
			document.body.dispatchEvent( new Event( 'click', {
				bubbles: true
			} ) );

			// Dropdown is still closed.
			expect( view.isOpen ).to.be.false;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 1 );
		} );

		it( 'listens to model#isOn and reacts to DOM events (invalid target)', () => {
			// Open the dropdown.
			view.isOpen = true;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 2 );

			// Event from view.element should be discarded.
			view.element.dispatchEvent( new Event( 'click', {
				bubbles: true
			} ) );

			// Dropdown is still open.
			expect( view.isOpen ).to.be.true;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 2 );

			// Event from within view.element should be discarded.
			const child = document.createElement( 'div' );
			view.element.appendChild( child );

			child.dispatchEvent( new Event( 'click', {
				bubbles: true
			} ) );

			// Dropdown is still open.
			expect( view.isOpen ).to.be.true;
			expect( Object.keys( view._listeningTo ) ).to.have.length( 2 );
		} );
	} );
} );
