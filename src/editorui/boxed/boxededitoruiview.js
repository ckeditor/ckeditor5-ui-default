/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import EditorUIView from '../../editorui/editoruiview.js';
import uid from '../../../utils/uid.js';
import Template from '../../template.js';

/**
 * The boxed editor UI view class. This class represents an editor interface
 * consisting of a toolbar and an editable area, enclosed within a box.
 *
 * @member ui.editorUI.boxed
 * @extends ui.editorUI.EditorUIView
 */
export default class BoxedEditorUIView extends EditorUIView {
	/**
	 * Creates an instance of the boxed editor UI view class.
	 *
	 * @param {utils.Locale} locale The {@link core.editor.Editor#locale} instance.
	 */
	constructor( locale ) {
		super( locale );

		const t = this.t;
		const ariaLabelUid = uid();

		/**
		 * The UI's width.
		 *
		 * @observable
		 * @member {Number} width ui.editorUI.boxed.BoxedEditorUIView#width
		 */
		this.set( 'width', null );

		/**
		 * The UI's height.
		 *
		 * @observable
		 * @member {Number} height ui.editorUI.boxed.BoxedEditorUIView#height
		 */
		this.set( 'height', null );

		/**
		 * Collection of the child views located in the top (`.ck-editor__top`)
		 * area of the UI.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.editorUI.boxed.BoxedEditorUIView#top
		 */
		this.top = this.createCollection();

		/**
		 * Collection of the child views located in the main (`.ck-editor__main`)
		 * area of the UI.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.editorUI.boxed.BoxedEditorUIView#main
		 */
		this.main = this.createCollection();

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-editor',
					'ck-rounded-corners'
				],
				role: 'application',
				dir: 'ltr',
				lang: locale.lang,
				'aria-labelledby': `cke-editor__aria-label_${ ariaLabelUid }`
			},

			children: [
				{
					tag: 'span',
					attributes: {
						id: `cke-editor__aria-label_${ ariaLabelUid }`,
						class: 'cke-voice-label',
						children: [
							// TODO: Editor name?
							t( 'Rich Text Editor' )
						]
					}
				},
				{
					tag: 'div',
					attributes: {
						class: 'ck-editor__top ck-reset_all',
						role: 'presentation'
					},
					children: this.top
				},
				{
					tag: 'div',
					attributes: {
						class: 'ck-editor__main',
						role: 'presentation'
					},
					children: this.main
				}
			]
		} );
	}
}
