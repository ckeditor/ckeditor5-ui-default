/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

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
	constructor() {
		super();

		const bind = this.bind;

		this.template = new Template( {
			tag: 'button',

			attributes: {
				class: [
					'ck-button',
					bind.to( 'isEnabled', value => value ? 'ck-enabled' : 'ck-disabled' ),
					bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' ),
					bind.if( 'withText', 'ck-button_with-text' )
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
					if ( this.model.isEnabled ) {
						this.model.fire( 'click' );
					} else {
						evt.preventDefault();
					}
				} )
			}
		} );

		this.register( 'children', el => el );

		/**
		 * Model of this button view.
		 *
		 * @member {ui.button.ButtonViewModel} ui.button.ButtonView#model
		 */
	}
}

/**
 * The button view {@link ui.Model} interface.
 *
 * @interface ui.button.ButtonViewModel
 */

/**
 * The label of the button view visible to the user.
 *
 * @observable
 * @member {String} ui.button.ButtonViewModel#label
 */

/**
 * The type of the button. Default `button`.
 *
 * @observable
 * @member {String} ui.button.ButtonViewModel#type
 */

/**
 * Controls whether the button view is "on", e.g. some feature which it represents
 * is currently enabled.
 *
 * @observable
 * @member {Boolean} ui.button.ButtonViewModel#isOn
 */

/**
 * Controls whether the button view is enabled (can be clicked).
 *
 * @observable
 * @member {Boolean} ui.button.ButtonViewModel#isEnabled
 */

/**
 * (Optional) Whether the label of the button is hidden (e.g. button with icon only).
 *
 * @observable
 * @member {Boolean} ui.button.ButtonViewModel#withText
 */

/**
 * Fired when the button view is clicked. It won't be fired when the button is disabled.
 *
 * @event ui.button.ButtonView#click
 */
