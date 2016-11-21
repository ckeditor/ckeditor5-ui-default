/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Editor from 'ckeditor5/core/editor/editor.js';
import BoxedEditorUIView from 'ckeditor5/ui/editorui/boxed/boxededitoruiview.js';
import Locale from 'ckeditor5/utils/locale.js';
import ViewCollection from 'ckeditor5/ui/viewcollection.js';

describe( 'BoxedEditorUIView', () => {
	let view, element, editor;

	beforeEach( () => {
		editor = new Editor();
		view = new BoxedEditorUIView( new Locale( 'en' ) );
		element = view.element;

		return view.init();
	} );

	describe( 'constructor()', () => {
		it( 'adds view collections', () => {
			expect( view.top ).to.be.instanceof( ViewCollection );
			expect( view.main ).to.be.instanceof( ViewCollection );
		} );

		it( 'sets "width" and "height" attributes', () => {
			expect( view.width ).to.equal( null );
			expect( view.height ).to.equal( null );
		} );

		it( 'bootstraps the view element from template', () => {
			expect( view.element.classList.contains( 'ck-editor' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-reset' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-rounded-corners' ) ).to.be.true;
		} );

		it( 'setups accessibility of the view element', () => {
			expect( element.attributes.getNamedItem( 'aria-labelledby' ).value )
				.to.equal( view.element.firstChild.id )
				.to.match( /^ck-editor__aria-label_\w+$/ );
			expect( element.attributes.getNamedItem( 'role' ).value ).to.equal( 'application' );
			expect( element.attributes.getNamedItem( 'lang' ).value ).to.equal( 'en' );
		} );

		it( 'setups the voice label', () => {
			const firstChild = element.firstChild;

			expect( firstChild.className ).to.equal( 'ck-voice-label' );
			expect( firstChild.textContent ).to.equal( 'Rich Text Editor' );
		} );

		it( 'bootstraps the view collection elements from template', () => {
			expect( element.childNodes[ 1 ].classList.contains( 'ck-editor__top' ) ).to.be.true;
			expect( element.childNodes[ 2 ].classList.contains( 'ck-editor__main' ) ).to.be.true;
		} );

		it( 'setups accessibility of the view collection elements', () => {
			expect( element.childNodes[ 1 ].attributes.getNamedItem( 'role' ).value ).to.equal( 'presentation' );
			expect( element.childNodes[ 2 ].attributes.getNamedItem( 'role' ).value ).to.equal( 'presentation' );
		} );
	} );
} );
