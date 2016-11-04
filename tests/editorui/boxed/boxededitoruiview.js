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
		view = new BoxedEditorUIView( editor, new Locale( 'en' ) );
		view.init();

		element = view.element;
	} );

	describe( 'constructor()', () => {
		it( 'adds controller collections', () => {
			expect( view.top ).to.be.instanceof( ViewCollection );
			expect( view.main ).to.be.instanceof( ViewCollection );
		} );

		it( 'sets "width" and "height" attributes', () => {
			expect( view.width ).to.equal( editor.config.get( 'ui.width' ) );
			expect( view.height ).to.equal( editor.config.get( 'ui.height' ) );
		} );

		it( 'bootstraps the view element from template', () => {
			expect( view.element.classList.contains( 'ck-editor' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-reset' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-rounded-corners' ) ).to.be.true;
		} );

		it( 'setups accessibility of the view element', () => {
			expect( element.attributes.getNamedItem( 'aria-labelledby' ).value ).to.equal(
				view.element.firstChild.id );
			expect( element.attributes.getNamedItem( 'role' ).value ).to.equal( 'application' );
			expect( element.attributes.getNamedItem( 'lang' ).value ).to.equal( 'en' );
		} );

		it( 'bootstraps the view region elements from template', () => {
			expect( element.childNodes[ 1 ].classList.contains( 'ck-editor__top' ) ).to.be.true;
			expect( element.childNodes[ 2 ].classList.contains( 'ck-editor__main' ) ).to.be.true;
		} );

		it( 'setups accessibility of the view region elements', () => {
			expect( element.childNodes[ 1 ].attributes.getNamedItem( 'role' ).value ).to.equal( 'presentation' );
			expect( element.childNodes[ 2 ].attributes.getNamedItem( 'role' ).value ).to.equal( 'presentation' );
		} );
	} );
} );
