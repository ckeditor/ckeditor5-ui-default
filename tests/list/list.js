/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, list */

import testUtils from '/tests/ckeditor5/_utils/utils.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

import Collection from '/ckeditor5/utils/collection.js';
import Controller from '/ckeditor5/ui/controller.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'List', () => {
	let model, list, items, itemFoo, itemBar;

	beforeEach( () => {
		itemFoo = new Model( { label: 'foo', style: 'foostyle' } );
		itemBar = new Model( { label: 'bar', style: 'barstyle' } );

		items = new Collection( { idProperty: 'label' } );

		model = new Model( {
			items: items
		} );

		list = new List( model, new ListView() );
	} );

	describe( 'constructor', () => {
		it( 'creates list collection', () => {
			expect( list.collections ).to.have.length( 1 );
			expect( list.collections.get( 'list' ) ).to.be.instanceof( ControllerCollection );
		} );
	} );

	describe( 'init', () => {
		it( 'fills the "list" collection with model#items', () => {
			const listCollection = list.collections.get( 'list' );

			items.add( itemFoo );
			list.init();
			items.add( itemBar );

			expect( listCollection ).to.have.length( 2 );
			expect( listCollection.get( 0 ).model ).to.equal( itemFoo );
			expect( listCollection.get( 1 ).model ).to.equal( itemBar );
		} );

		it( 'binds the "list" collection to model#items', () => {
			const listCollection = list.collections.get( 'list' );

			items.add( itemFoo );
			list.init();
			items.add( itemBar );

			const removed = items.remove( 1 );

			items.add( removed, 0 );

			expect( listCollection.get( 0 ).model ).to.equal( itemBar );
			expect( listCollection.get( 1 ).model ).to.equal( itemFoo );
		} );

		it( 'calls super.init()', () => {
			const spy = testUtils.sinon.spy( Controller.prototype, 'init' );

			list.init();

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'creates a bridge between itemModel#execute and model#execute events', ( done ) => {
			model.on( 'execute', ( evt, itemModel ) => {
				expect( itemModel.label ).to.equal( 'foo' );

				done();
			} );

			return list.init().then( () => {
				items.add( itemFoo );
				items.add( itemBar );

				itemFoo.fire( 'execute' );
			} );
		} );

		it( 'deactivates a bridge between itemModel#execute and model#execute events', () => {
			const clicked = {
				foo: 0,
				bar: 0
			};

			model.on( 'execute', ( evt, itemModel ) => {
				clicked[ itemModel.label ]++;
			} );

			return list.init().then( () => {
				items.add( itemFoo );
				items.add( itemBar );

				itemFoo.fire( 'execute' );
				itemBar.fire( 'execute' );

				items.remove( itemFoo );

				itemFoo.fire( 'execute' );
				itemBar.fire( 'execute' );

				expect( clicked.foo ).to.equal( 1 );
				expect( clicked.bar ).to.equal( 2 );
			} );
		} );
	} );
} );
