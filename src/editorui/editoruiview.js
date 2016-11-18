/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document */

import View from '../view.js';
import Template from '../template.js';
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
	constructor( locale ) {
		super( locale );

		/**
		 * Collection of the child views, detached from the DOM
		 * structure of the editor, like panels, icons etc.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.editorUI.EditorUIView#body
		 */
		this.body = this.createCollection();

		/**
		 * The element holding elements of the 'body' region.
		 *
		 * @private
		 * @member {HTMLElement} ui.editorUI.EditorUIView#_bodyCollectionContainer
		 */
	}

	/**
	 * @inheritDoc
	 */
	init() {
		return Promise.resolve()
			.then( () => this._renderBodyCollection() )
			.then( () => this._setupIconManager() )
			.then( () => super.init() );
	}

	/**
	 * @inheritDoc
	 */
	destroy() {
		this._bodyCollectionContainer.remove();

		return super.destroy();
	}

	/**
	 * Injects the {@link ui.iconManager.IconManager} into DOM.
	 *
	 * @protected
	 */
	_setupIconManager() {
		this.iconManagerView = new IconManagerView( iconManagerModel.sprite, iconManagerModel.icons );

		return this.body.add( this.iconManagerView );
	}

	/**
	 * Creates and appends to `<body>` the {@link #body} collection container.
	 *
	 * @private
	 */
	_renderBodyCollection() {
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
}
