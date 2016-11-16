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
	 * @param {core.editor.Editor} editor The editor instance.
	 * @param {utils.Locale} [locale] The {@link core.editor.Editor#locale editor's locale} instance.
	 */
	constructor( editor, locale ) {
		super( locale );

		/**
		 * Editor that the UI belongs to.
		 *
		 * @member {core.editor.Editor} ui.editorUI.EditorUIView#editor
		 */
		this.editor = editor;

		/**
		 * Instance of the {@link ui.ComponentFactory}.
		 *
		 * @readonly
		 * @member {ui.ComponentFactory} ui.editorUI.EditorUIView#featureComponents
		 */
		this.featureComponents = new ComponentFactory( editor );

		/**
		 * Collection of the child views, detached from the DOM
		 * structure of the editor, like panels, icons etc.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.editorUI.EditorUIView#body
		 */
		this.body = this.createCollection();

		this._renderBodyCollection();

		/**
		 * Icons available in the UI.
		 *
		 * @readonly
		 * @member {Array.<String>} ui.editorUI.EditorUIView#icons
		 */

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
		return this._setupIconManager()
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
		this.icons = iconManagerModel.icons;
		this.iconManagerView = new IconManagerView();
		this.iconManagerView.sprite = iconManagerModel.sprite;

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
