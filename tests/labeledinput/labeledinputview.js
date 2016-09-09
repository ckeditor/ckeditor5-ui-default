/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */
/* bender-tags: ui, input */

import LabeledInputView from '/ckeditor5/ui/labeledinput/labeledinputview.js';
import View from '/ckeditor5/ui/view.js';

describe( 'InputTextView', () => {
	let view;

	beforeEach( () => {
		view = new LabeledInputView();

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
		} );

		it( 'should register "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'focus', () => {
		it( 'should focus input element', () => {
			const labeledInputViewMock = createViewMock();
			labeledInputViewMock.focus = sinon.spy();

			// Input view is on the second position in the collection.
			view.regions.get( 'content' ).views.add( createViewMock() );
			view.regions.get( 'content' ).views.add( labeledInputViewMock );

			view.focus();

			expect( labeledInputViewMock.focus.calledOnce ).to.true;
		} );
	} );
} );

// Create base View mock.
function createViewMock() {
	const mock = new View();

	mock.element = document.createElement( 'div' );

	return mock;
}
