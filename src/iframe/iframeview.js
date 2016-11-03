/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The iframe view class.
 *
 * @memberOf ui.iframe
 * @extends ui.View
 */
export default class IframeView extends View {
	/**
	 * Creates a new instance of the iframe view.
	 *
	 * @param {utils.Locale} [locale] The {@link core.editor.Editor#locale editor's locale} instance.
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'iframe',
			attributes: {
				class: [ 'ck-reset_all' ],
				// It seems that we need to allow scripts in order to be able to listen to events.
				// TODO: Research that. Perhaps the src must be set?
				sandbox: 'allow-same-origin allow-scripts'
			},
			on: {
				load: bind.to( 'loaded' )
			}
		} );

		/**
		 * A promise returned by {@link init} since iframe loading may be asynchronous.
		 *
		 * **Note**: Listening to `load` in {@link init} makes no sense because at this point
		 * the element is already in the DOM and the `load` event might already be fired.
		 *
		 * See {@link _iframeDeferred}.
		 *
		 * @private
		 * @member {Object} ui.iframe.IframeView#_iframePromise
		 */
		this._iframePromise = new Promise( ( resolve, reject ) => {
			/**
			 * A deferred object used to resolve the iframe promise associated with
			 * asynchronous loading of `contentDocument`. See {@link _iframePromise}.
			 *
			 * @private
			 * @member {Object} ui.iframe.IframeView#_iframeDefrred
			 */
			this._iframeDeferred = { resolve, reject };
		} );

		this.on( 'loaded', () => {
			this._iframeDeferred.resolve();
		} );
	}

	/**
	 * Initializes iframe {@link element} and returns a `Promise` for asynchronous
	 * child `contentDocument` loading process. See {@link _iframePromise}.
	 *
	 * @returns {Promise} A promise which resolves once the iframe `contentDocument` has
	 * been {@link ui.iframe.IframeView#loaded loaded}.
	 */
	init() {
		super.init();

		return this._iframePromise;
	}
}

/**
 * Fired when the DOM iframe's `contentDocument` finished loading.
 *
 * @event ui.iframe.IframeView#loaded
 */
