/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';
import IconView from '../icon/iconview.js';

/**
 * The button view class.
 *
 * See {@link ui.button.Button}.
 *
 * @memberOf ui.button
 * @extends ui.View
 */
export default class ButtonView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'button',

			attributes: {
				class: [
					'ck-button',
					bind.to( 'isEnabled', value => value ? 'ck-enabled' : 'ck-disabled' ),
					bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' ),
					bind.if( 'withText', 'ck-button_with-text' )
				],
				title: [
					bind.to( 'title' )
				],
				type: bind.to( 'type', value => value ? value : 'button' )
			},

			children: [
				{
					tag: 'span',

					attributes: {
						class: [ 'ck-button__label' ]
					},

					children: [
						{
							text: bind.to( 'label' )
						}
					]
				}
			],

			on: {
				mousedown: bind.to( evt => {
					evt.preventDefault();
				} ),

				click: bind.to( evt => {
					// We can't make the button disabled using the disabled attribute, because it won't be focusable.
					// Though, shouldn't this condition be moved to the button controller?
					if ( this.isEnabled ) {
						this.fire( 'execute' );
					} else {
						evt.preventDefault();
					}
				} )
			}
		} );

		if ( this.icon ) {
			const iconView = new IconView();

			iconView.bind( 'name' ).to( this, 'icon' );

			this.template.children.push( iconView );
		}

		/**
		 * The label of the button view visible to the user.
		 *
		 * @observable
		 * @member {String} ui.button.ButtonView#label
		 */

		/**
		 * The HTML type of the button. Default `button`.
		 *
		 * @observable
		 * @member {'button'|'submit'|'reset'|'menu'} ui.button.ButtonView#type
		 */

		/**
		 * Controls whether the button view is "on", e.g. some feature which it represents
		 * is currently enabled.
		 *
		 * @observable
		 * @member {Boolean} ui.button.ButtonView#isOn
		 */

		/**
		 * Controls whether the button view is enabled (can be clicked).
		 *
		 * @observable
		 * @member {Boolean} ui.button.ButtonView#isEnabled
		 */

		/**
		 * (Optional) Whether the label of the button is hidden (e.g. button with icon only).
		 *
		 * @observable
		 * @member {Boolean} ui.button.ButtonView#withText
		 */

		/**
		 * (Optional) Title of the button displayed in the tooltip, i.e. when
		 * hovering the button with the mouse cursor.
		 *
		 * @observable
		 * @member {Boolean} ui.button.ButtonView#title
		 */

		/**
		 * Fired when the button view is clicked. It won't be fired when the button is disabled.
		 *
		 * @event ui.button.ButtonView#execute
		 */
	}
}
