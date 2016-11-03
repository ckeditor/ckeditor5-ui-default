/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document */

import View from '../view.js';
import Template from '../template.js';
import ComponentFactory from '../componentfactory.js';
import IconManagerView from '../iconmanager/iconmanagerview.js';
import iconManagerModel from '../../../theme/iconmanagermodel.js';

/**
 * The editor UI view class. Base class for the editor main views.
 *
 * @memberOf ui.editorUI
 * @extends ui.View
 */
export default class EditorUIView extends View {
	/**
	 * Creates an instance of the editor UI view class.
	 *
	 * @param {utils.Locale} [locale] The {@link core.editor.Editor#locale editor's locale} instance.
	 */
	constructor( editor, locale ) {
		super( locale );

		/**
		 * Editor that the UI belongs to.
		 *
		 * @type {core.editor.Editor}
		 */
		this.editor = editor;

		/**
		 * @readonly
		 * @member {ui.ComponentFactory} ui.editorUI.EditorUIView#featureComponents
		 */
		this.featureComponents = new ComponentFactory( editor );

		this._createBodyRegion();

		/**
		 * Collection of the child views, detached from the DOM
		 * structure of the editor, like panels, icons etc.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.editorUI.EditorUIView#body
		 */

		/**
		 * Icons available in the UI.
		 *
		 * @observable
		 * @readonly
		 * @member {Array} ui.editorUI.EditorUIView#icons
		 */

		/**
		 * The element holding elements of the 'body' region.
		 *
		 * @private
		 * @member {HTMLElement} ui.editorUI.EditorUIView#_bodyCollectionContainer
		 */
	}

	/**
	 * Initializes EditorUIView instance.
	 *
	 * @returns {Promise}
	 */
	init() {
		return super.init().then(
			() => this._setupIconManager() );
	}

	/**
	 * TODO
	 */
	destroy() {
		this._bodyCollectionContainer.remove();
		this._bodyCollectionContainer = null;

		return super.destroy();
	}

	/**
	 * Creates and appends to `<body>` the 'body' region container.
	 *
	 * @private
	 */
	_createBodyRegion() {
		this.body = this.createCollection();

		const bodyElement = this._bodyCollectionContainer = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-body',
					'ck-rounded-corners',
					'ck-reset_all'
				]
			},
			children: this.body
		} ).render();

		document.body.appendChild( bodyElement );
	}

	/**
	 * Injects the {@link ui.iconManager.IconManager} into DOM.
	 *
	 * @protected
	 */
	_setupIconManager() {
		this.set( 'icons', iconManagerModel.icons );
		this.iconManagerView = new IconManagerView();
		this.iconManagerView.bind( 'sprite' ).to( iconManagerModel );

		return this.body.add( this.iconManagerView );
	}
}
