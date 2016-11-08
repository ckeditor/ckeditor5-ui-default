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
 * See {@link ui.editorUI.boxed.BoxedEditorUI}.
 *
 * @member ui.editorUI.boxed
 * @extends ui.editorUI.EditorUIView
 */
export default class BoxedEditorUIView extends EditorUIView {
	/**
	 * @inheritDoc
	 */
	constructor( editor, locale ) {
		super( editor, locale );

		const t = this.t;
		const ariaLabelUid = uid();
		const config = editor.config;

		/**
		 * The editor's width. Defaults to {@link core.editor.config.ui.width}.
		 *
		 * Note: a specific creator that was used must support this setting.
		 *
		 * @observable
		 * @member {Number} width ui.editorUI.boxed.BoxedEditorUIView#width
		 */
		this.set( 'width', config.get( 'ui.width' ) );

		/**
		 * The editor's height. Defaults to {@link core.editor.config.ui.height}.
		 *
		 * Note: a specific creator that was used must support this setting.
		 *
		 * @observable
		 * @member {Number} height ui.editorUI.boxed.BoxedEditorUIView#height
		 */
		this.set( 'height', config.get( 'ui.height' ) );

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
