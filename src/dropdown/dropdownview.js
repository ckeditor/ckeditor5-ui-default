/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The dropdown view class.
 *
 * See {@link ui.dropdown.Dropdown}.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale, buttonView, panelView ) {
		super( locale );

		/**
		 * Button of this dropdown view.
		 *
		 * @readonly
		 * @member {ui.button.ButtonView} ui.dropdown.DropdownView#buttonView
		 */
		this.addChild( this.buttonView = buttonView );

		/**
		 * Panel of this dropdown view.
		 *
		 * @readonly
		 * @member {ui.dropdown.DropdownPanelView} ui.dropdown.DropdownView#panelView
		 */
		this.addChild( this.panelView = panelView );

		/**
		 * Controls whether the dropdown view is open, which also means its
		 * {@link ui.dropdown.DropdownView#panel} is visible.
		 *
		 * @observable
		 * @member {Boolean} ui.dropdown.DropdownView#isOpen
		 */
		this.set( 'isOpen', false );

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			},

			children: [
				buttonView,
				panelView
			]
		} );

		Template.extend( buttonView.template, {
			attributes: {
				class: [
					'ck-dropdown__button'
				]
			}
		} );

		// Toggle the the dropdown when it's button has been clicked.
		this.listenTo( buttonView, 'execute', () => this.isOpen = !this.isOpen );

		// Toggle the visibility of the panel when the dropdown becomes open.
		panelView.bind( 'isVisible' ).to( this, 'isOpen' );

		/**
		 * The label of the dropdown.
		 *
		 * @observable
		 * @member {String} ui.dropdown.DropdownView#label
		 */

		/**
		 * Controls whether the dropdown is enabled (can be clicked).
		 *
		 * @observable
		 * @member {Boolean} ui.dropdown.DropdownView#isEnabled
		 */

		/**
		 * Controls whether the {@link ui.dropdown.DropdownView#buttonView} is "pushed".
		 *
		 * @observable
		 * @member {Boolean} ui.dropdown.DropdownView#isOn
		 */

		/**
		 * (Optional) Whether the label of the dropdown is visible. See {@link ui.button.ButtonModel#withText}.
		 *
		 * @observable
		 * @member {Boolean} ui.dropdown.DropdownView#withText
		 */
	}
}
