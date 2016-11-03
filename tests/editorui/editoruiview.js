/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

<<<<<<< HEAD
/* globals document */

import EditorUIView from 'ckeditor5/ui/editorui/editoruiview.js';
=======
import testUtils from '/tests/core/_utils/utils.js';
import Editor from '/ckeditor5/core/editor/editor.js';
import EditorUIView from '/ckeditor5/ui/editorui/editoruiview.js';
import ComponentFactory from '/ckeditor5/ui/componentfactory.js';
import ViewCollection from '/ckeditor5/ui/viewcollection.js';

testUtils.createSinonSandbox();
>>>>>>> Refactoring in *EditorUIView classes and tests.

describe( 'EditorUIView', () => {
	let view, editor, locale;

	beforeEach( () => {
		editor = new Editor();
		locale = { t() {} };
		view = new EditorUIView( editor, locale );

		return view.init();
	} );

<<<<<<< HEAD
	describe( 'constructor()', () => {
		it( 'creates the body region', () => {
			const el = editorUIView.regions.get( 'body' ).element;
=======
	describe( 'constructor', () => {
		it( 'accepts locale', () => {
			expect( view.locale ).to.equal( locale );
		} );
>>>>>>> Refactoring in *EditorUIView classes and tests.

		it( 'sets all the properties', () => {
			expect( view ).to.have.property( 'editor', editor );
			expect( view.featureComponents ).to.be.instanceof( ComponentFactory );
			expect( view.body ).to.be.instanceof( ViewCollection );
		} );

		it( 'sets the right class set to the body region', () => {
			const el = view._bodyCollectionContainer;

			expect( el.classList.contains( 'ck-body' ) ).to.be.true;
			expect( el.classList.contains( 'ck-rounded-corners' ) ).to.be.true;
			expect( el.classList.contains( 'ck-reset_all' ) ).to.be.true;
		} );
	} );

	describe( 'init', () => {
		it( 'calls view#_setupIconManager', () => {
			view = new EditorUIView( editor, locale );
			const spy = testUtils.sinon.spy( view, '_setupIconManager' );

			return view.init().then( () => {
				expect( spy.calledOnce ).to.be.true;
			} );
		} );
	} );

	describe( 'view#_setupIconManager', () => {
		it( 'sets "icon" property', () => {
			view._setupIconManager();

			expect( view.icons ).to.be.an( 'array' );
			expect( view.icons ).to.not.be.empty;
		} );
	} );

	describe( 'destroy', () => {
		it( 'removes the body region container', () => {
			const el = view._bodyCollectionContainer;

			return view.destroy().then( () => {
				expect( el.parentNode ).to.be.null;
			} );
		} );
	} );
} );
