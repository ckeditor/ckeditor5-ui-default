/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The dropdown panel view class.
 *
 * See {@link ui.dropdown.DropdownPanel}.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownPanelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * Controls whether the panel is visible.
		 *
		 * @observable
		 * @member {Boolean} ui.dropdown.DropdownPanelView#isVisible
		 */
		this.set( 'isVisible', false );

		/**
		 * Collection of the child views.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.dropdown.DropdownPanelView#children
		 */
		this.children = this.createCollection();

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-dropdown__panel',
					bind.if( 'isVisible', 'ck-dropdown__panel-visible' )
				]
			},

			children: this.children
		} );
	}
}
