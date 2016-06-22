/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, list */

'use strict';

import testUtils from '/tests/ckeditor5/_utils/utils.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';
import ListItemView from '/ckeditor5/ui/list/listitemview.js';

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
	} );

	describe( '_addListItem', () => {
		it( 'adds a new controller to "list" collection', () => {
			const listCollection = list.collections.get( 'list' );

			list._addListItem( new Model( { label: 'baz', style: 'bazstyle' } ) );
			list._addListItem( new Model( { label: 'qux', style: 'quxstyle' } ), 0 );

			expect( listCollection ).to.have.length( 2 );
			expect( listCollection.get( 0 ).model.label ).to.equal( 'qux' );
			expect( listCollection.get( 1 ).model.label ).to.equal( 'baz' );

			expect( listCollection.get( 0 ).view ).to.be.instanceof( ListItemView );
		} );

		it( 'creates a bridge between "click" on item model and model#execute', ( done ) => {
			model.on( 'execute', ( evt, itemModel ) => {
				expect( itemModel.label ).to.equal( 'foo' );

				done();
			} );

			return list.init().then( () => {
				items.add( itemFoo );
				items.add( itemBar );

				itemFoo.fire( 'click' );
			} );
		} );
	} );

	describe( '_removeListItem', () => {
		it( 'removes a controller from "list" collection', () => {
			const listCollection = list.collections.get( 'list' );
			const itemBaz = new Model( { label: 'baz', style: 'bazstyle' } );
			const itemQux = new Model( { label: 'qux', style: 'quxstyle' } );

			list._addListItem( itemBaz );
			list._addListItem( itemQux );

			expect( listCollection ).to.have.length( 2 );

			list._removeListItem( itemBaz );

			expect( listCollection ).to.have.length( 1 );
			expect( listCollection.get( 0 ).model.label ).to.equal( 'qux' );
		} );

		it( 'deactivates a bridge between "click" on item model and model#execute', () => {
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

				itemFoo.fire( 'click' );
				itemBar.fire( 'click' );

				items.remove( itemFoo );

				itemFoo.fire( 'click' );
				itemBar.fire( 'click' );

				expect( clicked.foo ).to.equal( 1 );
				expect( clicked.bar ).to.equal( 2 );
			} );
		} );
	} );
} );
