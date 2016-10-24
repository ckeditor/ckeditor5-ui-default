/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, list */

import testUtils from '/tests/core/_utils/utils.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

import Collection from '/ckeditor5/utils/collection.js';
import Controller from '/ckeditor5/ui/controller.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'List', () => {
	let model, list, items, itemFoo, itemBar, itemBaz;

	beforeEach( () => {
		itemFoo = new Model( { label: 'foo', style: 'foostyle' } );
		itemBar = new Model( { label: 'bar', style: 'barstyle' } );
		itemBaz = new Model( { label: 'baz', style: 'barstyle' } );

		items = new Collection( { idProperty: 'label' } );

		items.add( itemBaz );

		model = new Model( {
			items: items
		} );

		list = new List( model, new ListView() );
	} );

	describe( 'constructor', () => {
		it( 'creates list collection', () => {
			expect( list.collections ).to.have.length( 2 );
			expect( list.collections.get( 'list' ) ).to.be.instanceof( ControllerCollection );
		} );

		it( 'delegates ListItemModel#execute event to the model', ( done ) => {
			model.on( 'execute', ( evt ) => {
				expect( evt.source ).to.equal( itemBaz );
				expect( evt.path ).to.deep.equal( [ itemBaz, model ] );
				done();
			} );

			itemBaz.fire( 'execute' );
		} );
	} );

	describe( 'init', () => {
		it( 'fills the "list" collection with model#items', () => {
			const listCollection = list.collections.get( 'list' );

			items.add( itemFoo );
			list.init();
			items.add( itemBar );

			expect( listCollection ).to.have.length( 3 );
			expect( listCollection.get( 0 ).model ).to.equal( itemBaz );
			expect( listCollection.get( 1 ).model ).to.equal( itemFoo );
			expect( listCollection.get( 2 ).model ).to.equal( itemBar );
		} );

		it( 'binds the "list" collection to model#items', () => {
			const listCollection = list.collections.get( 'list' );

			items.add( itemFoo );
			list.init();
			items.add( itemBar );

			const removed = items.remove( 1 );

			items.add( removed, 0 );

			expect( listCollection.get( 0 ).model ).to.equal( itemFoo );
			expect( listCollection.get( 1 ).model ).to.equal( itemBaz );
			expect( listCollection.get( 2 ).model ).to.equal( itemBar );
		} );

		it( 'calls super.init()', () => {
			const spy = testUtils.sinon.spy( Controller.prototype, 'init' );

			list.init();

			expect( spy.calledOnce ).to.be.true;
		} );
	} );
} );
