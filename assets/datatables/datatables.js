/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs4/dt-1.10.20/e-1.9.2
 *
 * Included libraries:
 *   DataTables 1.10.20, Editor 1.9.2
 */

/*! DataTables 1.10.20
 * ©2008-2019 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.20
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2019 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	
		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css(
			scrollY && scroll.bCollapse ? 'max-height' : 'height', 
			scrollY
		);
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}
	
			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}
	
			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}
	
			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}
	
			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );
	
			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}
	
			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}
	
			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}
	
			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];
	
					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}
	
					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}
	
			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		};
	
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( $.isArray( data ) && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.20";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"bs4/dt-1.10.20/e-1.9.2",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, search or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));


/*! DataTables Bootstrap 4 integration
 * ©2011-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 4. This requires Bootstrap 4 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap4",
	sFilterInput:  "form-control form-control-sm",
	sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass, counter=0;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex,
								'class': 'page-link'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);

					counter++;
				}
			}
		}
	};

	// IE9 throws an 'unknown error' if document.activeElement is used
	// inside an iframe or frame. 
	var activeEl;

	try {
		// Because this approach is destroying and recreating the paging
		// elements, focus is lost on the select button which is bad for
		// accessibility. So we want to restore focus once the draw has
		// completed
		activeEl = $(host).find(document.activeElement).data('dt-idx');
	}
	catch (e) {}

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);

	if ( activeEl !== undefined ) {
		$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
	}
};


return DataTable;
}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     1.9.2
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2020 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

L9ll(F9ll());D255(h255());function L9ll(){function M9(){var w5=2;for(;w5!==5;){switch(w5){case 2:var r5=[arguments];return r5[0][0].RegExp;break;}}}function d9(){var v5=2;for(;v5!==5;){switch(v5){case 2:var m5=[arguments];return m5[0][0].Array;break;}}}var t5=2;for(;t5!==77;){switch(t5){case 57:m9(X9,A5[49],A5[89],A5[44]);t5=56;break;case 14:A5[5]="ual";A5[6]="ll";A5[2]="__";A5[9]="__res";t5=10;break;case 59:m9(X9,A5[32],A5[89],A5[16]);t5=58;break;case 55:m9(D9,"apply",A5[70],A5[50]);t5=77;break;case 17:A5[86]="9";A5[13]="w9";A5[93]="t";A5[81]="ac";t5=26;break;case 33:A5[89]=0;A5[70]=1;A5[50]=A5[79];A5[50]+=A5[35];A5[50]+=A5[79];A5[28]=A5[11];A5[28]+=A5[35];t5=43;break;case 61:var m9=function(){var D5=2;for(;D5!==5;){switch(D5){case 2:var j5=[arguments];t9(A5[0][0],j5[0][0],j5[0][1],j5[0][2],j5[0][3]);D5=5;break;}}};t5=60;break;case 3:A5[8]="ize";A5[3]="";A5[3]="";A5[3]="optim";A5[5]="";t5=14;break;case 2:var A5=[arguments];A5[4]="";A5[4]="u";A5[8]="";t5=3;break;case 60:m9(M9,"test",A5[70],A5[12]);t5=59;break;case 10:A5[1]="id";A5[7]="J";A5[75]="g9";A5[81]="";t5=17;break;case 53:A5[49]+=A5[5];A5[76]=A5[75];A5[76]+=A5[79];A5[76]+=A5[79];A5[16]=A5[13];A5[16]+=A5[79];A5[16]+=A5[79];t5=46;break;case 63:A5[12]+=A5[86];A5[12]+=A5[6];t5=61;break;case 46:A5[32]=A5[2];A5[32]+=A5[3];A5[32]+=A5[8];A5[12]=A5[4];t5=63;break;case 22:A5[35]="9l";A5[79]="";A5[79]="";A5[79]="l";t5=33;break;case 43:A5[28]+=A5[79];A5[20]=A5[83];A5[20]+=A5[81];A5[20]+=A5[93];t5=39;break;case 26:A5[83]="__abstr";A5[11]="";A5[11]="e";A5[35]="";t5=22;break;case 56:m9(X9,A5[20],A5[89],A5[28]);t5=55;break;case 39:A5[44]=A5[7];A5[44]+=A5[86];A5[44]+=A5[6];A5[49]=A5[9];A5[49]+=A5[1];t5=53;break;case 58:m9(d9,"push",A5[70],A5[76]);t5=57;break;}}function t9(){var P5=2;for(;P5!==5;){switch(P5){case 1:try{var s5=2;for(;s5!==9;){switch(s5){case 2:X5[9]={};X5[6]=(1,X5[0][1])(X5[0][0]);X5[4]=[X5[6],X5[6].prototype][X5[0][3]];X5[9].value=X5[4][X5[0][2]];s5=3;break;case 3:try{X5[0][0].Object.defineProperty(X5[4],X5[0][4],X5[9]);}catch(T9){X5[4][X5[0][4]]=X5[9].value;}s5=9;break;}}}catch(n9){}P5=5;break;case 2:var X5=[arguments];P5=1;break;}}}function X9(){var z5=2;for(;z5!==5;){switch(z5){case 2:var L5=[arguments];return L5[0][0];break;}}}function D9(){var E5=2;for(;E5!==5;){switch(E5){case 2:var c5=[arguments];return c5[0][0].Function;break;}}}}I8UU.d1Z='function';I8UU.F1Z="5";I8UU.p5=function (){return typeof I8UU.F5.H9==='function'?I8UU.F5.H9.apply(I8UU.F5,arguments):I8UU.F5.H9;};I8UU.t4Z="o";I8UU.g4Z="7";function h255(){var h0=2;for(;h0!==3;){switch(h0){case 1:return globalThis;break;case 2:h0=typeof globalThis==='object'?1:5;break;case 5:try{var k0=2;for(;k0!==9;){switch(k0){case 4:window.globalThis=window;k0=3;break;case 5:k0=typeof globalThis==='undefined'?4:3;break;case 2:Object.defineProperty(Object.prototype,'YFJX1',{get:function(){return this;},configurable:true});YFJX1.globalThis=YFJX1;k0=5;break;case 3:delete Object.prototype.YFJX1;k0=9;break;}}}catch(A6){window.globalThis=window;}return globalThis;break;}}}I8UU.I4Z="a5";I8UU.K4y=function(e6,S6){var X4y=2;for(;X4y!==10;){switch(X4y){case 4:X4y=!T5--?3:9;break;case 13:X4y=!T5--?12:11;break;case 14:S6=S6.V255(function(N6){var d4y=2;for(;d4y!==13;){switch(d4y){case 2:var Y6;d4y=1;break;case 5:Y6='';d4y=4;break;case 9:Y6+=H6[k6][g6](N6[s6]+100);d4y=8;break;case 1:d4y=!T5--?5:4;break;case 4:var s6=0;d4y=3;break;case 3:d4y=s6<N6.length?9:7;break;case 6:return;break;case 7:d4y=!Y6?6:14;break;case 8:s6++;d4y=3;break;case 14:return Y6;break;}}});X4y=13;break;case 6:X4y=!T5--?14:13;break;case 1:X4y=!T5--?5:4;break;case 8:X4y=!T5--?7:6;break;case 2:var H6,p6,k6,T5;X4y=1;break;case 5:H6=S6.Z255.constructor(e6)();X4y=4;break;case 3:p6=typeof e6;X4y=9;break;case 7:k6=p6.K255(new H6[n6]("^['-|]"),'S');X4y=6;break;case 11:return{R5:function(r6){var O4y=2;for(;O4y!==3;){switch(O4y){case 4:return v6?F6:!F6;break;case 1:O4y=!F6?5:4;break;case 2:var v6=function(K6,b6){var c4y=2;for(;c4y!==10;){switch(c4y){case 4:b6=S6;c4y=3;break;case 8:var c6=H6[b6[4]](K6[b6[2]](Z6),16)[b6[3]](2);var j6=c6[b6[2]](c6[b6[5]]-1);c4y=6;break;case 5:c4y=typeof b6==='undefined'&&typeof S6!=='undefined'?4:3;break;case 12:V6=V6^j6;c4y=13;break;case 6:c4y=Z6===0?14:12;break;case 11:return V6;break;case 14:V6=j6;c4y=13;break;case 9:c4y=Z6<K6[b6[5]]?8:11;break;case 13:Z6++;c4y=9;break;case 1:K6=r6;c4y=5;break;case 3:var V6,Z6=0;c4y=9;break;case 2:c4y=typeof K6==='undefined'&&typeof r6!=='undefined'?1:5;break;}}}(undefined,undefined);O4y=1;break;case 5:(function(){var N4y=2;for(;N4y!==35;){switch(N4y){case 7:Q6+="e";Q6+="d";var B6="_";B6+="T";B6+="R";B6+="2";N4y=10;break;case 2:var Q6="u";Q6+="n";Q6+="d";Q6+="e";Q6+="f";Q6+="i";Q6+="n";N4y=7;break;case 20:B6+="i";B6+="e";B6+="z";B6+="s";N4y=16;break;case 16:B6+="w";B6+="m";B6+="U";N4y=26;break;case 26:B6+="1";var o6=typeof c255!==Q6?c255:typeof j255!==Q6?j255:this;N4y=24;break;case 23:return;break;case 24:N4y=o6[B6]?23:22;break;case 10:B6+="x";N4y=20;break;case 22:try{var u4y=2;for(;u4y!==1;){switch(u4y){case 2:expiredWarning();u4y=1;break;}}}catch(O6){}o6[B6]=function(){};N4y=35;break;}}}());O4y=4;break;}}}};break;case 9:var g6='fromCharCode',n6='RegExp';X4y=8;break;case 12:var F6=q6(new H6[S6[0]]()[S6[1]]());X4y=11;break;}}function q6(f6){var o4y=2;for(;o4y!==15;){switch(o4y){case 18:o4y=y6>=0?17:16;break;case 14:o4y=!T5--?13:12;break;case 4:o4y=!T5--?3:9;break;case 19:return w6;break;case 8:C6=S6[6];o4y=7;break;case 7:o4y=!T5--?6:14;break;case 12:o4y=!T5--?11:10;break;case 10:o4y=y6>=0&&J6>=0?20:18;break;case 6:J6=C6&&d6(C6,t6);o4y=14;break;case 13:L6=S6[7];o4y=12;break;case 2:var w6,t6,C6,J6,L6,y6,d6;o4y=1;break;case 20:w6=f6-y6>t6&&J6-f6>t6;o4y=19;break;case 11:y6=(L6||L6===0)&&d6(L6,t6);o4y=10;break;case 3:t6=32;o4y=9;break;case 9:o4y=!T5--?8:7;break;case 1:o4y=!T5--?5:4;break;case 16:w6=J6-f6>t6;o4y=19;break;case 5:d6=H6[S6[4]];o4y=4;break;case 17:w6=f6-y6>t6;o4y=19;break;}}}}('return this',[[-32,-3,16,1],[3,1,16,-16,5,9,1],[-1,4,-3,14,-35,16],[16,11,-17,16,14,5,10,3],[12,-3,14,15,1,-27,10,16],[8,1,10,3,16,4],[-51,0,18,10,-43,4,17,-52,-52],[-51,-1,-50,10,3,-43,-48,-52,-52]]);I8UU.h4Z="e";I8UU.a5=function (){return typeof I8UU.F5.H9==='function'?I8UU.F5.H9.apply(I8UU.F5,arguments):I8UU.F5.H9;};I8UU.E4Z="4";I8UU.k4Z="";I8UU.U1Z="a";I8UU.x1Z="ect";I8UU.p4y=function (){return typeof I8UU.K4y.R5==='function'?I8UU.K4y.R5.apply(I8UU.K4y,arguments):I8UU.K4y.R5;};function D255(){function x0(){var F4y=2;for(;F4y!==5;){switch(F4y){case 2:var g0=[arguments];return g0[0][0].String;break;}}}var I0=2;for(;I0!==36;){switch(I0){case 30:Q0[75]+=Q0[9];Q0[63]=Q0[3];Q0[63]+=Q0[7];Q0[63]+=Q0[5];I0=43;break;case 6:Q0[8]="j2";Q0[9]="";Q0[9]="5";Q0[2]="";Q0[2]="25";Q0[40]="";I0=20;break;case 23:Q0[33]=Q0[4];Q0[33]+=Q0[2];Q0[33]+=Q0[9];Q0[35]=Q0[6];I0=34;break;case 38:T6(P0,"global",Q0[44],Q0[85]);I0=37;break;case 39:T6(h6,"window",Q0[44],Q0[33]);I0=38;break;case 43:var T6=function(){var t0=2;for(;t0!==5;){switch(t0){case 2:var Y0=[arguments];l0(Q0[0][0],Y0[0][0],Y0[0][1],Y0[0][2],Y0[0][3]);t0=5;break;}}};I0=42;break;case 3:Q0[4]="";Q0[5]="55";Q0[6]="V";Q0[4]="c";I0=6;break;case 41:T6(x0,"replace",Q0[99],Q0[75]);I0=40;break;case 34:Q0[35]+=Q0[7];Q0[35]+=Q0[5];Q0[75]=Q0[1];Q0[75]+=Q0[2];I0=30;break;case 40:T6(R6,"map",Q0[99],Q0[35]);I0=39;break;case 2:var Q0=[arguments];Q0[1]="K";Q0[3]="Z";Q0[7]="2";I0=3;break;case 42:T6(R6,"filter",Q0[99],Q0[63]);I0=41;break;case 37:T6(I6,"global",Q0[99],Q0[20]);I0=36;break;case 20:Q0[40]="";Q0[40]="j";Q0[44]=0;Q0[99]=1;I0=16;break;case 16:Q0[20]=Q0[40];Q0[20]+=Q0[2];Q0[20]+=Q0[9];Q0[85]=Q0[8];Q0[85]+=Q0[9];Q0[85]+=Q0[9];I0=23;break;}}function h6(){var l4y=2;for(;l4y!==5;){switch(l4y){case 2:var S0=[arguments];return S0[0][0];break;}}}function I6(){var x4y=2;for(;x4y!==5;){switch(x4y){case 2:var R0=[arguments];return R0[0][0].RegExp;break;}}}function R6(){var P4y=2;for(;P4y!==5;){switch(P4y){case 2:var f0=[arguments];return f0[0][0].Array;break;}}}function l0(){var z4y=2;for(;z4y!==5;){switch(z4y){case 2:var n0=[arguments];try{var U4y=2;for(;U4y!==9;){switch(U4y){case 2:n0[7]={};n0[3]=(1,n0[0][1])(n0[0][0]);n0[6]=[n0[3],n0[3].prototype][n0[0][3]];n0[7].value=n0[6][n0[0][2]];U4y=3;break;case 3:try{n0[0][0].Object.defineProperty(n0[6],n0[0][4],n0[7]);}catch(v0){n0[6][n0[0][4]]=n0[7].value;}U4y=9;break;}}}catch(p0){}z4y=5;break;}}}function P0(){var G4y=2;for(;G4y!==5;){switch(G4y){case 2:var E0=[arguments];return E0[0][0];break;}}}}I8UU.F5=function(){var x5=2;for(;x5!==9;){switch(x5){case 5:Y5[4]={};Y5[4].H9=function(){var W5=2;for(;W5!==145;){switch(W5){case 23:C5[11]={};C5[11].A=['d8'];C5[11].z=function(){function H1(K1,j1){return K1+j1;};var E1=/\u006f\x6e[\u180e\n\t\u205f\u2029\f\u1680\u2000-\u200a \u3000\u2028\u00a0\u202f\r\ufeff\v]{0,}\x28/.u9ll(H1+[]);return E1;};C5[99]=C5[11];C5[16]={};W5=33;break;case 82:C5[62].A=['l'];C5[62].z=function(){var P3=function(f3,t3){return f3+t3;};var n3=function(){return P3(2,2);};var d3=!/\u002c/.u9ll(n3+[]);return d3;};C5[65]=C5[62];C5[25]={};W5=78;break;case 134:C5[26]='U';C5[95]='G';C5[56]='A';C5[36]='X';W5=130;break;case 102:C5[81]={};C5[81].A=['h'];C5[81].z=function(){var m3=function(s3,L3,F3,v3){return!s3&&!L3&&!F3&&!v3;};var O3=/\u007c\x7c/.u9ll(m3+[]);return O3;};C5[50]=C5[81];C5[1].g9ll(C5[96]);W5=97;break;case 60:C5[33]=C5[22];C5[10]={};W5=58;break;case 28:C5[55].z=function(){var B1=function(){'use stirct';return 1;};var h1=!/\x73\x74\x69\u0072\x63\u0074/.u9ll(B1+[]);return h1;};C5[30]=C5[55];C5[74]={};C5[74].A=['h'];C5[74].z=function(){var k1=function(){var N1;switch(N1){case 0:break;}};var Q1=!/\u0030/.u9ll(k1+[]);return Q1;};C5[61]=C5[74];C5[19]={};W5=38;break;case 45:C5[27].A=['l'];C5[27].z=function(){var G1=function(){return parseInt("0xff");};var x1=!/\u0078/.u9ll(G1+[]);return x1;};C5[48]=C5[27];C5[22]={};C5[22].A=['O'];C5[22].z=function(){var a1=function(){return eval("67;");};var c1=!/\u0065\x76\x61\x6c/.u9ll(a1+[]);return c1;};W5=60;break;case 78:C5[25].A=['d8'];C5[25].z=function(){var b3=typeof e9ll==='function';return b3;};C5[91]=C5[25];W5=102;break;case 32:C5[16].z=function(){var r1=function(){return(![]+[])[+!+[]];};var U1=/\u0061/.u9ll(r1+[]);return U1;};C5[85]=C5[16];C5[55]={};C5[55].A=['h'];W5=28;break;case 122:C5[44]={};C5[44][C5[52]]=C5[84][C5[56]][C5[87]];C5[44][C5[36]]=C5[43];C5[58].g9ll(C5[44]);W5=151;break;case 107:C5[1].g9ll(C5[30]);C5[1].g9ll(C5[66]);C5[1].g9ll(C5[29]);C5[58]=[];W5=134;break;case 149:W5=function(){var q5=2;for(;q5!==22;){switch(q5){case 16:q5=f5[7]<f5[9].length?15:23;break;case 25:f5[8]=true;q5=24;break;case 2:var f5=[arguments];q5=1;break;case 7:q5=f5[7]<f5[0][0].length?6:18;break;case 13:f5[1][f5[2][C5[52]]]=function(){var y5=2;for(;y5!==9;){switch(y5){case 2:var Z5=[arguments];Z5[1]={};Z5[1].h=0;Z5[1].t=0;return Z5[1];break;}}}.l9ll(this,arguments);q5=12;break;case 20:f5[1][f5[2][C5[52]]].h+=true;q5=19;break;case 11:f5[1][f5[2][C5[52]]].t+=true;q5=10;break;case 19:f5[7]++;q5=7;break;case 12:f5[9].g9ll(f5[2][C5[52]]);q5=11;break;case 5:return;break;case 1:q5=f5[0][0].length===0?5:4;break;case 18:f5[8]=false;q5=17;break;case 17:f5[7]=0;q5=16;break;case 10:q5=f5[2][C5[36]]===C5[26]?20:19;break;case 15:f5[5]=f5[9][f5[7]];f5[3]=f5[1][f5[5]].h/f5[1][f5[5]].t;q5=26;break;case 8:f5[7]=0;q5=7;break;case 14:q5=typeof f5[1][f5[2][C5[52]]]==='undefined'?13:11;break;case 6:f5[2]=f5[0][0][f5[7]];q5=14;break;case 26:q5=f5[3]>=0.5?25:24;break;case 4:f5[1]={};f5[9]=[];f5[7]=0;q5=8;break;case 24:f5[7]++;q5=16;break;case 23:return f5[8];break;}}}(C5[58])?148:147;break;case 26:C5[93].A=['l'];C5[93].z=function(){var M1=function(){return[0,1,2].join('@');};var X1=/\u0040[0-9]/.u9ll(M1+[]);return X1;};C5[38]=C5[93];W5=23;break;case 2:var C5=[arguments];W5=1;break;case 5:return 84;break;case 58:C5[10].A=['O'];C5[10].z=function(){var W1=function(){return String.fromCharCode(0x61);};var q1=!/\u0030\u0078\u0036\x31/.u9ll(W1+[]);return q1;};C5[66]=C5[10];W5=55;break;case 126:C5[84]=C5[1][C5[71]];try{C5[43]=C5[84][C5[63]]()?C5[26]:C5[95];}catch(p3){C5[43]=C5[95];}W5=124;break;case 69:C5[89].A=['O'];C5[89].z=function(){var w3=function(){return'X'.toLowerCase();};var g3=/\u0078/.u9ll(w3+[]);return g3;};C5[94]=C5[89];C5[97]={};C5[97].A=['l','h'];W5=89;break;case 130:C5[63]='z';C5[52]='q';W5=128;break;case 151:C5[87]++;W5=123;break;case 112:C5[1].g9ll(C5[48]);C5[1].g9ll(C5[33]);C5[1].g9ll(C5[91]);C5[1].g9ll(C5[50]);C5[1].g9ll(C5[65]);W5=107;break;case 33:C5[16].A=['l','O'];W5=32;break;case 148:W5=53?148:147;break;case 48:C5[83].z=function(){var y1=false;var I1=[];try{for(var R1 in console)I1.g9ll(R1);y1=I1.length===0;}catch(S1){}var A1=y1;return A1;};C5[42]=C5[83];C5[27]={};W5=45;break;case 147:Y5[7]=33;return 56;break;case 20:C5[8].z=function(){var v1=function(){return'x y'.slice(0,1);};var p1=!/\x79/.u9ll(v1+[]);return p1;};C5[5]=C5[8];C5[4]={};C5[4].A=['O'];C5[4].z=function(){var i1=function(){return atob('PQ==');};var D1=!/\u0061\x74\u006f\x62/.u9ll(i1+[]);return D1;};C5[3]=C5[4];C5[93]={};W5=26;break;case 127:W5=C5[71]<C5[1].length?126:149;break;case 150:C5[71]++;W5=127;break;case 124:C5[87]=0;W5=123;break;case 55:C5[70]={};C5[70].A=['d8'];W5=76;break;case 14:C5[6].A=['O'];C5[6].z=function(){var L1=function(){return'aaa'.includes('a');};var F1=/\x74\x72\u0075\x65/.u9ll(L1+[]);return F1;};C5[9]=C5[6];C5[8]={};C5[8].A=['O'];W5=20;break;case 128:C5[71]=0;W5=127;break;case 89:C5[97].z=function(){var J3=function(l3){return l3&&l3['b'];};var e3=/\x2e/.u9ll(J3+[]);return e3;};C5[96]=C5[97];C5[39]={};W5=86;break;case 76:C5[70].z=function(){var T3=typeof J9ll==='function';return T3;};C5[49]=C5[70];C5[80]={};C5[80].A=['h'];C5[80].z=function(){var C3=function(){if(false){console.log(1);}};var u3=!/\x31/.u9ll(C3+[]);return u3;};C5[29]=C5[80];C5[89]={};W5=69;break;case 91:C5[1].g9ll(C5[85]);C5[1].g9ll(C5[5]);W5=118;break;case 123:W5=C5[87]<C5[84][C5[56]].length?122:150;break;case 52:C5[59].z=function(){var z1=function(){debugger;};var Y1=!/\x64\x65\u0062\x75\u0067\u0067\x65\x72/.u9ll(z1+[]);return Y1;};C5[34]=C5[59];C5[83]={};C5[83].A=['d8'];W5=48;break;case 86:C5[39].A=['l'];C5[39].z=function(){var Z3=function(){return parseFloat(".01");};var o3=!/[sl]/.u9ll(Z3+[]);return o3;};C5[98]=C5[39];C5[62]={};W5=82;break;case 97:C5[1].g9ll(C5[42]);C5[1].g9ll(C5[49]);C5[1].g9ll(C5[99]);C5[1].g9ll(C5[61]);C5[1].g9ll(C5[98]);C5[1].g9ll(C5[2]);W5=91;break;case 4:C5[1]=[];C5[7]={};C5[7].A=['l','h'];C5[7].z=function(){var m1=function(s1){return s1&&s1['b'];};var O1=/\u002e/.u9ll(m1+[]);return O1;};C5[2]=C5[7];C5[6]={};W5=14;break;case 1:W5=Y5[7]?5:4;break;case 118:C5[1].g9ll(C5[34]);C5[1].g9ll(C5[3]);C5[1].g9ll(C5[9]);C5[1].g9ll(C5[32]);C5[1].g9ll(C5[38]);C5[1].g9ll(C5[94]);W5=112;break;case 38:C5[19].A=['d8'];C5[19].z=function(){var V1=typeof w9ll==='function';return V1;};C5[32]=C5[19];C5[59]={};C5[59].A=['h'];W5=52;break;}}};return Y5[4];break;case 2:var Y5=[arguments];Y5[7]=undefined;x5=5;break;}}}();function F9ll(){var d5=2;for(;d5!==3;){switch(d5){case 1:return globalThis;break;case 5:try{var M5=2;for(;M5!==9;){switch(M5){case 2:Object.defineProperty(Object.prototype,'cZFJX',{get:function(){return this;},configurable:true});cZFJX.globalThis=cZFJX;M5=5;break;case 5:M5=typeof globalThis==='undefined'?4:3;break;case 4:window.globalThis=window;M5=3;break;case 3:delete Object.prototype.cZFJX;M5=9;break;}}}catch(u9){window.globalThis=window;}return globalThis;break;case 2:d5=typeof globalThis==='object'?1:5;break;}}}function I8UU(){}I8UU.v4y=function (){return typeof I8UU.K4y.R5==='function'?I8UU.K4y.R5.apply(I8UU.K4y,arguments):I8UU.K4y.R5;};var f4yy=I8UU.g4Z;f4yy+=I8UU.g4Z;f4yy+=I8UU.E4Z;f4yy+=I8UU.h4Z;I8UU.R4y=function(S4y){if(I8UU&&S4y)return I8UU.v4y(S4y);};I8UU.r4y=function(A4y){if(I8UU)return I8UU.p4y(A4y);};I8UU.q4y=function(J4y){if(I8UU&&J4y)return I8UU.v4y(J4y);};I8UU.H4y=function(W4y){if(I8UU)return I8UU.p4y(W4y);};I8UU.j4y=function(M4y){if(I8UU)return I8UU.p4y(M4y);};I8UU.s4y=function(y4y){if(I8UU)return I8UU.v4y(y4y);};I8UU[I8UU.s4y(f4yy)?I8UU.k4Z:I8UU.I4Z]();(function(factory){var F9h=I8UU;var c1Z="amd";var X1Z="8c";var O1Z="9112";var o1Z="3fbf";var P1Z="57";var z1Z="1c";var G1Z="2";var l1Z="bj";var k4y=F9h.t4Z;k4y+=l1Z;k4y+=F9h.x1Z;var h4y=P1Z;h4y+=z1Z;var E4y=F9h.U1Z;E4y+=F9h.F1Z;var g4y=G1Z;g4y+=X1Z;g4y+=G1Z;F9h.a4y=function(i4y){if(F9h&&i4y)return F9h.v4y(i4y);};F9h[F9h.j4y(g4y)?F9h.k4Z:E4y]();if(typeof define===(F9h.H4y(o1Z)?F9h.k4Z:F9h.d1Z)&&define[F9h.q4y(O1Z)?c1Z:F9h.k4Z]){define(['jquery','datatables.net'],function($){return factory($,window,document);});}else if(typeof exports===(F9h.a4y(h4y)?k4y:F9h.k4Z)){module.exports=function(root,$){if(!root){root=window;}if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else{factory(jQuery,window,document);}}(function($,window,document,undefined){var G9h=I8UU;var s1U="isMultiValue";var Y1G="setUTCMinutes";var X94="od";var G8Z="fn";var D7Z="fieldFromNode";var E2U="wr";var p7U="ap";var u34="dbTable";var L2I="isEmpt";var F24="pti";var N6Z="odels";var T8I="multi-noEdit";var D1Z="n";var c2Z="Sep";var d74="tton";var n4U='body';var U2Z="asic";var d1G='span';var j5U="ass";var P44="end";var g7Z="structo";var z2Z="ed";var q5Z="fier";var j5Z="to";var p7Z="_optionsU";var Z9G="getUTCHours";var y7Z="pdat";var s9G="minutesRange";var I5Z="disp";var b74="Name";var n1Z="eTi";var F2Z="model";var R8I="sel";var a9Z="rm";var O0Z="eld";var d0U="_tidy";var q3Z="multi";var r34='edit';var U04="_ajax";var U6Z="for";var X2Z="on";var U64="essage";var Z44="cs";var M5Z="w";var z44="formInfo";var m5U='div.DTED_Lightbox_Content_Wrapper';var E9Z="ged";var H84="fieldErrors";var f6U="et";var J0U="ess";var S7U="back";var L9Z="restore";var s5Z="ho";var T64="po";var B74="_e";var C4U="disabled";var u0Z="extend";var z94="maybeOpen";var y2Z="ebru";var h4U="removeClass";var q0Z="tor";var w7G='</tr>';var p3I="select";var Y2I="_submitSuccess";var U5Z=").edi";var Z84="ven";var q9U="at";var x34="ing";var a44="ri";var Q44="em";var T2U="wn";var M7I=":";var a14="field";var b64="st";var b3U="order";var G7Z="pe";var C0Z="label";var T94="then";var s1I="tO";var j0I="econds";var b4G="_dateToUtc";var t54="register";var G34="cla";var B5I="indexes";var h94="displayController";var D6Z="im";var m1I="title";var l44="form";var l6Z="oc";var E1Z="_Backgrou";var r1Z="de";var E5Z="tion";var J4G="empty";var H5U="appendTo";var o5Z="e()";var x6Z="cl";var R0Z="inputControl";var G2U="ss";var y9Z="-value";var Y8Z="do";var b1Z="lts";var n9U="A";var O7G="showWeekNumber";var O9Z="DTE_Actio";var i8I="DTE_Field";var u9Z="d";var R44="action";var R5Z="lo";var J9Z="ield_Type_";var a0U="pend";var r8U="ontent";var m0Z="taFn";var N7U="rapper";var D4U="def";var x5Z="file(";var e7Z="yp";var c74="pp";var S7Z="micInf";var C1Z="nsta";var s64="isAr";var D8I="DTE_Field_StateError";var X84="upload";var H0U="itle";var a4G="_optionsTitle";var G5I="Delete";var w74='inline';var b7Z="_dataSo";var Z0Z='<div class="';var E14="R";var y24="map";var A2G="</t";var e1Z="YYYY-";var P4G="format";var w5Z="w().e";var p2Z="h";var a8Z="objec";var t5Z="lay";var u7U="bi";var C8I="DTE_Action_Remove";var d2I="_submit";var f0Z='"/>';var R1I="ca";var N2U="toggleClass";var u0U="_edit";var u6I="dra";var b9Z="nten";var C54="ocessing";var g0Z='</div>';var V5Z="it()";var z8I="abel";var m7U="conf";var S5Z="dependen";var h3U="funct";var q84="status";var d8Z="es 1.10.7 or newer";var E94="template";var P6Z="os";var Q8U="ppe";var h1U="proces";var o1U="cont";var b24="displayFields";var D9Z="DTE_F";var C1U="v";var r8I="multi-info";var v9I="ata";var F5Z="t()";var i14="splice";var s6Z="Edi";var V8I="ke";var G0U="is";var H1Z="t";var N7Z="prot";var r2I='submitComplete';var x6I="cells";var O74='click';var v14="preventDefault";var j3U="ds";var c0Z="fau";var F4U="Field";var g9Z="chan";var s7Z="p";var q8Z="th";var P9I="bmit";var z0Z="clas";var G3I="sele";var v2Z="c";var K8I="toArray";var L7U="animate";var d54="ice";var W0Z="data";var M4U="fun";var J6Z="k";var W8I="DTE_Form";var I7Z="irs";var j74="_message";var n5Z="bubble";var p1I="su";var V2U="ft";var f7Z="lu";var Q2Z="entr";var V3U="row";var Y64="vent";var e4G="minDate";var D1U="htm";var I1U='block';var w1U='input';var w0Z="fieldTypes";var V64='files()';var R4U="ts";var K2G="ss=\"";var d14="attr";var a5G="Y";var Y0U="bu";var u1Z="9";var m04="cti";var m9Z="_Bu";var t0Z=null;var U7Z="ot";var E3U="mi";var Z0U="/>";var P9Z="DTE";var l4I="closeIcb";var a7Z="cu";var t24="iv class";var v5U="ma";var D54="eq";var L5Z="ow.create()";var D5Z="ge";var W4U="uns";var y5I='Wed';var q94="node";var u1U="ut";var w9I="_legacyAjax";var z3Z="div";var H3U="tField";var f44="buttons";var F74='div.';var y04="indexOf";var n54="tml";var f3U="j";var R7Z="_b";var l74="ine";var X74='.';var R6U="ff";var T5Z="spl";var H74="cr";var R8Z="iv>";var P0Z="=\"";var a94="target";var e6I="Table";var M8I="DTE_Body_Content";var o8U="body";var X9Z="line_Bu";var o6Z="ngs";var j4Z=24;var H4G="np";var w8Z="DataTable";var v1Z="es";var K4Z=12;var I64="upl";var W7G="pus";var g44="tons";var g94="displayed";var z9Z="_B";var W1G="der";var S4G="utc";var n14="_actionClass";var E1U="multiValue";var T1I="eyCo";var x2G="UTC";var C0U="att";var b5Z="ayNode";var B6G="datetime";var W54="_crudArgs";var Z3U="multiReset";var p0I="-t";var M1Z="editorF";var G5U="windowPadding";var k6U="off";var m7Z="ototype";var Z7Z="eve";var J4U="slice";var x7Z="Erro";var o5U="outerHeight";var J2Z="t part of a group.";var B1G="setUTCHours";var A8I="DTE_Field_Message";var y2U="fieldType";var B1I="yed";var E2Z="htbox";var j5I='am';var X64='remove';var t8Z="iv";var n9Z="E";var q9Z="b";var N3Z="\"";var r4U="las";var l04="dit";var Y8I="DTE DTE_Bubble";var m44="left";var W2U='all';var N8Z="p5";var M9Z="DTE_Field_Inpu";var i9Z="DTE_Fo";var p2U="settings";var I1Z="ng";var e0I="<s";var a3Z="tle";var H8Z="pu";var W5U="emov";var o7U="igh";var a6Z="18";var i54="cus";var O9G="getUTCMonth";var e94='data';var z9U="re";var J5I='Minute';var y3U="isArray";var Z2G='</td>';var r7Z="tot";var c5I='January';var y0Z="name";var C5Z="play";var V1Z="f";var l24="ode";var W74="actio";var z7Z="otype";var X8Z='1.10.7';var B8U="hil";var O94="S";var j1Z="lds";var Q8I="DTE DTE_Inline";var y1G="tes";var R24="ocus";var R9I="eng";var x3Z="<";var X2U="no";var K2Z="Mar";var h24="\" ";var B2U="_d";var T8Z="ck";var P14="tm";var r8Z="lic";var Y2U="children";var W5I='pm';var S4I="match";var j9I="tabl";var Z5Z="abl";var O44="_event";var B4U="classes";var q1Z="ld";var n9G="getUTCFullYear";var e9Z="orm_I";var t0U="formError";var K44="dth";var v2U="models";var i84="rr";var q3U="fields";var U9U="pla";var o7Z="ype";var T74="_eve";var o9I="key";var r7U='div.DTE_Footer';var w0U='bubble';var n3U="ax";var f74="ope";var t9I="preOp";var u3U="table";var o9Z="ttons";var I1h="CLASS";var w44="includeFields";var t14="pt";var i4I="tri";var o2G='div.dataTables_scrollBody';var W0U="but";var h5Z="ub";var r0U="</div";var Q54="act";var R2U="append";var h2Z="_weak";var R3U="ajax";var V5U="nf";var f9Z="essing_Indicator";var H6Z="sionChec";var K5I='Sun';var g14="_displayReorder";var h7G="</sp";var X6Z="tt";var g1Z="DTE_Bubble";var t3Z="la";var l2U="len";var u5Z="ro";var U4U='display';var a0I="/di";var d2Z="Octob";var y0I="ime";var x5I="oFeatures";var P3Z="/";var v1U='focus';var G44="_closeReg";var p1Z="fie";var T7Z="_ev";var v74='addBack';var I4G="_setTitle";var H1U="co";var m84="iles";var M4G="time";var S0I="-iconR";var q8I="btn";var H2U='row';var v6Z="ls";var n7Z="prototyp";var V7Z="toty";var C9U="it";var X7Z="protot";var a5U="unbind";var K6U="pl";var W9U="get";var j94="pos";var R04=".";var V6Z="el";var Q0Z='">';var n34="displa";var G14='string';var d94="O";var u8U="top";var Q94="destroy";var M9U="display";var r3U="dat";var r9G="ye";var Y9U="rent";var B4Z=400;var R3I='selected';var H7Z="Opti";var W1Z="x";var b7G="opt";var N0U='boolean';var w94="disa";var D94="editFields";var r14="fi";var d6Z="displayC";var h1h="rFields";var u7I="sta";var l2Z="ten";var k4U="_m";var a8I="DTE_Label";var Y94="iq";var W6Z="ver";var R9Z="DTE_Proc";var x2Z="cha";var u6Z="om";var L2U="hi";var K14="ult";var v3U="or";var t9U="i18";var k7Z="pa";var K9I="edi";var d4Z=2;var O7Z="ocessin";var m94="rows";var c0U="isPlainObject";var d7G="r>";var s4G="date";var y1Z="ldT";var Z4G="_setCalander";var o0U="Object";var a1G="nder";var o54="xt";var r0Z=' ';var n44="each";var H9Z="E_F";var Y7Z="rDyna";var d3U="able";var R9U="html";var w5I='August';var M7Z="rot";var c6Z="roller";var d7Z="_pr";var v34="formOptions";var q4U="apply";var L6Z="defau";var F44="header";var Q9Z="pro";var k4G="setUTCDate";var I4U="err";var t8U="of";var j9U="slideDown";var T34="butto";var c8U="width";var l6U="ller";var W2Z="his input can be edited individually";var c14="keyCode";var e2G='</span>';var V9G='value';var v5Z="prototy";var s7U="nt";var e3Z="lue";var i24="inline";var T7G="tex";var y94="ni";var t9G="our";var z5I="processing";var X4U='label';var U9Z="ubbl";var n0U="_preopen";var C5U="<div cla";var o74="place";var v4U="val";var Z2I="onComplete";var k44="ick";var U44="prepend";var d8U="height";var H04="ete";var L2Z="y";var S14="elds";var A1Z="D";var J0Z="oApi";var F64="tl";var M9I="options";var v4Z=13;var I1G="pare";var m1Z="8";var P2G="getFullYear";var K5Z="va";var a1Z="1";var w64='cell().edit()';var j0U="ad";var a24="li";var s04="plit";var B7U="ha";var N2I="oA";var b8I="DTE_Processing_Indicator";var u5U="offse";var k3U="editOpts";var Z1U="lab";var z64="_editor";var j4U="tio";var P6U="sp";var S1Z="T";var m24="inli";var z5Z="cells(";var e24="inl";var T9U="multiInfo";var p14="clear";var P74="tions";var U5U="he";var C2U="_dom";var s5I='Thu';var G2Z="Sec";var A4I="triggerHandler";var A9U="multiEditable";var Y0I="on>";var P7I="_fnExtend";var y7U="conte";var W9I="pi";var s94="mat";var N0Z="i18n";var c34="defaults";var t9Z="ex";var f8Z="\">";var P0U="ur";var n64="ring";var J7Z="ons";var D2G='<span>';var A34="TableTools";var R7U="grou";var N5I='April';var X3Z="nfo";var Z9U="ve";var k8U="un";var S9Z="ssing";var H9I="stop";var w2Z="une";var Q1Z="nce";var G1G="nput";var x9Z="se";var j9Z="TE_Field_Name_";var k14="Set";var U8Z='';var M24="leng";var g7U="bod";var D3U="_dataSource";var B1U="multiValues";var u7Z="_po";var o94="P";var O0I="DateTime";var P64="editor";var w4U="led";var H8I="DTE_Form_Content";var l7Z="ubmit";var e8I="DTE_Label_Info";var Q7U="rge";var f3Z="v>";var B2G="<t";var o5I="The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.";var V5I='November';var e5Z="ield";var S94="ue";var z34="asses";var b2U="appe";var i94="find";var g6I="filter";var h6U="spla";var q7Z="proto";var Y2Z="Ed";var F9G='range';var G1U="multiIds";var d64="confirm";var E44="pen";var n2U="_hide";var w1Z=".2";var v7U="wrappe";var E3Z="<d";var p44="ength";var p5Z="le";var e0Z="_fnSetObjectDataFn";var u54="join";var U3U="remove";var k2G="maxDate";var l1G="nge";var k5Z="bl";var f2Z="DT_";var B9Z="E_He";var u2Z="J";var H0Z="ext";var O3U="Api";var I3U="onBackground";var d0Z="gs";var U2U="gth";var N9Z="Edit";var u64='rows().edit()';var Y1U="_multiValueCheck";var q2Z="Multipl";var j6Z="Check";var t1Z="con";var E7Z="u";var w34="ajaxUrl";var C5G="parts";var R1U="inObject";var Y5Z="rototype";var b9G='month';var E24="wi";var K4U="hasClass";var b44="remov";var M64="al";var Z64="call";var A2Z="elete %d rows?";var P7Z="pr";var Z2Z="u sure you wish to d";var l9Z=" clo";var V9Z="multi-";var e84="_limitLeft";var a9U="oy";var T9Z="DTE_Header_Co";var o8Z="Editor requires DataTabl";var Y3U="ic";var H64="safeId";var N9U='&';var J2G='-button ';var d5I="Undo changes";var U6G="min";var a5Z="Er";var W5Z="mu";var z9I="ion";var M74="message";var C8U="ra";var u24="sa";var u2U="_multiInfo";var w6Z="mod";var b8Z="mul";var M2Z="Pre";var f4U="container";var J94="itFi";var i7Z="type";var v6U="ay";var z4U="non";var b6G='editor-datetime';var A5Z="totyp";var i4U="prototype";var L4U="opts";var B7Z="urce";var u1G="put";var f9U="tab";var q9G="getU";var i1U="slideUp";var J6U="style";var e54="ach";var w54='-';var q6Z="dataTa";var I94="disable";var q1U="host";var f1U="Id";var O4Z=3;var F54="ord";var u44="_close";var L5U="apper";var E2G="firstDay";var U6U="_i";var b2Z="Upd";var U8U="ppend";var b7U='click.DTED_Lightbox';var X8I="ray";var l14="dex";var H5Z="ltiGe";var o34="ources";var m5Z="id";var q5G="ear";var I9I="splay";var F5I="Create new entry";var H94="event";var h2U="per";var G9I="parents";var d5Z="row(";var c9I="butt";var D74="multiSet";var L34="dataTable";var L0I="_in";var H7U="dy";var t7Z="ror";var d8I="par";var m14="N";var N2Z="tem";var t4U="lass";var H14="iel";var A7Z="ntName";var U5I="New";var z7U="background";var f14="modifier";var D8Z=false;var I34="trigger";var W7Z="orm";var w9Z="isabled";var G94='.edep';var X5I="A system error has occurred (<a target=\"_blank\" href=\"//datatables.net/tn/12\">More information</a>).";var q9I="ml";var O3Z="ass=\"";var l7U="Content";var J5Z="mo";var l0U='close';var E4U='none';var k1h="dTypes";var X4Z=0;var R2Z="eate";var P5Z=")";var V4Z=10;var o2Z="F";var e0U="il";var k2Z="InArray";var I0U="liner";var L1Z="i";var K6Z="ie";var r94='object';var K8Z="ch";var T8U="out";var v9Z="ul";var n3Z="labe";var E7I="Ap";var d6U="wrap";var O7U="ind";var g2Z="lig";var o3Z="<div";var j7Z="_f";var Z7U="_dte";var A24='individual';var v5I='Mon';var M6Z="version";var i3Z="I";var Y74="mai";var D2I="nCom";var i9U="tr";var N14="ll";var D24="_dataSourc";var O2Z="er";var Q74="one";var S2U="detach";var r4Z=100;var B2Z="ate";var k0Z="_typeFn";var J8I="DTE_Form_Error";var Z4Z=59;var M2U='submit';var g3U="sub";var H3Z="</";var x4U="inp";var m2Z="you";var n8I="emo";var F9I="sc";var v1I="submi";var j2U='blur';var A44='top';var c3Z="essa";var o4Z=1;var g4U="css";var L4I="itor";var A8Z=true;var u94="sing";var r2Z="lete";var A4U="addC";var t64="acti";var k1Z="DTE_Bubble_Tria";var k8Z="processi";var j2Z="vious";var c44='closed';var F8Z='s';var n1U="inArray";var i5U="close";var f5U="div>";var L8Z='"]';var I2Z="totype";var x7G="_h";var Y1Z="Date";var b5U="onf";var Z74="ct";var G6Z="ions";var L24="file";var h9Z="r";var i5Z="in";var w14="pre";var b2I="_pro";var o8I="-";var Q2U="content";var j8I="DTE_Footer";var A9Z="ooter_Cont";var a84="oad";var Y14='number';var S1U="isP";var I5U="Co";var x0U="submit";var E8I="ove";var u4Z=7;var c9Z="n_";var S8I="DTE_Bubble_Liner";var z8U="sty";var q2U="ox";var c7Z="eope";var V7U="und";var I04="closeCb";var y6Z="Fiel";var u8Z="Editor";var y54="_even";var O5Z=").dele";var e14="eac";var B5Z="dis";var i1Z="s";var L5I='December';var F6Z="mOpt";var I0Z='create';var Z14="create";var E8Z="<di";var A0Z="wrapper";var f5Z="uttons";var U1U="ngt";var i6Z="ble";var r9Z="ent";var g5Z="Posi";var R14="ields";var Q7Z="_clea";var G5Z="ows()";var E4I="_fieldNames";var q5I='action';var M54="gt";var O1U="ne";var f1G="nds";var K2U="text";var C2Z=" ";var s1Z="ypes";var W7U="bo";var o6U="_show";var s24='#';var y5Z="templat";var p8U="offset";var i2Z="e values";var f84="foo";var E64="up";var N64='editor()';var d9U="str";var e3U="edit";var X2G="namespace";var v8Z="push";var U14="am";var h74="rde";var S8Z="</d";var J1Z="editorFie";var C7Z="roto";var x8U="op";var b94="exte";var t4I="activeElement";var r2U="ow";var F7Z="oty";var O5I='Next';var p9Z="ti";var e2Z="Are yo";var s9Z="E_Field_Info";var Q6U="isplay";var n4G="U";var K9Z="m";var K3U="add";var H9U="set";var s0U="bub";var w0I="forma";var w9G="minut";var d9Z="DTE_Inline_F";var N94='json';var Z1Z="MM-D";var z6Z="ose";var x1I="lose";var K74="B";var j0Z="ta";var G9U="rep";var o24="dNames";var X5U='div.DTE_Header';var x54='main';var D2Z=" sure you wish to delete 1 row?";var K7Z="oto";var n2Z="RowId";var x5U="ght";var G74="replace";var N1Z="1.";var L4Z=11;var B8I="DTE_Action_Create";var l3Z=">";var c4Z=4;var l5Z="xhr.";var A94="cal";var X24="_fi";var B1Z="_";var S2Z="C";var D64="jax";var H2Z=", but no";var s4Z=20;var X3U="atta";var R1Z="me";var W9Z="DT";var F0Z="na";var F1G="fix";var p8I="ngth";var b4U="dom";var N74="nts";var e9U="rem";var x4G="classPrefix";var T1Z="au";var Z9Z="fo";var Y3Z="ab";var p0U="_a";var v7Z="ty";var G24="_assembleMain";var v24="hide";var s8I="DTE_Body";var S44='_basic';var O6Z="ont";var T4U="conta";var l1I="setFocus";var b4I="an";var z54="ev";var h1Z="nd";var a2Z="Are ";var m3Z="mult";var J8Z="en";var u5I='July';var R4G="momentLocale";var Y9Z="ce";var M3U="fiel";var w7Z="stope";var N4U="ea";var m8Z="length";var m8I="DTE_Field_InputControl";var c1U="error";var M5I='Sat';var c5Z="te";var m34="cre";var r5Z="di";var I9Z="ns";var g04="clos";var H2G='<button class="';var Q4Z=550;var m54='button';var l34="process";var L1U="typ";var g9G="getUTCDate";var M0Z="da";var B9U="bm";var h4G="_writeOutput";var g64="rin";var C6G='en';var H24="mes";var R54="rror";var N5Z="()";var U9G="parent";var Y04="lur";var T2Z="Del";var q5U="etac";var j5G="_op";var M8Z="files";var A4Z=60;var K3Z="erro";var d5U='maxHeight';var S4U="ren";var J7U="addClass";var h7Z="plo";var p5I='Tue';var z04="move";var o9U="ac";var t3U="blur";var p4U="focus";var H5I='Hour';var M8U="ound";var e4U="_t";var Z4U="eFn";var T3U="valFromData";var f1Z="Dat";var X5Z=".delet";var W3U="ini";var K1Z="l";var Z8I="DTE_Field_Error";var H4Z=27;var V2Z="Ma";var B94="xtend";var Q2I="_submitTable";var s2Z="ar";var S0Z="input";var j9G='seconds';var C9Z="ader";var P1U="fieldError";var Q5Z="depen";var G9Z="DTE_In";var B3I="8n";var V34="idSrc";var L7Z="multiIn";var j1U="sl";var C4Z=500;var s2U="button";var t2Z="_s";var k9Z="mOptio";var P2Z="g";var F9Z="e_Table";var Y4U="displ";var X4I="mode";var p6Z="Fi";var F5U="ight";var A7U="_animate";var p54="ov";var U4I="dataSource";var i2I="isEmptyObject";var T54="ame";var G4Z=N1Z;G4Z+=u1Z;G4Z+=w1Z;var F4Z=V1Z;F4Z+=L1Z;F4Z+=K1Z;F4Z+=v1Z;var U4Z=p1Z;U4Z+=y1Z;U4Z+=s1Z;var z4Z=M1Z;z4Z+=L1Z;z4Z+=G9h.h4Z;z4Z+=j1Z;var P4Z=G9h.h4Z;P4Z+=W1Z;P4Z+=H1Z;var k0k=J1Z;k0k+=q1Z;k0k+=i1Z;var B9k=L1Z;B9k+=a1Z;B9k+=m1Z;B9k+=D1Z;var b9k=e1Z;b9k+=Z1Z;b9k+=A1Z;var T9k=r1Z;T9k+=V1Z;T9k+=T1Z;T9k+=b1Z;var r9k=B1Z;r9k+=L1Z;r9k+=C1Z;r9k+=Q1Z;var A9k=Y1Z;A9k+=S1Z;A9k+=L1Z;A9k+=R1Z;var H63=f1Z;H63+=n1Z;H63+=R1Z;var u23=g1Z;u23+=E1Z;u23+=h1Z;var N23=k1Z;N23+=I1Z;N23+=K1Z;N23+=G9h.h4Z;var c23=L1Z;c23+=t1Z;c23+=l9Z;c23+=x9Z;var O23=P9Z;O23+=z9Z;O23+=U9Z;O23+=F9Z;var d23=G9Z;d23+=X9Z;d23+=o9Z;var o23=d9Z;o23+=L1Z;o23+=G9h.h4Z;o23+=q1Z;var X23=O9Z;X23+=c9Z;X23+=N9Z;var G23=u9Z;G23+=w9Z;var F23=V9Z;F23+=L9Z;var U23=K9Z;U23+=v9Z;U23+=p9Z;U23+=y9Z;var z23=A1Z;z23+=S1Z;z23+=s9Z;var P23=M9Z;P23+=H1Z;var x23=A1Z;x23+=j9Z;var l23=W9Z;l23+=H9Z;l23+=J9Z;var t93=q9Z;t93+=H1Z;t93+=D1Z;var I93=i9Z;I93+=a9Z;I93+=m9Z;I93+=o9Z;var k93=D9Z;k93+=e9Z;k93+=D1Z;k93+=Z9Z;var h93=D9Z;h93+=A9Z;h93+=r9Z;var E93=T9Z;E93+=b9Z;E93+=H1Z;var g93=W9Z;g93+=B9Z;g93+=C9Z;var n93=Q9Z;n93+=Y9Z;n93+=S9Z;var f93=R9Z;f93+=f9Z;var R93=A1Z;R93+=S1Z;R93+=n9Z;var E0T=g9Z;E0T+=E9Z;var g0T=Z9Z;g0T+=h9Z;g0T+=k9Z;g0T+=I9Z;var n0T=t9Z;n0T+=l2Z;n0T+=u9Z;var f0T=x2Z;f0T+=D1Z;f0T+=P2Z;f0T+=z2Z;var R0T=B1Z;R0T+=q9Z;R0T+=U2Z;var S0T=F2Z;S0T+=i1Z;var Y0T=G2Z;Y0T+=X2Z;Y0T+=u9Z;var Q0T=o2Z;Q0T+=h9Z;Q0T+=L1Z;var C0T=d2Z;C0T+=O2Z;var B0T=c2Z;B0T+=N2Z;B0T+=q9Z;B0T+=O2Z;var b0T=u2Z;b0T+=w2Z;var T0T=V2Z;T0T+=L2Z;var r0T=K2Z;r0T+=v2Z;r0T+=p2Z;var A0T=o2Z;A0T+=y2Z;A0T+=s2Z;A0T+=L2Z;var Z0T=M2Z;Z0T+=j2Z;var e0T=S1Z;e0T+=W2Z;e0T+=H2Z;e0T+=J2Z;var D0T=q2Z;D0T+=i2Z;var m0T=a2Z;m0T+=m2Z;m0T+=D2Z;var a0T=e2Z;a0T+=Z2Z;a0T+=A2Z;var i0T=A1Z;i0T+=G9h.h4Z;i0T+=r2Z;var q0T=T2Z;q0T+=G9h.h4Z;q0T+=H1Z;q0T+=G9h.h4Z;var J0T=b2Z;J0T+=B2Z;var H0T=N9Z;H0T+=C2Z;H0T+=Q2Z;H0T+=L2Z;var W0T=Y2Z;W0T+=L1Z;W0T+=H1Z;var j0T=S2Z;j0T+=h9Z;j0T+=R2Z;var M0T=f2Z;M0T+=n2Z;var s0T=g2Z;s0T+=E2Z;var p0T=h2Z;p0T+=k2Z;var G0T=Q9Z;G0T+=I2Z;var k3T=t2Z;k3T+=l7Z;k3T+=x7Z;k3T+=h9Z;var h3T=P7Z;h3T+=G9h.t4Z;h3T+=H1Z;h3T+=z7Z;var C8T=P7Z;C8T+=U7Z;C8T+=F7Z;C8T+=G7Z;var M8T=X7Z;M8T+=o7Z;var A6T=Q9Z;A6T+=I2Z;var i6T=d7Z;i6T+=O7Z;i6T+=P2Z;var q6T=X7Z;q6T+=o7Z;var p6T=d7Z;p6T+=c7Z;p6T+=D1Z;var v6T=N7Z;v6T+=F7Z;v6T+=G7Z;var x6T=u7Z;x6T+=w7Z;x6T+=D1Z;var l6T=Q9Z;l6T+=V7Z;l6T+=G7Z;var g5T=B1Z;g5T+=L7Z;g5T+=Z9Z;var n5T=P7Z;n5T+=K7Z;n5T+=v7Z;n5T+=G7Z;var e5T=p7Z;e5T+=y7Z;e5T+=G9h.h4Z;var V5T=s7Z;V5T+=M7Z;V5T+=F7Z;V5T+=G7Z;var V7T=j7Z;V7T+=W7Z;V7T+=H7Z;V7T+=J7Z;var w7T=q7Z;w7T+=i7Z;var G7T=j7Z;G7T+=G9h.t4Z;G7T+=a7Z;G7T+=i1Z;var F7T=P7Z;F7T+=m7Z;var t2T=B1Z;t2T+=D7Z;var I2T=N7Z;I2T+=U7Z;I2T+=e7Z;I2T+=G9h.h4Z;var g2T=B1Z;g2T+=Z7Z;g2T+=A7Z;var n2T=Q9Z;n2T+=r7Z;n2T+=o7Z;var b2T=T7Z;b2T+=r9Z;var k9T=b7Z;k9T+=B7Z;var h9T=s7Z;h9T+=C7Z;h9T+=v7Z;h9T+=G7Z;var S9T=s7Z;S9T+=M7Z;S9T+=z7Z;var H9T=Q7Z;H9T+=Y7Z;H9T+=S7Z;H9T+=G9h.t4Z;var p9T=R7Z;p9T+=f7Z;p9T+=h9Z;var O9T=X7Z;O9T+=L2Z;O9T+=G7Z;var K1T=n7Z;K1T+=G9h.h4Z;var n09=B1Z;n09+=t1Z;n09+=g7Z;n09+=h9Z;var i39=E7Z;i39+=h7Z;i39+=G9h.U1Z;i39+=u9Z;var p39=k7Z;p39+=I7Z;var K39=G9h.h4Z;K39+=h9Z;K39+=t7Z;var u39=l5Z;u39+=u9Z;u39+=H1Z;var N39=x5Z;N39+=P5Z;var c39=z5Z;c39+=U5Z;c39+=F5Z;var X39=h9Z;X39+=G5Z;X39+=X5Z;X39+=o5Z;var F39=d5Z;F39+=O5Z;F39+=c5Z;F39+=N5Z;var z39=G9h.U1Z;z39+=G9h.F1Z;var l39=u5Z;l39+=w5Z;l39+=u9Z;l39+=V5Z;var I89=h9Z;I89+=L5Z;var T89=K5Z;T89+=K1Z;var r89=v5Z;r89+=G7Z;var J89=p9Z;J89+=H1Z;J89+=p5Z;var H89=s7Z;H89+=M7Z;H89+=z7Z;var s89=y5Z;s89+=G9h.h4Z;var y89=n7Z;y89+=G9h.h4Z;var F89=i1Z;F89+=s5Z;F89+=M5Z;var x89=x9Z;x89+=H1Z;var l89=q7Z;l89+=i7Z;var G69=G9h.t4Z;G69+=s7Z;G69+=G9h.h4Z;G69+=D1Z;var F69=X7Z;F69+=o7Z;var P69=G9h.t4Z;P69+=D1Z;P69+=G9h.h4Z;var x69=P7Z;x69+=G9h.t4Z;x69+=V7Z;x69+=G7Z;var I59=G9h.t4Z;I59+=D1Z;var b59=Q9Z;b59+=j5Z;b59+=v7Z;b59+=G7Z;var e59=W5Z;e59+=H5Z;e59+=H1Z;var D59=J5Z;D59+=u9Z;D59+=L1Z;D59+=q5Z;var q59=K9Z;q59+=G9h.t4Z;q59+=u9Z;q59+=G9h.h4Z;var J59=q7Z;J59+=H1Z;J59+=o7Z;var H59=P7Z;H59+=G9h.t4Z;H59+=H1Z;H59+=z7Z;var J79=i5Z;J79+=a5Z;J79+=t7Z;var H79=m5Z;H79+=i1Z;var p79=D5Z;p79+=H1Z;var v79=P7Z;v79+=K7Z;v79+=v7Z;v79+=G7Z;var L79=p1Z;L79+=j1Z;var u79=V1Z;u79+=e5Z;var N79=s7Z;N79+=M7Z;N79+=z7Z;var o79=G9h.h4Z;o79+=h9Z;o79+=u5Z;o79+=h9Z;var X79=P7Z;X79+=m7Z;var z79=G9h.h4Z;z79+=D1Z;z79+=Z5Z;z79+=G9h.h4Z;var P79=N7Z;P79+=z7Z;var E29=Q9Z;E29+=A5Z;E29+=G9h.h4Z;var f29=r5Z;f29+=T5Z;f29+=b5Z;var S29=B5Z;S29+=C5Z;S29+=z2Z;var Y29=N7Z;Y29+=F7Z;Y29+=s7Z;Y29+=G9h.h4Z;var A29=X7Z;A29+=o7Z;var h99=Q5Z;h99+=u9Z;h99+=r9Z;var E99=s7Z;E99+=Y5Z;var S99=E7Z;S99+=D1Z;S99+=S5Z;S99+=H1Z;var Y99=s7Z;Y99+=C7Z;Y99+=i7Z;var v99=v2Z;v99+=R5Z;v99+=x9Z;var F99=v5Z;F99+=s7Z;F99+=G9h.h4Z;var r19=q9Z;r19+=f5Z;var d19=n5Z;d19+=g5Z;d19+=E5Z;var o19=q7Z;o19+=i7Z;var d49=q9Z;d49+=h5Z;d49+=k5Z;d49+=G9h.h4Z;var o49=P7Z;o49+=U7Z;o49+=z7Z;var G49=k5Z;G49+=E7Z;G49+=h9Z;var F49=s7Z;F49+=u5Z;F49+=I2Z;var x49=X7Z;x49+=e7Z;x49+=G9h.h4Z;var e5y=I5Z;e5y+=t5Z;var D5y=V1Z;D5y+=l6Z;D5y+=E7Z;D5y+=i1Z;var m5y=x6Z;m5y+=P6Z;m5y+=G9h.h4Z;var a5y=v2Z;a5y+=R5Z;a5y+=i1Z;a5y+=G9h.h4Z;var i5y=x6Z;i5y+=z6Z;var q5y=U6Z;q5y+=F6Z;q5y+=G6Z;var J5y=x9Z;J5y+=X6Z;J5y+=L1Z;J5y+=o6Z;var H5y=d6Z;H5y+=O6Z;H5y+=c6Z;var W5y=K9Z;W5y+=N6Z;var j5y=u9Z;j5y+=u6Z;var M5y=w6Z;M5y+=V6Z;M5y+=i1Z;var s5y=L6Z;s5y+=b1Z;var y5y=o2Z;y5y+=K6Z;y5y+=K1Z;y5y+=u9Z;var p5y=J5Z;p5y+=r1Z;p5y+=v6Z;var v5y=p6Z;v5y+=G9h.h4Z;v5y+=K1Z;v5y+=u9Z;var J1y=y6Z;J1y+=u9Z;var V1y=s6Z;V1y+=j5Z;V1y+=h9Z;var c1y=M6Z;c1y+=j6Z;var O1y=W6Z;O1y+=H6Z;O1y+=J6Z;var d1y=q6Z;d1y+=i6Z;'use strict';G9h.Y4y=function(Q4y){if(G9h&&Q4y)return G9h.p4y(Q4y);};G9h.C4y=function(B4y){if(G9h&&B4y)return G9h.v4y(B4y);};G9h.Z4y=function(e4y){if(G9h)return G9h.p4y(e4y);};(function(){var Y6Z="Your trial ";var h6Z="6";var b6Z="74ca";var n6Z="Thank you ";var B6Z="Editor - Tria";var C6Z="l ex";var g6Z="for trying DataTables Edi";var r6Z="5aef";var Q6Z="pir";var E6Z="r\n\n";var l8Z="emaining";var T6Z="5392";var f6Z="cense ";var m6Z="tT";var R6Z="purchase a li";var S6Z="has now expired. To ";var b4Z=286;var x8Z="log";var t6Z='for Editor, please see https://editor.datatables.net/purchase';var S4Z=1000;var R4Z=8872;var Z6Z="cc";var k6Z="3";var P8Z='DataTables Editor trial info - ';var n4Z=1580256000;var A6Z="ceil";var I6Z="f32f";var e6Z="getTim";var z8Z=' day';var z1y=a1Z;z1y+=a6Z;z1y+=G9h.h4Z;var P1y=D5Z;P1y+=m6Z;P1y+=D6Z;P1y+=G9h.h4Z;var x1y=e6Z;x1y+=G9h.h4Z;var l1y=u1Z;l1y+=Z6Z;l1y+=G9h.F1Z;var t4y=u1Z;t4y+=u1Z;t4y+=v2Z;t4y+=u1Z;var I4y=G9h.U1Z;I4y+=G9h.F1Z;G9h.n4y=function(f4y){if(G9h)return G9h.v4y(f4y);};G9h.b4y=function(T4y){if(G9h&&T4y)return G9h.v4y(T4y);};G9h.D4y=function(m4y){if(G9h)return G9h.p4y(m4y);};G9h[I4y]();var remaining=Math[G9h.D4y(t4y)?A6Z:G9h.k4Z]((new Date(n4Z*(G9h.Z4y(l1y)?b4Z:S4Z))[x1y]()-new Date()[G9h.r4y(r6Z)?G9h.k4Z:P1y]())/((G9h.b4y(T6Z)?S4Z:R4Z)*A4Z*A4Z*(G9h.C4y(z1y)?X4Z:j4Z)));if(remaining<=(G9h.Y4y(b6Z)?X4Z:o4Z)){var X1y=B6Z;X1y+=C6Z;X1y+=Q6Z;X1y+=z2Z;var G1y=Y6Z;G1y+=S6Z;G1y+=R6Z;G1y+=f6Z;var F1y=n6Z;F1y+=g6Z;F1y+=j5Z;F1y+=E6Z;var U1y=V1Z;U1y+=h6Z;U1y+=k6Z;U1y+=m1Z;alert((G9h.R4y(U1y)?G9h.k4Z:F1y)+G1y+(G9h.n4y(I6Z)?t6Z:G9h.k4Z));throw X1y;}else if(remaining<=u4Z){var o1y=C2Z;o1y+=h9Z;o1y+=l8Z;console[x8Z](P8Z+remaining+z8Z+(remaining===o4Z?U8Z:F8Z)+o1y);}}());var DataTable=$[G8Z][d1y];if(!DataTable||!DataTable[O1y]||!DataTable[c1y](X8Z)){var N1y=o8Z;N1y+=d8Z;throw new Error(N1y);}var Editor=function(opts){var c8Z="aTables Editor must be initialised as a 'new' instance'";var O8Z="structor";var w1y=B1Z;w1y+=t1Z;w1y+=O8Z;if(!(this instanceof Editor)){var u1y=f1Z;u1y+=c8Z;alert(u1y);}G9h[N8Z]();this[w1y](opts);};DataTable[u8Z]=Editor;$[G8Z][w8Z][V1y]=Editor;var _editor_el=function(dis,ctx){var V8Z='*[data-dte-e="';G9h[G9h.I4Z]();if(ctx===undefined){ctx=document;}return $(V8Z+dis+L8Z,ctx);};var __inlineCounter=X4Z;var _pluck=function(a,prop){var K1y=G9h.h4Z;K1y+=G9h.U1Z;K1y+=K8Z;var L1y=G9h.U1Z;L1y+=G9h.F1Z;G9h[L1y]();var out=[];$[K1y](a,function(idx,el){G9h[N8Z]();out[v8Z](el[prop]);});return out;};var _api_file=function(name,id){var s8Z='Unknown file id ';var p8Z="fil";var y8Z=" in tabl";var v1y=p8Z;v1y+=G9h.h4Z;v1y+=i1Z;var table=this[v1y](name);var file=table[id];if(!file){var p1y=y8Z;p1y+=G9h.h4Z;p1y+=C2Z;throw s8Z+id+p1y+name;}return table[id];};var _api_files=function(name){var j8Z='Unknown file table name: ';var y1y=V1Z;y1y+=L1Z;y1y+=K1Z;y1y+=v1Z;if(!name){return Editor[M8Z];}var table=Editor[y1y][name];if(!table){throw j8Z+name;}return table;};var _objectKeys=function(o){var W8Z="hasOwnProperty";var out=[];for(var key in o){if(o[W8Z](key)){var s1y=H8Z;s1y+=i1Z;s1y+=p2Z;out[s1y](key);}}return out;};var _deepCompare=function(o1,o2){var e8Z="ob";var i8Z="ject";var Z8Z="jec";var W1y=K1Z;W1y+=J8Z;W1y+=P2Z;W1y+=q8Z;var j1y=G9h.t4Z;j1y+=q9Z;j1y+=i8Z;var M1y=a8Z;M1y+=H1Z;if(typeof o1!==M1y||typeof o2!==j1y){return o1==o2;}var o1Props=_objectKeys(o1);G9h[N8Z]();var o2Props=_objectKeys(o2);if(o1Props[m8Z]!==o2Props[m8Z]){return D8Z;}for(var i=X4Z,ien=o1Props[W1y];i<ien;i++){var H1y=e8Z;H1y+=Z8Z;H1y+=H1Z;var propName=o1Props[i];if(typeof o1[propName]===H1y){if(!_deepCompare(o1[propName],o2[propName])){return D8Z;}}else if(o1[propName]!=o2[propName]){return D8Z;}}return A8Z;};Editor[J1y]=function(opts,classes,host){var W3Z="class=\"";var B0Z='<label data-dte-e="label" class="';var C3Z="t\" class=\"";var l0Z="afeI";var o0Z="sett";var c4U='field-processing';var g3Z="Inf";var A3Z="ti-value\" class=\"";var L3Z="g-";var v0Z="E_";var Y0Z='msg-label';var G3Z="-i";var P4U="ut-control";var h3Z="iv data-dte-e=\"msg-la";var B8Z="lti-value";var d3Z=" data-dte-e=\"msg-info\" cl";var J3Z="span>";var D3Z="iVa";var h8Z="v data-dte-e=\"field-";var G0Z="valFrom";var Q3Z="</l";var V3Z="ms";var n0Z='<span data-dte-e="multi-info" class="';var T0Z="typePrefix";var I3Z="\" class=\"";var G4U='input-control';var j3Z="a-dte-e=\"msg-multi\" ";var F3Z="msg";var L0Z="adding field - unknown ";var u3Z="<div data-dte-e";var S3Z="el>";var C8Z="msg-";var Q8Z="info";var b3Z="div data-dte";var o4U='msg-error';var R3Z="/d";var l4U="epe";var b0Z="namePrefix";var D0Z="valToData";var B3Z="-e=\"inpu";var U3Z="ieldIn";var y3Z="lti";var M3Z=" dat";var k3Z="bel";var n8Z="<span/></div>";var p0Z="Field_";var E0Z='"></div>';var V0Z="Error ";var K0Z="field type ";var Z3Z="<div data-dte-e=\"mul";var T3Z="-control\" ";var I8Z="ng\" class=\"";var U0Z="sNa";var s0Z="dataProp";var d4U='msg-multi';var y4U="multiReturn";var w3Z="=\"msg-message\" class=\"";var s3Z="Restore";var X0Z="Data";var h0Z='msg-message';var p3Z="e=\"msg-error\" class=\"";var g8Z="processin";var x0Z="\" for";var r3Z="<div data-dte-e=\"input";var O4U='multi-info';var v3Z="<div data-dte-";var g9y=G9h.h4Z;g9y+=G9h.U1Z;g9y+=K8Z;var n9y=v2Z;n9y+=r8Z;n9y+=J6Z;var f9y=u9Z;f9y+=G9h.t4Z;f9y+=K9Z;var Q9y=x6Z;Q9y+=L1Z;Q9y+=T8Z;var C9y=b8Z;C9y+=p9Z;var B9y=u9Z;B9y+=G9h.t4Z;B9y+=K9Z;var b9y=W5Z;b9y+=B8Z;var T9y=C8Z;T9y+=Q8Z;var r9y=Y8Z;r9y+=K9Z;var A9y=K9Z;A9y+=N6Z;var Z9y=u9Z;Z9y+=G9h.t4Z;Z9y+=K9Z;var i9y=S8Z;i9y+=R8Z;var q9y=f8Z;q9y+=n8Z;var J9y=g8Z;J9y+=P2Z;var H9y=E8Z;H9y+=h8Z;H9y+=k8Z;H9y+=I8Z;var W9y=S8Z;W9y+=t8Z;W9y+=l3Z;var j9y=x3Z;j9y+=P3Z;j9y+=z3Z;j9y+=l3Z;var M9y=V1Z;M9y+=U3Z;M9y+=V1Z;M9y+=G9h.t4Z;var s9y=F3Z;s9y+=G3Z;s9y+=X3Z;var y9y=o3Z;y9y+=d3Z;y9y+=O3Z;var p9y=K9Z;p9y+=c3Z;p9y+=P2Z;p9y+=G9h.h4Z;var v9y=N3Z;v9y+=l3Z;var K9y=u3Z;K9y+=w3Z;var L9y=V3Z;L9y+=L3Z;L9y+=K3Z;L9y+=h9Z;var V9y=v3Z;V9y+=p3Z;var w9y=N3Z;w9y+=l3Z;var u9y=K9Z;u9y+=E7Z;u9y+=y3Z;u9y+=s3Z;var N9y=o3Z;N9y+=M3Z;N9y+=j3Z;N9y+=W3Z;var c9y=H3Z;c9y+=J3Z;var O9y=L1Z;O9y+=X3Z;var d9y=N3Z;d9y+=l3Z;var o9y=q3Z;o9y+=i3Z;o9y+=D1Z;o9y+=Z9Z;var X9y=p9Z;X9y+=a3Z;var G9y=m3Z;G9y+=D3Z;G9y+=e3Z;var F9y=Z3Z;F9y+=A3Z;var U9y=r3Z;U9y+=T3Z;U9y+=W3Z;var z9y=N3Z;z9y+=l3Z;var P9y=x3Z;P9y+=b3Z;P9y+=B3Z;P9y+=C3Z;var x9y=Q3Z;x9y+=Y3Z;x9y+=S3Z;var l9y=x3Z;l9y+=R3Z;l9y+=L1Z;l9y+=f3Z;var t1y=n3Z;t1y+=K1Z;t1y+=g3Z;t1y+=G9h.t4Z;var I1y=E3Z;I1y+=h3Z;I1y+=k3Z;I1y+=I3Z;var k1y=t3Z;k1y+=q9Z;k1y+=G9h.h4Z;k1y+=K1Z;var h1y=i1Z;h1y+=l0Z;h1y+=u9Z;var E1y=x0Z;E1y+=P0Z;var g1y=N3Z;g1y+=l3Z;var n1y=z0Z;n1y+=U0Z;n1y+=R1Z;var f1y=F0Z;f1y+=K9Z;f1y+=G9h.h4Z;var R1y=H1Z;R1y+=L2Z;R1y+=G7Z;var C1y=G0Z;C1y+=X0Z;var A1y=D1Z;A1y+=G9h.U1Z;A1y+=K9Z;A1y+=G9h.h4Z;var Z1y=o0Z;Z1y+=L1Z;Z1y+=D1Z;Z1y+=d0Z;var e1y=o2Z;e1y+=L1Z;e1y+=O0Z;var a1y=v7Z;a1y+=s7Z;a1y+=G9h.h4Z;var i1y=r1Z;i1y+=c0Z;i1y+=b1Z;var q1y=p6Z;q1y+=G9h.h4Z;q1y+=K1Z;q1y+=u9Z;var that=this;var multiI18n=host[N0Z][q3Z];opts=$[u0Z](A8Z,{},Editor[q1y][i1y],opts);if(!Editor[w0Z][opts[a1y]]){var D1y=H1Z;D1y+=L2Z;D1y+=s7Z;D1y+=G9h.h4Z;var m1y=V0Z;m1y+=L0Z;m1y+=K0Z;throw m1y+opts[D1y];}this[i1Z]=$[u0Z]({},Editor[e1y][Z1y],{type:Editor[w0Z][opts[i7Z]],name:opts[A1y],classes:classes,host:host,opts:opts,multiValue:D8Z});if(!opts[m5Z]){var T1y=W9Z;T1y+=v0Z;T1y+=p0Z;var r1y=L1Z;r1y+=u9Z;opts[r1y]=T1y+opts[y0Z];}if(opts[s0Z]){var b1y=M0Z;b1y+=j0Z;opts[b1y]=opts[s0Z];}if(opts[W0Z]===U8Z){var B1y=F0Z;B1y+=R1Z;opts[W0Z]=opts[B1y];}var dtPrivateApi=DataTable[H0Z][J0Z];this[C1y]=function(d){var i0Z="_fnGetOb";var a0Z="jectDa";var S1y=G9h.h4Z;S1y+=u9Z;S1y+=L1Z;S1y+=q0Z;var Y1y=u9Z;Y1y+=G9h.U1Z;Y1y+=H1Z;Y1y+=G9h.U1Z;var Q1y=i0Z;Q1y+=a0Z;Q1y+=m0Z;G9h[G9h.I4Z]();return dtPrivateApi[Q1y](opts[Y1y])(d,S1y);};this[D0Z]=dtPrivateApi[e0Z](opts[W0Z]);var template=$(Z0Z+classes[A0Z]+r0Z+classes[T0Z]+opts[R1y]+r0Z+classes[b0Z]+opts[f1y]+r0Z+opts[n1y]+g1y+B0Z+classes[C0Z]+E1y+Editor[h1y](opts[m5Z])+Q0Z+opts[k1y]+I1y+classes[Y0Z]+Q0Z+opts[t1y]+l9y+x9y+P9y+classes[S0Z]+z9y+U9y+classes[R0Z]+f0Z+F9y+classes[G9y]+Q0Z+multiI18n[X9y]+n0Z+classes[o9y]+d9y+multiI18n[O9y]+c9y+g0Z+N9y+classes[u9y]+w9y+multiI18n[L9Z]+g0Z+V9y+classes[L9y]+E0Z+K9y+classes[h0Z]+v9y+opts[p9y]+g0Z+y9y+classes[s9y]+Q0Z+opts[M9y]+j9y+W9y+H9y+classes[J9y]+q9y+i9y);var input=this[k0Z](I0Z,opts);if(input!==t0Z){var m9y=P7Z;m9y+=l4U;m9y+=D1Z;m9y+=u9Z;var a9y=x4U;a9y+=P4U;_editor_el(a9y,template)[m9y](input);}else{var e9y=z4U;e9y+=G9h.h4Z;var D9y=v2Z;D9y+=i1Z;D9y+=i1Z;template[D9y](U4U,e9y);}this[Z9y]=$[u0Z](A8Z,{},Editor[F4U][A9y][r9y],{container:template,inputControl:_editor_el(G4U,template),label:_editor_el(X4U,template),fieldInfo:_editor_el(T9y,template),labelInfo:_editor_el(Y0Z,template),fieldError:_editor_el(o4U,template),fieldMessage:_editor_el(h0Z,template),multi:_editor_el(b9y,template),multiReturn:_editor_el(d4U,template),multiInfo:_editor_el(O4U,template),processing:_editor_el(c4U,template)});this[B9y][C9y][X2Z](Q9y,function(){var u4U="nly";var V4U="Edita";var R9y=h9Z;R9y+=N4U;R9y+=Y8Z;R9y+=u4U;var S9y=B5Z;S9y+=Y3Z;S9y+=w4U;var Y9y=m3Z;Y9y+=L1Z;Y9y+=V4U;Y9y+=i6Z;G9h[N8Z]();if(that[i1Z][L4U][Y9y]&&!template[K4U](classes[S9y])&&opts[i7Z]!==R9y){that[v4U](U8Z);that[p4U]();}});this[f9y][y4U][X2Z](n9y,function(){var s4U="multiRestore";that[s4U]();});$[g9y](this[i1Z][i7Z],function(name,fn){var E9y=M4U;E9y+=v2Z;E9y+=j4U;E9y+=D1Z;G9h[N8Z]();if(typeof fn===E9y&&that[name]===undefined){that[name]=function(){var H4U="hif";var I9y=W4U;I9y+=H4U;I9y+=H1Z;var k9y=v2Z;k9y+=G9h.U1Z;k9y+=K1Z;k9y+=K1Z;var h9y=q7Z;h9y+=v7Z;h9y+=G7Z;var args=Array[h9y][J4U][k9y](arguments);args[I9y](name);var ret=that[k0Z][q4U](that,args);return ret===undefined?that:ret;};}});};Editor[F4U][i4U]={def:function(set){var m4U='default';var a4U="ault";G9h[N8Z]();var opts=this[i1Z][L4U];if(set===undefined){var l2y=u9Z;l2y+=G9h.h4Z;l2y+=V1Z;var t9y=r1Z;t9y+=V1Z;t9y+=a4U;var def=opts[t9y]!==undefined?opts[m4U]:opts[l2y];return typeof def===G9h.d1Z?def():def;}opts[D4U]=set;return this;},disable:function(){var Q4U='disable';var U2y=s7Z;U2y+=G9h.F1Z;var z2y=e4U;z2y+=e7Z;z2y+=Z4U;var P2y=A4U;P2y+=r4U;P2y+=i1Z;var x2y=T4U;x2y+=i5Z;x2y+=G9h.h4Z;x2y+=h9Z;this[b4U][x2y][P2y](this[i1Z][B4U][C4U]);this[z2y](Q4U);G9h[U2y]();return this;},displayed:function(){var G2y=Y4U;G2y+=G9h.U1Z;G2y+=L2Z;var F2y=k7Z;F2y+=S4U;F2y+=R4U;var container=this[b4U][f4U];return container[F2y](n4U)[m8Z]&&container[g4U](G2y)!=E4U?A8Z:D8Z;},enable:function(){var o2y=J8Z;o2y+=Y3Z;o2y+=p5Z;var X2y=u9Z;X2y+=G9h.t4Z;X2y+=K9Z;this[X2y][f4U][h4U](this[i1Z][B4U][C4U]);this[k0Z](o2y);return this;},enabled:function(){return this[b4U][f4U][K4U](this[i1Z][B4U][C4U])===D8Z;},error:function(msg,fn){var x1U='errorMessage';var l1U="removeC";var w2y=k4U;w2y+=i1Z;w2y+=P2Z;var u2y=G9h.U1Z;u2y+=G9h.F1Z;var classes=this[i1Z][B4U];if(msg){var O2y=I4U;O2y+=G9h.t4Z;O2y+=h9Z;var d2y=A4U;d2y+=t4U;this[b4U][f4U][d2y](classes[O2y]);}else{var N2y=G9h.h4Z;N2y+=h9Z;N2y+=u5Z;N2y+=h9Z;var c2y=l1U;c2y+=t4U;this[b4U][f4U][c2y](classes[N2y]);}G9h[u2y]();this[k0Z](x1U,msg);return this[w2y](this[b4U][P1U],msg,fn);},fieldInfo:function(msg){var z1U="fieldInfo";var V2y=B1Z;V2y+=K9Z;V2y+=i1Z;V2y+=P2Z;G9h[N8Z]();return this[V2y](this[b4U][z1U],msg);},isMultiValue:function(){var F1U="ultiVa";var K2y=K1Z;K2y+=G9h.h4Z;K2y+=U1U;K2y+=p2Z;var L2y=K9Z;L2y+=F1U;L2y+=e3Z;G9h[G9h.I4Z]();return this[i1Z][L2y]&&this[i1Z][G1U][K2y]!==o4Z;},inError:function(){var X1U="asClas";var d1U="ai";var p2y=p2Z;p2y+=X1U;p2y+=i1Z;var v2y=o1U;v2y+=d1U;v2y+=O1U;v2y+=h9Z;return this[b4U][v2y][p2y](this[i1Z][B4U][c1U]);},input:function(){var V1U='input, select, textarea';var N1U="iner";var M2y=o1U;M2y+=G9h.U1Z;M2y+=N1U;var s2y=u9Z;s2y+=G9h.t4Z;s2y+=K9Z;var y2y=L1Z;y2y+=D1Z;y2y+=s7Z;y2y+=u1U;return this[i1Z][i7Z][y2y]?this[k0Z](w1U):$(V1U,this[s2y][M2y]);},focus:function(){var K1U="typeFn";var p1U="input, sel";var y1U="ect, textarea";var j2y=L1U;j2y+=G9h.h4Z;if(this[i1Z][j2y][p4U]){var W2y=B1Z;W2y+=K1U;this[W2y](v1U);}else{var J2y=u9Z;J2y+=G9h.t4Z;J2y+=K9Z;var H2y=p1U;H2y+=y1U;$(H2y,this[J2y][f4U])[p4U]();}return this;},get:function(){var M1U='get';var i2y=u9Z;i2y+=G9h.h4Z;i2y+=V1Z;var q2y=s7Z;q2y+=G9h.F1Z;if(this[s1U]()){return undefined;}G9h[q2y]();var val=this[k0Z](M1U);return val!==undefined?val:this[i2y]();},hide:function(animate){var a1U="isp";var W1U="Up";var J1U="ntai";var e2y=j1U;e2y+=m5Z;e2y+=G9h.h4Z;e2y+=W1U;var D2y=u9Z;D2y+=L1Z;D2y+=i1Z;D2y+=C5Z;var m2y=H1U;m2y+=J1U;m2y+=D1Z;m2y+=O2Z;var a2y=u9Z;a2y+=u6Z;var el=this[a2y][m2y];if(animate===undefined){animate=A8Z;}G9h[N8Z]();if(this[i1Z][q1U][D2y]()&&animate&&$[G8Z][e2y]){el[i1U]();}else{var Z2y=u9Z;Z2y+=a1U;Z2y+=t3Z;Z2y+=L2Z;el[g4U](Z2y,E4U);}return this;},label:function(str){var e1U="eta";var m1U="appen";var A1U="elI";var Q2y=m1U;Q2y+=u9Z;var C2y=D1U;C2y+=K1Z;var b2y=u9Z;b2y+=e1U;b2y+=v2Z;b2y+=p2Z;var T2y=Z1U;T2y+=A1U;T2y+=X3Z;var r2y=K1Z;r2y+=Y3Z;r2y+=G9h.h4Z;r2y+=K1Z;var A2y=Y8Z;A2y+=K9Z;var label=this[A2y][r2y];G9h[G9h.I4Z]();var labelInfo=this[b4U][T2y][b2y]();if(str===undefined){var B2y=p2Z;B2y+=H1Z;B2y+=K9Z;B2y+=K1Z;return label[B2y]();}label[C2y](str);label[Q2y](labelInfo);return this;},labelInfo:function(msg){var r1U="labelI";var T1U="sg";var f2y=r1U;f2y+=X3Z;var R2y=u9Z;R2y+=G9h.t4Z;R2y+=K9Z;var S2y=k4U;S2y+=T1U;var Y2y=G9h.U1Z;Y2y+=G9h.F1Z;G9h[Y2y]();return this[S2y](this[R2y][f2y],msg);},message:function(msg,fn){var b1U="fieldMessage";var g2y=u9Z;g2y+=G9h.t4Z;g2y+=K9Z;var n2y=B1Z;n2y+=K9Z;n2y+=i1Z;n2y+=P2Z;return this[n2y](this[g2y][b1U],msg,fn);},multiGet:function(id){var E2y=G9h.U1Z;E2y+=G9h.F1Z;var value;var multiValues=this[i1Z][B1U];var multiIds=this[i1Z][G1U];var isMultiValue=this[s1U]();G9h[E2y]();if(id===undefined){var h2y=C1U;h2y+=G9h.U1Z;h2y+=K1Z;var fieldVal=this[h2y]();value={};for(var i=X4Z;i<multiIds[m8Z];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else{value=this[v4U]();}return value;},multiRestore:function(){var Q1U="Value";var k2y=b8Z;k2y+=p9Z;k2y+=Q1U;this[i1Z][k2y]=A8Z;this[Y1U]();},multiSet:function(id,val){var l7y=S1U;l7y+=K1Z;l7y+=G9h.U1Z;l7y+=R1U;var I2y=q3Z;I2y+=f1U;I2y+=i1Z;var multiValues=this[i1Z][B1U];var multiIds=this[i1Z][I2y];if(val===undefined){val=id;id=undefined;}var set=function(idSrc,val){var g1U="ush";if($[n1U](multiIds)===-o4Z){var t2y=s7Z;t2y+=g1U;multiIds[t2y](idSrc);}multiValues[idSrc]=val;};if($[l7y](val)&&id===undefined){var x7y=N4U;x7y+=v2Z;x7y+=p2Z;$[x7y](val,function(idSrc,innerVal){var P7y=s7Z;P7y+=G9h.F1Z;G9h[P7y]();set(idSrc,innerVal);});}else if(id===undefined){var z7y=G9h.h4Z;z7y+=G9h.U1Z;z7y+=v2Z;z7y+=p2Z;$[z7y](multiIds,function(i,idSrc){set(idSrc,val);});}else{set(id,val);}this[i1Z][E1U]=A8Z;this[Y1U]();return this;},name:function(){var U7y=G9h.U1Z;U7y+=G9h.F1Z;G9h[U7y]();return this[i1Z][L4U][y0Z];},node:function(){G9h[N8Z]();return this[b4U][f4U][X4Z];},processing:function(set){var k1U="sin";var X7y=D1Z;X7y+=G9h.t4Z;X7y+=D1Z;X7y+=G9h.h4Z;var G7y=v2Z;G7y+=i1Z;G7y+=i1Z;var F7y=h1U;F7y+=k1U;F7y+=P2Z;this[b4U][F7y][G7y](U4U,set?I1U:X7y);return this;},set:function(val,multiCheck){var p9U="_multiVal";var K9U="isArr";var t1U="enti";var l9U="Decode";var y9U="ueCheck";var v9U='set';var v7y=B1Z;v7y+=L1U;v7y+=Z4U;var L7y=t1U;L7y+=v7Z;L7y+=l9U;var decodeFn=function(d){var O9U='>';var x9U="repl";var V9U='\'';var F9U="repla";var u9U='"';var X9U="plac";var L9U='\n';var c9U='<';var P9U="ace";var w9U='£';var V7y=x9U;V7y+=P9U;var w7y=x9U;w7y+=P9U;var u7y=z9U;u7y+=U9U;u7y+=Y9Z;var N7y=F9U;N7y+=Y9Z;var c7y=G9U;c7y+=t3Z;c7y+=v2Z;c7y+=G9h.h4Z;var O7y=h9Z;O7y+=G9h.h4Z;O7y+=X9U;O7y+=G9h.h4Z;var d7y=G9U;d7y+=K1Z;d7y+=o9U;d7y+=G9h.h4Z;var o7y=d9U;o7y+=L1Z;o7y+=D1Z;o7y+=P2Z;return typeof d!==o7y?d:d[d7y](/&gt;/g,O9U)[O7y](/&lt;/g,c9U)[c7y](/&amp;/g,N9U)[N7y](/&quot;/g,u9U)[u7y](/&#163;/g,w9U)[w7y](/&#39;/g,V9U)[V7y](/&#10;/g,L9U);};this[i1Z][E1U]=D8Z;var decode=this[i1Z][L4U][L7y];if(decode===undefined||decode===A8Z){var K7y=K9U;K7y+=G9h.U1Z;K7y+=L2Z;if($[K7y](val)){for(var i=X4Z,ien=val[m8Z];i<ien;i++){val[i]=decodeFn(val[i]);}}else{val=decodeFn(val);}}this[v7y](v9U,val);if(multiCheck===undefined||multiCheck===A8Z){var p7y=p9U;p7y+=y9U;this[p7y]();}return this;},show:function(animate){var s9U="contain";var s7y=s9U;s7y+=O2Z;var y7y=Y8Z;y7y+=K9Z;var el=this[y7y][s7y];G9h[N8Z]();if(animate===undefined){animate=A8Z;}if(this[i1Z][q1U][M9U]()&&animate&&$[G8Z][j9U]){el[j9U]();}else{el[g4U](U4U,U8Z);;}return this;},val:function(val){var M7y=s7Z;M7y+=G9h.F1Z;G9h[M7y]();return val===undefined?this[W9U]():this[H9U](val);},compare:function(value,original){var J9U="compar";var j7y=J9U;j7y+=G9h.h4Z;var compare=this[i1Z][L4U][j7y]||_deepCompare;G9h[N8Z]();return compare(value,original);},dataSrc:function(){var W7y=u9Z;W7y+=q9U;W7y+=G9h.U1Z;return this[i1Z][L4U][W7y];},destroy:function(){var D9U="eF";var m9U="_typ";var q7y=r1Z;q7y+=i1Z;q7y+=i9U;q7y+=a9U;var J7y=m9U;J7y+=D9U;J7y+=D1Z;var H7y=e9U;H7y+=G9h.t4Z;H7y+=Z9U;this[b4U][f4U][H7y]();this[J7y](q7y);return this;},multiEditable:function(){return this[i1Z][L4U][A9U];},multiIds:function(){var r9U="ltiIds";var a7y=W5Z;a7y+=r9U;var i7y=s7Z;i7y+=G9h.F1Z;G9h[i7y]();return this[i1Z][a7y];},multiInfoShown:function(show){var m7y=u9Z;m7y+=G9h.t4Z;m7y+=K9Z;this[m7y][T9U][g4U]({display:show?I1U:E4U});},multiReset:function(){var b9U="ltiValues";var D7y=W5Z;D7y+=b9U;G9h[N8Z]();this[i1Z][G1U]=[];this[i1Z][D7y]={};},submittable:function(){var Z7y=i1Z;Z7y+=E7Z;Z7y+=B9U;Z7y+=C9U;var e7y=G9h.t4Z;e7y+=s7Z;e7y+=H1Z;e7y+=i1Z;G9h[G9h.I4Z]();return this[i1Z][e7y][Z7y];},valFromData:t0Z,valToData:t0Z,_errorNode:function(){G9h[G9h.I4Z]();return this[b4U][P1U];},_msg:function(el,msg,fn){var S9U="ctio";var Q9U="anim";var E9U="ock";var g9U=":visible";var Q7y=Q9U;Q7y+=B2Z;var C7y=L1Z;C7y+=i1Z;var B7y=k7Z;B7y+=Y9U;var r7y=M4U;r7y+=S9U;r7y+=D1Z;var A7y=s7Z;A7y+=G9h.F1Z;G9h[A7y]();if(msg===undefined){return el[R9U]();}if(typeof msg===r7y){var b7y=f9U;b7y+=p5Z;var T7y=n9U;T7y+=s7Z;T7y+=L1Z;var editor=this[i1Z][q1U];msg=msg(editor,new DataTable[T7y](editor[i1Z][b7y]));}if(el[B7y]()[C7y](g9U)&&$[G8Z][Q7y]){el[R9U](msg);if(msg){el[j9U](fn);;}else{el[i1U](fn);}}else{var S7y=D1Z;S7y+=G9h.t4Z;S7y+=D1Z;S7y+=G9h.h4Z;var Y7y=q9Z;Y7y+=K1Z;Y7y+=E9U;el[R9U](msg||U8Z)[g4U](U4U,msg?Y7y:S7y);if(fn){fn();}}return this;},_multiValueCheck:function(){var F2U="loc";var d2U="ontrol";var k9U="oEdit";var O2U="bloc";var I9U="inf";var z2U="rn";var x2U="ultiR";var c2U="noMulti";var P2U="etu";var h9U="ltiN";var o2U="putC";var u5y=K9Z;u5y+=E7Z;u5y+=h9U;u5y+=k9U;var N5y=I9U;N5y+=G9h.t4Z;var c5y=p2Z;c5y+=H1Z;c5y+=K9Z;c5y+=K1Z;var O5y=b8Z;O5y+=H1Z;O5y+=L1Z;var d5y=t9U;d5y+=D1Z;var o5y=D1Z;o5y+=X2Z;o5y+=G9h.h4Z;var X5y=l2U;X5y+=P2Z;X5y+=H1Z;X5y+=p2Z;var G5y=v2Z;G5y+=i1Z;G5y+=i1Z;var F5y=K9Z;F5y+=x2U;F5y+=P2U;F5y+=z2U;var U5y=u9Z;U5y+=G9h.t4Z;U5y+=K9Z;var last;var ids=this[i1Z][G1U];var values=this[i1Z][B1U];var isMultiValue=this[i1Z][E1U];var isMultiEditable=this[i1Z][L4U][A9U];var val;var different=D8Z;if(ids){var R7y=l2U;R7y+=U2U;for(var i=X4Z;i<ids[R7y];i++){val=values[ids[i]];if(i>X4Z&&!_deepCompare(val,last)){different=A8Z;break;}last=val;}}if(different&&isMultiValue||!isMultiEditable&&this[s1U]()){var I7y=q9Z;I7y+=F2U;I7y+=J6Z;var k7y=v2Z;k7y+=G2U;var h7y=b8Z;h7y+=p9Z;var E7y=u9Z;E7y+=G9h.t4Z;E7y+=K9Z;var g7y=X2U;g7y+=D1Z;g7y+=G9h.h4Z;var n7y=i5Z;n7y+=o2U;n7y+=d2U;var f7y=u9Z;f7y+=G9h.t4Z;f7y+=K9Z;this[f7y][n7y][g4U]({display:g7y});this[E7y][h7y][k7y]({display:I7y});}else{var z5y=v2Z;z5y+=i1Z;z5y+=i1Z;var P5y=b8Z;P5y+=H1Z;P5y+=L1Z;var x5y=u9Z;x5y+=G9h.t4Z;x5y+=K9Z;var l5y=O2U;l5y+=J6Z;var t7y=v2Z;t7y+=i1Z;t7y+=i1Z;this[b4U][R0Z][t7y]({display:l5y});this[x5y][P5y][z5y]({display:E4U});if(isMultiValue&&!different){this[H9U](last,D8Z);}}this[U5y][F5y][G5y]({display:ids&&ids[X5y]>o4Z&&different&&!isMultiValue?I1U:o5y});var i18n=this[i1Z][q1U][d5y][O5y];G9h[G9h.I4Z]();this[b4U][T9U][c5y](isMultiEditable?i18n[N5y]:i18n[c2U]);this[b4U][q3Z][N2U](this[i1Z][B4U][u5y],!isMultiEditable);this[i1Z][q1U][u2U]();return A8Z;},_typeFn:function(name){var w2U="unshi";var K5y=w2U;K5y+=V2U;var L5y=G9h.U1Z;L5y+=G9h.F1Z;var V5y=i1Z;V5y+=L2U;V5y+=V1Z;V5y+=H1Z;var w5y=v2Z;w5y+=G9h.U1Z;w5y+=K1Z;w5y+=K1Z;var args=Array[i4U][J4U][w5y](arguments);args[V5y]();G9h[L5y]();args[K5y](this[i1Z][L4U]);var fn=this[i1Z][i7Z][name];if(fn){return fn[q4U](this[i1Z][q1U],args);}}};Editor[v5y][p5y]={};Editor[y5y][s5y]={"className":G9h.k4Z,"data":G9h.k4Z,"def":G9h.k4Z,"fieldInfo":G9h.k4Z,"id":G9h.k4Z,"label":G9h.k4Z,"labelInfo":G9h.k4Z,"name":t0Z,"type":K2U,"message":G9h.k4Z,"multiEditable":A8Z,"submit":A8Z};Editor[F4U][v2U][p2U]={type:t0Z,name:t0Z,classes:t0Z,opts:t0Z,host:t0Z};Editor[F4U][M5y][j5y]={container:t0Z,label:t0Z,labelInfo:t0Z,fieldInfo:t0Z,fieldError:t0Z,fieldMessage:t0Z};Editor[W5y]={};Editor[v2U][H5y]={"init":function(dte){},"open":function(dte,append,fn){},"close":function(dte,fn){}};Editor[v2U][y2U]={"create":function(conf){},"get":function(conf){},"set":function(conf,val){},"enable":function(conf){},"disable":function(conf){}};Editor[v2U][J5y]={"ajaxUrl":t0Z,"ajax":t0Z,"dataSource":t0Z,"domTable":t0Z,"opts":t0Z,"displayController":t0Z,"fields":{},"order":[],"id":-o4Z,"displayed":D8Z,"processing":D8Z,"modifier":t0Z,"action":t0Z,"idSrc":t0Z,"unique":X4Z};Editor[v2U][s2U]={"label":t0Z,"fn":t0Z,"className":t0Z};Editor[v2U][q5y]={onReturn:M2U,onBlur:i5y,onBackground:j2U,onComplete:a5y,onEsc:m5y,onFieldError:D5y,submit:W2U,focus:X4Z,buttons:A8Z,title:A8Z,message:A8Z,drawType:D8Z,scope:H2U};Editor[e5y]={};(function(){var e2U="del";var r5U='<div class="DTED_Lightbox_Background"><div/></div>';var m2U="per\">";var Z2U="lightb";var e5U='<div class="DTED DTED_Lightbox_Wrapper">';var Z5U='<div class="DTED_Lightbox_Container">';var i2U="<div class=\"DTED_Lightbo";var W4Z=25;var D2U="displayControll";var f7U="scrollTop";var A5U='<div class="DTED_Lightbox_Content">';var a2U="_Content_Wrap";var T5U='<div class="DTED_Lightbox_Close"></div>';var J2U="ligh";var k7U='div.DTED_Lightbox_Shown';var n7U="orientation";var I2U="ghtbo";var l8y=v2Z;l8y+=G9h.t4Z;l8y+=D1Z;l8y+=V1Z;var t6y=J2U;t6y+=H1Z;t6y+=q9Z;t6y+=q2U;var I6y=I5Z;I6y+=t5Z;var k6y=i2U;k6y+=W1Z;k6y+=a2U;k6y+=m2U;var r5y=D2U;r5y+=O2Z;var A5y=K9Z;A5y+=G9h.t4Z;A5y+=e2U;A5y+=i1Z;var Z5y=Z2U;Z5y+=q2U;var self;Editor[M9U][Z5y]=$[u0Z](A8Z,{},Editor[A5y][r5y],{"init":function(dte){var A2U="_init";var T5y=G9h.U1Z;T5y+=G9h.F1Z;self[A2U]();G9h[T5y]();return self;},"open":function(dte,append,callback){var S5y=t2Z;S5y+=p2Z;S5y+=r2U;var Y5y=t2Z;Y5y+=s5Z;Y5y+=T2U;var Q5y=x6Z;Q5y+=P6Z;Q5y+=G9h.h4Z;var C5y=b2U;C5y+=D1Z;C5y+=u9Z;var B5y=B2U;B5y+=c5Z;var b5y=t2Z;b5y+=s5Z;b5y+=M5Z;b5y+=D1Z;if(self[b5y]){if(callback){callback();}return;}self[B5y]=dte;var content=self[C2U][Q2U];content[Y2U]()[S2U]();content[C5y](append)[R2U](self[C2U][Q5y]);self[Y5y]=A8Z;self[S5y](callback);},"close":function(dte,callback){var f2U="how";var g2U="_shown";var n5y=B2U;n5y+=c5Z;var f5y=G9h.U1Z;f5y+=G9h.F1Z;var R5y=t2Z;R5y+=f2U;R5y+=D1Z;if(!self[R5y]){if(callback){callback();}return;}G9h[f5y]();self[n5y]=dte;self[n2U](callback);self[g2U]=D8Z;},node:function(dte){var g5y=E2U;g5y+=G9h.U1Z;g5y+=s7Z;g5y+=h2U;return self[C2U][g5y][X4Z];},"_init":function(){var t2U="x_";var x7U="_ready";var P7U='opacity';var k2U="div.DTED_Li";var k5y=v2Z;k5y+=i1Z;k5y+=i1Z;var h5y=k2U;h5y+=I2U;h5y+=t2U;h5y+=l7U;var E5y=H1U;E5y+=D1Z;E5y+=H1Z;E5y+=r9Z;G9h[N8Z]();if(self[x7U]){return;}var dom=self[C2U];dom[E5y]=$(h5y,self[C2U][A0Z]);dom[A0Z][k5y](P7U,X4Z);dom[z7U][g4U](P7U,X4Z);},"_show":function(callback){var a7U='auto';var w7U="backgro";var X7U="resize.DTED_L";var D7U="offsetAni";var G7U="Top";var e7U="_heightCalc";var K7U="dte";var U7U="ody";var h7U='<div class="DTED_Lightbox_Shown"/>';var M7U="orie";var d7U="tb";var c7U="div.DTED_Lightbox_Content_W";var q7U='DTED_Lightbox_Mobile';var i7U='height';var E7U="not";var j7U="nta";var F7U="_scroll";var J6y=q9Z;J6y+=U7U;var H6y=F7U;H6y+=G7U;var W6y=X7U;W6y+=o7U;W6y+=d7U;W6y+=q2U;var j6y=q9Z;j6y+=i5Z;j6y+=u9Z;var K6y=q9Z;K6y+=O7U;var L6y=c7U;L6y+=N7U;var V6y=u7U;V6y+=h1Z;var w6y=w7U;w6y+=V7U;var u6y=G9h.U1Z;u6y+=G9h.F1Z;var O6y=u7U;O6y+=D1Z;O6y+=u9Z;var d6y=v2Z;d6y+=R5Z;d6y+=i1Z;d6y+=G9h.h4Z;var X6y=B1Z;X6y+=L7U;var G6y=B1Z;G6y+=K7U;var F6y=v7U;F6y+=h9Z;var U6y=B1Z;U6y+=Y8Z;U6y+=K9Z;var z6y=p7U;z6y+=G7Z;z6y+=h1Z;var P6y=v2Z;P6y+=i1Z;P6y+=i1Z;var x6y=y7U;x6y+=s7U;var t5y=M7U;t5y+=j7U;t5y+=E5Z;var I5y=B2U;I5y+=G9h.t4Z;I5y+=K9Z;var that=this;var dom=self[I5y];if(window[t5y]!==undefined){var l6y=W7U;l6y+=H7U;$(l6y)[J7U](q7U);}dom[x6y][P6y](i7U,a7U);dom[A0Z][g4U]({top:-self[m7U][D7U]});$(n4U)[z6y](self[C2U][z7U])[R2U](self[U6y][A0Z]);self[e7U]();self[Z7U][A7U](dom[F6y],{opacity:o4Z,top:X4Z},callback);self[G6y][X6y](dom[z7U],{opacity:o4Z});setTimeout(function(){var T7U='text-indent';var o6y=G9h.U1Z;o6y+=G9h.F1Z;G9h[o6y]();$(r7U)[g4U](T7U,-o4Z);},V4Z);dom[d6y][O6y](b7U,function(e){var N6y=v2Z;N6y+=K1Z;N6y+=P6Z;N6y+=G9h.h4Z;var c6y=G9h.U1Z;c6y+=G9h.F1Z;G9h[c6y]();self[Z7U][N6y]();});G9h[u6y]();dom[w6y][V6y](b7U,function(e){self[Z7U][z7U]();});$(L6y,dom[A0Z])[K6y](b7U,function(e){var Y7U='DTED_Lightbox_Content_Wrapper';var C7U="sC";var y6y=B7U;y6y+=C7U;y6y+=t4U;var p6y=H1Z;p6y+=G9h.U1Z;p6y+=Q7U;p6y+=H1Z;var v6y=s7Z;v6y+=G9h.F1Z;G9h[v6y]();if($(e[p6y])[y6y](Y7U)){var M6y=S7U;M6y+=R7U;M6y+=h1Z;var s6y=B1Z;s6y+=K7U;self[s6y][M6y]();}});$(window)[j6y](W6y,function(){self[e7U]();});self[H6y]=$(J6y)[f7U]();if(window[n7U]!==undefined){var i6y=X2U;i6y+=H1Z;var q6y=g7U;q6y+=L2Z;var kids=$(q6y)[Y2U]()[i6y](dom[z7U])[E7U](dom[A0Z]);$(n4U)[R2U](h7U);$(k7U)[R2U](kids);}},"_heightCalc":function(){var z5U="ooter";var t7U="ody_Cont";var P5U="iv.DTE_";var l5U="outerHei";var I7U="div.DTE_B";var A6y=I7U;A6y+=t7U;A6y+=J8Z;A6y+=H1Z;var Z6y=l5U;Z6y+=x5U;var e6y=u9Z;e6y+=P5U;e6y+=o2Z;e6y+=z5U;var D6y=U5U;D6y+=F5U;var m6y=s7Z;m6y+=G9h.F1Z;var a6y=B1Z;a6y+=u9Z;a6y+=u6Z;var dom=self[a6y];G9h[m6y]();var maxHeight=$(window)[D6y]()-self[m7U][G5U]*d4Z-$(X5U,dom[A0Z])[o5U]()-$(e6y,dom[A0Z])[Z6y]();$(A6y,dom[A0Z])[g4U](d5U,maxHeight);},"_hide":function(callback){var s5U="remo";var O5U="nbin";var N5U="TED_Li";var D5U='resize.DTED_Lightbox';var y5U="tbox_Mobile";var w5U="Ani";var p5U="DTED_L";var c5U="click.D";var J5U="_scrollTop";var M5U="veCl";var K5U="_ani";var h6y=E7Z;h6y+=O5U;h6y+=u9Z;var E6y=c5U;E6y+=N5U;E6y+=I2U;E6y+=W1Z;var f6y=u5U;f6y+=H1Z;f6y+=w5U;var R6y=H1U;R6y+=V5U;var S6y=E2U;S6y+=L5U;var Y6y=K5U;Y6y+=v5U;Y6y+=H1Z;Y6y+=G9h.h4Z;var Q6y=B2U;Q6y+=H1Z;Q6y+=G9h.h4Z;var C6y=p5U;C6y+=o7U;C6y+=y5U;var B6y=s5U;B6y+=M5U;B6y+=j5U;var b6y=g7U;b6y+=L2Z;var r6y=B1Z;r6y+=u9Z;r6y+=G9h.t4Z;r6y+=K9Z;var dom=self[r6y];if(!callback){callback=function(){};}if(window[n7U]!==undefined){var T6y=h9Z;T6y+=W5U;T6y+=G9h.h4Z;var show=$(k7U);show[Y2U]()[H5U](n4U);show[T6y]();}$(b6y)[B6y](C6y)[f7U](self[J5U]);self[Q6y][Y6y](dom[S6y],{opacity:X4Z,top:self[R6y][f6y]},function(){$(this)[S2U]();callback();});self[Z7U][A7U](dom[z7U],{opacity:X4Z},function(){var g6y=u9Z;g6y+=q5U;g6y+=p2Z;var n6y=s7Z;n6y+=G9h.F1Z;G9h[n6y]();$(this)[g6y]();});dom[i5U][a5U](b7U);dom[z7U][a5U](E6y);$(m5U,dom[A0Z])[h6y](b7U);$(window)[a5U](D5U);},"_dte":t0Z,"_ready":D8Z,"_shown":D8Z,"_dom":{"wrapper":$(e5U+Z5U+k6y+A5U+g0Z+g0Z+g0Z+g0Z),"background":$(r5U),"close":$(T5U),"content":t0Z}});G9h[N8Z]();self=Editor[I6y][t6y];self[l8y]={"offsetAni":W4Z,"windowPadding":W4Z};}());(function(){var L3U='<div class="DTED_Envelope_Container"></div>';var Y5U="<div class=\"DTED_Envelop";var X8U="round";var x6U="dels";var B5U="nvelope";var B6U="roun";var n5U="<div class=\"D";var R5U="div/></div>";var L8U='normal';var k5U="pper\">";var X6U="appendChild";var g5U="TED_Envelope_Shadow";var Q5U="ss=\"DTED_Envelope_Close\">&times;</div>";var S5U="e_Background\"><";var e4Z=50;var h5U="<div class=\"DTED DTED_Envelope_Wra";var z6U="envelope";var E5U="\"></di";var Y4Z=600;var t5U="ntro";var a0y=u5Z;a0y+=M5Z;var i0y=v2Z;i0y+=b5U;var q0y=G9h.h4Z;q0y+=B5U;var J0y=C5U;J0y+=Q5U;var H0y=Y5U;H0y+=S5U;H0y+=R5U;var W0y=H3Z;W0y+=f5U;var j0y=n5U;j0y+=g5U;j0y+=E5U;j0y+=f3Z;var M0y=h5U;M0y+=k5U;var U8y=M9U;U8y+=I5U;U8y+=t5U;U8y+=l6U;var z8y=K9Z;z8y+=G9h.t4Z;z8y+=x6U;var P8y=t9Z;P8y+=c5Z;P8y+=h1Z;var x8y=r5Z;x8y+=P6U;x8y+=t5Z;var self;Editor[x8y][z6U]=$[P8y](A8Z,{},Editor[z8y][U8y],{"init":function(dte){var F8y=U6U;F8y+=D1Z;F8y+=C9U;self[Z7U]=dte;self[F8y]();return self;},"open":function(dte,append,callback){var F6U="pendC";var G6U="ildren";var N8y=x6Z;N8y+=G9h.t4Z;N8y+=x9Z;var c8y=v2Z;c8y+=O6Z;c8y+=r9Z;var O8y=p7U;O8y+=F6U;O8y+=L2U;O8y+=q1Z;var d8y=B1Z;d8y+=b4U;var o8y=K8Z;o8y+=G6U;var X8y=H1U;X8y+=s7U;X8y+=r9Z;var G8y=B2U;G8y+=c5Z;self[G8y]=dte;$(self[C2U][X8y])[o8y]()[S2U]();G9h[G9h.I4Z]();self[d8y][Q2U][O8y](append);self[C2U][c8y][X6U](self[C2U][N8y]);self[o6U](callback);},"close":function(dte,callback){var u8y=s7Z;u8y+=G9h.F1Z;self[Z7U]=dte;G9h[u8y]();self[n2U](callback);},node:function(dte){var V8y=d6U;V8y+=G7Z;V8y+=h9Z;var w8y=B1Z;w8y+=Y8Z;w8y+=K9Z;return self[w8y][V8y][X4Z];},"_init":function(){var i6U="_cssBackgroundOpacity";var N6U="sbility";var p6U="dden";var V6U="pacity";var H6U="_r";var s6U="div.D";var O6U="vi";var L6U="ground";var c6U="ibl";var W6U="ope_Container";var j6U="vel";var M6U="TED_En";var q6U="visbility";var y6U="gro";var u6U="yl";var w6U="_do";var e8y=O6U;e8y+=i1Z;e8y+=c6U;e8y+=G9h.h4Z;var D8y=O6U;D8y+=N6U;var m8y=i1Z;m8y+=H1Z;m8y+=u6U;m8y+=G9h.h4Z;var a8y=w6U;a8y+=K9Z;var i8y=z4U;i8y+=G9h.h4Z;var q8y=Y4U;q8y+=G9h.U1Z;q8y+=L2Z;var J8y=G9h.t4Z;J8y+=V6U;var H8y=v2Z;H8y+=i1Z;H8y+=i1Z;var W8y=S7U;W8y+=L6U;var j8y=B1Z;j8y+=u9Z;j8y+=u6Z;var M8y=B5Z;M8y+=K6U;M8y+=v6U;var s8y=B1Z;s8y+=u9Z;s8y+=u6Z;var y8y=L2U;y8y+=p6U;var p8y=S7U;p8y+=y6U;p8y+=V7U;var v8y=B1Z;v8y+=u9Z;v8y+=u6Z;var K8y=s6U;K8y+=M6U;K8y+=j6U;K8y+=W6U;var L8y=H6U;L8y+=G9h.h4Z;L8y+=G9h.U1Z;L8y+=H7U;if(self[L8y]){return;}self[C2U][Q2U]=$(K8y,self[C2U][A0Z])[X4Z];self[v8y][p8y][J6U][q6U]=y8y;self[s8y][z7U][J6U][M8y]=I1U;self[i6U]=$(self[j8y][W8y])[H8y](J8y);self[C2U][z7U][J6U][q8y]=i8y;self[a8y][z7U][m8y][D8y]=e8y;},"_show":function(callback){var C6U="dOpacit";var D6U="ick.DTED_Enve";var r6U="croll";var K8U="fadeIn";var a6U="clic";var w8U="offsetHeight";var S6U="kground";var v8U='html,body';var Z6U="win";var t6U="hei";var E6U="opaci";var l8U="Calc";var P8U="ity";var b6U="_cssBackg";var e6U="lop";var y8U="bind";var j8U='click.DTED_Envelope';var F8U="Chi";var n6U="arg";var Y6U="ba";var V8U="opacity";var m6U="k.DTED_Envelope";var O8U="_findAttachRow";var q8U='resize.DTED_Envelope';var I6U="etWid";var g6U="inLe";var A6U="dowS";var G8U="ack";var N8U="px";var T6U="wrapp";var J3y=u7U;J3y+=h1Z;var H3y=d6U;H3y+=h2U;var M3y=a6U;M3y+=m6U;var s3y=S7U;s3y+=R7U;s3y+=h1Z;var y3y=B1Z;y3y+=b4U;var p3y=s7Z;p3y+=G9h.F1Z;var K3y=x6Z;K3y+=D6U;K3y+=e6U;K3y+=G9h.h4Z;var L3y=q9Z;L3y+=i5Z;L3y+=u9Z;var V3y=x6Z;V3y+=G9h.t4Z;V3y+=i1Z;V3y+=G9h.h4Z;var N3y=Z6U;N3y+=A6U;N3y+=r6U;var c3y=v2Z;c3y+=b5U;var O3y=T6U;O3y+=O2Z;var d3y=b6U;d3y+=B6U;d3y+=C6U;d3y+=L2Z;var o3y=B1Z;o3y+=b4U;var X3y=u9Z;X3y+=Q6U;var G3y=B1Z;G3y+=b4U;var F3y=Y6U;F3y+=v2Z;F3y+=S6U;var U3y=B1Z;U3y+=u9Z;U3y+=G9h.t4Z;U3y+=K9Z;var z3y=s7Z;z3y+=W1Z;var P3y=j5Z;P3y+=s7Z;var x3y=G9h.t4Z;x3y+=R6U;x3y+=i1Z;x3y+=f6U;var l3y=H1Z;l3y+=G9h.t4Z;l3y+=s7Z;var t8y=d6U;t8y+=s7Z;t8y+=G9h.h4Z;t8y+=h9Z;var I8y=B1Z;I8y+=b4U;var k8y=K9Z;k8y+=n6U;k8y+=g6U;k8y+=V2U;var h8y=i1Z;h8y+=v7Z;h8y+=K1Z;h8y+=G9h.h4Z;var E8y=s7Z;E8y+=W1Z;var g8y=B1Z;g8y+=b4U;var n8y=E6U;n8y+=v7Z;var f8y=X2U;f8y+=O1U;var R8y=u9Z;R8y+=L1Z;R8y+=h6U;R8y+=L2Z;var S8y=k6U;S8y+=i1Z;S8y+=I6U;S8y+=q8Z;var Y8y=B1Z;Y8y+=t6U;Y8y+=x5U;Y8y+=l8U;var Q8y=x8U;Q8y+=o9U;Q8y+=P8U;var C8y=z8U;C8y+=K1Z;C8y+=G9h.h4Z;var B8y=G9h.U1Z;B8y+=u1U;B8y+=G9h.t4Z;var b8y=z8U;b8y+=K1Z;b8y+=G9h.h4Z;var T8y=B2U;T8y+=G9h.t4Z;T8y+=K9Z;var r8y=G9h.U1Z;r8y+=U8U;r8y+=F8U;r8y+=q1Z;var A8y=q9Z;A8y+=G8U;A8y+=P2Z;A8y+=X8U;var Z8y=B1Z;Z8y+=u9Z;Z8y+=G9h.t4Z;Z8y+=K9Z;var that=this;var formHeight;if(!callback){callback=function(){};}document[o8U][X6U](self[Z8y][A8y]);document[o8U][r8y](self[T8y][A0Z]);self[C2U][Q2U][b8y][d8U]=B8y;var style=self[C2U][A0Z][C8y];style[Q8y]=X4Z;style[M9U]=I1U;var targetRow=self[O8U]();var height=self[Y8y]();var width=targetRow[S8y];style[R8y]=f8y;style[n8y]=o4Z;self[g8y][A0Z][J6U][c8U]=width+E8y;self[C2U][A0Z][h8y][k8y]=-(width/d4Z)+N8U;self[I8y][t8y][J6U][l3y]=$(targetRow)[x3y]()[u8U]+targetRow[w8U]+N8U;self[C2U][Q2U][J6U][P3y]=-o4Z*height-s4Z+z3y;self[U3y][F3y][J6U][V8U]=X4Z;self[G3y][z7U][J6U][X3y]=I1U;$(self[o3y][z7U])[L7U]({'opacity':self[d3y]},L8U);$(self[C2U][O3y])[K8U]();if(self[c3y][N3y]){$(v8U)[L7U]({"scrollTop":$(targetRow)[p8U]()[u8U]+targetRow[w8U]-self[m7U][G5U]},function(){var u3y=H1U;u3y+=D1Z;u3y+=c5Z;u3y+=s7U;$(self[C2U][u3y])[L7U]({"top":X4Z},Y4Z,callback);});}else{var w3y=B2U;w3y+=G9h.t4Z;w3y+=K9Z;$(self[w3y][Q2U])[L7U]({"top":X4Z},Y4Z,callback);}$(self[C2U][V3y])[L3y](K3y,function(e){var v3y=x6Z;v3y+=z6Z;G9h[N8Z]();self[Z7U][v3y]();});G9h[p3y]();$(self[y3y][s3y])[y8U](M3y,function(e){var s8U="backg";var W3y=s8U;W3y+=h9Z;W3y+=M8U;var j3y=B2U;j3y+=c5Z;G9h[N8Z]();self[j3y][W3y]();});$(m5U,self[C2U][H3y])[J3y](j8U,function(e){var W8U="sClass";var J8U="bac";var H8U='DTED_Envelope_Content_Wrapper';var i3y=B7U;i3y+=W8U;var q3y=H1Z;q3y+=G9h.U1Z;q3y+=h9Z;q3y+=W9U;G9h[N8Z]();if($(e[q3y])[i3y](H8U)){var m3y=J8U;m3y+=J6Z;m3y+=R7U;m3y+=h1Z;var a3y=B2U;a3y+=c5Z;self[a3y][m3y]();}});$(window)[y8U](q8U,function(){var m8U="lc";var a8U="htC";var i8U="_heig";var D3y=i8U;D3y+=a8U;D3y+=G9h.U1Z;D3y+=m8U;self[D3y]();});},"_heightCalc":function(){var Y8U="heightCalc";var A8U="div.DTE_Body_C";var Z8U="dt";var D8U="outerH";var e8U="eigh";var b8U="rHeight";var f3y=D8U;f3y+=e8U;f3y+=H1Z;var R3y=u9Z;R3y+=G9h.t4Z;R3y+=K9Z;var S3y=B1Z;S3y+=Z8U;S3y+=G9h.h4Z;var Y3y=d6U;Y3y+=s7Z;Y3y+=G9h.h4Z;Y3y+=h9Z;var Q3y=A8U;Q3y+=r8U;var C3y=T8U;C3y+=G9h.h4Z;C3y+=b8U;var B3y=B1Z;B3y+=Y8Z;B3y+=K9Z;var b3y=v2Z;b3y+=B8U;b3y+=u9Z;b3y+=S4U;var T3y=H1U;T3y+=s7U;T3y+=r9Z;var r3y=B1Z;r3y+=u9Z;r3y+=G9h.t4Z;r3y+=K9Z;var A3y=M5Z;A3y+=C8U;A3y+=Q8U;A3y+=h9Z;var Z3y=B1Z;Z3y+=u9Z;Z3y+=G9h.t4Z;Z3y+=K9Z;var e3y=H1U;e3y+=V5U;var formHeight;formHeight=self[m7U][Y8U]?self[e3y][Y8U](self[Z3y][A3y]):$(self[r3y][T3y])[b3y]()[d8U]();var maxHeight=$(window)[d8U]()-self[m7U][G5U]*d4Z-$(X5U,self[B3y][A0Z])[o5U]()-$(r7U,self[C2U][A0Z])[C3y]();$(Q3y,self[C2U][Y3y])[g4U](d5U,maxHeight);return $(self[S3y][R3y][A0Z])[f3y]();},"_hide":function(callback){var h8U="_Lightbox";var g8U="unb";var I8U="ackg";var n8U="ick.DTED_Lightbox";var S8U="resize";var P3U="ani";var E8U="click.DTED";var R8U=".DTED_L";var f8U="ightbox";var x3U="Height";var l3U="fse";var o0y=S8U;o0y+=R8U;o0y+=f8U;var X0y=x6Z;X0y+=n8U;var G0y=g8U;G0y+=O7U;var F0y=M5Z;F0y+=N7U;var U0y=B1Z;U0y+=Y8Z;U0y+=K9Z;var z0y=E8U;z0y+=h8U;var P0y=k8U;P0y+=u7U;P0y+=h1Z;var x0y=q9Z;x0y+=I8U;x0y+=B6U;x0y+=u9Z;var h3y=t8U;h3y+=l3U;h3y+=H1Z;h3y+=x3U;var E3y=v2Z;E3y+=X2Z;E3y+=l2Z;E3y+=H1Z;var g3y=P3U;g3y+=K9Z;g3y+=G9h.U1Z;g3y+=c5Z;var n3y=B2U;n3y+=u6Z;if(!callback){callback=function(){};}$(self[n3y][Q2U])[g3y]({"top":-(self[C2U][E3y][h3y]+e4Z)},Y4Z,function(){var z3U="fadeOut";var l0y=q9Z;l0y+=I8U;l0y+=X8U;var t3y=B1Z;t3y+=b4U;var I3y=B1Z;I3y+=u9Z;I3y+=u6Z;var k3y=G9h.U1Z;k3y+=G9h.F1Z;G9h[k3y]();$([self[I3y][A0Z],self[t3y][l0y]])[z3U](L8U,function(){$(this)[U3U]();callback();});});$(self[C2U][i5U])[a5U](b7U);$(self[C2U][x0y])[P0y](z0y);$(m5U,self[U0y][F0y])[G0y](X0y);$(window)[a5U](o0y);},"_findAttachRow":function(){var G3U="_dt";var F3U="rea";var w3U="ier";var c3U='head';var o3U="dataT";var N3U="hea";var L0y=v2Z;L0y+=F3U;L0y+=H1Z;L0y+=G9h.h4Z;var V0y=G9h.U1Z;V0y+=v2Z;V0y+=j4U;V0y+=D1Z;var w0y=G3U;w0y+=G9h.h4Z;var N0y=X3U;N0y+=K8Z;var c0y=H1Z;c0y+=G9h.U1Z;c0y+=k5Z;c0y+=G9h.h4Z;var O0y=o3U;O0y+=d3U;var d0y=s7Z;d0y+=G9h.F1Z;G9h[d0y]();var dt=new $[G8Z][O0y][O3U](self[Z7U][i1Z][c0y]);if(self[m7U][N0y]===c3U){var u0y=N3U;u0y+=r1Z;u0y+=h9Z;return dt[u3U]()[u0y]();}else if(self[w0y][i1Z][V0y]===L0y){var v0y=N3U;v0y+=u9Z;v0y+=O2Z;var K0y=H1Z;K0y+=d3U;return dt[K0y]()[v0y]();}else{var s0y=D1Z;s0y+=G9h.t4Z;s0y+=r1Z;var y0y=J5Z;y0y+=r5Z;y0y+=V1Z;y0y+=w3U;var p0y=B1Z;p0y+=u9Z;p0y+=H1Z;p0y+=G9h.h4Z;return dt[V3U](self[p0y][i1Z][y0y])[s0y]();}},"_dte":t0Z,"_ready":D8Z,"_cssBackgroundOpacity":o4Z,"_dom":{"wrapper":$(M0y+j0y+L3U+W0y)[X4Z],"background":$(H0y)[X4Z],"close":$(J0y)[X4Z],"content":t0Z}});G9h[G9h.I4Z]();self=Editor[M9U][q0y];self[i0y]={"windowPadding":e4Z,"heightCalc":t0Z,"attach":a0y,"windowScroll":A8Z};}());Editor[i4U][K3U]=function(cfg,after){var J3U="Error adding field. The field requires a `name` option";var C3U="ift";var m3U="Error adding field '";var a3U="lready exists with this name";var s3U="reverse";var B3U="unsh";var i3U="'. A field a";var S3U="rd";var Q3U="orde";var p3U="isplayReorder";var I0y=v3U;I0y+=u9Z;I0y+=O2Z;var k0y=B2U;k0y+=p3U;if($[y3U](cfg)){var m0y=p5Z;m0y+=U1U;m0y+=p2Z;if(after!==undefined){cfg[s3U]();}for(var i=X4Z;i<cfg[m0y];i++){this[K3U](cfg[i],after);}}else{var R0y=M3U;R0y+=j3U;var r0y=w6Z;r0y+=G9h.h4Z;var A0y=V1Z;A0y+=e5Z;var Z0y=x6Z;Z0y+=j5U;Z0y+=G9h.h4Z;Z0y+=i1Z;var e0y=W3U;e0y+=H3U;var name=cfg[y0Z];if(name===undefined){throw J3U;}if(this[i1Z][q3U][name]){var D0y=i3U;D0y+=a3U;throw m3U+name+D0y;}this[D3U](e0y,cfg);var field=new Editor[F4U](cfg,this[Z0y][A0y],this);if(this[i1Z][r0y]){var b0y=N4U;b0y+=K8Z;var T0y=e3U;T0y+=F4U;T0y+=i1Z;var editFields=this[i1Z][T0y];field[Z3U]();$[b0y](editFields,function(idSrc,edit){var A3U="tiSet";var S0y=r1Z;S0y+=V1Z;var Y0y=b8Z;Y0y+=A3U;var Q0y=s7Z;Q0y+=G9h.F1Z;var B0y=r3U;B0y+=G9h.U1Z;var val;if(edit[B0y]){var C0y=u9Z;C0y+=G9h.U1Z;C0y+=H1Z;C0y+=G9h.U1Z;val=field[T3U](edit[C0y]);}G9h[Q0y]();field[Y0y](idSrc,val!==undefined?val:field[S0y]());});}this[i1Z][R0y][name]=field;if(after===undefined){this[i1Z][b3U][v8Z](name);}else if(after===t0Z){var n0y=B3U;n0y+=C3U;var f0y=Q3U;f0y+=h9Z;this[i1Z][f0y][n0y](name);}else{var h0y=T5Z;h0y+=Y3U;h0y+=G9h.h4Z;var E0y=G9h.t4Z;E0y+=h9Z;E0y+=r1Z;E0y+=h9Z;var g0y=G9h.t4Z;g0y+=S3U;g0y+=G9h.h4Z;g0y+=h9Z;var idx=$[n1U](after,this[i1Z][g0y]);this[i1Z][E0y][h0y](idx+o4Z,X4Z,name);}}this[k0y](this[I0y]());return this;};Editor[i4U][R3U]=function(newAjax){var l49=G9h.U1Z;l49+=f3U;l49+=n3U;if(newAjax){var t0y=G9h.U1Z;t0y+=f3U;t0y+=G9h.U1Z;t0y+=W1Z;this[i1Z][t0y]=newAjax;return this;}return this[i1Z][l49];};Editor[x49][z7U]=function(){var U49=g3U;U49+=E3U;U49+=H1Z;var z49=q9Z;z49+=K1Z;z49+=E7Z;z49+=h9Z;var P49=h3U;P49+=L1Z;P49+=X2Z;var onBackground=this[i1Z][k3U][I3U];if(typeof onBackground===P49){onBackground(this);}else if(onBackground===z49){this[t3U]();}else if(onBackground===l0U){this[i5U]();}else if(onBackground===U49){this[x0U]();}return this;};Editor[F49][G49]=function(){var X49=B1Z;X49+=k5Z;X49+=P0U;this[X49]();return this;};Editor[o49][d49]=function(cells,fieldNames,show,opts){var z0U="indi";var X0U="Plain";var F0U="formOpti";var U0U="vidual";var u49=z0U;u49+=U0U;var N49=F0U;N49+=X2Z;N49+=i1Z;var c49=G0U;c49+=X0U;c49+=o0U;var that=this;if(this[d0U](function(){var O0U="bubbl";var O49=O0U;O49+=G9h.h4Z;that[O49](cells,fieldNames,opts);})){return this;}if($[c0U](fieldNames)){opts=fieldNames;fieldNames=undefined;show=A8Z;}else if(typeof fieldNames===N0U){show=fieldNames;fieldNames=undefined;opts=undefined;}if($[c49](show)){opts=show;show=A8Z;}if(show===undefined){show=A8Z;}opts=$[u0Z]({},this[i1Z][N49][n5Z],opts);var editFields=this[D3U](u49,cells,fieldNames);this[u0U](cells,editFields,w0U,opts,function(){var K0U="foc";var i0U="epend";var q0U="ag";var v0U="_focu";var D0U="q";var L0U="postope";var x44="prep";var M0U="blePosition";var y0U="nimat";var Q0U="appl";var b0U="r\"><span></div>";var S0U="bbleNod";var V0U="bubb";var f0U="_formOpt";var N44="click";var h0U="concat";var k0U='"><div/></div>';var B0U=" class=";var T0U="<div class=\"DTE_Processing_Indicato";var A0U="poin";var R0U="bb";var g0U='resize.';var m0U="ldren";var X19=V0U;X19+=p5Z;var G19=B1Z;G19+=L0U;G19+=D1Z;var F19=K0U;F19+=E7Z;F19+=i1Z;var U19=v0U;U19+=i1Z;var z19=p0U;z19+=y0U;z19+=G9h.h4Z;var P19=s0U;P19+=M0U;var g49=j0U;g49+=u9Z;var n49=G9h.U1Z;n49+=u9Z;n49+=u9Z;var S49=W0U;S49+=j5Z;S49+=D1Z;S49+=i1Z;var Y49=H1Z;Y49+=H0U;var C49=K9Z;C49+=J0U;C49+=q0U;C49+=G9h.h4Z;var B49=P7Z;B49+=i0U;var b49=p7U;b49+=a0U;var T49=K8Z;T49+=L1Z;T49+=m0U;var r49=G9h.h4Z;r49+=D0U;var A49=K8Z;A49+=e0U;A49+=u9Z;A49+=S4U;var D49=N3Z;D49+=C2Z;D49+=Z0U;var m49=A0U;m49+=H1Z;m49+=O2Z;var a49=r0U;a49+=l3Z;var i49=T0U;i49+=b0U;var q49=N3Z;q49+=C2Z;q49+=P3Z;q49+=l3Z;var J49=N3Z;J49+=l3Z;var H49=N3Z;H49+=l3Z;var W49=N3Z;W49+=l3Z;var j49=E2U;j49+=p7U;j49+=G7Z;j49+=h9Z;var M49=q9Z;M49+=P2Z;var s49=E8Z;s49+=C1U;s49+=B0U;s49+=N3Z;var y49=v2Z;y49+=t4U;y49+=G9h.h4Z;y49+=i1Z;var p49=C0U;p49+=o9U;p49+=p2Z;var v49=Q0U;v49+=L2Z;var K49=Y0U;K49+=S0U;K49+=G9h.h4Z;K49+=i1Z;var L49=G9h.t4Z;L49+=D1Z;var V49=Y0U;V49+=R0U;V49+=p5Z;var w49=f0U;w49+=G6Z;var namespace=that[w49](opts);var ret=that[n0U](V49);if(!ret){return that;}$(window)[L49](g0U+namespace,function(){var E0U="bubblePosition";that[E0U]();});var nodes=[];that[i1Z][K49]=nodes[h0U][v49](nodes,_pluck(editFields,p49));var classes=that[y49][n5Z];var background=$(s49+classes[M49]+k0U);var container=$(Z0Z+classes[j49]+W49+Z0Z+classes[I0U]+H49+Z0Z+classes[u3U]+J49+Z0Z+classes[i5U]+q49+i49+a49+g0Z+Z0Z+classes[m49]+D49+g0Z);if(show){var Z49=g7U;Z49+=L2Z;var e49=q9Z;e49+=G9h.t4Z;e49+=u9Z;e49+=L2Z;container[H5U](e49);background[H5U](Z49);}var liner=container[A49]()[r49](X4Z);var table=liner[Y2U]();var close=table[T49]();liner[b49](that[b4U][t0U]);table[B49](that[b4U][l44]);if(opts[C49]){var Q49=x44;Q49+=P44;liner[Q49](that[b4U][z44]);}if(opts[Y49]){liner[U44](that[b4U][F44]);}if(opts[S49]){var f49=q9Z;f49+=f5Z;var R49=G9h.U1Z;R49+=Q8U;R49+=D1Z;R49+=u9Z;table[R49](that[b4U][f49]);}var pair=$()[n49](container)[g49](background);that[G44](function(submitComplete){G9h[N8Z]();that[A7U](pair,{opacity:X4Z},function(){var d44="ze.";var o44="cI";var X44="_clearDynami";var E49=G9h.U1Z;E49+=G9h.F1Z;G9h[E49]();if(this===container[X4Z]){var t49=V0U;t49+=p5Z;var I49=X44;I49+=o44;I49+=D1Z;I49+=Z9Z;var k49=z9U;k49+=i1Z;k49+=L1Z;k49+=d44;var h49=u9Z;h49+=q5U;h49+=p2Z;pair[h49]();$(window)[k6U](k49+namespace);that[I49]();that[O44](c44,[t49]);}});});background[N44](function(){var l19=k5Z;l19+=P0U;that[l19]();});close[N44](function(){var x19=s7Z;x19+=G9h.F1Z;G9h[x19]();that[u44]();});that[P19]();that[z19](pair,{opacity:o4Z});that[U19](that[i1Z][w44],opts[F19]);that[G19](X19,A8Z);});return this;};Editor[o19][d19]=function(){var C44='left';var s44="engt";var W44="E_Bubble_";var M44="bubbleN";var r44='below';var B44="eCl";var L44="erWi";var V44="fset";var H44="Liner";var v44="eft";var J44="v.DTE_Bubble";var T44="belo";var y44="ott";var e44="right";var y4Z=15;var j44="div.DT";var a19=H1Z;a19+=G9h.t4Z;a19+=s7Z;var i19=t8U;i19+=V44;var q19=v2Z;q19+=i1Z;q19+=i1Z;var J19=T8U;J19+=L44;J19+=K44;var H19=K1Z;H19+=v44;var W19=K1Z;W19+=p44;var j19=q9Z;j19+=y44;j19+=G9h.t4Z;j19+=K9Z;var M19=h9Z;M19+=F5U;var s19=K1Z;s19+=s44;s19+=p2Z;var u19=G9h.h4Z;u19+=G9h.U1Z;u19+=v2Z;u19+=p2Z;var N19=M44;N19+=G9h.t4Z;N19+=u9Z;N19+=v1Z;var c19=j44;c19+=W44;c19+=H44;var O19=r5Z;O19+=J44;var wrapper=$(O19),liner=$(c19),nodes=this[i1Z][N19];var position={top:X4Z,left:X4Z,right:X4Z,bottom:X4Z};$[u19](nodes,function(i,node){var q44="etHeight";var D44="offsetWidth";var i44="tto";var y19=k6U;y19+=i1Z;y19+=q44;var p19=H1Z;p19+=G9h.t4Z;p19+=s7Z;var v19=W7U;v19+=i44;v19+=K9Z;var K19=a44;K19+=x5U;var L19=K1Z;L19+=G9h.h4Z;L19+=V2U;var V19=H1Z;V19+=G9h.t4Z;V19+=s7Z;var w19=u5U;w19+=H1Z;var pos=$(node)[w19]();node=$(node)[W9U](X4Z);position[V19]+=pos[u8U];position[L19]+=pos[m44];position[K19]+=pos[m44]+node[D44];position[v19]+=pos[p19]+node[y19];});position[u8U]/=nodes[s19];position[m44]/=nodes[m8Z];position[M19]/=nodes[m8Z];position[j19]/=nodes[W19];var top=position[u8U],left=(position[H19]+position[e44])/d4Z,width=liner[J19](),visLeft=left-width/d4Z,visRight=visLeft+width,docWidth=$(window)[c8U](),padding=y4Z,classes=this[B4U][n5Z];wrapper[q19]({top:top,left:left});if(liner[m8Z]&&liner[i19]()[a19]<X4Z){var D19=q9Z;D19+=U7Z;D19+=H1Z;D19+=u6Z;var m19=Z44;m19+=i1Z;wrapper[m19](A44,position[D19])[J7U](r44);}else{var Z19=T44;Z19+=M5Z;var e19=b44;e19+=B44;e19+=G9h.U1Z;e19+=G2U;wrapper[e19](Z19);}if(visRight+padding>docWidth){var diff=visRight-docWidth;liner[g4U](C44,visLeft<padding?-(visLeft-padding):-(diff+padding));}else{var A19=Z44;A19+=i1Z;liner[A19](C44,visLeft<padding?-(visLeft-padding):X4Z);}return this;};Editor[i4U][r19]=function(buttons){var Y44="isArra";var B19=Q44;B19+=s7Z;B19+=v7Z;var b19=u9Z;b19+=G9h.t4Z;b19+=K9Z;var T19=Y44;T19+=L2Z;var that=this;if(buttons===S44){buttons=[{text:this[N0Z][this[i1Z][R44]][x0U],action:function(){this[x0U]();}}];}else if(!$[T19](buttons)){buttons=[buttons];}$(this[b19][f44])[B19]();$[n44](buttons,function(i,btn){var X14='<button/>';var x14="abindex";var o14="className";var u14='keypress';var I44="keyu";var O14="tabIndex";var h44="dT";var t44="bI";var z14="lassN";var F14="asse";var U99=q9Z;U99+=u1U;U99+=g44;var z99=p7U;z99+=E44;z99+=h44;z99+=G9h.t4Z;var l99=v2Z;l99+=K1Z;l99+=k44;var E19=I44;E19+=s7Z;var g19=j0Z;g19+=t44;g19+=D1Z;g19+=l14;var n19=H1Z;n19+=x14;var f19=p2Z;f19+=P14;f19+=K1Z;var R19=v2Z;R19+=z14;R19+=U14;R19+=G9h.h4Z;var S19=x6Z;S19+=F14;S19+=i1Z;var Y19=t3Z;Y19+=q9Z;Y19+=G9h.h4Z;Y19+=K1Z;var Q19=c5Z;Q19+=W1Z;Q19+=H1Z;G9h[G9h.I4Z]();if(typeof btn===G14){btn={text:btn,action:function(){var C19=G9h.U1Z;C19+=G9h.F1Z;G9h[C19]();this[x0U]();}};}var text=btn[Q19]||btn[Y19];var action=btn[R44]||btn[G8Z];$(X14,{'class':that[S19][l44][s2U]+(btn[R19]?r0Z+btn[o14]:U8Z)})[f19](typeof text===G9h.d1Z?text(that):text||U8Z)[d14](n19,btn[g19]!==undefined?btn[O14]:X4Z)[X2Z](E19,function(e){var h19=G9h.U1Z;h19+=G9h.F1Z;G9h[h19]();if(e[c14]===v4Z&&action){var k19=v2Z;k19+=G9h.U1Z;k19+=N14;action[k19](that);}})[X2Z](u14,function(e){var V14="ventD";var L14="efa";var I19=G9h.U1Z;I19+=G9h.F1Z;G9h[I19]();if(e[c14]===v4Z){var t19=w14;t19+=V14;t19+=L14;t19+=K14;e[t19]();}})[X2Z](l99,function(e){var x99=s7Z;x99+=G9h.F1Z;e[v14]();G9h[x99]();if(action){var P99=v2Z;P99+=G9h.U1Z;P99+=K1Z;P99+=K1Z;action[P99](that,e);}})[z99](that[b4U][U99]);});return this;};Editor[F99][p14]=function(fieldName){var s14="deFiel";var y14="inclu";var D14="ames";var J14="nclude";var j14="lice";var W14="des";var M14="inArra";var q14="Fields";var K99=G9h.U1Z;K99+=G9h.F1Z;var G99=i1Z;G99+=H1Z;G99+=a44;G99+=I1Z;var that=this;var fields=this[i1Z][q3U];if(typeof fieldName===G99){var N99=y14;N99+=s14;N99+=j3U;var c99=M14;c99+=L2Z;var O99=i1Z;O99+=s7Z;O99+=j14;var d99=G9h.t4Z;d99+=h9Z;d99+=r1Z;d99+=h9Z;var o99=W14;o99+=H1Z;o99+=u5Z;o99+=L2Z;var X99=V1Z;X99+=H14;X99+=u9Z;that[X99](fieldName)[o99]();delete fields[fieldName];var orderIdx=$[n1U](fieldName,this[i1Z][d99]);this[i1Z][b3U][O99](orderIdx,o4Z);var includeIdx=$[c99](fieldName,this[i1Z][N99]);if(includeIdx!==-o4Z){var u99=L1Z;u99+=J14;u99+=q14;this[i1Z][u99][i14](includeIdx,o4Z);}}else{var V99=B1Z;V99+=a14;V99+=m14;V99+=D14;var w99=e14;w99+=p2Z;$[w99](this[V99](fieldName),function(i,name){var L99=s7Z;L99+=G9h.F1Z;G9h[L99]();that[p14](name);});}G9h[K99]();return this;};Editor[i4U][v99]=function(){var p99=B1Z;p99+=x6Z;p99+=G9h.t4Z;p99+=x9Z;this[p99](D8Z);return this;};Editor[i4U][Z14]=function(arg1,arg2,arg3,arg4){var T14="ain";var C14="editF";var A14="Create";var B14="Arg";var b14="crud";var b99=W3U;b99+=H1Z;b99+=A14;var D99=N4U;D99+=K8Z;var m99=r14;m99+=G9h.h4Z;m99+=q1Z;m99+=i1Z;var a99=k5Z;a99+=l6Z;a99+=J6Z;var i99=z8U;i99+=p5Z;var q99=Y8Z;q99+=K9Z;var J99=K9Z;J99+=T14;var H99=K9Z;H99+=G9h.t4Z;H99+=u9Z;H99+=G9h.h4Z;var W99=B1Z;W99+=b14;W99+=B14;W99+=i1Z;var s99=C14;s99+=H14;s99+=j3U;var that=this;var fields=this[i1Z][q3U];var count=o4Z;if(this[d0U](function(){var Q14="reate";var y99=v2Z;y99+=Q14;G9h[N8Z]();that[y99](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1===Y14){count=arg1;arg1=arg2;arg2=arg3;}this[i1Z][s99]={};for(var i=X4Z;i<count;i++){var j99=r14;j99+=S14;var M99=z2Z;M99+=C9U;M99+=o2Z;M99+=R14;this[i1Z][M99][i]={fields:this[i1Z][j99]};}var argOpts=this[W99](arg1,arg2,arg3,arg4);this[i1Z][H99]=J99;this[i1Z][R44]=Z14;this[i1Z][f14]=t0Z;this[q99][l44][i99][M9U]=a99;this[n14]();this[g14](this[m99]());$[D99](fields,function(name,field){var h14="eset";var T99=r1Z;T99+=V1Z;var r99=i1Z;r99+=f6U;var e99=m3Z;e99+=L1Z;e99+=E14;e99+=h14;field[e99]();for(var i=X4Z;i<count;i++){var A99=u9Z;A99+=G9h.h4Z;A99+=V1Z;var Z99=b8Z;Z99+=H1Z;Z99+=L1Z;Z99+=k14;field[Z99](i,field[A99]());}field[r99](field[T99]());});this[O44](b99,t0Z,function(){var I14="formO";var P94="leMai";var x94="emb";var l94="_ass";var Q99=G9h.t4Z;Q99+=s7Z;Q99+=H1Z;Q99+=i1Z;var C99=B1Z;C99+=I14;C99+=t14;C99+=G6Z;var B99=l94;B99+=x94;B99+=P94;B99+=D1Z;G9h[G9h.I4Z]();that[B99]();that[C99](argOpts[Q99]);argOpts[z94]();});return this;};Editor[Y99][S99]=function(parent){var U94="Arr";var F94="ndepend";var g99=X2U;g99+=r1Z;var R99=L1Z;R99+=i1Z;R99+=U94;R99+=v6U;if($[R99](parent)){var f99=l2U;f99+=P2Z;f99+=q8Z;for(var i=X4Z,ien=parent[f99];i<ien;i++){var n99=E7Z;n99+=F94;n99+=r9Z;this[n99](parent[i]);}return this;}var field=this[a14](parent);$(field[g99]())[k6U](G94);return this;};Editor[E99][h99]=function(parent,url,opts){var c94="ependent";var N29=D1Z;N29+=X94;N29+=G9h.h4Z;var t99=g9Z;t99+=P2Z;t99+=G9h.h4Z;var I99=o94;I99+=d94;I99+=O94;I99+=S1Z;if($[y3U](parent)){for(var i=X4Z,ien=parent[m8Z];i<ien;i++){var k99=u9Z;k99+=c94;this[k99](parent[i],url,opts);}return this;}var that=this;var field=this[a14](parent);var ajaxOpts={type:I99,dataType:N94};opts=$[u0Z]({event:t99,data:t0Z,preUpdate:t0Z,postUpdate:t0Z},opts);var update=function(json){var K94='val';var V94="preUpdate";var W94="tUpda";var L94='update';var v94='message';var M94="postUpdate";var p94='error';var c29=h1U;c29+=u94;var X29=w94;X29+=q9Z;X29+=p5Z;var G29=J8Z;G29+=Y3Z;G29+=p5Z;var F29=i1Z;F29+=p2Z;F29+=G9h.t4Z;F29+=M5Z;var U29=p2Z;U29+=L1Z;U29+=u9Z;U29+=G9h.h4Z;var z29=G9h.h4Z;z29+=G9h.U1Z;z29+=v2Z;z29+=p2Z;var l29=G9h.U1Z;l29+=G9h.F1Z;G9h[l29]();if(opts[V94]){opts[V94](json);}$[n44]({labels:X4U,options:L94,values:K94,messages:v94,errors:p94},function(jsonProp,fieldFn){if(json[jsonProp]){var x29=G9h.h4Z;x29+=o9U;x29+=p2Z;$[x29](json[jsonProp],function(field,val){var P29=V1Z;P29+=H14;P29+=u9Z;that[P29](field)[fieldFn](val);});}});$[z29]([U29,F29,G29,X29],function(i,key){var o29=G9h.U1Z;o29+=G9h.F1Z;G9h[o29]();if(json[key]){var d29=G9h.U1Z;d29+=y94;d29+=s94;d29+=G9h.h4Z;that[key](json[key],json[d29]);}});if(opts[M94]){var O29=j94;O29+=W94;O29+=c5Z;opts[O29](json);}field[c29](D8Z);};$(field[N29]())[X2Z](opts[H94]+G94,function(e){var Z94="values";var C94="rl";var p29=M4U;p29+=v2Z;p29+=p9Z;p29+=X2Z;var K29=C1U;K29+=G9h.U1Z;K29+=K1Z;var L29=h9Z;L29+=r2U;L29+=i1Z;var V29=G9h.h4Z;V29+=u9Z;V29+=J94;V29+=S14;var w29=k8Z;w29+=I1Z;var u29=s7Z;u29+=G9h.F1Z;if($(field[q94]())[i94](e[a94])[m8Z]===X4Z){return;}G9h[u29]();field[w29](A8Z);var data={};data[m94]=that[i1Z][D94]?_pluck(that[i1Z][V29],e94):t0Z;data[V3U]=data[L29]?data[m94][X4Z]:t0Z;data[Z94]=that[K29]();if(opts[W0Z]){var ret=opts[W0Z](data);if(ret){var v29=u9Z;v29+=G9h.U1Z;v29+=H1Z;v29+=G9h.U1Z;opts[v29]=ret;}}if(typeof url===p29){var s29=C1U;s29+=G9h.U1Z;s29+=K1Z;var y29=A94;y29+=K1Z;var o=url[y29](that,field[s29](),data,update);if(o){var M29=H1Z;M29+=p2Z;M29+=J8Z;if(typeof o===r94&&typeof o[M29]===G9h.d1Z){o[T94](function(resolved){if(resolved){update(resolved);}});}else{update(o);}}}else{var H29=b94;H29+=h1Z;if($[c0U](url)){var j29=G9h.h4Z;j29+=B94;$[j29](ajaxOpts,url);}else{var W29=E7Z;W29+=C94;ajaxOpts[W29]=url;}$[R3U]($[H29](ajaxOpts,{url:url,data:data,success:update}));}});return this;};Editor[i4U][Q94]=function(){var k94="stro";var n94="emplate";var R94=".d";var f94="stroy";var Z29=E7Z;Z29+=D1Z;Z29+=Y94;Z29+=S94;var e29=R94;e29+=c5Z;var D29=G9h.t4Z;D29+=V1Z;D29+=V1Z;var a29=r1Z;a29+=f94;var q29=H1Z;q29+=n94;if(this[i1Z][g94]){var J29=v2Z;J29+=K1Z;J29+=P6Z;J29+=G9h.h4Z;this[J29]();}this[p14]();if(this[i1Z][q29]){var i29=q9Z;i29+=G9h.t4Z;i29+=u9Z;i29+=L2Z;$(i29)[R2U](this[i1Z][E94]);}var controller=this[i1Z][h94];if(controller[a29]){var m29=r1Z;m29+=k94;m29+=L2Z;controller[m29](this);}$(document)[D29](e29+this[i1Z][Z29]);this[b4U]=t0Z;this[i1Z]=t0Z;};Editor[A29][I94]=function(name){var t94="eldNam";var r29=j7Z;r29+=L1Z;r29+=t94;r29+=v1Z;var that=this;$[n44](this[r29](name),function(i,n){var b29=B5Z;b29+=Z5Z;b29+=G9h.h4Z;var T29=r14;T29+=G9h.h4Z;T29+=q1Z;G9h[N8Z]();that[T29](n)[b29]();});return this;};Editor[i4U][M9U]=function(show){var Q29=x6Z;Q29+=G9h.t4Z;Q29+=x9Z;var C29=G9h.t4Z;C29+=s7Z;C29+=G9h.h4Z;C29+=D1Z;if(show===undefined){var B29=r5Z;B29+=i1Z;B29+=C5Z;B29+=z2Z;return this[i1Z][B29];}return this[show?C29:Q29]();};Editor[Y29][S29]=function(){var R29=K9Z;R29+=G9h.U1Z;R29+=s7Z;return $[R29](this[i1Z][q3U],function(field,name){return field[g94]()?name:t0Z;});};Editor[i4U][f29]=function(){var g29=D1Z;g29+=l24;var n29=s7Z;n29+=G9h.F1Z;G9h[n29]();return this[i1Z][h94][g29](this);};Editor[E29][e3U]=function(items,arg1,arg2,arg3,arg4){var z24="_ti";var P24="Args";var x24="_cr";var l79=K9Z;l79+=G9h.U1Z;l79+=L1Z;l79+=D1Z;var t29=p1Z;t29+=K1Z;t29+=j3U;var I29=x24;I29+=E7Z;I29+=u9Z;I29+=P24;var k29=z24;k29+=H7U;var h29=G9h.U1Z;h29+=G9h.F1Z;var that=this;G9h[h29]();if(this[k29](function(){that[e3U](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[I29](arg1,arg2,arg3,arg4);this[u0U](items,this[D3U](t29,items),l79,argOpts[L4U],function(){var U24="_formO";var x79=U24;x79+=F24;x79+=X2Z;x79+=i1Z;that[G24]();that[x79](argOpts[L4U]);argOpts[z94]();});return this;};Editor[P79][z79]=function(name){var G79=s7Z;G79+=G9h.F1Z;var U79=X24;U79+=V6Z;U79+=o24;var that=this;$[n44](this[U79](name),function(i,n){var d24="enab";var F79=d24;F79+=p5Z;G9h[N8Z]();that[a14](n)[F79]();});G9h[G79]();return this;};Editor[X79][o79]=function(name,msg){var O24="glob";var c24="alEr";var N24="_mes";if(msg===undefined){var O79=O24;O79+=c24;O79+=h9Z;O79+=v3U;var d79=N24;d79+=u24;d79+=P2Z;d79+=G9h.h4Z;this[d79](this[b4U][t0U],name);this[i1Z][O79]=name;}else{var c79=K3Z;c79+=h9Z;this[a14](name)[c79](msg);}return this;};Editor[N79][u79]=function(name){var V24="ld name - ";var w24="Unknown ";var w79=r14;w79+=S14;var fields=this[i1Z][w79];G9h[G9h.I4Z]();if(!fields[name]){var V79=w24;V79+=p1Z;V79+=V24;throw V79+name;}return fields[name];};Editor[i4U][L79]=function(){var K79=K9Z;K79+=G9h.U1Z;K79+=s7Z;return $[K79](this[i1Z][q3U],function(field,name){return name;});};Editor[i4U][L24]=_api_file;Editor[i4U][M8Z]=_api_files;Editor[v79][p79]=function(name){var K24="Arra";var M79=r14;M79+=G9h.h4Z;M79+=K1Z;M79+=u9Z;var s79=G0U;s79+=K24;s79+=L2Z;var that=this;if(!name){var y79=M3U;y79+=u9Z;y79+=i1Z;name=this[y79]();}if($[s79](name)){var out={};$[n44](name,function(i,n){out[n]=that[a14](n)[W9U]();});return out;}return this[M79](name)[W9U]();};Editor[i4U][v24]=function(names,animate){var p24="_fiel";var W79=p24;W79+=o24;var j79=e14;j79+=p2Z;var that=this;G9h[N8Z]();$[j79](this[W79](names),function(i,n){that[a14](n)[v24](animate);});return this;};Editor[i4U][H79]=function(includeHash){return $[y24](this[i1Z][D94],function(edit,idSrc){return includeHash===A8Z?s24+idSrc:idSrc;});};Editor[i4U][J79]=function(inNames){var J24="global";var j24="_fie";var q24="inError";var W24="ldN";var D79=M24;D79+=H1Z;D79+=p2Z;var m79=j24;m79+=W24;m79+=G9h.U1Z;m79+=H24;var a79=J24;a79+=a5Z;a79+=t7Z;var i79=G9h.U1Z;i79+=G9h.F1Z;var q79=u9Z;q79+=G9h.t4Z;q79+=K9Z;var formError=$(this[q79][t0U]);G9h[i79]();if(this[i1Z][a79]){return A8Z;}var names=this[m79](inNames);for(var i=X4Z,ien=names[D79];i<ien;i++){if(this[a14](names[i])[q24]()){return A8Z;}}return D8Z;};Editor[i4U][i24]=function(cell,fieldName,opts){var Y24='div.DTE_Field';var Z24="Options";var R79=i5Z;R79+=a24;R79+=D1Z;R79+=G9h.h4Z;var Q79=e4U;Q79+=L1Z;Q79+=H7U;var b79=G9h.h4Z;b79+=o9U;b79+=p2Z;var T79=m24;T79+=D1Z;T79+=G9h.h4Z;var r79=D24;r79+=G9h.h4Z;var A79=e24;A79+=i5Z;A79+=G9h.h4Z;var Z79=V1Z;Z79+=W7Z;Z79+=Z24;var e79=H0Z;e79+=G9h.h4Z;e79+=h1Z;var that=this;if($[c0U](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[e79]({},this[i1Z][Z79][A79],opts);var editFields=this[r79](A24,cell,fieldName);var node,field;var countOuter=X4Z,countInner;var closed=D8Z;var classes=this[B4U][T79];$[b79](editFields,function(i,editField){var T24="attach";var r24='Cannot edit more than one row inline at a time';var B79=G9h.h4Z;B79+=o9U;B79+=p2Z;if(countOuter>X4Z){throw r24;}node=$(editField[T24][X4Z]);countInner=X4Z;$[B79](editField[b24],function(j,f){var C24="e at";var Q24=" a time";var B24="Cannot edit more than one field inlin";if(countInner>X4Z){var C79=B24;C79+=C24;C79+=Q24;throw C79;}field=f;countInner++;});countOuter++;;});if($(Y24,node)[m8Z]){return this;}if(this[Q79](function(){var S24="inlin";var S79=S24;S79+=G9h.h4Z;var Y79=G9h.U1Z;Y79+=G9h.F1Z;G9h[Y79]();that[S79](cell,fieldName,opts);})){return this;}this[u0U](cell,editFields,R79,opts,function(){var U74='<div class="DTE_Processing_Indicator"><span/></div>';var z74="contents";var I24="e=\"width:";var n24="line";var f24="mError";var y74="_focus";var x74="_formOp";var s74="_postopen";var g24="iv clas";var k24="styl";var W59=V1Z;W59+=R24;var O59=u44;O59+=E14;O59+=G9h.h4Z;O59+=P2Z;var F59=V1Z;F59+=v3U;F59+=f24;var U59=n24;U59+=h9Z;var z59=H3Z;z59+=u9Z;z59+=L1Z;z59+=f3Z;var P59=N3Z;P59+=P3Z;P59+=l3Z;var x59=E3Z;x59+=g24;x59+=i1Z;x59+=P0Z;var l59=s7Z;l59+=W1Z;l59+=f8Z;var t79=E24;t79+=K44;var I79=h24;I79+=k24;I79+=I24;var k79=E3Z;k79+=t24;k79+=P0Z;var h79=E2U;h79+=p7U;h79+=h2U;var E79=G9h.U1Z;E79+=s7Z;E79+=E44;E79+=u9Z;var g79=u9Z;g79+=q5U;g79+=p2Z;var n79=L1Z;n79+=D1Z;n79+=K1Z;n79+=l74;var f79=x74;f79+=P74;var namespace=that[f79](opts);var ret=that[n0U](n79);if(!ret){return that;}var children=node[z74]()[g79]();node[E79]($(Z0Z+classes[h79]+Q0Z+k79+classes[I0U]+I79+node[t79]()+l59+U74+g0Z+x59+classes[f44]+P59+z59));node[i94](F74+classes[U59][G74](/ /g,X74))[R2U](field[q94]())[R2U](that[b4U][F59]);if(opts[f44]){var d59=p7U;d59+=G7Z;d59+=D1Z;d59+=u9Z;var o59=z9U;o59+=o74;var X59=Y0U;X59+=d74;X59+=i1Z;var G59=r14;G59+=D1Z;G59+=u9Z;node[G59](F74+classes[X59][o59](/ /g,X74))[d59](that[b4U][f44]);}that[O59](function(submitComplete,action){var u74="_clearDynamicInfo";var N59=G9h.h4Z;N59+=u9Z;N59+=L1Z;N59+=H1Z;var c59=G9h.t4Z;c59+=V1Z;c59+=V1Z;closed=A8Z;$(document)[c59](O74+namespace);if(!submitComplete||action!==N59){var w59=G9h.U1Z;w59+=c74;w59+=P44;var u59=y7U;u59+=N74;node[u59]()[S2U]();node[w59](children);}that[u74]();return w74;;});setTimeout(function(){var L59=v2Z;L59+=a24;L59+=v2Z;L59+=J6Z;var V59=G9h.t4Z;V59+=D1Z;if(closed){return;}$(document)[V59](L59+namespace,function(e){var p74='andSelf';var L74="Fn";var V74="_type";var M59=s7Z;M59+=G9h.U1Z;M59+=Y9U;M59+=i1Z;var s59=H1Z;s59+=s2Z;s59+=D5Z;s59+=H1Z;var y59=G9h.t4Z;y59+=M5Z;y59+=D1Z;y59+=i1Z;var p59=V74;p59+=L74;var v59=K3U;v59+=K74;v59+=o9U;v59+=J6Z;var K59=G9h.U1Z;K59+=G9h.F1Z;G9h[K59]();var back=$[G8Z][v59]?v74:p74;if(!field[p59](y59,e[a94])&&$[n1U](node[X4Z],$(e[s59])[M59]()[back]())===-o4Z){var j59=k5Z;j59+=P0U;that[j59]();}});},X4Z);that[y74]([field],opts[W59]);that[s74](w74,A8Z);});return this;};Editor[H59][M74]=function(name,msg){if(msg===undefined){this[j74](this[b4U][z44],name);}else{this[a14](name)[M74](msg);}return this;};Editor[J59][q59]=function(mode){var i74='Changing from create mode is not supported';var q74='Not currently in an editing mode';var J74="eat";var m59=W74;m59+=D1Z;var a59=H74;a59+=J74;a59+=G9h.h4Z;var i59=o9U;i59+=j4U;i59+=D1Z;if(!mode){return this[i1Z][R44];}G9h[N8Z]();if(!this[i1Z][R44]){throw new Error(q74);}else if(this[i1Z][i59]===a59&&mode!==I0Z){throw new Error(i74);}this[i1Z][m59]=mode;return this;};Editor[i4U][D59]=function(){return this[i1Z][f14];};Editor[i4U][e59]=function(fieldNames){var m74="multiGet";var T59=V1Z;T59+=e5Z;var that=this;G9h[N8Z]();if(fieldNames===undefined){var Z59=V1Z;Z59+=K6Z;Z59+=j1Z;fieldNames=this[Z59]();}if($[y3U](fieldNames)){var A59=G9h.h4Z;A59+=G9h.U1Z;A59+=v2Z;A59+=p2Z;var out={};$[A59](fieldNames,function(i,name){var a74="G";var r59=b8Z;r59+=p9Z;r59+=a74;r59+=f6U;out[name]=that[a14](name)[r59]();});return out;}return this[T59](fieldNames)[m74]();};Editor[b59][D74]=function(fieldNames,val){var e74="isPlainObj";var B59=e74;B59+=G9h.h4Z;B59+=Z74;var that=this;if($[B59](fieldNames)&&val===undefined){var C59=G9h.h4Z;C59+=G9h.U1Z;C59+=K8Z;$[C59](fieldNames,function(name,value){var A74="multiS";var Q59=A74;Q59+=f6U;that[a14](name)[Q59](value);});}else{var Y59=p1Z;Y59+=q1Z;this[Y59](fieldNames)[D74](val);}return this;};Editor[i4U][q94]=function(name){var r74="Array";var E59=D1Z;E59+=l24;var g59=r14;g59+=G9h.h4Z;g59+=K1Z;g59+=u9Z;var R59=K9Z;R59+=G9h.U1Z;R59+=s7Z;var S59=G0U;S59+=r74;var that=this;G9h[N8Z]();if(!name){name=this[b3U]();}return $[S59](name)?$[R59](name,function(n){var n59=X2U;n59+=u9Z;n59+=G9h.h4Z;var f59=p1Z;f59+=q1Z;G9h[G9h.I4Z]();return that[f59](n)[n59]();}):this[g59](name)[E59]();};Editor[i4U][k6U]=function(name,fn){var k59=T74;k59+=s7U;k59+=b74;var h59=G9h.t4Z;h59+=V1Z;h59+=V1Z;$(this)[h59](this[k59](name),fn);return this;};Editor[i4U][I59]=function(name,fn){var l69=B74;l69+=Z9U;l69+=A7Z;var t59=G9h.t4Z;t59+=D1Z;G9h[G9h.I4Z]();$(this)[t59](this[l69](name),fn);return this;};Editor[x69][P69]=function(name,fn){var C74="Nam";var U69=G9h.U1Z;U69+=G9h.F1Z;var z69=B1Z;z69+=H94;z69+=C74;z69+=G9h.h4Z;$(this)[Q74](this[z69](name),fn);G9h[U69]();return this;};Editor[F69][G69]=function(){var E74="playReo";var S74="ostop";var g74="_dis";var n74="loseRe";var R74="ontroll";var W69=Y74;W69+=D1Z;var j69=B1Z;j69+=s7Z;j69+=S74;j69+=J8Z;var w69=G9h.t4Z;w69+=s7Z;w69+=G9h.h4Z;w69+=D1Z;var u69=d6Z;u69+=R74;u69+=O2Z;var N69=B1Z;N69+=w14;N69+=f74;N69+=D1Z;var o69=B1Z;o69+=v2Z;o69+=n74;o69+=P2Z;var X69=g74;X69+=E74;X69+=h74;X69+=h9Z;var that=this;this[X69]();this[o69](function(){var k74="isplayC";var I74="ontroller";var O69=u9Z;O69+=k74;O69+=I74;var d69=s7Z;d69+=G9h.F1Z;G9h[d69]();that[i1Z][O69][i5U](that,function(){var t74="clearD";var l54="ynamicIn";var c69=B1Z;c69+=t74;c69+=l54;c69+=Z9Z;that[c69]();that[O44](c44,[x54]);});});var ret=this[N69](x54);if(!ret){return this;}G9h[N8Z]();this[i1Z][u69][w69](this,this[b4U][A0Z],function(){var P54="pene";var U54="editO";var M69=G9h.t4Z;M69+=P54;M69+=u9Z;var s69=B1Z;s69+=z54;s69+=r9Z;var y69=U54;y69+=t14;y69+=i1Z;var K69=F54;K69+=O2Z;var L69=K9Z;L69+=G9h.U1Z;L69+=s7Z;var V69=B1Z;V69+=Z9Z;V69+=a7Z;V69+=i1Z;that[V69]($[L69](that[i1Z][K69],function(name){var p69=V1Z;p69+=R14;var v69=s7Z;v69+=G9h.F1Z;G9h[v69]();return that[i1Z][p69][name];}),that[i1Z][y69][p4U]);that[s69](M69,[x54,that[i1Z][R44]]);});this[j69](W69,D8Z);return this;};Editor[i4U][b3U]=function(set){var N54="sort";var X54="layReorder";var O54="rder";var c54="slic";var V54="All fiel";var L54="ds, and no additional fields, must be provided for ordering.";var G54="_disp";var T69=G54;T69+=X54;var r69=G9h.t4Z;r69+=h74;r69+=h9Z;var A69=G9h.h4Z;A69+=o54;A69+=G9h.h4Z;A69+=h1Z;var Z69=s7Z;Z69+=G9h.F1Z;var D69=f3U;D69+=G9h.t4Z;D69+=L1Z;D69+=D1Z;var m69=i1Z;m69+=K1Z;m69+=d54;var a69=F54;a69+=O2Z;if(!set){var H69=G9h.t4Z;H69+=O54;return this[i1Z][H69];}if(arguments[m8Z]&&!$[y3U](set)){var i69=A94;i69+=K1Z;var q69=c54;q69+=G9h.h4Z;var J69=P7Z;J69+=m7Z;set=Array[J69][q69][i69](arguments);}if(this[i1Z][a69][m69]()[N54]()[u54](w54)!==set[J4U]()[N54]()[D69](w54)){var e69=V54;e69+=L54;throw e69;}G9h[Z69]();$[A69](this[i1Z][r69],set);this[T69]();return this;};Editor[i4U][U3U]=function(items,arg1,arg2,arg3,arg4){var j54="idy";var v54="Rem";var H54='node';var K54="init";var s54="ditFields";var n69=u9Z;n69+=G9h.U1Z;n69+=H1Z;n69+=G9h.U1Z;var f69=K54;f69+=v54;f69+=p54;f69+=G9h.h4Z;var R69=y54;R69+=H1Z;var S69=G9h.h4Z;S69+=s54;var Y69=M3U;Y69+=j3U;var Q69=l2U;Q69+=M54;Q69+=p2Z;var b69=e4U;b69+=j54;var that=this;if(this[b69](function(){var C69=z9U;C69+=K9Z;C69+=p54;C69+=G9h.h4Z;var B69=G9h.U1Z;B69+=G9h.F1Z;G9h[B69]();that[C69](items,arg1,arg2,arg3,arg4);})){return this;}if(items[Q69]===undefined){items=[items];}var argOpts=this[W54](arg1,arg2,arg3,arg4);var editFields=this[D3U](Y69,items);this[i1Z][R44]=U3U;this[i1Z][f14]=items;this[i1Z][S69]=editFields;this[b4U][l44][J6U][M9U]=E4U;this[n14]();this[R69](f69,[_pluck(editFields,H54),_pluck(editFields,n69),items],function(){var J54="tMultiRemov";var E69=W3U;E69+=J54;E69+=G9h.h4Z;var g69=T7Z;g69+=J8Z;g69+=H1Z;that[g69](E69,[editFields,items],function(){var q54="_for";var a54="utt";var k69=x8U;k69+=H1Z;k69+=i1Z;var h69=q54;h69+=k9Z;h69+=I9Z;G9h[N8Z]();that[G24]();that[h69](argOpts[k69]);argOpts[z94]();var opts=that[i1Z][k3U];if(opts[p4U]!==t0Z){var t69=Z9Z;t69+=i54;var I69=q9Z;I69+=a54;I69+=J7Z;$(m54,that[b4U][I69])[D54](opts[p4U])[t69]();}});});return this;};Editor[l89][x89]=function(set,val){var Z54="isPlainOb";var A54="je";var z89=G9h.h4Z;z89+=e54;var P89=Z54;P89+=A54;P89+=Z74;G9h[N8Z]();var that=this;if(!$[P89](set)){var o={};o[set]=val;set=o;}$[z89](set,function(n,v){var U89=G9h.U1Z;U89+=G9h.F1Z;G9h[U89]();that[a14](n)[H9U](v);});return this;};Editor[i4U][F89]=function(names,animate){var r54="_fieldN";var d89=G9h.U1Z;d89+=G9h.F1Z;var G89=r54;G89+=T54;G89+=i1Z;var that=this;$[n44](this[G89](names),function(i,n){var b54="show";var o89=V1Z;o89+=L1Z;o89+=O0Z;var X89=G9h.U1Z;X89+=G9h.F1Z;G9h[X89]();that[o89](n)[b54](animate);});G9h[d89]();return this;};Editor[i4U][x0U]=function(successCallback,errorCallback,formatdata,hide){var B54="ocessi";var L89=G9h.h4Z;L89+=o9U;L89+=p2Z;var V89=I4U;V89+=v3U;var N89=d7Z;N89+=B54;N89+=I1Z;var c89=o9U;c89+=j4U;c89+=D1Z;var O89=s7Z;O89+=h9Z;O89+=C54;var that=this,fields=this[i1Z][q3U],errorFields=[],errorReady=X4Z,sent=D8Z;if(this[i1Z][O89]||!this[i1Z][c89]){return this;}this[N89](A8Z);var send=function(){var Y54='initSubmit';var u89=Q54;u89+=L1Z;u89+=G9h.t4Z;u89+=D1Z;if(errorFields[m8Z]!==errorReady||sent){return;}that[O44](Y54,[that[i1Z][u89]],function(result){var S54="_processing";var w89=B1Z;w89+=x0U;if(result===D8Z){that[S54](D8Z);return;}sent=A8Z;that[w89](successCallback,errorCallback,formatdata,hide);});};this[V89]();$[L89](fields,function(name,field){var v89=L1Z;v89+=D1Z;v89+=n9Z;v89+=R54;var K89=s7Z;K89+=G9h.F1Z;G9h[K89]();if(field[v89]()){errorFields[v8Z](name);}});$[n44](errorFields,function(i,name){G9h[G9h.I4Z]();fields[name][c1U](U8Z,function(){var p89=G9h.U1Z;p89+=G9h.F1Z;errorReady++;G9h[p89]();send();});});send();return this;};Editor[y89][s89]=function(set){var f54="plate";var W89=c5Z;W89+=K9Z;W89+=U9U;W89+=c5Z;var M89=s7Z;M89+=G9h.F1Z;G9h[M89]();if(set===undefined){var j89=H1Z;j89+=Q44;j89+=f54;return this[i1Z][j89];}this[i1Z][W89]=set===t0Z?t0Z:$(set);return this;};Editor[H89][J89]=function(title){var h54="dren";var k54="head";var E54="sses";var g54="unct";var A89=p2Z;A89+=n54;var e89=V1Z;e89+=g54;e89+=L1Z;e89+=X2Z;var m89=H1U;m89+=s7U;m89+=G9h.h4Z;m89+=s7U;var a89=x6Z;a89+=G9h.U1Z;a89+=E54;var i89=K8Z;i89+=L1Z;i89+=K1Z;i89+=h54;var q89=k54;q89+=O2Z;G9h[G9h.I4Z]();var header=$(this[b4U][q89])[i89](F74+this[a89][F44][m89]);if(title===undefined){var D89=p2Z;D89+=H1Z;D89+=K9Z;D89+=K1Z;return header[D89]();}if(typeof title===e89){var Z89=H1Z;Z89+=G9h.U1Z;Z89+=k5Z;Z89+=G9h.h4Z;title=title(this,new DataTable[O3U](this[i1Z][Z89]));}header[A89](title);return this;};Editor[r89][T89]=function(field,value){var I54="isPlainObje";var B89=P2Z;B89+=G9h.h4Z;B89+=H1Z;var b89=I54;b89+=Z74;if(value!==undefined||$[b89](field)){return this[H9U](field,value);}G9h[N8Z]();return this[B89](field);;};var apiRegister=DataTable[O3U][t54];function __getInst(api){var l64="ontext";var x64="oInit";var Q89=s7Z;Q89+=G9h.F1Z;var C89=v2Z;C89+=l64;var ctx=api[C89][X4Z];G9h[Q89]();return ctx[x64][P64]||ctx[z64];}function __setBasic(inst,opts,type,plural){var O64=/%d/;var o64="eplace";var G64="tit";var c64='1';var k89=s7Z;k89+=G9h.F1Z;var n89=K9Z;n89+=U64;var S89=p9Z;S89+=F64;S89+=G9h.h4Z;if(!opts){opts={};}if(opts[f44]===undefined){var Y89=Y0U;Y89+=o9Z;opts[Y89]=S44;}if(opts[S89]===undefined){var f89=G64;f89+=p5Z;var R89=H1Z;R89+=C9U;R89+=K1Z;R89+=G9h.h4Z;opts[R89]=inst[N0Z][type][f89];}if(opts[n89]===undefined){if(type===X64){var h89=h9Z;h89+=o64;var E89=K9Z;E89+=c3Z;E89+=D5Z;var g89=L1Z;g89+=a1Z;g89+=m1Z;g89+=D1Z;var confirm=inst[g89][type][d64];opts[E89]=plural!==o4Z?confirm[B1Z][h89](O64,plural):confirm[c64];}else{opts[M74]=U8Z;}}G9h[k89]();return opts;}apiRegister(N64,function(){G9h[N8Z]();return __getInst(this);});apiRegister(I89,function(opts){var t89=G9h.U1Z;t89+=G9h.F1Z;G9h[t89]();var inst=__getInst(this);inst[Z14](__setBasic(inst,opts,I0Z));return this;});apiRegister(l39,function(opts){var P39=G9h.h4Z;P39+=r5Z;P39+=H1Z;var x39=s7Z;x39+=G9h.F1Z;G9h[x39]();var inst=__getInst(this);inst[e3U](this[X4Z][X4Z],__setBasic(inst,opts,P39));return this;});G9h[z39]();apiRegister(u64,function(opts){var U39=G9h.h4Z;U39+=u9Z;U39+=L1Z;U39+=H1Z;var inst=__getInst(this);inst[e3U](this[X4Z],__setBasic(inst,opts,U39));return this;});apiRegister(F39,function(opts){var G39=s7Z;G39+=G9h.F1Z;var inst=__getInst(this);G9h[G39]();inst[U3U](this[X4Z][X4Z],__setBasic(inst,opts,X64,o4Z));return this;});apiRegister(X39,function(opts){var inst=__getInst(this);inst[U3U](this[X4Z],__setBasic(inst,opts,X64,this[X4Z][m8Z]));return this;});apiRegister(w64,function(type,opts){var o39=G9h.U1Z;o39+=G9h.F1Z;G9h[o39]();if(!type){var d39=m24;d39+=O1U;type=d39;}else if($[c0U](type)){var O39=e24;O39+=l74;opts=type;type=O39;}__getInst(this)[type](this[X4Z][X4Z],opts);return this;});apiRegister(c39,function(opts){__getInst(this)[n5Z](this[X4Z],opts);return this;});apiRegister(N39,_api_file);apiRegister(V64,_api_files);$(document)[X2Z](u39,function(e,ctx,json){var K64='dt';var L64="pace";var V39=r14;V39+=K1Z;V39+=G9h.h4Z;V39+=i1Z;var w39=D1Z;w39+=G9h.U1Z;w39+=H24;w39+=L64;if(e[w39]!==K64){return;}if(json&&json[V39]){$[n44](json[M8Z],function(name,files){var L39=G9h.h4Z;L39+=W1Z;L39+=l2Z;L39+=u9Z;if(!Editor[M8Z][name]){Editor[M8Z][name]={};}$[L39](Editor[M8Z][name],files);});}});Editor[K39]=function(msg,tn){var p64="r to https://datatable";var v64=" For more information, please refe";var y64="s.net/tn/";var v39=v64;v39+=p64;v39+=y64;throw tn?msg+v39+tn:msg;};Editor[p39]=function(data,props,fn){var j64="valu";var W64="value";var M39=s64;M39+=C8U;M39+=L2Z;var s39=C1U;s39+=M64;s39+=E7Z;s39+=G9h.h4Z;var y39=s7Z;y39+=G9h.F1Z;var i,ien,dataPoint;G9h[y39]();props=$[u0Z]({label:X4U,value:s39},props);if($[M39](data)){var j39=M24;j39+=H1Z;j39+=p2Z;for(i=X4Z,ien=data[j39];i<ien;i++){dataPoint=data[i];if($[c0U](dataPoint)){var J39=t3Z;J39+=q9Z;J39+=G9h.h4Z;J39+=K1Z;var H39=j64;H39+=G9h.h4Z;var W39=K1Z;W39+=Y3Z;W39+=V6Z;fn(dataPoint[props[W64]]===undefined?dataPoint[props[W39]]:dataPoint[props[H39]],dataPoint[props[J39]],i,dataPoint[d14]);}else{fn(dataPoint,dataPoint,i);}}}else{var q39=G9h.h4Z;q39+=G9h.U1Z;q39+=v2Z;q39+=p2Z;i=X4Z;$[q39](data,function(key,val){G9h[G9h.I4Z]();fn(val,key,i);i++;});}};Editor[H64]=function(id){G9h[G9h.I4Z]();return id[G74](/\./g,w54);};Editor[i39]=function(editor,conf,files,progressCallback,completeCallback){var e64='A server error occurred while uploading the file';var J64="eadAsDataURL";var A64="<i>Uploading file</i>";var i64="Lef";var a64="ReadText";var r64="onload";var q64="_limit";var m64="func";var f09=h9Z;f09+=J64;var Y09=q64;Y09+=i64;Y09+=H1Z;var T39=L24;T39+=a64;var Z39=m64;Z39+=p9Z;Z39+=X2Z;var e39=G9h.U1Z;e39+=D64;var D39=D1Z;D39+=G9h.U1Z;D39+=K9Z;D39+=G9h.h4Z;var m39=O2Z;m39+=t7Z;var a39=G9h.U1Z;a39+=G9h.F1Z;var reader=new FileReader();var counter=X4Z;G9h[a39]();var ids=[];var generalError=e64;editor[m39](conf[D39],U8Z);if(typeof conf[e39]===Z39){var A39=G9h.U1Z;A39+=D64;conf[A39](files,function(ids){var r39=G9h.U1Z;r39+=G9h.F1Z;G9h[r39]();completeCallback[Z64](editor,ids);});return;}progressCallback(conf,conf[T39]||A64);reader[r64]=function(e){var k64="uploadF";var C64="load";var R64="Objec";var S64="isPlain";var f64="unction";var B64="preSubmit.DTE_Up";var z84='Upload feature cannot use `ajax.data` with an object. Please use it as a function instead.';var h64="loa";var P84='No Ajax option specified for upload plug-in';var l84="ajaxData";var U84="readAsDataURL";var Q64="reUp";var x84="ja";var d09=T64;d09+=b64;var o09=H0Z;o09+=P44;var X09=B64;X09+=C64;var G09=s7Z;G09+=G9h.F1Z;var U09=D1Z;U09+=G9h.U1Z;U09+=K9Z;U09+=G9h.h4Z;var z09=s7Z;z09+=Q64;z09+=C64;var P09=B74;P09+=Y64;var x09=S64;x09+=R64;x09+=H1Z;var I39=V1Z;I39+=f64;var k39=b64;k39+=n64;var h39=i1Z;h39+=H1Z;h39+=g64;h39+=P2Z;var E39=G9h.U1Z;E39+=f3U;E39+=G9h.U1Z;E39+=W1Z;var R39=G9h.U1Z;R39+=f3U;R39+=G9h.U1Z;R39+=W1Z;var S39=E64;S39+=h64;S39+=u9Z;var Y39=D1Z;Y39+=T54;var Q39=k64;Q39+=K6Z;Q39+=q1Z;var C39=I64;C39+=G9h.t4Z;C39+=j0U;var B39=t64;B39+=X2Z;var b39=p7U;b39+=a0U;var data=new FormData();var ajax;data[b39](B39,C39);data[R2U](Q39,conf[Y39]);data[R2U](S39,files[counter]);if(conf[l84]){conf[l84](data,files[counter],counter);}if(conf[R3U]){ajax=conf[R3U];}else if($[c0U](editor[i1Z][R39])){var g39=E7Z;g39+=s7Z;g39+=R5Z;g39+=j0U;var n39=E7Z;n39+=s7Z;n39+=R5Z;n39+=j0U;var f39=G9h.U1Z;f39+=x84;f39+=W1Z;ajax=editor[i1Z][f39][n39]?editor[i1Z][R3U][g39]:editor[i1Z][R3U];}else if(typeof editor[i1Z][E39]===h39){ajax=editor[i1Z][R3U];}if(!ajax){throw new Exception(P84);}if(typeof ajax===k39){ajax={url:ajax};}if(typeof ajax[W0Z]===I39){var l09=G9h.h4Z;l09+=G9h.U1Z;l09+=v2Z;l09+=p2Z;var t39=b64;t39+=h9Z;t39+=L1Z;t39+=I1Z;var d={};var ret=ajax[W0Z](d);if(ret!==undefined&&typeof ret!==t39){d=ret;}$[l09](d,function(key,value){G9h[G9h.I4Z]();data[R2U](key,value);});}else if($[x09](ajax[W0Z])){throw new Exception(z84);}var preRet=editor[P09](z09,[conf[U09],files[counter],data]);if(preRet===D8Z){if(counter<files[m8Z]-o4Z){counter++;reader[U84](files[counter]);}else{var F09=v2Z;F09+=G9h.U1Z;F09+=K1Z;F09+=K1Z;completeCallback[F09](editor,ids);}return;}var submit=D8Z;G9h[G09]();editor[X2Z](X09,function(){submit=A8Z;return D8Z;});$[R3U]($[o09]({},ajax,{type:d09,data:data,dataType:N94,contentType:D8Z,processData:D8Z,xhr:function(){var o84="onprogress";var F84="ajaxSettings";var L84="onloadend";var G84="xhr";var xhr=$[F84][G84]();if(xhr[X84]){xhr[X84][o84]=function(e){var d84="lengthC";var c84="ded";var V84=':';var w84="%";var N84="total";var u84="toFixed";var O84="omputa";var c09=d84;c09+=O84;c09+=i6Z;var O09=G9h.U1Z;O09+=G9h.F1Z;G9h[O09]();if(e[c09]){var w09=p5Z;w09+=I1Z;w09+=H1Z;w09+=p2Z;var u09=M24;u09+=H1Z;u09+=p2Z;var N09=h64;N09+=c84;var percent=(e[N09]/e[N84]*r4Z)[u84](X4Z)+w84;progressCallback(conf,files[u09]===o4Z?percent:counter+V84+files[w09]+r0Z+percent);}};xhr[X84][L84]=function(e){var K84="Processi";var v84="ngText";var L09=K84;L09+=I1Z;var V09=k8Z;V09+=v84;progressCallback(conf,conf[V09]||L09);};}return xhr;},success:function(json){var j84="Upload";var s84="preSubm";var J84="rro";var M84="it.DTE";var p84="uplo";var W84='uploadXhrSuccess';var y84="dErrors";var q09=L1Z;q09+=u9Z;var J09=p84;J09+=G9h.U1Z;J09+=u9Z;var j09=G9h.h4Z;j09+=h9Z;j09+=h9Z;j09+=v3U;var y09=V1Z;y09+=H14;y09+=y84;var p09=D1Z;p09+=G9h.U1Z;p09+=K9Z;p09+=G9h.h4Z;var v09=s84;v09+=M84;v09+=B1Z;v09+=j84;var K09=G9h.t4Z;K09+=V1Z;K09+=V1Z;editor[K09](v09);editor[O44](W84,[conf[p09],json]);if(json[y09]&&json[H84][m8Z]){var errors=json[H84];for(var i=X4Z,ien=errors[m8Z];i<ien;i++){var M09=D1Z;M09+=T54;var s09=G9h.h4Z;s09+=J84;s09+=h9Z;editor[s09](errors[i][M09],errors[i][q84]);}}else if(json[j09]){var H09=O2Z;H09+=h9Z;H09+=G9h.t4Z;H09+=h9Z;var W09=O2Z;W09+=u5Z;W09+=h9Z;editor[W09](json[H09]);}else if(!json[X84]||!json[J09][q09]){var a09=D1Z;a09+=U14;a09+=G9h.h4Z;var i09=G9h.h4Z;i09+=i84;i09+=v3U;editor[i09](conf[a09],generalError);}else{var r09=L1Z;r09+=u9Z;var A09=E64;A09+=K1Z;A09+=a84;var m09=r14;m09+=K1Z;m09+=G9h.h4Z;m09+=i1Z;if(json[m09]){var e09=V1Z;e09+=m84;var D09=G9h.h4Z;D09+=G9h.U1Z;D09+=v2Z;D09+=p2Z;$[D09](json[e09],function(table,files){var Z09=s7Z;Z09+=G9h.F1Z;G9h[Z09]();if(!Editor[M8Z][table]){Editor[M8Z][table]={};}$[u0Z](Editor[M8Z][table],files);});}ids[v8Z](json[A09][r09]);if(counter<files[m8Z]-o4Z){counter++;reader[U84](files[counter]);}else{var T09=v2Z;T09+=G9h.U1Z;T09+=K1Z;T09+=K1Z;completeCallback[T09](editor,ids);if(submit){editor[x0U]();}}}progressCallback(conf);},error:function(xhr){var D84="uploadXhrE";var Q09=F0Z;Q09+=R1Z;var C09=D1Z;C09+=G9h.U1Z;C09+=R1Z;var B09=D84;B09+=R54;var b09=B74;b09+=C1U;b09+=r9Z;G9h[N8Z]();editor[b09](B09,[conf[C09],xhr]);editor[c1U](conf[Q09],generalError);progressCallback(conf);}}));};files=$[y24](files,function(val){return val;});if(conf[Y09]!==undefined){var R09=p5Z;R09+=I1Z;R09+=H1Z;R09+=p2Z;var S09=P6U;S09+=a24;S09+=Y9Z;files[S09](conf[e84],files[R09]);}reader[f09](files[X4Z]);};Editor[i4U][n09]=function(init){var Q34='init.dt.dte';var J34='<div data-dte-e="form_info" class="';var s34="footer";var d34="ctionN";var Q84="leToo";var r84="body_c";var H34='<div data-dte-e="form_error" class="';var K34="dataSources";var C84="Tab";var t34='initEditor';var t84="cator";var j34='<div data-dte-e="form_content" class="';var B84="formC";var P34="<div ";var n84="<div data-dte-e=\"body";var g84="_content\" class=\"";var h84="y\" class=";var R84="iv cl";var F34="tin";var k84="<span";var M34='<form data-dte-e="form" class="';var p34='<div data-dte-e="processing" class="';var Y84="\"><div ";var O34="tting";var Z34="aT";var T84="bodyConte";var y34='<div data-dte-e="foot" class="';var N34="domTable";var E84="<div data-dte-e=\"";var U34="nique";var Y34='xhr.dt.dte';var X34="legacyAja";var W34='</form>';var q34='<div data-dte-e="head" class="';var g34="yContro";var A84="uniq";var a34='<div data-dte-e="form_buttons" class="';var i34='"/></div>';var k34='initComplete';var S84="s=";var b84="orm_con";var D34="BU";var I84="</div>";var e34="ONS";var L1T=B74;L1T+=Z84;L1T+=H1Z;var G1T=k8U;G1T+=Y94;G1T+=S94;var P1T=A84;P1T+=S94;var x1T=G9h.t4Z;x1T+=D1Z;var l1T=P7Z;l1T+=l6Z;l1T+=G9h.h4Z;l1T+=S9Z;var t4T=P7Z;t4T+=O7Z;t4T+=P2Z;var I4T=r84;I4T+=X2Z;I4T+=l2Z;I4T+=H1Z;var k4T=T84;k4T+=s7U;var h4T=q9Z;h4T+=G9h.t4Z;h4T+=u9Z;h4T+=L2Z;var E4T=V1Z;E4T+=G9h.t4Z;E4T+=U7Z;var g4T=V1Z;g4T+=b84;g4T+=H1Z;g4T+=r9Z;var n4T=B84;n4T+=r8U;var f4T=d6U;f4T+=s7Z;f4T+=G9h.h4Z;f4T+=h9Z;var R4T=u9Z;R4T+=G9h.t4Z;R4T+=K9Z;var C4T=G9h.h4Z;C4T+=Z84;C4T+=H1Z;C4T+=i1Z;var B4T=e14;B4T+=p2Z;var b4T=G9h.U1Z;b4T+=G9h.F1Z;var i4T=C84;i4T+=Q84;i4T+=K1Z;i4T+=i1Z;var q4T=Y84;q4T+=z0Z;q4T+=S84;q4T+=N3Z;var J4T=L1Z;J4T+=V5U;J4T+=G9h.t4Z;var H4T=V1Z;H4T+=G9h.t4Z;H4T+=a9Z;var W4T=N3Z;W4T+=P3Z;W4T+=l3Z;var j4T=I4U;j4T+=G9h.t4Z;j4T+=h9Z;var M4T=o1U;M4T+=r9Z;var s4T=Z9Z;s4T+=h9Z;s4T+=K9Z;var y4T=j0Z;y4T+=P2Z;var p4T=H3Z;p4T+=z3Z;p4T+=l3Z;var v4T=E3Z;v4T+=R84;v4T+=j5U;v4T+=P0Z;var K4T=f84;K4T+=c5Z;K4T+=h9Z;var L4T=N3Z;L4T+=P3Z;L4T+=l3Z;var V4T=n84;V4T+=g84;var w4T=g7U;w4T+=L2Z;var u4T=E84;u4T+=g7U;u4T+=h84;u4T+=N3Z;var N4T=f8Z;N4T+=k84;N4T+=Z0U;N4T+=I84;var c4T=O7U;c4T+=L1Z;c4T+=t84;var O4T=l34;O4T+=x34;var d4T=N3Z;d4T+=l3Z;var o4T=d6U;o4T+=s7Z;o4T+=O2Z;var X4T=P34;X4T+=x6Z;X4T+=O3Z;var G4T=v2Z;G4T+=K1Z;G4T+=z34;var F4T=E7Z;F4T+=U34;var U4T=H9U;U4T+=F34;U4T+=P2Z;U4T+=i1Z;var z4T=K9Z;z4T+=G9h.t4Z;z4T+=r1Z;z4T+=v6Z;var P4T=G34;P4T+=i1Z;P4T+=x9Z;P4T+=i1Z;var x4T=G9h.h4Z;x4T+=o54;x4T+=P44;var l4T=x6Z;l4T+=z34;var t09=X34;t09+=W1Z;var I09=r3U;I09+=G9h.U1Z;I09+=O94;I09+=o34;var k09=G9h.U1Z;k09+=d34;k09+=T54;var h09=i1Z;h09+=G9h.h4Z;h09+=O34;h09+=i1Z;var E09=F2Z;E09+=i1Z;var g09=G9h.h4Z;g09+=o54;g09+=G9h.h4Z;g09+=h1Z;init=$[g09](A8Z,{},Editor[c34],init);this[i1Z]=$[u0Z](A8Z,{},Editor[E09][h09],{actionName:init[k09],table:init[N34]||init[u3U],dbTable:init[u34]||t0Z,ajaxUrl:init[w34],ajax:init[R3U],idSrc:init[V34],dataSource:init[N34]||init[u3U]?Editor[I09][L34]:Editor[K34][R9U],formOptions:init[v34],legacyAjax:init[t09],template:init[E94]?$(init[E94])[S2U]():t0Z});this[l4T]=$[x4T](A8Z,{},Editor[P4T]);this[N0Z]=init[N0Z];Editor[z4T][U4T][F4T]++;var that=this;var classes=this[G4T];this[b4U]={"wrapper":$(X4T+classes[o4T]+d4T+p34+classes[O4T][c4T]+N4T+u4T+classes[w4T][A0Z]+Q0Z+V4T+classes[o8U][Q2U]+L4T+g0Z+y34+classes[K4T][A0Z]+Q0Z+v4T+classes[s34][Q2U]+f0Z+g0Z+p4T)[X4Z],"form":$(M34+classes[l44][y4T]+Q0Z+j34+classes[s4T][M4T]+f0Z+W34)[X4Z],"formError":$(H34+classes[l44][j4T]+W4T)[X4Z],"formInfo":$(J34+classes[H4T][J4T]+f0Z)[X4Z],"header":$(q34+classes[F44][A0Z]+q4T+classes[F44][Q2U]+i34)[X4Z],"buttons":$(a34+classes[l44][f44]+f0Z)[X4Z]};if($[G8Z][L34][i4T]){var Z4T=m34;Z4T+=G9h.U1Z;Z4T+=c5Z;var e4T=G9h.h4Z;e4T+=e54;var D4T=t9U;D4T+=D1Z;var m4T=D34;m4T+=S1Z;m4T+=S1Z;m4T+=e34;var a4T=M0Z;a4T+=H1Z;a4T+=Z34;a4T+=d3U;var ttButtons=$[G8Z][a4T][A34][m4T];var i18n=this[D4T];$[e4T]([Z4T,r34,X64],function(i,val){var b34="sButtonT";var T4T=T34;T4T+=D1Z;var r4T=b34;r4T+=H0Z;var A4T=P64;A4T+=B1Z;G9h[G9h.I4Z]();ttButtons[A4T+val][r4T]=i18n[val][T4T];});}G9h[b4T]();$[B4T](init[C4T],function(evt,fn){var Q4T=G9h.t4Z;Q4T+=D1Z;that[Q4T](evt,function(){var C34="shift";var B34="ly";var S4T=p7U;S4T+=s7Z;S4T+=B34;var Y4T=j1U;Y4T+=d54;var args=Array[i4U][Y4T][Z64](arguments);args[C34]();fn[S4T](that,args);});});var dom=this[R4T];var wrapper=dom[f4T];dom[n4T]=_editor_el(g4T,dom[l44])[X4Z];dom[s34]=_editor_el(E4T,wrapper)[X4Z];dom[o8U]=_editor_el(h4T,wrapper)[X4Z];dom[k4T]=_editor_el(I4T,wrapper)[X4Z];dom[t4T]=_editor_el(l1T,wrapper)[X4Z];if(init[q3U]){this[K3U](init[q3U]);}$(document)[x1T](Q34+this[i1Z][P1T],function(e,settings,json){var F1T=P2Z;F1T+=f6U;var U1T=D1Z;U1T+=S1Z;U1T+=G9h.U1Z;U1T+=i6Z;var z1T=G9h.U1Z;z1T+=G9h.F1Z;G9h[z1T]();if(that[i1Z][u3U]&&settings[U1T]===$(that[i1Z][u3U])[F1T](X4Z)){settings[z64]=that;}})[X2Z](Y34+this[i1Z][G1T],function(e,settings,json){var f34="ptionsUpdate";var S34="nT";var R34="_o";var O1T=P2Z;O1T+=G9h.h4Z;O1T+=H1Z;var d1T=H1Z;d1T+=G9h.U1Z;d1T+=i6Z;var o1T=S34;o1T+=Z5Z;o1T+=G9h.h4Z;var X1T=j0Z;X1T+=k5Z;X1T+=G9h.h4Z;if(json&&that[i1Z][X1T]&&settings[o1T]===$(that[i1Z][d1T])[O1T](X4Z)){var c1T=R34;c1T+=f34;that[c1T](json);}});try{var u1T=L1Z;u1T+=y94;u1T+=H1Z;var N1T=n34;N1T+=g34;N1T+=l6U;this[i1Z][N1T]=Editor[M9U][init[M9U]][u1T](this);}catch(e){var E34="Cannot find display c";var h34="ontroller ";var V1T=B5Z;V1T+=s7Z;V1T+=t3Z;V1T+=L2Z;var w1T=E34;w1T+=h34;throw w1T+init[V1T];}this[L1T](k34,[]);$(document)[I34](t34,[this]);};Editor[K1T][n14]=function(){var P04="dClas";var x04="ddCla";var W1T=G9h.h4Z;W1T+=l04;var M1T=G9h.h4Z;M1T+=u9Z;M1T+=L1Z;M1T+=H1Z;var s1T=H74;s1T+=R2Z;var y1T=E2U;y1T+=L5U;var p1T=W74;p1T+=I9Z;var v1T=x6Z;v1T+=z34;var classesActions=this[v1T][p1T];var action=this[i1Z][R44];var wrapper=$(this[b4U][y1T]);wrapper[h4U]([classesActions[s1T],classesActions[M1T],classesActions[U3U]][u54](r0Z));if(action===Z14){var j1T=G9h.U1Z;j1T+=x04;j1T+=G2U;wrapper[j1T](classesActions[Z14]);}else if(action===W1T){var J1T=z2Z;J1T+=L1Z;J1T+=H1Z;var H1T=j0U;H1T+=P04;H1T+=i1Z;wrapper[H1T](classesActions[J1T]);}else if(action===U3U){var q1T=z9U;q1T+=z04;wrapper[J7U](classesActions[q1T]);}};Editor[i4U][U04]=function(data,success,error,submitParams){var J04="complet";var v04=',';var K04='idSrc';var o04="jaxU";var A04='?';var X04="replac";var e04="exOf";var D04='DELETE';var F04="leteBody";var j04="url";var W04="ompl";var q04="complete";var Z04="param";var p04="crea";var M04=/_id_/;var i04="unshift";var a04="xte";var G04="leteBod";var x9T=r1Z;x9T+=F04;var l9T=r1Z;l9T+=G04;l9T+=L2Z;var t1T=v7Z;t1T+=s7Z;t1T+=G9h.h4Z;var h1T=X04;h1T+=G9h.h4Z;var E1T=E7Z;E1T+=h9Z;E1T+=K1Z;var T1T=S1U;T1T+=t3Z;T1T+=R1U;var r1T=G9h.h4Z;r1T+=u9Z;r1T+=L1Z;r1T+=H1Z;var A1T=G9h.U1Z;A1T+=o04;A1T+=h9Z;A1T+=K1Z;var Z1T=G9h.U1Z;Z1T+=f3U;Z1T+=n3U;var i1T=o94;i1T+=d94;i1T+=O94;i1T+=S1Z;var that=this;var action=this[i1Z][R44];var thrown;var opts={type:i1T,dataType:N94,data:t0Z,error:[function(xhr,text,err){G9h[G9h.I4Z]();thrown=err;}],success:[],complete:[function(xhr,text){var N04="spo";var c04="responseT";var u04="nse";var O04="eTex";var w04="JSON";var V04="responseJSON";var L04="parseJSON";var T4Z=204;var d04="respo";var m1T=D1Z;m1T+=v9Z;m1T+=K1Z;var a1T=d04;a1T+=I9Z;a1T+=O04;a1T+=H1Z;var json=t0Z;if(xhr[q84]===T4Z||xhr[a1T]===m1T){json={};}else{try{var e1T=c04;e1T+=H0Z;var D1T=z9U;D1T+=N04;D1T+=u04;D1T+=w04;json=xhr[V04]?xhr[D1T]:$[L04](xhr[e1T]);}catch(e){}}if($[c0U](json)||$[y3U](json)){success(json,xhr[q84]>=B4Z,xhr);}else{error(xhr,text,thrown);}}]};var a;var ajaxSrc=this[i1Z][Z1T]||this[i1Z][A1T];var id=action===r1T||action===X64?_pluck(this[i1Z][D94],K04):t0Z;if($[y3U](id)){id=id[u54](v04);}if($[T1T](ajaxSrc)&&ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc===G9h.d1Z){var uri=t0Z;var method=t0Z;if(this[i1Z][w34]){var C1T=G9U;C1T+=K1Z;C1T+=o9U;C1T+=G9h.h4Z;var b1T=p04;b1T+=c5Z;var url=this[i1Z][w34];if(url[b1T]){uri=url[action];}if(uri[y04](r0Z)!==-o4Z){var B1T=i1Z;B1T+=s04;a=uri[B1T](r0Z);method=a[X4Z];uri=a[o4Z];}uri=uri[C1T](M04,id);}ajaxSrc(method,uri,data,success,error);return;}else if(typeof ajaxSrc===G14){if(ajaxSrc[y04](r0Z)!==-o4Z){var Y1T=E7Z;Y1T+=h9Z;Y1T+=K1Z;var Q1T=i1Z;Q1T+=K6U;Q1T+=C9U;a=ajaxSrc[Q1T](r0Z);opts[i7Z]=a[X4Z];opts[Y1T]=a[o4Z];}else{opts[j04]=ajaxSrc;}}else{var g1T=H0Z;g1T+=P44;var S1T=v2Z;S1T+=W04;S1T+=H04;var optsCopy=$[u0Z]({},ajaxSrc||{});if(optsCopy[S1T]){var f1T=W4U;f1T+=L2U;f1T+=V2U;var R1T=J04;R1T+=G9h.h4Z;opts[R1T][f1T](optsCopy[q04]);delete optsCopy[q04];}if(optsCopy[c1U]){var n1T=G9h.h4Z;n1T+=R54;opts[n1T][i04](optsCopy[c1U]);delete optsCopy[c1U];}opts=$[g1T]({},opts,optsCopy);}opts[E1T]=opts[j04][h1T](M04,id);if(opts[W0Z]){var I1T=G9h.h4Z;I1T+=a04;I1T+=h1Z;var k1T=M4U;k1T+=m04;k1T+=X2Z;var isFn=typeof opts[W0Z]===k1T;var newData=isFn?opts[W0Z](data):opts[W0Z];data=isFn&&newData?newData:$[I1T](A8Z,data,newData);}opts[W0Z]=data;if(opts[t1T]===D04&&(opts[l9T]===undefined||opts[x9T]===A8Z)){var U9T=i5Z;U9T+=u9Z;U9T+=e04;var z9T=E7Z;z9T+=h9Z;z9T+=K1Z;var P9T=M0Z;P9T+=H1Z;P9T+=G9h.U1Z;var params=$[Z04](opts[P9T]);opts[j04]+=opts[z9T][U9T](A04)===-o4Z?A04+params:N9U+params;delete opts[W0Z];}$[R3U](opts);};Editor[i4U][A7U]=function(target,style,time,callback){var r04="ction";var F9T=V1Z;F9T+=D1Z;if($[F9T][L7U]){var G9T=i1Z;G9T+=H1Z;G9T+=G9h.t4Z;G9T+=s7Z;target[G9T]()[L7U](style,time,callback);}else{var o9T=V1Z;o9T+=E7Z;o9T+=D1Z;o9T+=r04;var X9T=v2Z;X9T+=i1Z;X9T+=i1Z;target[X9T](style);if(typeof time===o9T){time[Z64](target);}else if(callback){var d9T=v2Z;d9T+=G9h.U1Z;d9T+=N14;callback[d9T](target);}}};Editor[O9T][G24]=function(){var T04="app";var b04="yCo";var B04="mEr";var v9T=p7U;v9T+=s7Z;v9T+=P44;var K9T=T04;K9T+=J8Z;K9T+=u9Z;var L9T=g7U;L9T+=b04;L9T+=s7U;L9T+=r9Z;var V9T=T04;V9T+=J8Z;V9T+=u9Z;var w9T=U6Z;w9T+=B04;w9T+=t7Z;var u9T=f84;u9T+=H1Z;u9T+=O2Z;var N9T=M5Z;N9T+=N7U;var c9T=u9Z;c9T+=u6Z;var dom=this[c9T];G9h[N8Z]();$(dom[N9T])[U44](dom[F44]);$(dom[u9T])[R2U](dom[w9T])[V9T](dom[f44]);$(dom[L9T])[K9T](dom[z44])[v9T](dom[l44]);};Editor[i4U][p9T]=function(){var C04="clo";var Q04="eBlur";var S04="_cl";var j9T=C04;j9T+=x9Z;var M9T=h3U;M9T+=L1Z;M9T+=X2Z;var s9T=P7Z;s9T+=Q04;var y9T=G9h.t4Z;y9T+=D1Z;y9T+=K74;y9T+=Y04;var opts=this[i1Z][k3U];var onBlur=opts[y9T];if(this[O44](s9T)===D8Z){return;}if(typeof onBlur===M9T){onBlur(this);}else if(onBlur===M2U){this[x0U]();}else if(onBlur===j9T){var W9T=S04;W9T+=G9h.t4Z;W9T+=x9Z;this[W9T]();}};Editor[i4U][H9T]=function(){var m9T=v7U;m9T+=h9Z;var a9T=u9Z;a9T+=L1Z;a9T+=C1U;a9T+=R04;var i9T=G9h.h4Z;i9T+=h9Z;i9T+=h9Z;i9T+=v3U;var q9T=V1Z;q9T+=e5Z;var J9T=G9h.U1Z;J9T+=G9h.F1Z;G9h[J9T]();if(!this[i1Z]){return;}var errorClass=this[B4U][q9T][i9T];var fields=this[i1Z][q3U];$(a9T+errorClass,this[b4U][m9T])[h4U](errorClass);$[n44](fields,function(name,field){var e9T=K3Z;e9T+=h9Z;var D9T=s7Z;D9T+=G9h.F1Z;G9h[D9T]();field[e9T](U8Z)[M74](U8Z);});this[c1U](U8Z)[M74](U8Z);};Editor[i4U][u44]=function(submitComplete,mode){var x4I='focus.editor-focus';var k04="seCb";var f04="los";var t04="Icb";var h04='preClose';var n04="eIcb";var E04="eC";var C9T=B74;C9T+=Z84;C9T+=H1Z;var B9T=W7U;B9T+=u9Z;B9T+=L2Z;var T9T=v2Z;T9T+=f04;T9T+=n04;var A9T=g04;A9T+=E04;A9T+=q9Z;var Z9T=B74;Z9T+=C1U;Z9T+=r9Z;var closed;if(this[Z9T](h04)===D8Z){return;}if(this[i1Z][A9T]){var r9T=v2Z;r9T+=K1Z;r9T+=G9h.t4Z;r9T+=k04;closed=this[i1Z][r9T](submitComplete,mode);this[i1Z][I04]=t0Z;}if(this[i1Z][T9T]){var b9T=g04;b9T+=G9h.h4Z;b9T+=t04;this[i1Z][l4I]();this[i1Z][b9T]=t0Z;}G9h[G9h.I4Z]();$(B9T)[k6U](x4I);this[i1Z][g94]=D8Z;this[C9T](l0U);if(closed){var Y9T=x6Z;Y9T+=G9h.t4Z;Y9T+=i1Z;Y9T+=z2Z;var Q9T=B1Z;Q9T+=z54;Q9T+=J8Z;Q9T+=H1Z;this[Q9T](Y9T,[closed]);}};Editor[i4U][G44]=function(fn){this[i1Z][I04]=fn;};Editor[S9T][W54]=function(arg1,arg2,arg3,arg4){var P4I="sPlainObject";var E9T=K9Z;E9T+=G9h.U1Z;E9T+=L1Z;E9T+=D1Z;var g9T=G9h.h4Z;g9T+=W1Z;g9T+=l2Z;g9T+=u9Z;var f9T=G9h.U1Z;f9T+=G9h.F1Z;var R9T=L1Z;R9T+=P4I;var that=this;var title;var buttons;var show;var opts;if($[R9T](arg1)){opts=arg1;}else if(typeof arg1===N0U){show=arg1;opts=arg2;;}else{title=arg1;buttons=arg2;show=arg3;opts=arg4;;}G9h[f9T]();if(show===undefined){show=A8Z;}if(title){var n9T=p9Z;n9T+=F64;n9T+=G9h.h4Z;that[n9T](title);}if(buttons){that[f44](buttons);}return{opts:$[g9T]({},this[i1Z][v34][E9T],opts),maybeOpen:function(){var z4I="open";if(show){that[z4I]();}}};};Editor[h9T][k9T]=function(name){var t9T=i1Z;t9T+=L2U;t9T+=V2U;var I9T=i1Z;I9T+=K1Z;I9T+=d54;var args=Array[i4U][I9T][Z64](arguments);G9h[N8Z]();args[t9T]();var fn=this[i1Z][U4I][name];if(fn){var l2T=G9h.U1Z;l2T+=c74;l2T+=K1Z;l2T+=L2Z;return fn[l2T](this,args);}};Editor[i4U][g14]=function(includeFields){var G4I="mContent";var v4I='displayOrder';var o4I="nclu";var d4I="deFields";var F4I="ild";var V2T=t64;V2T+=X2Z;var w2T=y54;w2T+=H1Z;var u2T=K9Z;u2T+=G9h.U1Z;u2T+=L1Z;u2T+=D1Z;var F2T=K8Z;F2T+=F4I;F2T+=S4U;var z2T=V1Z;z2T+=H14;z2T+=j3U;var P2T=U6Z;P2T+=G4I;var x2T=u9Z;x2T+=G9h.t4Z;x2T+=K9Z;var that=this;var formContent=$(this[x2T][P2T]);var fields=this[i1Z][z2T];var order=this[i1Z][b3U];var template=this[i1Z][E94];var mode=this[i1Z][X4I]||x54;if(includeFields){this[i1Z][w44]=includeFields;}else{var U2T=L1Z;U2T+=o4I;U2T+=d4I;includeFields=this[i1Z][U2T];}formContent[F2T]()[S2U]();$[n44](order,function(i,fieldOrName){var N4I="data-edito";var u4I="r-templ";var O4I="_weakInArray";var V4I="nod";var K4I="-field[name=\"";var w4I="ate=\"";var c4I="[";G9h[G9h.I4Z]();var name=fieldOrName instanceof Editor[F4U]?fieldOrName[y0Z]():fieldOrName;if(that[O4I](name,includeFields)!==-o4Z){var G2T=Y74;G2T+=D1Z;if(template&&mode===G2T){var O2T=c4I;O2T+=N4I;O2T+=u4I;O2T+=w4I;var d2T=V4I;d2T+=G9h.h4Z;var o2T=G9h.U1Z;o2T+=V2U;o2T+=G9h.h4Z;o2T+=h9Z;var X2T=z2Z;X2T+=L4I;X2T+=K4I;template[i94](X2T+name+L8Z)[o2T](fields[name][d2T]());template[i94](O2T+name+L8Z)[R2U](fields[name][q94]());}else{var N2T=X2U;N2T+=u9Z;N2T+=G9h.h4Z;var c2T=G9h.U1Z;c2T+=U8U;formContent[c2T](fields[name][N2T]());}}});if(template&&mode===u2T){template[H5U](formContent);}this[w2T](v4I,[this[i1Z][g94],this[i1Z][V2T],formContent]);};Editor[i4U][u0U]=function(items,editFields,type,formOptions,setupDone){var m4I='initEdit';var s4I="editDa";var a4I="splic";var p4I="_displayR";var q4I="oS";var y4I="eorder";var A2T=X2U;A2T+=u9Z;A2T+=G9h.h4Z;var Z2T=p4I;Z2T+=y4I;var p2T=G9h.h4Z;p2T+=e54;var v2T=o9U;v2T+=E5Z;var K2T=s4I;K2T+=j0Z;var L2T=V1Z;L2T+=L1Z;L2T+=O0Z;L2T+=i1Z;var that=this;var fields=this[i1Z][L2T];var usedFields=[];var includeInOrder;var editData={};this[i1Z][D94]=editFields;G9h[N8Z]();this[i1Z][K2T]=editData;this[i1Z][f14]=items;this[i1Z][v2T]=e3U;this[b4U][l44][J6U][M9U]=I1U;this[i1Z][X4I]=type;this[n14]();$[p2T](fields,function(name,field){var J4I="sh";field[Z3U]();includeInOrder=D8Z;editData[name]={};$[n44](editFields,function(idSrc,edit){var j4I="splayFi";var M4I="scope";var W4I="ayFie";var H4I="yFiel";var y2T=V1Z;y2T+=R14;if(edit[y2T][name]){var j2T=h9Z;j2T+=G9h.t4Z;j2T+=M5Z;var M2T=i1Z;M2T+=r8Z;M2T+=G9h.h4Z;var s2T=u9Z;s2T+=G9h.U1Z;s2T+=j0Z;var val=field[T3U](edit[s2T]);editData[name][idSrc]=val===t0Z?U8Z:$[y3U](val)?val[M2T]():val;if(!formOptions||formOptions[M4I]===j2T){var q2T=r5Z;q2T+=j4I;q2T+=S14;var J2T=Y4U;J2T+=W4I;J2T+=j1Z;var H2T=r1Z;H2T+=V1Z;var W2T=q3Z;W2T+=k14;field[W2T](idSrc,val!==undefined?val:field[H2T]());if(!edit[J2T]||edit[q2T][name]){includeInOrder=A8Z;}}else{var a2T=u9Z;a2T+=Q6U;a2T+=F4U;a2T+=i1Z;var i2T=n34;i2T+=H4I;i2T+=j3U;if(!edit[i2T]||edit[a2T][name]){field[D74](idSrc,val!==undefined?val:field[D4U]());includeInOrder=A8Z;}}}});if(field[G1U]()[m8Z]!==X4Z&&includeInOrder){var m2T=s7Z;m2T+=E7Z;m2T+=J4I;usedFields[m2T](name);}});var currOrder=this[b3U]()[J4U]();for(var i=currOrder[m8Z]-o4Z;i>=X4Z;i--){var D2T=H1Z;D2T+=q4I;D2T+=i4I;D2T+=I1Z;if($[n1U](currOrder[i][D2T](),usedFields)===-o4Z){var e2T=a4I;e2T+=G9h.h4Z;currOrder[e2T](i,o4Z);}}this[Z2T](currOrder);this[O44](m4I,[_pluck(editFields,A2T)[X4Z],_pluck(editFields,e94)[X4Z],items,type],function(){var e4I="tiEdit";var D4I="itMul";var T2T=i5Z;T2T+=D4I;T2T+=e4I;var r2T=B74;r2T+=C1U;r2T+=r9Z;that[r2T](T2T,[editFields,items,type],function(){G9h[G9h.I4Z]();setupDone();});});};Editor[i4U][b2T]=function(trigger,args,promiseComplete){var B4I="cel";var C4I="triggerHandle";var Z4I="Even";var Q4I="Event";var T4I="result";var r4I='pre';if(!args){args=[];}if($[y3U](trigger)){var B2T=p5Z;B2T+=D1Z;B2T+=M54;B2T+=p2Z;for(var i=X4Z,ien=trigger[B2T];i<ien;i++){var C2T=T7Z;C2T+=G9h.h4Z;C2T+=D1Z;C2T+=H1Z;this[C2T](trigger[i],args);}}else{var f2T=h9Z;f2T+=G9h.h4Z;f2T+=i1Z;f2T+=K14;var Q2T=Z4I;Q2T+=H1Z;var e=$[Q2T](trigger);$(this)[A4I](e,args);if(trigger[y04](r4I)===X4Z&&e[T4I]===D8Z){var S2T=S2Z;S2T+=b4I;S2T+=B4I;S2T+=w4U;var Y2T=C4I;Y2T+=h9Z;$(this)[Y2T]($[Q4I](trigger+S2T),args);}if(promiseComplete){var R2T=a8Z;R2T+=H1Z;if(e[T4I]&&typeof e[T4I]===R2T&&e[T4I][T94]){e[T4I][T94](promiseComplete);}else{promiseComplete(e[T4I]);}}return e[f2T];}};Editor[n2T][g2T]=function(input){var R4I=/^on([A-Z])/;var f4I="toLo";var g4I="substring";var Y4I="joi";var n4I="werC";var k2T=Y4I;k2T+=D1Z;var E2T=T5Z;E2T+=L1Z;E2T+=H1Z;var name;var names=input[E2T](r0Z);for(var i=X4Z,ien=names[m8Z];i<ien;i++){name=names[i];var onStyle=name[S4I](R4I);if(onStyle){var h2T=f4I;h2T+=n4I;h2T+=G9h.U1Z;h2T+=x9Z;name=onStyle[o4Z][h2T]()+name[g4I](O4Z);}names[i]=name;}return names[k2T](r0Z);};Editor[I2T][t2T]=function(node){var l7T=r14;l7T+=V6Z;l7T+=u9Z;l7T+=i1Z;var foundField=t0Z;$[n44](this[i1Z][l7T],function(name,field){var P7T=K1Z;P7T+=J8Z;P7T+=M54;P7T+=p2Z;var x7T=s7Z;x7T+=G9h.F1Z;G9h[x7T]();if($(field[q94]())[i94](node)[P7T]){foundField=field;}});return foundField;};Editor[i4U][E4I]=function(fieldNames){var U7T=s7Z;U7T+=G9h.F1Z;if(fieldNames===undefined){var z7T=p1Z;z7T+=K1Z;z7T+=j3U;return this[z7T]();}else if(!$[y3U](fieldNames)){return[fieldNames];}G9h[U7T]();return fieldNames;};Editor[F7T][G7T]=function(fieldsIn,focus){var I4I=/^jq:/;var k4I=".DTE";var h4I='jq:';var X7T=K9Z;X7T+=G9h.U1Z;X7T+=s7Z;var that=this;var field;var fields=$[X7T](fieldsIn,function(fieldOrName){var d7T=V1Z;d7T+=K6Z;d7T+=K1Z;d7T+=j3U;var o7T=d9U;o7T+=L1Z;o7T+=I1Z;return typeof fieldOrName===o7T?that[i1Z][d7T][fieldOrName]:fieldOrName;});if(typeof focus===Y14){field=fields[focus];}else if(focus){if(focus[y04](h4I)===X4Z){var c7T=z9U;c7T+=o74;var O7T=z3Z;O7T+=k4I;O7T+=C2Z;field=$(O7T+focus[c7T](I4I,U8Z));}else{field=this[i1Z][q3U][focus];}}else{var N7T=q9Z;N7T+=K1Z;N7T+=E7Z;N7T+=h9Z;document[t4I][N7T]();}this[i1Z][l1I]=field;if(field){var u7T=V1Z;u7T+=R24;field[u7T]();}};Editor[w7T][V7T]=function(opts){var o1I="kgr";var M1I="nBlur";var q1I="onR";var L1I="mplete";var r1I='keyup';var F1I="age";var J1I="turn";var N1I="Comp";var W1I="submitOnReturn";var X1I="blurOnBac";var j1I="onBlur";var i1I="eturn";var a1I="nBackground";var K1I="onComplet";var c1I="closeOn";var y1I="bmi";var U1I="down";var z1I="ey";var O1I="Blur";var d1I="submitOn";var H1I="submitOnRe";var V1I="OnCo";var G1I="ditCount";var P1I="cb";var w1I='.dteInline';var u1I="let";var c5T=v2Z;c5T+=x1I;c5T+=i3Z;c5T+=P1I;var S7T=G9h.t4Z;S7T+=D1Z;var C7T=J6Z;C7T+=z1I;C7T+=U1I;var B7T=G9h.t4Z;B7T+=D1Z;var b7T=q9Z;b7T+=E7Z;b7T+=d74;b7T+=i1Z;var r7T=K9Z;r7T+=J0U;r7T+=F1I;var A7T=b64;A7T+=g64;A7T+=P2Z;var Z7T=K9Z;Z7T+=U64;var a7T=G9h.h4Z;a7T+=G1I;var q7T=X1I;q7T+=o1I;q7T+=M8U;var y7T=d1I;y7T+=O1I;var L7T=c1I;L7T+=N1I;L7T+=u1I;L7T+=G9h.h4Z;var that=this;var inlineCount=__inlineCounter++;var namespace=w1I+inlineCount;if(opts[L7T]!==undefined){var p7T=x6Z;p7T+=G9h.t4Z;p7T+=x9Z;var v7T=i5U;v7T+=V1I;v7T+=L1I;var K7T=K1I;K7T+=G9h.h4Z;opts[K7T]=opts[v7T]?p7T:E4U;}if(opts[y7T]!==undefined){var M7T=v1I;M7T+=H1Z;var s7T=p1I;s7T+=y1I;s7T+=s1I;s7T+=M1I;opts[j1I]=opts[s7T]?M7T:l0U;}if(opts[W1I]!==undefined){var J7T=X2U;J7T+=O1U;var H7T=i1Z;H7T+=h5Z;H7T+=K9Z;H7T+=C9U;var W7T=H1I;W7T+=J1I;var j7T=q1I;j7T+=i1I;opts[j7T]=opts[W7T]?H7T:J7T;}if(opts[q7T]!==undefined){var i7T=t3U;i7T+=d94;i7T+=a1I;opts[I3U]=opts[i7T]?j2U:E4U;}this[i1Z][k3U]=opts;this[i1Z][a7T]=inlineCount;if(typeof opts[m1I]===G14||typeof opts[m1I]===G9h.d1Z){var e7T=H1Z;e7T+=L1Z;e7T+=a3Z;var D7T=H1Z;D7T+=C9U;D7T+=p5Z;var m7T=H1Z;m7T+=L1Z;m7T+=H1Z;m7T+=p5Z;this[m7T](opts[D7T]);opts[e7T]=A8Z;}if(typeof opts[Z7T]===A7T||typeof opts[r7T]===G9h.d1Z){var T7T=K9Z;T7T+=U64;this[M74](opts[T7T]);opts[M74]=A8Z;}if(typeof opts[b7T]!==N0U){this[f44](opts[f44]);opts[f44]=A8Z;}$(document)[B7T](C7T+namespace,function(e){var A1I="canReturnSubmit";var e1I="Submit";var Z1I="eldFromNode";var D1I="canReturn";if(e[c14]===v4Z&&that[i1Z][g94]){var el=$(document[t4I]);if(el){var Y7T=D1I;Y7T+=e1I;var Q7T=X24;Q7T+=Z1I;var field=that[Q7T](el);if(field&&typeof field[Y7T]===G9h.d1Z&&field[A1I](el)){e[v14]();}}}});$(document)[S7T](r1I+namespace,function(e){var C1I="keyC";var t1I="tur";var b1I="ispl";var f1I="nRe";var Q1I="veElemen";var h1I="functio";var X9I='.DTE_Form_Buttons';var l9I="tDefault";var d9I="Cod";var O9I="prev";var N9I="next";var I1I="urn";var S1I="turnSu";var n1I="turnSubmit";var x9I="onReturn";var D4Z=39;var U9I="onEsc";var g1I="_fieldFr";var E1I="omNo";var Y1I="canRe";var m4Z=37;var k1I="onRet";var x5T=J6Z;x5T+=T1I;x5T+=u9Z;x5T+=G9h.h4Z;var n7T=u9Z;n7T+=b1I;n7T+=G9h.U1Z;n7T+=B1I;var f7T=C1I;f7T+=X94;f7T+=G9h.h4Z;var R7T=t64;R7T+=Q1I;R7T+=H1Z;var el=$(document[R7T]);if(e[f7T]===v4Z&&that[i1Z][n7T]){var h7T=Y1I;h7T+=S1I;h7T+=y1I;h7T+=H1Z;var E7T=R1I;E7T+=f1I;E7T+=n1I;var g7T=g1I;g7T+=E1I;g7T+=r1Z;var field=that[g7T](el);if(field&&typeof field[E7T]===G9h.d1Z&&field[h7T](el)){var t7T=h1I;t7T+=D1Z;var I7T=k1I;I7T+=I1I;var k7T=q1I;k7T+=G9h.h4Z;k7T+=t1I;k7T+=D1Z;if(opts[k7T]===M2U){e[v14]();that[x0U]();}else if(typeof opts[I7T]===t7T){var l5T=w14;l5T+=Z84;l5T+=l9I;e[l5T]();opts[x9I](that,e);}}}else if(e[x5T]===H4Z){var G5T=i1Z;G5T+=E7Z;G5T+=P9I;var U5T=q9Z;U5T+=K1Z;U5T+=E7Z;U5T+=h9Z;var P5T=V1Z;P5T+=k8U;P5T+=Z74;P5T+=z9I;e[v14]();if(typeof opts[U9I]===P5T){var z5T=X2Z;z5T+=n9Z;z5T+=F9I;opts[z5T](that,e);}else if(opts[U9I]===U5T){var F5T=q9Z;F5T+=f7Z;F5T+=h9Z;that[F5T]();}else if(opts[U9I]===l0U){that[i5U]();}else if(opts[U9I]===G5T){that[x0U]();}}else if(el[G9I](X9I)[m8Z]){var X5T=o9I;X5T+=d9I;X5T+=G9h.h4Z;if(e[X5T]===m4Z){var d5T=Z9Z;d5T+=a7Z;d5T+=i1Z;var o5T=T34;o5T+=D1Z;el[O9I](o5T)[d5T]();}else if(e[c14]===D4Z){var O5T=c9I;O5T+=X2Z;el[N9I](O5T)[p4U]();}}});this[i1Z][c5T]=function(){var u9I="keydo";var w5T=t8U;w5T+=V1Z;var u5T=u9I;u5T+=M5Z;u5T+=D1Z;var N5T=G9h.t4Z;N5T+=V1Z;N5T+=V1Z;$(document)[N5T](u5T+namespace);$(document)[w5T](r1I+namespace);};return namespace;};Editor[V5T][w9I]=function(direction,action,data){var V9I="legacyAj";var L9I='send';var L5T=V9I;L5T+=G9h.U1Z;L5T+=W1Z;if(!this[i1Z][L5T]||!data){return;}if(direction===L9I){var K5T=G9h.h4Z;K5T+=r5Z;K5T+=H1Z;if(action===I0Z||action===K5T){var j5T=K9I;j5T+=H1Z;var M5T=u9Z;M5T+=v9I;var p5T=M0Z;p5T+=H1Z;p5T+=G9h.U1Z;var v5T=e14;v5T+=p2Z;var id;$[v5T](data[p5T],function(rowId,values){var p9I=": Multi-row editing is not supported by the legacy Ajax data format";var s5T=G9h.U1Z;s5T+=G9h.F1Z;if(id!==undefined){var y5T=u8Z;y5T+=p9I;throw y5T;}G9h[s5T]();id=rowId;});data[W0Z]=data[M5T][id];if(action===j5T){data[m5Z]=id;}}else{var q5T=M0Z;q5T+=H1Z;q5T+=G9h.U1Z;var J5T=u9Z;J5T+=G9h.U1Z;J5T+=H1Z;J5T+=G9h.U1Z;var H5T=K9Z;H5T+=p7U;var W5T=L1Z;W5T+=u9Z;data[W5T]=$[H5T](data[J5T],function(values,id){return id;});delete data[q5T];}}else{var m5T=M0Z;m5T+=j0Z;var i5T=u9Z;i5T+=v9I;if(!data[i5T]&&data[V3U]){var a5T=h9Z;a5T+=G9h.t4Z;a5T+=M5Z;data[W0Z]=[data[a5T]];}else if(!data[m5T]){var D5T=u9Z;D5T+=q9U;D5T+=G9h.U1Z;data[D5T]=[];}}};Editor[i4U][e5T]=function(json){var A5T=G9h.t4Z;A5T+=F24;A5T+=G9h.t4Z;A5T+=I9Z;var Z5T=G9h.U1Z;Z5T+=G9h.F1Z;var that=this;G9h[Z5T]();if(json[A5T]){var r5T=e14;r5T+=p2Z;$[r5T](this[i1Z][q3U],function(name,field){var s9I="upd";var y9I="update";var T5T=G9h.t4Z;T5T+=s7Z;T5T+=j4U;T5T+=I9Z;if(json[T5T][name]!==undefined){var b5T=V1Z;b5T+=L1Z;b5T+=O0Z;var fieldInst=that[b5T](name);if(fieldInst&&fieldInst[y9I]){var B5T=s9I;B5T+=G9h.U1Z;B5T+=H1Z;B5T+=G9h.h4Z;fieldInst[B5T](json[M9I][name]);}}});}};Editor[i4U][j74]=function(el,msg){var a9I="eIn";var i9I="fad";var J9I="deO";var canAnimate=$[G8Z][L7U]?A8Z:D8Z;if(typeof msg===G9h.d1Z){var Q5T=j9I;Q5T+=G9h.h4Z;var C5T=n9U;C5T+=W9I;msg=msg(this,new DataTable[C5T](this[i1Z][Q5T]));}el=$(el);if(canAnimate){el[H9I]();}if(!msg){var Y5T=u9Z;Y5T+=G0U;Y5T+=U9U;Y5T+=B1I;if(this[i1Z][Y5T]&&canAnimate){var S5T=V1Z;S5T+=G9h.U1Z;S5T+=J9I;S5T+=u1U;el[S5T](function(){el[R9U](U8Z);});}else{var R5T=p2Z;R5T+=H1Z;R5T+=q9I;el[R5T](U8Z)[g4U](U4U,E4U);}}else{if(this[i1Z][g94]&&canAnimate){var f5T=i9I;f5T+=a9I;el[R9U](msg)[f5T]();}else{el[R9U](msg)[g4U](U4U,I1U);}}};Editor[n5T][g5T]=function(){var Z9I="isMultiVa";var r9I="multiInfoShown";var A9I="multiEditab";var m9I="udeFields";var e9I="tiValu";var D9I="isM";var h5T=i5Z;h5T+=v2Z;h5T+=K1Z;h5T+=m9I;var E5T=r14;E5T+=O0Z;E5T+=i1Z;var fields=this[i1Z][E5T];var include=this[i1Z][h5T];var show=A8Z;var state;if(!include){return;}for(var i=X4Z,ien=include[m8Z];i<ien;i++){var t5T=D9I;t5T+=v9Z;t5T+=e9I;t5T+=G9h.h4Z;var I5T=Z9I;I5T+=e3Z;var k5T=A9I;k5T+=p5Z;var field=fields[include[i]];var multiEditable=field[k5T]();if(field[I5T]()&&multiEditable&&show){state=A8Z;show=D8Z;}else if(field[t5T]()&&!multiEditable){state=A8Z;}else{state=D8Z;}fields[include[i]][r9I](state);}};Editor[l6T][x6T]=function(type,immediate){var Q9I='submit.editor-internal';var B9I="captu";var b9I="or-intern";var S9I="tor-";var k9I='opened';var Y9I="focus.edi";var T9I="submit.e";var C9I="reFocus";var L6T=G9h.U1Z;L6T+=m04;L6T+=G9h.t4Z;L6T+=D1Z;var V6T=G9h.t4Z;V6T+=s7Z;V6T+=G9h.h4Z;V6T+=D1Z;var w6T=B1Z;w6T+=G9h.h4Z;w6T+=Z9U;w6T+=s7U;var G6T=v5U;G6T+=L1Z;G6T+=D1Z;var F6T=T9I;F6T+=l04;F6T+=b9I;F6T+=M64;var U6T=G9h.t4Z;U6T+=R6U;var z6T=u9Z;z6T+=G9h.t4Z;z6T+=K9Z;var P6T=B9I;P6T+=C9I;var that=this;var focusCapture=this[i1Z][h94][P6T];if(focusCapture===undefined){focusCapture=A8Z;}$(this[z6T][l44])[U6T](Q9I)[X2Z](F6T,function(e){e[v14]();});if(focusCapture&&(type===G6T||type===w0U)){var o6T=Y9I;o6T+=S9I;o6T+=p4U;var X6T=G9h.t4Z;X6T+=D1Z;$(n4U)[X6T](o6T,function(){var h9I="setFo";var E9I='.DTED';var n9I="activeEle";var f9I="rents";var g9I="ment";var N6T=K1Z;N6T+=R9I;N6T+=H1Z;N6T+=p2Z;var c6T=R04;c6T+=A1Z;c6T+=S1Z;c6T+=n9Z;var O6T=k7Z;O6T+=f9I;var d6T=n9I;d6T+=g9I;if($(document[d6T])[O6T](c6T)[N6T]===X4Z&&$(document[t4I])[G9I](E9I)[m8Z]===X4Z){var u6T=h9I;u6T+=i54;if(that[i1Z][u6T]){that[i1Z][l1I][p4U]();}}});}this[u2U]();this[w6T](V6T,[type,this[i1Z][L6T]]);G9h[N8Z]();if(immediate){var K6T=B74;K6T+=Z84;K6T+=H1Z;this[K6T](k9I,[type,this[i1Z][R44]]);}return A8Z;};Editor[v6T][p6T]=function(type){var x2I="_cle";var l2I="Ic";var z2I="ynamicInfo";var U2I='cancelOpen';var P2I="arD";var J6T=r5Z;J6T+=I9I;J6T+=G9h.h4Z;J6T+=u9Z;var H6T=G9h.U1Z;H6T+=G9h.F1Z;var y6T=t9I;y6T+=J8Z;if(this[O44](y6T,[type,this[i1Z][R44]])===D8Z){var W6T=g04;W6T+=G9h.h4Z;W6T+=l2I;W6T+=q9Z;var j6T=w6Z;j6T+=G9h.h4Z;var M6T=B1Z;M6T+=H94;var s6T=x2I;s6T+=P2I;s6T+=z2I;this[s6T]();this[M6T](U2I,[type,this[i1Z][R44]]);if((this[i1Z][j6T]===w74||this[i1Z][X4I]===w0U)&&this[i1Z][W6T]){this[i1Z][l4I]();}this[i1Z][l4I]=t0Z;return D8Z;}G9h[H6T]();this[i1Z][J6T]=type;return A8Z;};Editor[q6T][i6T]=function(processing){var o2I='div.DTE';var G2I="rocessi";var X2I="oces";var F2I="essi";var Z6T=P7Z;Z6T+=l6Z;Z6T+=F2I;Z6T+=I1Z;var e6T=s7Z;e6T+=G2I;e6T+=I1Z;var D6T=u9Z;D6T+=G9h.t4Z;D6T+=K9Z;var m6T=Q54;m6T+=t8Z;m6T+=G9h.h4Z;var a6T=P7Z;a6T+=X2I;a6T+=u94;var procClass=this[B4U][a6T][m6T];$([o2I,this[D6T][A0Z]])[N2U](procClass,processing);this[i1Z][e6T]=processing;this[O44](Z6T,[processing]);};Editor[A6T][d2I]=function(successCallback,errorCallback,formatdata,hide){var c2I="editD";var C2I="si";var O2I="dbTa";var V2I="hang";var a2I='allIfChanged';var w2I="actionName";var B2I="ces";var e2I="ple";var A2I="onCom";var T2I='preSubmit';var u2I="editCount";var m2I="_proces";var y8T=R1I;y8T+=K1Z;y8T+=K1Z;var p8T=G9h.U1Z;p8T+=f3U;p8T+=G9h.U1Z;p8T+=W1Z;var K8T=H0Z;K8T+=P44;var L8T=i1Z;L8T+=P44;var u8T=e9U;u8T+=p54;u8T+=G9h.h4Z;var f6T=G9h.h4Z;f6T+=u9Z;f6T+=L1Z;f6T+=H1Z;var R6T=H74;R6T+=G9h.h4Z;R6T+=B2Z;var Y6T=O2I;Y6T+=i6Z;var Q6T=G9h.U1Z;Q6T+=m04;Q6T+=X2Z;var C6T=e3U;C6T+=d94;C6T+=s7Z;C6T+=R4U;var B6T=c2I;B6T+=v9I;var b6T=z2Z;b6T+=J94;b6T+=V6Z;b6T+=j3U;var T6T=V1Z;T6T+=K6Z;T6T+=q1Z;T6T+=i1Z;var r6T=N2I;r6T+=W9I;var that=this;var i,iLen,eventRet,errorNodes;var changed=D8Z,allData={},changedData={};var setBuilder=DataTable[H0Z][r6T][e0Z];var dataSource=this[i1Z][U4I];var fields=this[i1Z][T6T];var editCount=this[i1Z][u2I];var modifier=this[i1Z][f14];var editFields=this[i1Z][b6T];var editData=this[i1Z][B6T];var opts=this[i1Z][C6T];var changedSubmit=opts[x0U];var submitParamsLocal;var action=this[i1Z][Q6T];var submitParams={"data":{}};submitParams[this[i1Z][w2I]]=action;if(this[i1Z][Y6T]){var S6T=H1Z;S6T+=Z5Z;S6T+=G9h.h4Z;submitParams[S6T]=this[i1Z][u34];}if(action===R6T||action===f6T){var G8T=v2Z;G8T+=V2I;G8T+=z2Z;var U8T=G9h.U1Z;U8T+=K1Z;U8T+=K1Z;var n6T=G9h.h4Z;n6T+=e54;$[n6T](editFields,function(idSrc,edit){var K2I="yObject";var z8T=L2I;z8T+=K2I;var allRowData={};var changedRowData={};$[n44](fields,function(name,field){var W2I="romDat";var p2I="-m";var s2I="ndexOf";var q2I="compare";var y2I="any-count";var v2I="submittable";var j2I="valF";var M2I="Ge";var H2I='[]';var J2I=/\[.*$/;var g6T=G9h.U1Z;g6T+=G9h.F1Z;G9h[g6T]();if(edit[q3U][name]&&field[v2I]()){var x8T=G9h.h4Z;x8T+=u9Z;x8T+=L1Z;x8T+=H1Z;var t6T=p2I;t6T+=y2I;var I6T=L1Z;I6T+=s2I;var E6T=b8Z;E6T+=p9Z;E6T+=M2I;E6T+=H1Z;var multiGet=field[E6T]();var builder=setBuilder(name);if(multiGet[idSrc]===undefined){var k6T=u9Z;k6T+=G9h.U1Z;k6T+=H1Z;k6T+=G9h.U1Z;var h6T=j2I;h6T+=W2I;h6T+=G9h.U1Z;var originalVal=field[h6T](edit[k6T]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=$[y3U](value)&&name[I6T](H2I)!==-o4Z?setBuilder(name[G74](J2I,U8Z)+t6T):t0Z;builder(allRowData,value);if(manyBuilder){var l8T=K1Z;l8T+=R9I;l8T+=q8Z;manyBuilder(allRowData,value[l8T]);}if(action===x8T&&(!editData[name]||!field[q2I](value,editData[name][idSrc]))){builder(changedRowData,value);changed=A8Z;if(manyBuilder){var P8T=M24;P8T+=q8Z;manyBuilder(changedRowData,value[P8T]);}}}});if(!$[z8T](allRowData)){allData[idSrc]=allRowData;}if(!$[i2I](changedRowData)){changedData[idSrc]=changedRowData;}});if(action===I0Z||changedSubmit===U8T||changedSubmit===a2I&&changed){var F8T=u9Z;F8T+=q9U;F8T+=G9h.U1Z;submitParams[F8T]=allData;}else if(changedSubmit===G8T&&changed){var X8T=u9Z;X8T+=G9h.U1Z;X8T+=H1Z;X8T+=G9h.U1Z;submitParams[X8T]=changedData;}else{var N8T=T74;N8T+=s7U;var c8T=m2I;c8T+=i1Z;c8T+=i5Z;c8T+=P2Z;var o8T=G9h.t4Z;o8T+=D2I;o8T+=e2I;o8T+=c5Z;this[i1Z][R44]=t0Z;if(opts[Z2I]===l0U&&(hide===undefined||hide)){this[u44](D8Z);}else if(typeof opts[o8T]===G9h.d1Z){var d8T=A2I;d8T+=e2I;d8T+=H1Z;d8T+=G9h.h4Z;opts[d8T](this);}if(successCallback){var O8T=v2Z;O8T+=G9h.U1Z;O8T+=K1Z;O8T+=K1Z;successCallback[O8T](this);}this[c8T](D8Z);this[N8T](r2I);return;}}else if(action===u8T){$[n44](editFields,function(idSrc,edit){var V8T=M0Z;V8T+=j0Z;var w8T=G9h.U1Z;w8T+=G9h.F1Z;G9h[w8T]();submitParams[V8T][idSrc]=edit[W0Z];});}this[w9I](L8T,action,submitParams);submitParamsLocal=$[K8T](A8Z,{},submitParams);if(formatdata){formatdata(submitParams);}if(this[O44](T2I,[submitParams,action])===D8Z){var v8T=b2I;v8T+=B2I;v8T+=C2I;v8T+=I1Z;this[v8T](D8Z);return;}var submitWire=this[i1Z][p8T]||this[i1Z][w34]?this[U04]:this[Q2I];submitWire[y8T](this,submitParams,function(json,notGood,xhr){var s8T=G9h.U1Z;s8T+=v2Z;s8T+=H1Z;s8T+=z9I;that[Y2I](json,notGood,submitParams,submitParamsLocal,that[i1Z][s8T],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var S2I="_submitError";G9h[G9h.I4Z]();that[S2I](xhr,err,thrown,errorCallback,submitParams,that[i1Z][R44]);},submitParams);};Editor[M8T][Q2I]=function(data,success,error,submitParams){var l7I='fields';var n2I="_fnSe";var f2I="rc";var g2I="bjec";var R2I="idS";var I2I="difi";var E2I="tDataFn";var t2I="odi";var h2I="fnGe";var k2I="tObjectDa";var a8T=R2I;a8T+=f2I;var i8T=n2I;i8T+=s1I;i8T+=g2I;i8T+=E2I;var q8T=G9h.h4Z;q8T+=W1Z;q8T+=H1Z;var J8T=B1Z;J8T+=h2I;J8T+=k2I;J8T+=m0Z;var H8T=G9h.t4Z;H8T+=n9U;H8T+=s7Z;H8T+=L1Z;var W8T=G9h.h4Z;W8T+=W1Z;W8T+=H1Z;var j8T=Q54;j8T+=z9I;var that=this;var action=data[j8T];var out={data:[]};var idGet=DataTable[W8T][H8T][J8T](this[i1Z][V34]);var idSet=DataTable[q8T][J0Z][i8T](this[i1Z][a8T]);if(action!==X64){var A8T=u9Z;A8T+=G9h.U1Z;A8T+=j0Z;var Z8T=e14;Z8T+=p2Z;var e8T=K9Z;e8T+=G9h.t4Z;e8T+=I2I;e8T+=O2Z;var D8T=K9Z;D8T+=t2I;D8T+=p1Z;D8T+=h9Z;var m8T=J5Z;m8T+=u9Z;m8T+=G9h.h4Z;var originalData=this[i1Z][m8T]===x54?this[D3U](l7I,this[D8T]()):this[D3U](A24,this[e8T]());$[Z8T](data[A8T],function(key,vals){var x7I="taTableExt";var B8T=s7Z;B8T+=E7Z;B8T+=i1Z;B8T+=p2Z;var b8T=M0Z;b8T+=H1Z;b8T+=G9h.U1Z;var T8T=G9h.t4Z;T8T+=n9U;T8T+=s7Z;T8T+=L1Z;var r8T=u9Z;r8T+=G9h.U1Z;r8T+=x7I;var toSave;var extender=$[G8Z][r8T][T8T][P7I];if(action===r34){var rowData=originalData[key][W0Z];toSave=extender({},rowData,A8Z);toSave=extender(toSave,vals,A8Z);}else{toSave=extender({},vals,A8Z);}var overrideId=idGet(toSave);if(action===I0Z&&overrideId===undefined){idSet(toSave,+new Date()+U8Z+key);}else{idSet(toSave,overrideId);}G9h[G9h.I4Z]();out[b8T][B8T](toSave);});}success(out);};Editor[C8T][Y2I]=function(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var T7I='preRemove';var m7I='setData';var Y7I='submitSuccess';var U7I="recei";var z7I="Comple";var G7I="yA";var H7I="ount";var C7I='commit';var D7I="_dataSour";var a7I='prep';var d7I='postSubmit';var B7I='postRemove';var W7I='submitUnsuccessful';var O7I="Errors";var o7I="pts";var r7I="eE";var j7I='<br>';var e7I='preCreate';var i7I="So";var J7I="commi";var Z7I='postCreate';var X7I="ifier";var q7I="_data";var A7I="stE";var Q7I="onComp";var b7I="ids";var F7I="_legac";var E3T=x0U;E3T+=z7I;E3T+=H1Z;E3T+=G9h.h4Z;var g3T=B74;g3T+=Z9U;g3T+=D1Z;g3T+=H1Z;var n3T=d7Z;n3T+=C54;var I8T=l2U;I8T+=P2Z;I8T+=H1Z;I8T+=p2Z;var k8T=G9h.h4Z;k8T+=h9Z;k8T+=t7Z;var g8T=G9h.h4Z;g8T+=h9Z;g8T+=u5Z;g8T+=h9Z;var n8T=B1Z;n8T+=G9h.h4Z;n8T+=C1U;n8T+=r9Z;var f8T=U7I;f8T+=Z9U;var R8T=F7I;R8T+=G7I;R8T+=D64;var S8T=w6Z;S8T+=X7I;var Y8T=K9I;Y8T+=H1Z;Y8T+=d94;Y8T+=o7I;var Q8T=p1Z;Q8T+=K1Z;Q8T+=j3U;var that=this;var setData;var fields=this[i1Z][Q8T];var opts=this[i1Z][Y8T];var modifier=this[i1Z][S8T];this[R8T](f8T,action,json);this[n8T](d7I,[json,submitParams,action,xhr]);if(!json[g8T]){var E8T=K3Z;E8T+=h9Z;json[E8T]=G9h.k4Z;}if(!json[H84]){var h8T=M3U;h8T+=u9Z;h8T+=O7I;json[h8T]=[];}if(notGood||json[k8T]||json[H84][I8T]){var v3T=G9h.h4Z;v3T+=R54;var t8T=O2Z;t8T+=h9Z;t8T+=G9h.t4Z;t8T+=h9Z;var globalError=[];if(json[t8T]){var l3T=G9h.h4Z;l3T+=h9Z;l3T+=u5Z;l3T+=h9Z;globalError[v8Z](json[l3T]);}$[n44](json[H84],function(i,err){var K7I="onFiel";var v7I="dError";var L7I="nF";var N7I="n field: ";var p7I="sition";var s7I="nFiel";var y7I="_animat";var w7I="tus";var c7I="Unknow";var V7I="Error";var P3T=D1Z;P3T+=G9h.U1Z;P3T+=K9Z;P3T+=G9h.h4Z;var x3T=s7Z;x3T+=G9h.F1Z;G9h[x3T]();var field=fields[err[P3T]];if(!field){var z3T=c7I;z3T+=N7I;throw new Error(z3T+err[y0Z]);}else if(field[g94]()){var F3T=u7I;F3T+=w7I;var U3T=O2Z;U3T+=h9Z;U3T+=G9h.t4Z;U3T+=h9Z;field[U3T](err[F3T]||V7I);if(i===X4Z){var u3T=G9h.t4Z;u3T+=L7I;u3T+=e5Z;u3T+=V7I;var G3T=K7I;G3T+=v7I;if(opts[G3T]===v1U){var N3T=V1Z;N3T+=G9h.t4Z;N3T+=i54;var c3T=H1Z;c3T+=G9h.t4Z;c3T+=s7Z;var O3T=T64;O3T+=p7I;var d3T=o8U;d3T+=l7U;var o3T=Y8Z;o3T+=K9Z;var X3T=y7I;X3T+=G9h.h4Z;that[X3T]($(that[o3T][d3T],that[i1Z][A0Z]),{scrollTop:$(field[q94]())[O3T]()[c3T]},C4Z);field[N3T]();}else if(typeof opts[u3T]===G9h.d1Z){var w3T=G9h.t4Z;w3T+=s7I;w3T+=v7I;opts[w3T](that,err);}}}else{var K3T=a5Z;K3T+=t7Z;var L3T=M7I;L3T+=C2Z;var V3T=D1Z;V3T+=G9h.U1Z;V3T+=R1Z;globalError[v8Z](field[V3T]()+L3T+(err[q84]||K3T));}});this[v3T](globalError[u54](j7I));this[O44](W7I,[json]);if(errorCallback){errorCallback[Z64](that,json);}}else{var C3T=K9I;C3T+=H1Z;C3T+=S2Z;C3T+=H7I;var A3T=e9U;A3T+=G9h.t4Z;A3T+=C1U;A3T+=G9h.h4Z;var y3T=v2Z;y3T+=h9Z;y3T+=R2Z;var p3T=u9Z;p3T+=G9h.U1Z;p3T+=H1Z;p3T+=G9h.U1Z;var store={};if(json[p3T]&&(action===y3T||action===e3U)){var Z3T=J7I;Z3T+=H1Z;var M3T=p5Z;M3T+=I1Z;M3T+=H1Z;M3T+=p2Z;var s3T=q7I;s3T+=i7I;s3T+=P0U;s3T+=Y9Z;this[s3T](a7I,action,modifier,submitParamsLocal,json,store);for(var i=X4Z;i<json[W0Z][M3T];i++){var W3T=L1Z;W3T+=u9Z;var j3T=u9Z;j3T+=v9I;setData=json[j3T][i];var id=this[D3U](W3T,setData);this[O44](m7I,[json,setData,action]);if(action===Z14){var q3T=T74;q3T+=D1Z;q3T+=H1Z;var J3T=H74;J3T+=R2Z;var H3T=D7I;H3T+=Y9Z;this[O44](e7I,[json,setData,id]);this[H3T](J3T,fields,setData,store);this[q3T]([I0Z,Z7I],[json,setData,id]);}else if(action===e3U){var e3T=s7Z;e3T+=G9h.t4Z;e3T+=A7I;e3T+=l04;var D3T=T74;D3T+=s7U;var m3T=D24;m3T+=G9h.h4Z;var a3T=P7Z;a3T+=r7I;a3T+=u9Z;a3T+=C9U;var i3T=B74;i3T+=C1U;i3T+=J8Z;i3T+=H1Z;this[i3T](a3T,[json,setData,id]);this[m3T](r34,modifier,fields,setData,store);this[D3T]([r34,e3T],[json,setData,id]);}}this[D3U](Z3T,action,modifier,json[W0Z],store);}else if(action===A3T){var B3T=u9Z;B3T+=G9h.U1Z;B3T+=H1Z;B3T+=G9h.U1Z;var b3T=m5Z;b3T+=i1Z;var T3T=B74;T3T+=Z9U;T3T+=D1Z;T3T+=H1Z;var r3T=s7Z;r3T+=h9Z;r3T+=G9h.h4Z;r3T+=s7Z;this[D3U](r3T,action,modifier,submitParamsLocal,json,store);this[T3T](T7I,[json,this[b7I]()]);this[D3U](X64,modifier,fields,store);this[O44]([X64,B7I],[json,this[b3T]()]);this[D3U](C7I,action,modifier,json[B3T],store);}if(editCount===this[i1Z][C3T]){var S3T=G9h.t4Z;S3T+=D2I;S3T+=s7Z;S3T+=r2Z;var Q3T=x6Z;Q3T+=P6Z;Q3T+=G9h.h4Z;var action=this[i1Z][R44];this[i1Z][R44]=t0Z;if(opts[Z2I]===Q3T&&(hide===undefined||hide)){var Y3T=u9Z;Y3T+=q9U;Y3T+=G9h.U1Z;this[u44](json[Y3T]?A8Z:D8Z,action);}else if(typeof opts[S3T]===G9h.d1Z){var R3T=Q7I;R3T+=K1Z;R3T+=H04;opts[R3T](this);}}if(successCallback){var f3T=R1I;f3T+=K1Z;f3T+=K1Z;successCallback[f3T](that,json);}this[O44](Y7I,[json,setData,action]);}this[n3T](D8Z);this[g3T](E3T,[json,setData,action]);};Editor[h3T][k3T]=function(xhr,err,thrown,errorCallback,submitParams,action){var S7I="submitEr";var g7I="system";var n7I="stSubmit";var R7I="even";var f7I="essin";var F0T=S7I;F0T+=t7Z;var U0T=B1Z;U0T+=R7I;U0T+=H1Z;var P0T=b2I;P0T+=v2Z;P0T+=f7I;P0T+=P2Z;var x0T=L1Z;x0T+=a1Z;x0T+=m1Z;x0T+=D1Z;var l0T=G9h.h4Z;l0T+=i84;l0T+=G9h.t4Z;l0T+=h9Z;var t3T=T64;t3T+=n7I;var I3T=T74;I3T+=s7U;this[I3T](t3T,[t0Z,submitParams,action,xhr]);this[l0T](this[x0T][c1U][g7I]);this[P0T](D8Z);if(errorCallback){var z0T=R1I;z0T+=K1Z;z0T+=K1Z;errorCallback[z0T](this,xhr,err,thrown);}this[U0T]([F0T,r2I],[xhr,err,thrown,submitParams]);};Editor[G0T][d0U]=function(fn){var h7I="taTa";var t7I="rSide";var P5I='draw';var k7I="bSe";var l5I="ettin";var I7I="rve";var K0T=s0U;K0T+=q9Z;K0T+=p5Z;var L0T=r5Z;L0T+=I9I;var u0T=k8Z;u0T+=I1Z;var O0T=j9I;O0T+=G9h.h4Z;var d0T=E7I;d0T+=L1Z;var o0T=u9Z;o0T+=G9h.U1Z;o0T+=h7I;o0T+=i6Z;var X0T=V1Z;X0T+=D1Z;var that=this;var dt=this[i1Z][u3U]?new $[X0T][o0T][d0T](this[i1Z][O0T]):t0Z;var ssp=D8Z;if(dt){var N0T=k7I;N0T+=I7I;N0T+=t7I;var c0T=i1Z;c0T+=l5I;c0T+=d0Z;ssp=dt[c0T]()[X4Z][x5I][N0T];}if(this[i1Z][u0T]){var w0T=G9h.t4Z;w0T+=D1Z;w0T+=G9h.h4Z;this[w0T](r2I,function(){if(ssp){var V0T=X2Z;V0T+=G9h.h4Z;dt[V0T](P5I,fn);}else{setTimeout(function(){fn();},V4Z);}});return A8Z;}else if(this[L0T]()===w74||this[M9U]()===K0T){var v0T=x6Z;v0T+=G9h.t4Z;v0T+=i1Z;v0T+=G9h.h4Z;this[Q74](v0T,function(){if(!that[i1Z][z5I]){setTimeout(function(){G9h[N8Z]();if(that[i1Z]){fn();}},V4Z);}else{that[Q74](r2I,function(e,json){G9h[N8Z]();if(ssp&&json){dt[Q74](P5I,fn);}else{setTimeout(function(){if(that[i1Z]){fn();}},V4Z);}});}})[t3U]();return A8Z;}return D8Z;};Editor[i4U][p0T]=function(name,arr){var y0T=G9h.U1Z;y0T+=G9h.F1Z;G9h[y0T]();for(var i=X4Z,ien=arr[m8Z];i<ien;i++){if(name==arr[i]){return i;}}return-o4Z;};Editor[c34]={"table":t0Z,"ajaxUrl":t0Z,"fields":[],"display":s0T,"ajax":t0Z,"idSrc":M0T,"events":{},"i18n":{"create":{"button":U5I,"title":F5I,"submit":j0T},"edit":{"button":W0T,"title":H0T,"submit":J0T},"remove":{"button":q0T,"title":i0T,"submit":G5I,"confirm":{"_":a0T,"1":m0T}},"error":{"system":X5I},multi:{title:D0T,info:o5I,restore:d5I,noMulti:e0T},datetime:{previous:Z0T,next:O5I,months:[c5I,A0T,r0T,N5I,T0T,b0T,u5I,w5I,B0T,C0T,V5I,L5I],weekdays:[K5I,v5I,p5I,y5I,s5I,Q0T,M5I],amPm:[j5I,W5I],hours:H5I,minutes:J5I,seconds:Y0T,unknown:w54}},formOptions:{bubble:$[u0Z]({},Editor[S0T][v34],{title:D8Z,message:D8Z,buttons:R0T,submit:f0T}),inline:$[n0T]({},Editor[v2U][g0T],{buttons:D8Z,submit:E0T}),main:$[u0Z]({},Editor[v2U][v34])},legacyAjax:D8Z,actionName:q5I};(function(){var U6I="_fnGetObjectDataFn";var T6I='keyless';var D5I="bServerSide";var i5I="dataTab";var a5I="aS";var l6I="nodeName";var s6I="rowIds";var M6I="lled";var e5I="drawType";var I6I="dataSrc";var b6I="]";var D43=i5I;D43+=p5Z;var h0T=r3U;h0T+=a5I;h0T+=o34;var __dataSources=Editor[h0T]={};var __dtIsSsp=function(dt,editor){var m5I="ditOp";var t0T=D1Z;t0T+=G9h.t4Z;t0T+=D1Z;t0T+=G9h.h4Z;var I0T=G9h.h4Z;I0T+=m5I;I0T+=R4U;var k0T=H9U;k0T+=p9Z;k0T+=D1Z;k0T+=d0Z;return dt[k0T]()[X4Z][x5I][D5I]&&editor[i1Z][I0T][e5I]!==t0T;};var __dtApi=function(table){G9h[N8Z]();return $(table)[w8Z]();};var __dtHighlight=function(node){node=$(node);setTimeout(function(){var Z5I="ighl";var l43=p2Z;l43+=Z5I;l43+=L1Z;l43+=x5U;node[J7U](l43);G9h[G9h.I4Z]();setTimeout(function(){var A5I="highligh";var r5I='noHighlight';var P43=A5I;P43+=H1Z;var x43=U3U;x43+=S2Z;x43+=r4U;x43+=i1Z;node[J7U](r5I)[x43](P43);setTimeout(function(){var T5I="noHighl";var b5I="removeCl";var U43=T5I;U43+=o7U;U43+=H1Z;var z43=b5I;z43+=j5U;node[z43](U43);},Q4Z);},C4Z);},s4Z);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var F43=h9Z;F43+=r2U;F43+=i1Z;dt[F43](identifier)[B5I]()[n44](function(idx){var p4Z=14;var C5I='Unable to find row identifier';var X43=h9Z;X43+=G9h.t4Z;X43+=M5Z;var G43=u9Z;G43+=G9h.U1Z;G43+=H1Z;G43+=G9h.U1Z;var row=dt[V3U](idx);var data=row[G43]();var idSrc=idFn(data);if(idSrc===undefined){Editor[c1U](C5I,p4Z);}out[idSrc]={idSrc:idSrc,data:data,node:row[q94](),fields:fields,type:X43};});};var __dtFieldsFromIdx=function(dt,fields,idx){var S5I="editField";var Q5I="mD";var R5I='Unable to automatically determine field from source. Please specify the field name.';var Y5I="aoColumns";var c43=G9h.h4Z;c43+=o9U;c43+=p2Z;var d43=Q5I;d43+=v9I;var o43=K9I;o43+=H3U;var field;var col=dt[p2U]()[X4Z][Y5I][idx];var dataSrc=col[S5I]!==undefined?col[o43]:col[d43];var resolvedFields={};var run=function(field,dataSrc){var O43=F0Z;O43+=R1Z;if(field[O43]()===dataSrc){resolvedFields[field[y0Z]()]=field;}};$[c43](fields,function(name,fieldInst){var N43=G9h.U1Z;N43+=G9h.F1Z;G9h[N43]();if($[y3U](dataSrc)){for(var i=X4Z;i<dataSrc[m8Z];i++){run(fieldInst,dataSrc[i]);}}else{run(fieldInst,dataSrc);}});if($[i2I](resolvedFields)){var u43=G9h.h4Z;u43+=h9Z;u43+=u5Z;u43+=h9Z;Editor[u43](R5I,L4Z);}return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var f5I="ndex";var n5I="ell";var V43=L1Z;V43+=f5I;V43+=v1Z;var w43=v2Z;w43+=n5I;w43+=i1Z;G9h[N8Z]();dt[w43](identifier)[V43]()[n44](function(idx){var I5I="tach";var h5I="ixe";var t5I="column";var k5I="dNode";var g5I="fixed";var E5I="Node";var q43=X2U;q43+=r1Z;var J43=g5I;J43+=E5I;var H43=V1Z;H43+=h5I;H43+=k5I;var W43=D5Z;W43+=H1Z;var j43=G9h.U1Z;j43+=H1Z;j43+=H1Z;j43+=e54;var M43=G9h.U1Z;M43+=H1Z;M43+=I5I;var s43=h9Z;s43+=r2U;var p43=s7Z;p43+=G9h.F1Z;var v43=u9Z;v43+=G9h.U1Z;v43+=j0Z;var K43=h9Z;K43+=G9h.t4Z;K43+=M5Z;var L43=v2Z;L43+=V6Z;L43+=K1Z;var cell=dt[L43](idx);var row=dt[K43](idx[V3U]);var data=row[v43]();var idSrc=idFn(data);var fields=forceFields||__dtFieldsFromIdx(dt,allFields,idx[t5I]);var isNode=typeof identifier===r94&&identifier[l6I]||identifier instanceof $;var prevDisplayFields,prevAttach;G9h[p43]();if(out[idSrc]){var y43=X3U;y43+=K8Z;prevAttach=out[idSrc][y43];prevDisplayFields=out[idSrc][b24];}__dtRowSelector(out,dt,idx[s43],allFields,idFn);out[idSrc][M43]=prevAttach||[];out[idSrc][j43][v8Z](isNode?$(identifier)[W43](X4Z):cell[H43]?cell[J43]():cell[q43]());out[idSrc][b24]=prevDisplayFields||{};$[u0Z](out[idSrc][b24],fields);});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var i43=i5Z;i43+=l14;i43+=G9h.h4Z;i43+=i1Z;dt[x6I](t0Z,identifier)[i43]()[n44](function(idx){G9h[N8Z]();__dtCellSelector(out,dt,idx,fields,idFn);});};var __dtjqId=function(id){var z6I='\\$1';var P6I="trin";var m43=G9U;m43+=t3Z;m43+=Y9Z;var a43=i1Z;a43+=P6I;a43+=P2Z;return typeof id===a43?s24+id[m43](/(:|\.|\[|\]|,)/g,z6I):s24+id;};__dataSources[D43]={id:function(data){var A43=m5Z;A43+=O94;A43+=h9Z;A43+=v2Z;var Z43=G9h.t4Z;Z43+=E7I;Z43+=L1Z;var e43=t9Z;e43+=H1Z;G9h[G9h.I4Z]();var idFn=DataTable[e43][Z43][U6I](this[i1Z][A43]);return idFn(data);},individual:function(identifier,fieldNames){var F6I="fnGetObjec";var G6I="DataFn";var b43=r14;b43+=S14;var T43=m5Z;T43+=O94;T43+=h9Z;T43+=v2Z;var r43=B1Z;r43+=F6I;r43+=H1Z;r43+=G6I;var idFn=DataTable[H0Z][J0Z][r43](this[i1Z][T43]);var dt=__dtApi(this[i1Z][u3U]);var fields=this[i1Z][b43];var out={};G9h[N8Z]();var forceFields;var responsiveNode;if(fieldNames){if(!$[y3U](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[n44](fieldNames,function(i,name){var B43=s7Z;B43+=G9h.F1Z;G9h[B43]();forceFields[name]=fields[name];});}__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var c6I="ows";var o6I="isPl";var N6I="umn";var X6I="olu";var O6I="colum";var d6I="ainObject";var R43=v2Z;R43+=X6I;R43+=K9Z;R43+=I9Z;var S43=o6I;S43+=d6I;var Y43=f9U;Y43+=p5Z;var Q43=G9h.h4Z;Q43+=W1Z;Q43+=H1Z;var C43=G9h.U1Z;C43+=G9h.F1Z;G9h[C43]();var idFn=DataTable[Q43][J0Z][U6I](this[i1Z][V34]);var dt=__dtApi(this[i1Z][Y43]);var fields=this[i1Z][q3U];var out={};if($[S43](identifier)&&(identifier[m94]!==undefined||identifier[R43]!==undefined||identifier[x6I]!==undefined)){var h43=v2Z;h43+=V6Z;h43+=K1Z;h43+=i1Z;var g43=O6I;g43+=I9Z;var f43=h9Z;f43+=c6I;if(identifier[f43]!==undefined){var n43=V3U;n43+=i1Z;__dtRowSelector(out,dt,identifier[n43],fields,idFn);}if(identifier[g43]!==undefined){var E43=H1U;E43+=K1Z;E43+=N6I;E43+=i1Z;__dtColumnSelector(out,dt,identifier[E43],fields,idFn);}if(identifier[h43]!==undefined){__dtCellSelector(out,dt,identifier[x6I],fields,idFn);}}else{__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){var k43=H1Z;k43+=G9h.U1Z;k43+=i6Z;G9h[G9h.I4Z]();var dt=__dtApi(this[i1Z][k43]);if(!__dtIsSsp(dt,this)){var l13=D1Z;l13+=G9h.t4Z;l13+=u9Z;l13+=G9h.h4Z;var t43=G9h.U1Z;t43+=u9Z;t43+=u9Z;var I43=h9Z;I43+=G9h.t4Z;I43+=M5Z;var row=dt[I43][t43](data);__dtHighlight(row[l13]());}},edit:function(identifier,fields,data,store){var V6I="ditOpts";var v6I="nAr";var w6I="wType";var y6I="eEx";var p6I="dataTabl";var L6I="any";var K6I="owId";var P13=u6I;P13+=w6I;var x13=G9h.h4Z;x13+=V6I;G9h[G9h.I4Z]();var that=this;var dt=__dtApi(this[i1Z][u3U]);if(!__dtIsSsp(dt,this)||this[i1Z][x13][P13]===E4U){var z13=L1Z;z13+=u9Z;var rowId=__dataSources[L34][z13][Z64](this,data);var row;try{row=dt[V3U](__dtjqId(rowId));}catch(e){row=dt;}if(!row[L6I]()){var U13=h9Z;U13+=r2U;row=dt[U13](function(rowIdx,rowData,rowNode){var F13=A94;F13+=K1Z;return rowId==__dataSources[L34][m5Z][F13](that,rowData);});}if(row[L6I]()){var u13=T5Z;u13+=L1Z;u13+=Y9Z;var N13=h9Z;N13+=K6I;N13+=i1Z;var c13=L1Z;c13+=v6I;c13+=C8U;c13+=L2Z;var O13=u9Z;O13+=G9h.U1Z;O13+=H1Z;O13+=G9h.U1Z;var d13=r3U;d13+=G9h.U1Z;var o13=N2I;o13+=W9I;var X13=p6I;X13+=y6I;X13+=H1Z;var G13=V1Z;G13+=D1Z;var extender=$[G13][X13][o13][P7I];var toSave=extender({},row[d13](),A8Z);toSave=extender(toSave,data,A8Z);row[O13](toSave);var idx=$[c13](rowId,store[s6I]);store[N13][u13](idx,o4Z);}else{row=dt[V3U][K3U](data);}__dtHighlight(row[q94]());}},remove:function(identifier,fields,store){var j6I="ery";var L13=K1Z;L13+=J8Z;L13+=M54;L13+=p2Z;var V13=R1I;V13+=Q1Z;V13+=M6I;var w13=H1Z;w13+=d3U;var that=this;G9h[G9h.I4Z]();var dt=__dtApi(this[i1Z][w13]);var cancelled=store[V13];if(cancelled[L13]===X4Z){var K13=z9U;K13+=z04;dt[m94](identifier)[K13]();}else{var j13=h9Z;j13+=G9h.t4Z;j13+=M5Z;j13+=i1Z;var v13=G9h.h4Z;v13+=C1U;v13+=j6I;var indexes=[];dt[m94](identifier)[v13](function(){var W6I="index";var s13=M0Z;s13+=j0Z;var y13=v2Z;y13+=G9h.U1Z;y13+=N14;var p13=L1Z;p13+=u9Z;var id=__dataSources[L34][p13][y13](that,this[s13]());G9h[N8Z]();if($[n1U](id,cancelled)===-o4Z){var M13=s7Z;M13+=E7Z;M13+=i1Z;M13+=p2Z;indexes[M13](this[W6I]());}});dt[j13](indexes)[U3U]();}},prep:function(action,identifier,submit,json,store){var q6I="cance";var i6I="cancelled";var J6I="ancel";var H6I="wI";var W13=G9h.h4Z;W13+=l04;G9h[N8Z]();if(action===W13){var q13=u9Z;q13+=v9I;var J13=u5Z;J13+=H6I;J13+=u9Z;J13+=i1Z;var H13=v2Z;H13+=J6I;H13+=w4U;var cancelled=json[H13]||[];store[J13]=$[y24](submit[q13],function(val,key){var m13=u9Z;m13+=G9h.U1Z;m13+=H1Z;m13+=G9h.U1Z;var a13=L2I;a13+=L2Z;a13+=o0U;var i13=G9h.U1Z;i13+=G9h.F1Z;G9h[i13]();return!$[a13](submit[m13][key])&&$[n1U](key,cancelled)===-o4Z?key:undefined;});}else if(action===X64){var D13=q6I;D13+=M6I;store[D13]=json[i6I]||[];}},commit:function(action,identifier,data,store){var A6I="atu";var r6I="draw";var m6I="owI";var a6I="Op";var Z6I="oFe";var f13=D1Z;f13+=G9h.t4Z;f13+=D1Z;f13+=G9h.h4Z;var R13=e3U;R13+=a6I;R13+=R4U;var e13=G9h.h4Z;e13+=r5Z;e13+=H1Z;var that=this;var dt=__dtApi(this[i1Z][u3U]);if(!__dtIsSsp(dt,this)&&action===e13&&store[s6I][m8Z]){var Z13=h9Z;Z13+=m6I;Z13+=j3U;var ids=store[Z13];var row;var compare=function(id){G9h[G9h.I4Z]();return function(rowIdx,rowData,rowNode){var D6I="all";var r13=v2Z;r13+=D6I;var A13=W0Z;A13+=e6I;return id==__dataSources[A13][m5Z][r13](that,rowData);};};for(var i=X4Z,ien=ids[m8Z];i<ien;i++){var Y13=Z6I;Y13+=A6I;Y13+=z9U;Y13+=i1Z;var Q13=x9Z;Q13+=X6Z;Q13+=x34;Q13+=i1Z;var C13=G9h.U1Z;C13+=D1Z;C13+=L2Z;var b13=G9h.U1Z;b13+=D1Z;b13+=L2Z;try{var T13=h9Z;T13+=G9h.t4Z;T13+=M5Z;row=dt[T13](__dtjqId(ids[i]));}catch(e){row=dt;}if(!row[b13]()){var B13=h9Z;B13+=G9h.t4Z;B13+=M5Z;row=dt[B13](compare(ids[i]));}if(row[C13]()&&!dt[Q13]()[X4Z][Y13][D5I]){var S13=h9Z;S13+=Q44;S13+=G9h.t4Z;S13+=Z9U;row[S13]();}}}var drawType=this[i1Z][R13][e5I];G9h[N8Z]();if(drawType!==f13){dt[r6I](drawType);}}};function __html_id(identifier){var S6I='Could not find an element with `data-editor-id` or `id` of: ';var B6I="[dat";var C6I="-editor";var Y6I="stri";var Q6I="-id=\"";var context=document;G9h[N8Z]();if(identifier!==T6I){var h13=l2U;h13+=P2Z;h13+=q8Z;var g13=N3Z;g13+=b6I;var n13=B6I;n13+=G9h.U1Z;n13+=C6I;n13+=Q6I;context=$(n13+identifier+g13);if(context[m8Z]===X4Z){var E13=Y6I;E13+=D1Z;E13+=P2Z;context=typeof identifier===E13?$(__dtjqId(identifier)):$(identifier);}if(context[h13]===X4Z){throw S6I+identifier;}}return context;}function __html_el(identifier,name){var R6I='[data-editor-field="';var context=__html_id(identifier);return $(R6I+name+L8Z,context);}function __html_els(identifier,names){var out=$();G9h[G9h.I4Z]();for(var i=X4Z,ien=names[m8Z];i<ien;i++){out=out[K3U](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var n6I="editor-value";var E6I='[data-editor-value]';var f6I="ta-";var l93=p2Z;l93+=P14;l93+=K1Z;var t13=M0Z;t13+=f6I;t13+=n6I;var I13=M24;I13+=H1Z;I13+=p2Z;var k13=s7Z;k13+=G9h.F1Z;G9h[k13]();var el=__html_el(identifier,dataSrc);return el[g6I](E6I)[I13]?el[d14](t13):el[l93]();}function __html_set(identifier,fields,data){$[n44](fields,function(name,field){var k6I="lue]";var h6I="[data-editor-va";var t6I='data-editor-value';var val=field[T3U](data);G9h[N8Z]();if(val!==undefined){var P93=K1Z;P93+=G9h.h4Z;P93+=I1Z;P93+=q8Z;var x93=h6I;x93+=k6I;var el=__html_el(identifier,field[I6I]());if(el[g6I](x93)[P93]){var z93=q9U;z93+=H1Z;z93+=h9Z;el[z93](t6I,val);}else{var X93=p2Z;X93+=n54;var U93=G9h.h4Z;U93+=e54;el[U93](function(){var P8I="firstChild";var l8I="childNodes";var x8I="removeChi";var F93=G9h.U1Z;F93+=G9h.F1Z;G9h[F93]();while(this[l8I][m8Z]){var G93=x8I;G93+=q1Z;this[G93](this[P8I]);}})[X93](val);}}});}__dataSources[R9U]={id:function(data){var d93=G9h.t4Z;d93+=n9U;d93+=W9I;var o93=G9h.h4Z;o93+=W1Z;o93+=H1Z;var idFn=DataTable[o93][d93][U6I](this[i1Z][V34]);G9h[G9h.I4Z]();return idFn(data);},initField:function(cfg){var U8I='[data-editor-label="';var F8I="ht";var u93=K1Z;u93+=z8I;var N93=N3Z;N93+=b6I;var c93=F0Z;c93+=K9Z;c93+=G9h.h4Z;var O93=u9Z;O93+=G9h.U1Z;O93+=j0Z;var label=$(U8I+(cfg[O93]||cfg[c93])+N93);G9h[N8Z]();if(!cfg[u93]&&label[m8Z]){var w93=F8I;w93+=K9Z;w93+=K1Z;cfg[C0Z]=label[w93]();}},individual:function(identifier,fieldNames){var N8I="dBac";var L8I='Cannot automatically determine field name from data source';var u8I='data-editor-field';var c8I="lf";var G8I="sAr";var O8I="andS";var w8I='[data-editor-id]';var H93=G9h.h4Z;H93+=G9h.U1Z;H93+=v2Z;H93+=p2Z;var W93=V1Z;W93+=e5Z;W93+=i1Z;var j93=p2Z;j93+=H1Z;j93+=q9I;var M93=L1Z;M93+=G8I;M93+=X8I;var attachEl;if(identifier instanceof $||identifier[l6I]){var y93=z2Z;y93+=L4I;y93+=o8I;y93+=m5Z;var p93=u9Z;p93+=v9I;var v93=d8I;v93+=G9h.h4Z;v93+=N74;var K93=O8I;K93+=G9h.h4Z;K93+=c8I;var L93=j0U;L93+=N8I;L93+=J6Z;var V93=V1Z;V93+=D1Z;attachEl=identifier;if(!fieldNames){fieldNames=[$(identifier)[d14](u8I)];}var back=$[V93][L93]?v74:K93;identifier=$(identifier)[v93](w8I)[back]()[p93](y93);}if(!identifier){var s93=V8I;s93+=L2Z;s93+=K1Z;s93+=J0U;identifier=s93;}if(fieldNames&&!$[M93](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames||fieldNames[m8Z]===X4Z){throw L8I;}var out=__dataSources[j93][q3U][Z64](this,identifier);var fields=this[i1Z][W93];var forceFields={};G9h[N8Z]();$[n44](fieldNames,function(i,name){G9h[N8Z]();forceFields[name]=fields[name];});$[H93](out,function(id,set){var i93=V1Z;i93+=e5Z;i93+=i1Z;var q93=X3U;q93+=K8Z;var J93=Y9Z;J93+=N14;set[i7Z]=J93;G9h[G9h.I4Z]();set[q93]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[K8I]();set[i93]=fields;set[b24]=forceFields;});return out;},fields:function(identifier){var v8I="sArray";var B93=G9h.U1Z;B93+=G9h.F1Z;var b93=h9Z;b93+=r2U;var r93=G9h.h4Z;r93+=e54;var A93=V1Z;A93+=L1Z;A93+=V6Z;A93+=j3U;var m93=L1Z;m93+=v8I;var a93=p2Z;a93+=P14;a93+=K1Z;var out={};var self=__dataSources[a93];if($[m93](identifier)){var D93=p5Z;D93+=p8I;for(var i=X4Z,ien=identifier[D93];i<ien;i++){var Z93=v2Z;Z93+=G9h.U1Z;Z93+=K1Z;Z93+=K1Z;var e93=p1Z;e93+=q1Z;e93+=i1Z;var res=self[e93][Z93](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[i1Z][A93];if(!identifier){identifier=T6I;}$[r93](fields,function(name,field){var y8I="ToData";var T93=C1U;T93+=M64;T93+=y8I;var val=__html_get(identifier,field[I6I]());G9h[N8Z]();field[T93](data,val===t0Z?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:b93};G9h[B93]();return out;},create:function(fields,data){if(data){var Q93=R1I;Q93+=K1Z;Q93+=K1Z;var C93=p2Z;C93+=H1Z;C93+=K9Z;C93+=K1Z;var id=__dataSources[C93][m5Z][Q93](this,data);try{if(__html_id(id)[m8Z]){__html_set(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var S93=v2Z;S93+=G9h.U1Z;S93+=K1Z;S93+=K1Z;var Y93=p2Z;Y93+=H1Z;Y93+=q9I;var id=__dataSources[Y93][m5Z][S93](this,data)||T6I;__html_set(id,fields,data);},remove:function(identifier,fields){__html_id(identifier)[U3U]();}};}());Editor[B4U]={"wrapper":R93,"processing":{"indicator":f93,"active":n93},"header":{"wrapper":g93,"content":E93},"body":{"wrapper":s8I,"content":M8I},"footer":{"wrapper":j8I,"content":h93},"form":{"wrapper":W8I,"content":H8I,"tag":G9h.k4Z,"info":k93,"error":J8I,"buttons":I93,"button":q8I,"buttonInternal":t93},"field":{"wrapper":i8I,"typePrefix":l23,"namePrefix":x23,"label":a8I,"input":P23,"inputControl":m8I,"error":D8I,"msg-label":e8I,"msg-error":Z8I,"msg-message":A8I,"msg-info":z23,"multiValue":U23,"multiInfo":r8I,"multiRestore":F23,"multiNoEdit":T8I,"disabled":G23,"processing":b8I},"actions":{"create":B8I,"edit":X23,"remove":C8I},"inline":{"wrapper":Q8I,"liner":o23,"buttons":d23},"bubble":{"wrapper":Y8I,"liner":S8I,"table":O23,"close":c23,"pointer":N23,"bg":u23}};(function(){var I8I="lectedSingle";var d0I="editSingle";var O3I="TONS";var f8I="ectedSingle";var o3I="tend";var U3I="ool";var P0I='buttons-remove';var t8I="editSi";var w3I="editor_edit";var F3I="editor_";var c3I="editor_create";var l0I='rows';var x3I="ected";var k8I="eSin";var a3I="irm";var T3I='buttons-create';var S3I="formMessage";var b3I="i1";var g8I="Single";var h8I="xten";var u3I="mit";var e3I="formButtons";var l3I="ngl";var X3I="t_single";var d3I="BUT";var z3I="ton";var P3I="buttons-e";var M53=R8I;M53+=f8I;var s53=h9Z;s53+=n8I;s53+=Z9U;s53+=g8I;var y53=e9U;y53+=E8I;var p53=G9h.h4Z;p53+=h8I;p53+=u9Z;var v53=b44;v53+=k8I;v53+=P2Z;v53+=p5Z;var K53=x9Z;K53+=I8I;var L53=t8I;L53+=l3I;L53+=G9h.h4Z;var V53=G9h.h4Z;V53+=r5Z;V53+=H1Z;var Y73=R8I;Y73+=x3I;var H73=P3I;H73+=l04;var F73=G9h.h4Z;F73+=W1Z;F73+=c5Z;F73+=h1Z;var U73=W0U;U73+=z3I;U73+=i1Z;var w23=e6I;w23+=S1Z;w23+=U3I;w23+=i1Z;if(DataTable[w23]){var T23=H0Z;T23+=G9h.h4Z;T23+=h1Z;var r23=F3I;r23+=h9Z;r23+=G9h.h4Z;r23+=z04;var W23=G3I;W23+=v2Z;W23+=X3I;var j23=t9Z;j23+=H1Z;j23+=G9h.h4Z;j23+=h1Z;var K23=H1Z;K23+=t9Z;K23+=H1Z;var L23=G9h.h4Z;L23+=W1Z;L23+=o3I;var V23=d3I;V23+=O3I;var ttButtons=DataTable[A34][V23];var ttButtonBase={sButtonText:t0Z,editor:t0Z,formTitle:t0Z};ttButtons[c3I]=$[L23](A8Z,ttButtons[K23],ttButtonBase,{formButtons:[{label:t0Z,fn:function(e){var v23=G9h.U1Z;v23+=G9h.F1Z;G9h[v23]();this[x0U]();}}],fnClick:function(button,config){var N3I="ormB";var s23=n3Z;s23+=K1Z;var y23=V1Z;y23+=N3I;y23+=f5Z;var p23=L1Z;p23+=a6Z;p23+=D1Z;var editor=config[P64];var i18nCreate=editor[p23][Z14];var buttons=config[y23];if(!buttons[X4Z][s23]){var M23=p1I;M23+=q9Z;M23+=u3I;buttons[X4Z][C0Z]=i18nCreate[M23];}editor[Z14]({title:i18nCreate[m1I],buttons:buttons});}});ttButtons[w3I]=$[j23](A8Z,ttButtons[W23],ttButtonBase,{formButtons:[{label:t0Z,fn:function(e){var H23=g3U;H23+=u3I;G9h[G9h.I4Z]();this[H23]();}}],fnClick:function(button,config){var v3I="ectedIndexes";var V3I="Bu";var L3I="Get";var K3I="Sel";var A23=H1Z;A23+=L1Z;A23+=F64;A23+=G9h.h4Z;var e23=K1Z;e23+=z8I;var D23=l44;D23+=V3I;D23+=H1Z;D23+=g44;var m23=s7Z;m23+=G9h.F1Z;var a23=G9h.h4Z;a23+=u9Z;a23+=C9U;var i23=z2Z;i23+=L4I;var q23=p5Z;q23+=p8I;var J23=G8Z;J23+=L3I;J23+=K3I;J23+=v3I;var selected=this[J23]();if(selected[q23]!==o4Z){return;}var editor=config[i23];var i18nEdit=editor[N0Z][a23];G9h[m23]();var buttons=config[D23];if(!buttons[X4Z][e23]){var Z23=g3U;Z23+=K9Z;Z23+=C9U;buttons[X4Z][C0Z]=i18nEdit[Z23];}editor[e3U](selected[X4Z],{title:i18nEdit[A23],buttons:buttons});}});ttButtons[r23]=$[T23](A8Z,ttButtons[p3I],ttButtonBase,{question:t0Z,formButtons:[{label:t0Z,fn:function(e){var y3I="subm";var b23=y3I;b23+=C9U;var that=this;this[b23](function(json){var q3I="fnSelectNone";var W3I="TableT";var H3I="ools";var M3I="fnGetIns";var j3I="tance";var s3I="aTab";var J3I="taTable";var f23=X2U;f23+=r1Z;var R23=A1Z;R23+=q9U;R23+=s3I;R23+=p5Z;var S23=H1Z;S23+=G9h.U1Z;S23+=q9Z;S23+=p5Z;var Y23=M3I;Y23+=j3I;var Q23=W3I;Q23+=H3I;var C23=M0Z;C23+=J3I;var B23=V1Z;B23+=D1Z;var tt=$[B23][C23][Q23][Y23]($(that[i1Z][S23])[R23]()[u3U]()[f23]());tt[q3I]();});}}],fnClick:function(button,config){var i3I="confi";var D3I="electedIndexes";var m3I="fnGet";var z73=z9U;z73+=U9U;z73+=v2Z;z73+=G9h.h4Z;var l73=K1Z;l73+=Y3Z;l73+=V6Z;var t23=p5Z;t23+=I1Z;t23+=H1Z;t23+=p2Z;var I23=i3I;I23+=h9Z;I23+=K9Z;var k23=i3I;k23+=h9Z;k23+=K9Z;var h23=m7U;h23+=a3I;var E23=h9Z;E23+=n8I;E23+=C1U;E23+=G9h.h4Z;var g23=G9h.h4Z;g23+=u9Z;g23+=L1Z;g23+=q0Z;var n23=m3I;n23+=O94;n23+=D3I;G9h[G9h.I4Z]();var rows=this[n23]();if(rows[m8Z]===X4Z){return;}var editor=config[g23];var i18nRemove=editor[N0Z][E23];var buttons=config[e3I];var question=typeof i18nRemove[h23]===G14?i18nRemove[k23]:i18nRemove[d64][rows[m8Z]]?i18nRemove[I23][rows[t23]]:i18nRemove[d64][B1Z];if(!buttons[X4Z][l73]){var P73=p1I;P73+=P9I;var x73=K1Z;x73+=Y3Z;x73+=G9h.h4Z;x73+=K1Z;buttons[X4Z][x73]=i18nRemove[P73];}editor[U3U](rows,{message:question[z73](/%d/g,rows[m8Z]),title:i18nRemove[m1I],buttons:buttons});}});}var _buttons=DataTable[H0Z][U73];G9h[G9h.I4Z]();$[F73](_buttons,{create:{text:function(dt,node,config){var r3I="s.";var A3I="18n";var Z3I="reat";var d73=v2Z;d73+=Z3I;d73+=G9h.h4Z;var o73=L1Z;o73+=A3I;var X73=Y0U;X73+=d74;X73+=r3I;X73+=Z14;var G73=L1Z;G73+=a1Z;G73+=m1Z;G73+=D1Z;return dt[G73](X73,config[P64][o73][d73][s2U]);},className:T3I,editor:t0Z,formButtons:{text:function(editor){var N73=p1I;N73+=q9Z;N73+=E3U;N73+=H1Z;var c73=v2Z;c73+=h9Z;c73+=N4U;c73+=c5Z;var O73=b3I;O73+=B3I;return editor[O73][c73][N73];},action:function(e){var u73=p1I;u73+=B9U;u73+=L1Z;u73+=H1Z;G9h[G9h.I4Z]();this[u73]();}},formMessage:t0Z,formTitle:t0Z,action:function(e,dt,node,config){var Y3I="essing";var C3I="rmTitl";var Q3I="roc";var y73=m34;y73+=B2Z;var p73=Z9Z;p73+=C3I;p73+=G9h.h4Z;var v73=m34;v73+=G9h.U1Z;v73+=c5Z;var L73=t9I;L73+=J8Z;var V73=G9h.t4Z;V73+=D1Z;V73+=G9h.h4Z;var w73=s7Z;w73+=Q3I;w73+=Y3I;var that=this;var editor=config[P64];this[w73](A8Z);editor[V73](L73,function(){var K73=s7Z;K73+=G9h.F1Z;G9h[K73]();that[z5I](D8Z);})[v73]({buttons:config[e3I],message:config[S3I]||editor[N0Z][Z14][M74],title:config[p73]||editor[N0Z][y73][m1I]});}},edit:{extend:R3I,text:function(dt,node,config){var f3I="buttons.edi";var W73=W0U;W73+=H1Z;W73+=G9h.t4Z;W73+=D1Z;var j73=b3I;j73+=B3I;var M73=K9I;M73+=q0Z;var s73=f3I;s73+=H1Z;G9h[N8Z]();return dt[N0Z](s73,config[M73][j73][e3U][W73]);},className:H73,editor:t0Z,formButtons:{text:function(editor){var i73=p1I;i73+=q9Z;i73+=K9Z;i73+=C9U;var q73=G9h.h4Z;q73+=u9Z;q73+=L1Z;q73+=H1Z;var J73=s7Z;J73+=G9h.F1Z;G9h[J73]();return editor[N0Z][q73][i73];},action:function(e){G9h[N8Z]();this[x0U]();}},formMessage:t0Z,formTitle:t0Z,action:function(e,dt,node,config){var I3I="xe";var h3I="reOpen";var g3I="mMessa";var k3I="ndexes";var E3I="formBut";var t3I="columns";var n3I="mT";var Q73=H1Z;Q73+=C9U;Q73+=K1Z;Q73+=G9h.h4Z;var C73=L1Z;C73+=a6Z;C73+=D1Z;var B73=U6Z;B73+=n3I;B73+=H0U;var b73=L1Z;b73+=a1Z;b73+=m1Z;b73+=D1Z;var T73=U6Z;T73+=g3I;T73+=P2Z;T73+=G9h.h4Z;var r73=E3I;r73+=j5Z;r73+=D1Z;r73+=i1Z;var Z73=s7Z;Z73+=h3I;var e73=h1U;e73+=u94;var D73=L1Z;D73+=k3I;var m73=i5Z;m73+=r1Z;m73+=I3I;m73+=i1Z;var a73=O7U;a73+=t9Z;a73+=G9h.h4Z;a73+=i1Z;var that=this;var editor=config[P64];var rows=dt[m94]({selected:A8Z})[a73]();var columns=dt[t3I]({selected:A8Z})[m73]();var cells=dt[x6I]({selected:A8Z})[D73]();G9h[N8Z]();var items=columns[m8Z]||cells[m8Z]?{rows:rows,columns:columns,cells:cells}:rows;this[e73](A8Z);editor[Q74](Z73,function(){var A73=l34;A73+=x34;that[A73](D8Z);})[e3U](items,{buttons:config[r73],message:config[T73]||editor[b73][e3U][M74],title:config[B73]||editor[C73][e3U][Q73]});}},remove:{extend:Y73,limitTo:[l0I],text:function(dt,node,config){var x0I=".remove";var g73=t9U;g73+=D1Z;var n73=K9I;n73+=q0Z;var f73=f44;f73+=x0I;var R73=L1Z;R73+=a1Z;R73+=m1Z;R73+=D1Z;var S73=s7Z;S73+=G9h.F1Z;G9h[S73]();return dt[R73](f73,config[n73][g73][U3U][s2U]);},className:P0I,editor:t0Z,formButtons:{text:function(editor){var k73=v1I;k73+=H1Z;var h73=h9Z;h73+=W5U;h73+=G9h.h4Z;var E73=b3I;E73+=B3I;return editor[E73][h73][k73];},action:function(e){var I73=G9h.U1Z;I73+=G9h.F1Z;G9h[I73]();this[x0U]();}},formMessage:function(editor,dt){var z0I="nfir";var U0I="ws";var F53=p5Z;F53+=D1Z;F53+=P2Z;F53+=q8Z;var U53=H1U;U53+=z0I;U53+=K9Z;var z53=K1Z;z53+=J8Z;z53+=U2U;var P53=d9U;P53+=L1Z;P53+=I1Z;var x53=v2Z;x53+=b5U;x53+=a3I;var l53=z9U;l53+=K9Z;l53+=E8I;var t73=u5Z;t73+=U0I;var rows=dt[t73]({selected:A8Z})[B5I]();var i18n=editor[N0Z][l53];var question=typeof i18n[x53]===P53?i18n[d64]:i18n[d64][rows[m8Z]]?i18n[d64][rows[z53]]:i18n[U53][B1Z];return question[G74](/%d/g,rows[F53]);},formTitle:t0Z,action:function(e,dt,node,config){var X0I="inde";var F0I="mTitle";var o0I='preOpen';var G0I="ormBu";var w53=p9Z;w53+=H1Z;w53+=K1Z;w53+=G9h.h4Z;var u53=z9U;u53+=J5Z;u53+=Z9U;var N53=Z9Z;N53+=h9Z;N53+=F0I;var c53=V1Z;c53+=G0I;c53+=X6Z;c53+=J7Z;var O53=X0I;O53+=W1Z;O53+=v1Z;var X53=s7Z;X53+=h9Z;X53+=C54;var G53=s7Z;G53+=G9h.F1Z;var that=this;G9h[G53]();var editor=config[P64];this[X53](A8Z);editor[Q74](o0I,function(){var d53=P7Z;d53+=l6Z;d53+=v1Z;d53+=u94;var o53=G9h.U1Z;o53+=G9h.F1Z;G9h[o53]();that[d53](D8Z);})[U3U](dt[m94]({selected:A8Z})[O53](),{buttons:config[c53],message:config[S3I],title:config[N53]||editor[N0Z][u53][w53]});}}});_buttons[d0I]=$[u0Z]({},_buttons[V53]);_buttons[L53][u0Z]=K53;_buttons[v53]=$[p53]({},_buttons[y53]);_buttons[s53][u0Z]=M53;}());Editor[w0Z]={};Editor[O0I]=function(input,opts){var m0I="<div cl";var W0I="\"/>";var c4G='<span/>';var I0I="<div c";var s0I="-c";var t0I="Da";var b0I="l\">";var g0I="-iconLe";var r0I="month\"/>";var U4G="or datetime: Without mome";var K4G='-title';var w4G='-calendar"/>';var d4G='-date">';var l4G="Ti";var V4G='-minutes"/>';var n0I="ious";var L4G='-error"/>';var q0I="-time";var u0I="ner";var D0I="/div";var c0I="_construc";var R0I="ig";var p4G=/[Hhm]|LT|LTS/;var Q0I="<bu";var v4G=/[YMD]|L(?!T)|l/;var i0I="<div class=";var M0I="-dat";var Z0I="elect c";var z4G='YYYY-MM-DD';var N0I="tai";var h0I=" class=\"";var K0I="ditor-dat";var A0I="lass=";var C0I="</button";var u4G='-year"/>';var F4G="ntjs only the format 'YYYY-MM-DD' can b";var f0I="ht\">";var V0I="ormat";var k0I="itle\">";var T0I="-lab";var y4G=/[haA]/;var E0I="ft\"";var B0I="ss=";var v0I="eime-";var O4G='<button>';var N4G='<select class="';var J0I="urs\"/";var G4G="e used";var H0I="-ho";var W63=c0I;W63+=H1Z;W63+=v3U;var j63=A94;j63+=P44;j63+=G9h.U1Z;j63+=h9Z;var M63=u9Z;M63+=G9h.t4Z;M63+=K9Z;var s63=G9h.U1Z;s63+=c74;s63+=P44;var y63=u9Z;y63+=G9h.t4Z;y63+=K9Z;var p63=u9Z;p63+=u6Z;var v63=G9h.U1Z;v63+=c74;v63+=J8Z;v63+=u9Z;var K63=v2Z;K63+=X2Z;K63+=N0I;K63+=u0I;var L63=Y8Z;L63+=K9Z;var V63=w0I;V63+=H1Z;var w63=V1Z;w63+=V0I;var u63=s94;u63+=K8Z;var N63=L0I;N63+=u7I;N63+=Q1Z;var c63=G9h.h4Z;c63+=K0I;c63+=v0I;var O63=o8I;O63+=I4U;O63+=v3U;var d63=p0I;d63+=y0I;var o63=V1Z;o63+=L1Z;o63+=h1Z;var X63=s0I;X63+=M64;X63+=P44;X63+=s2Z;var G63=M0I;G63+=G9h.h4Z;var F63=u9Z;F63+=u6Z;var U63=H3Z;U63+=r5Z;U63+=f3Z;var z63=r0U;z63+=l3Z;var P63=o8I;P63+=i1Z;P63+=j0I;P63+=W0I;var x63=H0I;x63+=J0I;x63+=l3Z;var l63=q0I;l63+=N3Z;l63+=l3Z;var t53=i0I;t53+=N3Z;var I53=x3Z;I53+=a0I;I53+=f3Z;var k53=m0I;k53+=O3Z;var h53=x3Z;h53+=D0I;h53+=l3Z;var E53=x3Z;E53+=D0I;E53+=l3Z;var g53=e0I;g53+=Z0I;g53+=A0I;g53+=N3Z;var n53=o8I;n53+=Z1U;n53+=V6Z;n53+=f8Z;var f53=o8I;f53+=r0I;var R53=T0I;R53+=G9h.h4Z;R53+=b0I;var S53=C5U;S53+=B0I;S53+=N3Z;var Y53=r0U;Y53+=l3Z;var Q53=C0I;Q53+=l3Z;var C53=O1U;C53+=o54;var B53=Q0I;B53+=X6Z;B53+=Y0I;var b53=S0I;b53+=R0I;b53+=f0I;var T53=S8Z;T53+=R8Z;var r53=x3Z;r53+=P3Z;r53+=c9I;r53+=Y0I;var A53=s7Z;A53+=z9U;A53+=C1U;A53+=n0I;var Z53=g0I;Z53+=E0I;Z53+=l3Z;var e53=o3Z;e53+=h0I;var D53=p0I;D53+=k0I;var m53=E3Z;m53+=t24;m53+=P0Z;var a53=N3Z;a53+=l3Z;var i53=I0I;i53+=t4U;i53+=P0Z;var W53=K9Z;W53+=u6Z;W53+=J8Z;W53+=H1Z;var j53=t0I;j53+=c5Z;j53+=l4G;j53+=R1Z;this[v2Z]=$[u0Z](A8Z,{},Editor[j53][c34],opts);G9h[G9h.I4Z]();var classPrefix=this[v2Z][x4G];var i18n=this[v2Z][N0Z];if(!window[W53]&&this[v2Z][P4G]!==z4G){var H53=N9Z;H53+=U4G;H53+=F4G;H53+=G4G;throw H53;}var timeBlock=function(type){var X4G="-timeblock";var q53=r0U;q53+=l3Z;var J53=X4G;J53+=N3Z;J53+=l3Z;return Z0Z+classPrefix+J53+q53;};var gap=function(){var o4G='<span>:</span>';G9h[N8Z]();return o4G;};var structure=$(i53+classPrefix+a53+Z0Z+classPrefix+d4G+m53+classPrefix+D53+e53+classPrefix+Z53+O4G+i18n[A53]+r53+T53+Z0Z+classPrefix+b53+B53+i18n[C53]+Q53+Y53+S53+classPrefix+R53+c4G+N4G+classPrefix+f53+g0Z+Z0Z+classPrefix+n53+c4G+g53+classPrefix+u4G+E53+h53+k53+classPrefix+w4G+I53+t53+classPrefix+l63+Z0Z+classPrefix+x63+Z0Z+classPrefix+V4G+Z0Z+classPrefix+P63+z63+Z0Z+classPrefix+L4G+U63);this[F63]={container:structure,date:structure[i94](X74+classPrefix+G63),title:structure[i94](X74+classPrefix+K4G),calendar:structure[i94](X74+classPrefix+X63),time:structure[o63](X74+classPrefix+d63),error:structure[i94](X74+classPrefix+O63),input:$(input)};this[i1Z]={d:t0Z,display:t0Z,minutesRange:t0Z,secondsRange:t0Z,namespace:c63+Editor[O0I][N63]++,parts:{date:this[v2Z][P4G][u63](v4G)!==t0Z,time:this[v2Z][w63][S4I](p4G)!==t0Z,seconds:this[v2Z][V63][y04](F8Z)!==-o4Z,hours12:this[v2Z][P4G][S4I](y4G)!==t0Z}};this[L63][K63][R2U](this[b4U][s4G])[v63](this[p63][M4G])[R2U](this[b4U][c1U]);this[y63][s4G][s63](this[b4U][m1I])[R2U](this[M63][j63]);this[W63]();};$[u0Z](Editor[H63][i4U],{destroy:function(){var W4G="r-datetime";var j4G="edito";var D63=R04;D63+=j4G;D63+=W4G;var m63=G9h.t4Z;m63+=V1Z;m63+=V1Z;var a63=L1Z;a63+=H4G;a63+=u1U;var i63=G9h.U1Z;i63+=G9h.F1Z;var q63=G9h.t4Z;q63+=V1Z;q63+=V1Z;var J63=T4U;J63+=L1Z;J63+=O1U;J63+=h9Z;this[n2U]();this[b4U][J63][q63]()[J4G]();G9h[i63]();this[b4U][a63][m63](D63);},errorMsg:function(msg){var e63=I4U;e63+=G9h.t4Z;e63+=h9Z;var error=this[b4U][e63];if(msg){var Z63=p2Z;Z63+=n54;error[Z63](msg);}else{var A63=G9h.h4Z;A63+=K9Z;A63+=s7Z;A63+=v7Z;error[A63]();}},hide:function(){var r63=G9h.U1Z;r63+=G9h.F1Z;G9h[r63]();this[n2U]();},max:function(date){var q4G="_setCalan";var i4G="xDa";var B63=q4G;B63+=u9Z;B63+=O2Z;var b63=s7Z;b63+=G9h.F1Z;var T63=v5U;T63+=i4G;T63+=H1Z;T63+=G9h.h4Z;this[v2Z][T63]=date;this[a4G]();G9h[b63]();this[B63]();},min:function(date){var m4G="_option";var D4G="sT";var C63=m4G;C63+=D4G;C63+=H0U;G9h[N8Z]();this[v2Z][e4G]=date;this[C63]();this[Z4G]();},owns:function(node){var A4G="filte";var Y63=p5Z;Y63+=D1Z;Y63+=U2U;var Q63=A4G;Q63+=h9Z;G9h[G9h.I4Z]();return $(node)[G9I]()[Q63](this[b4U][f4U])[Y63]>X4Z;},val:function(set,write){var B4G='--now';var C4G="Va";var g4G="TC";var Q4G="ntStrict";var f4G="toDate";var r4G="_setT";var Y4G="moment";var E4G=/(\d{4})\-(\d{2})\-(\d{2})/;var T4G="toSt";var I63=r4G;I63+=D6Z;I63+=G9h.h4Z;var k63=T4G;k63+=h9Z;k63+=L1Z;k63+=I1Z;if(set===undefined){return this[i1Z][u9Z];}if(set instanceof Date){this[i1Z][u9Z]=this[b4G](set);}else if(set===t0Z||set===U8Z){this[i1Z][u9Z]=t0Z;}else if(set===B4G){this[i1Z][u9Z]=new Date();}else if(typeof set===G14){var S63=K9Z;S63+=G9h.t4Z;S63+=R1Z;S63+=s7U;if(window[S63]){var n63=G0U;n63+=C4G;n63+=K1Z;n63+=m5Z;var f63=K9Z;f63+=u6Z;f63+=G9h.h4Z;f63+=Q4G;var R63=U6Z;R63+=K9Z;R63+=G9h.U1Z;R63+=H1Z;var m=window[Y4G][S4G](set,this[v2Z][R63],this[v2Z][R4G],this[v2Z][f63]);this[i1Z][u9Z]=m[n63]()?m[f4G]():t0Z;}else{var g63=n4G;g63+=g4G;var match=set[S4I](E4G);this[i1Z][u9Z]=match?new Date(Date[g63](match[o4Z],match[d4Z]-o4Z,match[O4Z])):t0Z;}}if(write||write===undefined){if(this[i1Z][u9Z]){this[h4G]();}else{var h63=C1U;h63+=G9h.U1Z;h63+=K1Z;var E63=u9Z;E63+=G9h.t4Z;E63+=K9Z;this[E63][S0Z][h63](set);}}if(!this[i1Z][u9Z]){this[i1Z][u9Z]=this[b4G](new Date());}this[i1Z][M9U]=new Date(this[i1Z][u9Z][k63]());this[i1Z][M9U][k4G](o4Z);this[I4G]();this[Z4G]();G9h[G9h.I4Z]();this[I63]();},_constructor:function(){var P1G="tetime click.editor-datetime";var O1G='autocomplete';var z1G="onds";var D1G="setUTCFullYear";var t4G="lec";var S1G="_se";var V1G='keyup.editor-datetime';var c1G='off';var J1G="_correctMonth";var x1G="focus.editor-da";var U1G="classPre";var o1G='-seconds';var D83=x9Z;D83+=t4G;D83+=H1Z;var m83=v2Z;m83+=p2Z;m83+=G9h.U1Z;m83+=l1G;var a83=G9h.t4Z;a83+=D1Z;var j83=G9h.t4Z;j83+=D1Z;var K83=x1G;K83+=P1G;var L83=u9Z;L83+=G9h.t4Z;L83+=K9Z;var N83=x9Z;N83+=v2Z;N83+=z1G;var c83=k7Z;c83+=h9Z;c83+=H1Z;c83+=i1Z;var o83=H1Z;o83+=y0I;var X83=k7Z;X83+=h9Z;X83+=H1Z;X83+=i1Z;var P83=s7Z;P83+=G9h.U1Z;P83+=h9Z;P83+=R4U;var t63=U1G;t63+=F1G;var that=this;var classPrefix=this[v2Z][t63];var onChange=function(){var X1G="onChange";var x83=x4U;x83+=u1U;var l83=L1Z;l83+=G1G;that[v2Z][X1G][Z64](that,that[b4U][l83][v4U](),that[i1Z][u9Z],that[b4U][x83]);};if(!this[i1Z][P83][s4G]){var G83=D1Z;G83+=Q74;var F83=I5Z;F83+=K1Z;F83+=G9h.U1Z;F83+=L2Z;var U83=M0Z;U83+=c5Z;var z83=u9Z;z83+=G9h.t4Z;z83+=K9Z;this[z83][U83][g4U](F83,G83);}if(!this[i1Z][X83][o83]){var O83=H1Z;O83+=L1Z;O83+=K9Z;O83+=G9h.h4Z;var d83=u9Z;d83+=u6Z;this[d83][O83][g4U](U4U,E4U);}if(!this[i1Z][c83][N83]){var V83=h9Z;V83+=n8I;V83+=Z9U;var w83=r5Z;w83+=C1U;w83+=R04;var u83=u9Z;u83+=u6Z;this[u83][M4G][Y2U](w83+classPrefix+o1G)[U3U]();this[b4U][M4G][Y2U](d1G)[D54](o4Z)[V83]();}this[a4G]();this[L83][S0Z][d14](O1G,c1G)[X2Z](K83,function(){var N1G="sabled";var w1G=':visible';var M83=K5Z;M83+=K1Z;var s83=L1Z;s83+=H4G;s83+=u1U;var y83=Y8Z;y83+=K9Z;var p83=M7I;p83+=r5Z;p83+=N1G;var v83=i5Z;v83+=u1G;if(that[b4U][f4U][G0U](w1G)||that[b4U][v83][G0U](p83)){return;}that[v4U](that[y83][s83][M83](),D8Z);G9h[N8Z]();that[o6U]();})[j83](V1G,function(){var v1G="tainer";var L1G=":v";var K1G="isib";var J83=L1G;J83+=K1G;J83+=K1Z;J83+=G9h.h4Z;var H83=L1Z;H83+=i1Z;var W83=H1U;W83+=D1Z;W83+=v1G;if(that[b4U][W83][H83](J83)){var i83=C1U;i83+=G9h.U1Z;i83+=K1Z;var q83=C1U;q83+=G9h.U1Z;q83+=K1Z;that[q83](that[b4U][S0Z][i83](),D8Z);}});this[b4U][f4U][a83](m83,D83,function(){var Q1G="tTime";var M1G='-month';var H1G="etTitl";var e1G='-hours';var q1G='-year';var C1G="writeOutput";var m1G="etTi";var p1G="-minu";var n1G="_position";var R1G="setSeco";var T1G="hours12";var Z1G='-ampm';var A1G="Time";var j1G="_setC";var s1G="hasC";var i1G="_setCa";var b1G="-hour";var r1G="rt";var I83=Z9Z;I83+=v2Z;I83+=E7Z;I83+=i1Z;var k83=i5Z;k83+=u1G;var f83=p1G;f83+=y1G;var e83=s1G;e83+=t3Z;e83+=i1Z;e83+=i1Z;var select=$(this);var val=select[v4U]();if(select[e83](classPrefix+M1G)){var A83=j1G;A83+=M64;A83+=b4I;A83+=W1G;var Z83=t2Z;Z83+=H1G;Z83+=G9h.h4Z;that[J1G](that[i1Z][M9U],val);that[Z83]();that[A83]();}else if(select[K4U](classPrefix+q1G)){var T83=i1G;T83+=K1Z;T83+=G9h.U1Z;T83+=a1G;var r83=t2Z;r83+=m1G;r83+=a3Z;that[i1Z][M9U][D1G](val);that[r83]();that[T83]();}else if(select[K4U](classPrefix+e1G)||select[K4U](classPrefix+Z1G)){var R83=t2Z;R83+=f6U;R83+=A1G;var b83=s7Z;b83+=G9h.U1Z;b83+=r1G;b83+=i1Z;if(that[i1Z][b83][T1G]){var S83=s7Z;S83+=K9Z;var Y83=u9Z;Y83+=G9h.t4Z;Y83+=K9Z;var Q83=C1U;Q83+=G9h.U1Z;Q83+=K1Z;var C83=b1G;C83+=i1Z;var B83=u9Z;B83+=G9h.t4Z;B83+=K9Z;var hours=$(that[B83][f4U])[i94](X74+classPrefix+C83)[Q83]()*o4Z;var pm=$(that[Y83][f4U])[i94](X74+classPrefix+Z1G)[v4U]()===S83;that[i1Z][u9Z][B1G](hours===K4Z&&!pm?X4Z:pm&&hours!==K4Z?hours+K4Z:hours);}else{that[i1Z][u9Z][B1G](val);}that[R83]();that[h4G](A8Z);onChange();}else if(select[K4U](classPrefix+f83)){var g83=B1Z;g83+=C1G;var n83=B1Z;n83+=x9Z;n83+=Q1G;that[i1Z][u9Z][Y1G](val);that[n83]();that[g83](A8Z);onChange();}else if(select[K4U](classPrefix+o1G)){var h83=S1G;h83+=Q1G;var E83=R1G;E83+=f1G;that[i1Z][u9Z][E83](val);that[h83]();that[h4G](A8Z);onChange();}G9h[N8Z]();that[b4U][k83][I83]();that[n1G]();})[X2Z](O74,function(e){var c9G='-time';var T9G="setUTCMonth";var A9G='setUTCHours';var C9G="tCalander";var K9G="ange";var g1G="topPropag";var d9G="etUTCMont";var H9G="secondsRange";var v9G="hasCl";var h1G="oLowerC";var t1G="ntNode";var a9G="ours";var B9G='day';var N9G="setSec";var Q9G="us";var G9G='-iconLeft';var E1G="ati";var k1G="ase";var p9G="has";var D9G="Hours";var u9G="setUTCMinute";var x9G="deN";var m9G="getUTC";var l9G="LowerCase";var i9G="TCH";var M9G="_setTime";var X9G="focu";var L9G='minutes';var e9G="etUTC";var J9G="ondsRang";var P9G="hasClas";var o9G="getUTCMon";var y9G="Cl";var z9G="bled";var W9G="tTi";var G33=i1Z;G33+=g1G;G33+=E1G;G33+=X2Z;var F33=i1Z;F33+=G9h.h4Z;F33+=K1Z;F33+=G9h.x1Z;var U33=H1Z;U33+=h1G;U33+=k1G;var z33=D1Z;z33+=l24;z33+=b74;var P33=I1G;P33+=t1G;var x33=j5Z;x33+=l9G;var l33=X2U;l33+=x9G;l33+=U14;l33+=G9h.h4Z;var t83=j0Z;t83+=Q7U;t83+=H1Z;var d=that[i1Z][u9Z];var nodeName=e[t83][l33][x33]();var target=nodeName===d1G?e[a94][P33]:e[a94];nodeName=target[z33][U33]();if(nodeName===F33){return;}e[G33]();if(nodeName===m54){var L33=S0I;L33+=F5U;var d33=P9G;d33+=i1Z;var X33=w94;X33+=z9G;var button=$(target);var parent=button[U9G]();if(parent[K4U](X33)&&!parent[K4U](F9G)){var o33=q9Z;o33+=Y04;button[o33]();return;}if(parent[d33](classPrefix+G9G)){var V33=X9G;V33+=i1Z;var w33=Y8Z;w33+=K9Z;var u33=o9G;u33+=q8Z;var N33=u9Z;N33+=L1Z;N33+=h6U;N33+=L2Z;var c33=i1Z;c33+=d9G;c33+=p2Z;var O33=u9Z;O33+=L1Z;O33+=i1Z;O33+=C5Z;that[i1Z][O33][c33](that[i1Z][N33][u33]()-o4Z);that[I4G]();that[Z4G]();that[w33][S0Z][V33]();}else if(parent[K4U](classPrefix+L33)){var v33=u9Z;v33+=L1Z;v33+=I9I;var K33=I5Z;K33+=t5Z;that[J1G](that[i1Z][K33],that[i1Z][v33][O9G]()+o4Z);that[I4G]();that[Z4G]();that[b4U][S0Z][p4U]();}else if(button[G9I](X74+classPrefix+c9G)[m8Z]){var r33=N9G;r33+=z1G;var A33=u9G;A33+=i1Z;var Z33=w9G;Z33+=v1Z;var e33=p2Z;e33+=G9h.t4Z;e33+=P0U;e33+=i1Z;var i33=G9h.U1Z;i33+=K9Z;var p33=E7Z;p33+=D1Z;p33+=L1Z;p33+=H1Z;var val=button[W0Z](V9G);var unit=button[W0Z](p33);if(unit===L9G){var j33=h9Z;j33+=K9G;var M33=v9G;M33+=j5U;var s33=r5Z;s33+=i1Z;s33+=G9h.U1Z;s33+=z9G;var y33=p9G;y33+=y9G;y33+=j5U;if(parent[y33](s33)&&parent[M33](j33)){that[i1Z][s9G]=val;that[M9G]();return;}else{that[i1Z][s9G]=t0Z;}}if(unit===j9G){var H33=h9Z;H33+=G9h.U1Z;H33+=l1G;var W33=w94;W33+=k5Z;W33+=G9h.h4Z;W33+=u9Z;if(parent[K4U](W33)&&parent[K4U](H33)){var J33=S1G;J33+=W9G;J33+=R1Z;that[i1Z][H9G]=val;that[J33]();return;}else{var q33=x9Z;q33+=v2Z;q33+=J9G;q33+=G9h.h4Z;that[i1Z][q33]=t0Z;}}if(val===i33){var a33=q9G;a33+=i9G;a33+=a9G;if(d[a33]()>=K4Z){var m33=m9G;m33+=D9G;val=d[m33]()-K4Z;}else{return;}}else if(val===W5I){var D33=P2Z;D33+=e9G;D33+=D9G;if(d[D33]()<K4Z){val=d[Z9G]()+K4Z;}else{return;}}var set=unit===e33?A9G:unit===Z33?A33:r33;d[set](val);that[M9G]();that[h4G](A8Z);onChange();}else{var C33=H1Z;C33+=y0I;var B33=k7Z;B33+=h9Z;B33+=H1Z;B33+=i1Z;var b33=u9Z;b33+=G9h.U1Z;b33+=H1Z;b33+=G9h.U1Z;var T33=r9G;T33+=G9h.U1Z;T33+=h9Z;if(!d){d=that[b4G](new Date());}d[k4G](o4Z);d[D1G](button[W0Z](T33));d[T9G](button[W0Z](b9G));d[k4G](button[b33](B9G));that[h4G](A8Z);if(!that[i1Z][B33][C33]){setTimeout(function(){var Q33=G9h.U1Z;Q33+=G9h.F1Z;G9h[Q33]();that[n2U]();},V4Z);}else{var Y33=S1G;Y33+=C9G;that[Y33]();}onChange();}}else{var R33=V1Z;R33+=G9h.t4Z;R33+=v2Z;R33+=Q9G;var S33=i5Z;S33+=s7Z;S33+=u1U;that[b4U][S33][R33]();}});},_compareDates:function(a,b){var Y9G="_dateToUtcString";G9h[N8Z]();return this[Y9G](a)===this[Y9G](b);},_correctMonth:function(date,month){var f9G="_daysInMonth";var S9G="tUTCMo";var E9G="setUTCMon";var R9G="nth";var f33=x9Z;f33+=S9G;f33+=R9G;var days=this[f9G](date[n9G](),month);G9h[N8Z]();var correctDays=date[g9G]()>days;date[f33](month);if(correctDays){var n33=E9G;n33+=H1Z;n33+=p2Z;date[k4G](days);date[n33](month);}},_daysInMonth:function(year,month){var q4Z=29;var i4Z=30;var a4Z=31;var J4Z=28;var isLeap=year%c4Z===X4Z&&(year%r4Z!==X4Z||year%B4Z===X4Z);var months=[a4Z,isLeap?q4Z:J4Z,a4Z,i4Z,a4Z,i4Z,a4Z,a4Z,i4Z,a4Z,i4Z,a4Z];return months[month];},_dateToUtc:function(s){var z2G="getMinutes";var k9G="econ";var I9G="getH";var l2G="etMonth";var h9G="getS";var k33=h9G;k33+=k9G;k33+=j3U;var h33=I9G;h33+=t9G;h33+=i1Z;var E33=D5Z;E33+=H1Z;E33+=A1Z;E33+=B2Z;var g33=P2Z;g33+=l2G;return new Date(Date[x2G](s[P2G](),s[g33](),s[E33](),s[h33](),s[z2G](),s[k33]()));},_dateToUtcString:function(d){var U2G="UTCMonth";var l03=B1Z;l03+=s7Z;l03+=G9h.U1Z;l03+=u9Z;var t33=W9U;t33+=U2G;var I33=B1Z;I33+=s7Z;I33+=j0U;return d[n9G]()+w54+this[I33](d[t33]()+o4Z)+w54+this[l03](d[g9G]());},_hide:function(){var c2G='click.';var G2G="ydown";var d2G='scroll.';var F2G="oll";var O2G='div.DTE_Body_Content';var G03=i1Z;G03+=H74;G03+=F2G;G03+=R04;var F03=G9h.t4Z;F03+=V1Z;F03+=V1Z;var U03=J6Z;U03+=G9h.h4Z;U03+=G2G;U03+=R04;var z03=G9h.t4Z;z03+=V1Z;z03+=V1Z;var P03=G9h.t4Z;P03+=V1Z;P03+=V1Z;var x03=u9Z;x03+=G9h.t4Z;x03+=K9Z;var namespace=this[i1Z][X2G];this[x03][f4U][S2U]();$(window)[P03](X74+namespace);$(document)[z03](U03+namespace);$(o2G)[F03](d2G+namespace);$(O2G)[k6U](G03+namespace);$(n4U)[k6U](c2G+namespace);},_hours24To12:function(val){return val===X4Z?K4Z:val>K4Z?val-K4Z:val;},_htmlDay:function(day){var s2G='selectable';var v2G="cte";var p2G="ssPrefix";var q2G='data-year="';var V2G="e=\"button\" ";var y2G='<td class="empty"></td>';var M2G="isa";var N2G="/button>";var W2G="day";var m2G="month";var i2G="year";var L2G="\" cla";var j2G='<td data-day="';var a2G='" data-month="';var w2G="day\" typ";var u2G="data-day=\"";var K03=x3Z;K03+=N2G;var L03=N3Z;L03+=l3Z;var V03=h24;V03+=u2G;var w03=o8I;w03+=w2G;w03+=V2G;var u03=L2G;u03+=K2G;var N03=R8I;N03+=G9h.h4Z;N03+=v2G;N03+=u9Z;var O03=j5Z;O03+=u9Z;O03+=G9h.U1Z;O03+=L2Z;var o03=G34;o03+=p2G;var X03=Q44;X03+=s7Z;X03+=v7Z;if(day[X03]){return y2G;}var classes=[s2G];var classPrefix=this[v2Z][o03];if(day[C4U]){var d03=u9Z;d03+=M2G;d03+=k5Z;d03+=z2Z;classes[v8Z](d03);}if(day[O03]){var c03=X2U;c03+=M5Z;classes[v8Z](c03);}if(day[N03]){classes[v8Z](R3I);}return j2G+day[W2G]+u03+classes[u54](r0Z)+Q0Z+H2G+classPrefix+J2G+classPrefix+w03+q2G+day[i2G]+a2G+day[m2G]+V03+day[W2G]+L03+D2G+day[W2G]+e2G+K03+Z2G;},_htmlMonth:function(year,month){var o7G="mpareDa";var h2G="irstDa";var G7G="_com";var b2G="y>";var I2G="UTCMinutes";var S2G="ays";var Q2G="<the";var V7G=" weekN";var r2G="le>";var n2G="eToUtc";var s7G='</thead>';var X7G="_c";var Y2G="<table class";var C2G="dy>";var T2G="tbo";var N7G="OfYear";var F7G="ableD";var g2G="getUTCDay";var p7G="Right";var z7G="CDay";var K7G="-ic";var l7G="etSec";var v7G="nLeft";var c7G="tmlWeek";var U7G="inAr";var L7G="umber";var f2G="_da";var R2G="InMont";var u7G="shi";var t2G="etUTCHours";var P7G="mlDa";var y7G="_htmlMonthHead";var M4Z=23;var U4k=A2G;U4k+=Y3Z;U4k+=r2G;var z4k=H3Z;z4k+=T2G;z4k+=u9Z;z4k+=b2G;var P4k=B2G;P4k+=q9Z;P4k+=G9h.t4Z;P4k+=C2G;var x4k=Q2G;x4k+=G9h.U1Z;x4k+=u9Z;x4k+=l3Z;var l4k=N3Z;l4k+=l3Z;var t03=Y2G;t03+=P0Z;var C03=G9h.U1Z;C03+=G9h.F1Z;var B03=p0I;B03+=d3U;var b03=v2Z;b03+=t4U;b03+=M2Z;b03+=F1G;var y03=n4G;y03+=S1Z;y03+=S2Z;var p03=B2U;p03+=S2G;p03+=R2G;p03+=p2Z;var v03=f2G;v03+=H1Z;v03+=n2G;var now=this[v03](new Date()),days=this[p03](year,month),before=new Date(Date[y03](year,month,o4Z))[g2G](),data=[],row=[];if(this[v2Z][E2G]>X4Z){var s03=V1Z;s03+=h2G;s03+=L2Z;before-=this[v2Z][s03];if(before<X4Z){before+=u4Z;}}var cells=days+before,after=cells;while(after>u4Z){after-=u4Z;}cells+=u4Z-after;var minDate=this[v2Z][e4G];var maxDate=this[v2Z][k2G];if(minDate){var W03=H9U;W03+=O94;W03+=j0I;var j03=H9U;j03+=I2G;var M03=i1Z;M03+=t2G;minDate[M03](X4Z);minDate[j03](X4Z);minDate[W03](X4Z);}if(maxDate){var H03=i1Z;H03+=l7G;H03+=G9h.t4Z;H03+=f1G;maxDate[B1G](M4Z);maxDate[Y1G](Z4Z);maxDate[H03](Z4Z);}for(var i=X4Z,r=X4Z;i<cells;i++){var D03=x7G;D03+=H1Z;D03+=P7G;D03+=L2Z;var m03=q9G;m03+=S1Z;m03+=z7G;var a03=U7G;a03+=X8I;var i03=B5Z;i03+=F7G;i03+=v6U;i03+=i1Z;var q03=G7G;q03+=I1G;q03+=Y1Z;q03+=i1Z;var J03=X7G;J03+=G9h.t4Z;J03+=o7G;J03+=y1G;var day=new Date(Date[x2G](year,month,o4Z+(i-before))),selected=this[i1Z][u9Z]?this[J03](day,this[i1Z][u9Z]):D8Z,today=this[q03](day,now),empty=i<before||i>=days+before,disabled=minDate&&day<minDate||maxDate&&day>maxDate;var disableDays=this[v2Z][i03];if($[y3U](disableDays)&&$[a03](day[m03](),disableDays)!==-o4Z){disabled=A8Z;}else if(typeof disableDays===G9h.d1Z&&disableDays(day)===A8Z){disabled=A8Z;}var dayConfig={day:o4Z+(i-before),month:month,year:year,selected:selected,today:today,disabled:disabled,empty:empty};row[v8Z](this[D03](dayConfig));if(++r===u4Z){var T03=f3U;T03+=G9h.t4Z;T03+=L1Z;T03+=D1Z;var r03=B2G;r03+=d7G;var A03=H8Z;A03+=i1Z;A03+=p2Z;if(this[v2Z][O7G]){var Z03=x7G;Z03+=c7G;Z03+=N7G;var e03=k8U;e03+=u7G;e03+=V1Z;e03+=H1Z;row[e03](this[Z03](i-before,month,year));}data[A03](r03+row[T03](U8Z)+w7G);row=[];r=X4Z;}}var classPrefix=this[v2Z][b03];var className=classPrefix+B03;G9h[C03]();if(this[v2Z][O7G]){var Q03=V7G;Q03+=L7G;className+=Q03;}if(minDate){var n03=I5Z;n03+=t5Z;var f03=v2Z;f03+=i1Z;f03+=i1Z;var R03=K7G;R03+=G9h.t4Z;R03+=v7G;var S03=V1Z;S03+=O7U;var Y03=u9Z;Y03+=u6Z;var underMin=minDate>=new Date(Date[x2G](year,month,o4Z,X4Z,X4Z,X4Z));this[Y03][m1I][S03](F74+classPrefix+R03)[f03](n03,underMin?E4U:I1U);}if(maxDate){var I03=Y4U;I03+=v6U;var k03=K7G;k03+=X2Z;k03+=p7G;var h03=u9Z;h03+=L1Z;h03+=C1U;h03+=R04;var E03=p9Z;E03+=H1Z;E03+=p5Z;var g03=n4G;g03+=S1Z;g03+=S2Z;var overMax=maxDate<new Date(Date[g03](year,month+o4Z,o4Z,X4Z,X4Z,X4Z));this[b4U][E03][i94](h03+classPrefix+k03)[g4U](I03,overMax?E4U:I1U);}return t03+className+l4k+x4k+this[y7G]()+s7G+P4k+data[u54](U8Z)+z4k+U4k;},_htmlMonthHead:function(){var J7G="h>";var H7G='<th></th>';var q7G='<th>';var F4k=L1Z;F4k+=a1Z;F4k+=m1Z;F4k+=D1Z;var a=[];var firstDay=this[v2Z][E2G];var i18n=this[v2Z][F4k];var dayName=function(day){var j7G="ekdays";var M7G="we";var G4k=M7G;G4k+=j7G;G9h[G9h.I4Z]();day+=firstDay;while(day>=u4Z){day-=u4Z;}return i18n[G4k][day];};if(this[v2Z][O7G]){var X4k=W7G;X4k+=p2Z;a[X4k](H7G);}for(var i=X4Z;i<u4Z;i++){var d4k=x3Z;d4k+=P3Z;d4k+=H1Z;d4k+=J7G;var o4k=s7Z;o4k+=E7Z;o4k+=i1Z;o4k+=p2Z;a[o4k](q7G+dayName(i)+d4k);}return a[u54](U8Z);},_htmlWeekOfYear:function(d,m,y){var f4Z=86400000;var m7G="setDate";var i7G="<td class";var D7G="getDay";var e7G='-week">';var a7G="etDate";var N4k=i7G;N4k+=P0Z;var c4k=Y9Z;c4k+=L1Z;c4k+=K1Z;var O4k=P2Z;O4k+=a7G;var date=new Date(y,m,d,X4Z,X4Z,X4Z,X4Z);date[m7G](date[O4k]()+c4Z-(date[D7G]()||u4Z));var oneJan=new Date(y,X4Z,o4Z);var weekNum=Math[c4k](((date-oneJan)/f4Z+o4Z)/u4Z);return N4k+this[v2Z][x4G]+e7G+weekNum+Z2G;},_options:function(selector,values,labels){var A7G='<option value="';var Z7G="/op";var w4k=G3I;w4k+=v2Z;w4k+=H1Z;w4k+=R04;var u4k=u9Z;u4k+=u6Z;if(!labels){labels=values;}var select=this[u4k][f4U][i94](w4k+this[v2Z][x4G]+w54+selector);select[J4G]();for(var i=X4Z,ien=values[m8Z];i<ien;i++){var L4k=x3Z;L4k+=Z7G;L4k+=p9Z;L4k+=Y0I;var V4k=N3Z;V4k+=l3Z;select[R2U](A7G+values[i]+V4k+labels[i]+L4k);}},_optionSet:function(selector,val){var C7G="dr";var r7G="unkno";var B7G="ion:selected";var Q7G='select.';var W4k=r7G;W4k+=T2U;var j4k=T7G;j4k+=H1Z;var M4k=K1Z;M4k+=p44;var s4k=p2Z;s4k+=P14;s4k+=K1Z;var y4k=b7G;y4k+=B7G;var p4k=C1U;p4k+=G9h.U1Z;p4k+=K1Z;var v4k=v2Z;v4k+=B8U;v4k+=C7G;v4k+=J8Z;var K4k=G9h.U1Z;K4k+=G9h.F1Z;var select=this[b4U][f4U][i94](Q7G+this[v2Z][x4G]+w54+selector);G9h[K4k]();var span=select[U9G]()[v4k](d1G);select[p4k](val);var selected=select[i94](y4k);span[s4k](selected[M4k]!==X4Z?selected[j4k]():this[v2Z][N0Z][W4k]);},_optionsTime:function(unit,count,val,allowed,range){var f7G="s=\"";var Y7G="<thead><t";var L5G='</th></tr></thead>';var K5G='<tbody>';var S7G="r><th colspan=\"";var u5G="oor";var N5G="fl";var E7G='-table';var w5G='</tbody></thead><table class="';var V5G='-nospace"><tbody>';var d5G='<tr>';var N4Z=6;var v5G='</tbody>';var g7G="Prefix";var O5G="amPm";var n7G="class";var c5G="/t";var p5G='</table>';var R7G="ble clas";var o5G="mPm";var t4k=Y7G;t4k+=S7G;var I4k=N3Z;I4k+=l3Z;var k4k=B2G;k4k+=G9h.U1Z;k4k+=R7G;k4k+=f7G;var m4k=L1Z;m4k+=a1Z;m4k+=B3I;var a4k=n7G;a4k+=g7G;var i4k=B1Z;i4k+=k7Z;i4k+=u9Z;var q4k=u9Z;q4k+=t8Z;q4k+=R04;var J4k=t1Z;J4k+=j0Z;J4k+=i5Z;J4k+=O2Z;var H4k=u9Z;H4k+=G9h.t4Z;H4k+=K9Z;G9h[G9h.I4Z]();var classPrefix=this[v2Z][x4G];var container=this[H4k][J4k][i94](q4k+classPrefix+w54+unit);var i,j;var render=count===K4Z?function(i){return i;}:this[i4k];var classPrefix=this[v2Z][a4k];var className=classPrefix+E7G;var i18n=this[v2Z][m4k];if(!container[m8Z]){return;}var a=U8Z;var span=V4Z;var button=function(value,label,className){var z5G="rray";var X5G='</button>';var F5G='-day" type="button" data-unit="';var x5G="class=\"selectable ";var k7G="an>";var I7G="pan";var l5G="<td ";var t7G="<button cla";var P5G="inA";var U5G=' disabled';var G5G='" data-value="';var B4k=h7G;B4k+=k7G;var b4k=x3Z;b4k+=i1Z;b4k+=I7G;b4k+=l3Z;var T4k=N3Z;T4k+=l3Z;var r4k=t7G;r4k+=K2G;var A4k=N3Z;A4k+=l3Z;var Z4k=l5G;Z4k+=x5G;var e4k=P5G;e4k+=z5G;var D4k=G9h.U1Z;D4k+=K9Z;if(count===K4Z&&val>=K4Z&&typeof value===Y14){value+=K4Z;}var selected=val===value||value===D4k&&val<K4Z||value===W5I&&val>=K4Z?R3I:U8Z;if(allowed&&$[e4k](value,allowed)===-o4Z){selected+=U5G;}if(className){selected+=r0Z+className;}return Z4k+selected+A4k+r4k+classPrefix+J2G+classPrefix+F5G+unit+G5G+value+T4k+b4k+label+B4k+X5G+Z2G;};if(count===K4Z){var S4k=G9h.U1Z;S4k+=o5G;var Y4k=x3Z;Y4k+=i9U;Y4k+=l3Z;var Q4k=H3Z;Q4k+=H1Z;Q4k+=d7G;var C4k=G9h.U1Z;C4k+=K9Z;a+=d5G;for(i=o4Z;i<=N4Z;i++){a+=button(i,render(i));}a+=button(C4k,i18n[O5G][X4Z]);a+=Q4k;a+=Y4k;for(i=u4Z;i<=K4Z;i++){a+=button(i,render(i));}a+=button(W5I,i18n[S4k][o4Z]);a+=w7G;span=u4Z;}else if(count===j4Z){var c=X4Z;for(j=X4Z;j<c4Z;j++){var R4k=x3Z;R4k+=c5G;R4k+=h9Z;R4k+=l3Z;a+=d5G;for(i=X4Z;i<N4Z;i++){a+=button(c,render(c));c++;}a+=R4k;}span=N4Z;}else{var h4k=A2G;h4k+=d7G;var E4k=x3Z;E4k+=H1Z;E4k+=h9Z;E4k+=l3Z;var g4k=N5G;g4k+=u5G;var n4k=A2G;n4k+=d7G;var f4k=x3Z;f4k+=H1Z;f4k+=h9Z;f4k+=l3Z;a+=f4k;for(j=X4Z;j<A4Z;j+=V4Z){a+=button(j,render(j),F9G);}a+=n4k;a+=w5G+className+r0Z+className+V5G;var start=range!==t0Z?range:Math[g4k](val/V4Z)*V4Z;a+=E4k;for(j=start+o4Z;j<start+V4Z;j++){a+=button(j,render(j));}a+=h4k;span=N4Z;}container[J4G]()[R2U](k4k+className+I4k+t4k+span+Q0Z+i18n[unit]+L5G+K5G+a+v5G+p5G);},_optionsTitle:function(){var i5G="ull";var J5G="llY";var m5G="ullYe";var W5G="arRa";var D5G="_options";var M5G="ths";var H5G="getF";var y5G="rang";var e5G='year';var s5G="mon";var O1k=B1Z;O1k+=y5G;O1k+=G9h.h4Z;var d1k=s5G;d1k+=M5G;var o1k=B1Z;o1k+=y5G;o1k+=G9h.h4Z;var X1k=J5Z;X1k+=s7U;X1k+=p2Z;var G1k=j5G;G1k+=j4U;G1k+=I9Z;var F1k=r9G;F1k+=W5G;F1k+=I1Z;F1k+=G9h.h4Z;var U1k=H5G;U1k+=E7Z;U1k+=J5G;U1k+=q5G;var z1k=L2Z;z1k+=G9h.h4Z;z1k+=W5G;z1k+=l1G;var P1k=H5G;P1k+=i5G;P1k+=a5G;P1k+=q5G;var x1k=W9U;x1k+=o2Z;x1k+=m5G;x1k+=s2Z;var l1k=L1Z;l1k+=a1Z;l1k+=m1Z;l1k+=D1Z;var i18n=this[v2Z][l1k];var min=this[v2Z][e4G];var max=this[v2Z][k2G];var minYear=min?min[P2G]():t0Z;var maxYear=max?max[x1k]():t0Z;var i=minYear!==t0Z?minYear:new Date()[P1k]()-this[v2Z][z1k];var j=maxYear!==t0Z?maxYear:new Date()[U1k]()+this[v2Z][F1k];this[G1k](X1k,this[o1k](X4Z,L4Z),i18n[d1k]);this[D5G](e5G,this[O1k](i,j));},_pad:function(i){var Z5G='0';return i<V4Z?Z5G+i:i;},_position:function(){var b5G="idth";var A5G="roll";var B5G="tain";var Y5G="ef";var Q5G='horizontal';var T5G="ndT";var r5G="erWidth";var J1k=E24;J1k+=K44;var H1k=p5Z;H1k+=V1Z;H1k+=H1Z;var j1k=H1Z;j1k+=G9h.t4Z;j1k+=s7Z;var M1k=F9I;M1k+=A5G;M1k+=S1Z;M1k+=x8U;var s1k=T8U;s1k+=r5G;var y1k=q9Z;y1k+=G9h.t4Z;y1k+=u9Z;y1k+=L2Z;var p1k=b2U;p1k+=T5G;p1k+=G9h.t4Z;var v1k=Z44;v1k+=i1Z;var K1k=M5Z;K1k+=b5G;var L1k=d8I;L1k+=H1Z;L1k+=i1Z;var V1k=u9Z;V1k+=G9h.U1Z;V1k+=H1Z;V1k+=G9h.h4Z;var w1k=u9Z;w1k+=G9h.t4Z;w1k+=K9Z;var u1k=H1U;u1k+=D1Z;u1k+=B5G;u1k+=O2Z;var N1k=u9Z;N1k+=G9h.t4Z;N1k+=K9Z;var c1k=u9Z;c1k+=G9h.t4Z;c1k+=K9Z;var offset=this[c1k][S0Z][p8U]();var container=this[N1k][u1k];var inputHeight=this[w1k][S0Z][o5U]();if(this[i1Z][C5G][V1k]&&this[i1Z][L1k][M4G]&&$(window)[K1k]()>Q4Z){container[J7U](Q5G);}else{container[h4U](Q5G);}container[v1k]({top:offset[u8U]+inputHeight,left:offset[m44]})[p1k](y1k);var calHeight=container[o5U]();var calWidth=container[s1k]();G9h[N8Z]();var scrollTop=$(window)[M1k]();if(offset[j1k]+inputHeight+calHeight-scrollTop>$(window)[d8U]()){var W1k=H1Z;W1k+=G9h.t4Z;W1k+=s7Z;var newTop=offset[W1k]-calHeight;container[g4U](A44,newTop<X4Z?X4Z:newTop);}if(calWidth+offset[H1k]>$(window)[J1k]()){var a1k=K1Z;a1k+=Y5G;a1k+=H1Z;var i1k=v2Z;i1k+=i1Z;i1k+=i1Z;var q1k=M5Z;q1k+=L1Z;q1k+=K44;var newLeft=$(window)[q1k]()-calWidth;container[i1k](a1k,newLeft<X4Z?X4Z:newLeft);}},_range:function(start,end,inc){var a=[];if(!inc){inc=o4Z;}for(var i=start;i<=end;i+=inc){a[v8Z](i);}return a;},_setCalander:function(){var n5G="_htmlMonth";var S5G="UTCFu";var f5G="calendar";var R5G="Year";var m1k=G9h.U1Z;m1k+=G9h.F1Z;G9h[m1k]();if(this[i1Z][M9U]){var e1k=W9U;e1k+=S5G;e1k+=N14;e1k+=R5G;var D1k=Q44;D1k+=t14;D1k+=L2Z;this[b4U][f5G][D1k]()[R2U](this[n5G](this[i1Z][M9U][e1k](),this[i1Z][M9U][O9G]()));}},_setTitle:function(){var k5G="UTCM";var I5G="onSet";var h5G="tionSet";var g5G="tUTCFu";var E5G="lYear";var B1k=D5Z;B1k+=g5G;B1k+=K1Z;B1k+=E5G;var b1k=L2Z;b1k+=G9h.h4Z;b1k+=G9h.U1Z;b1k+=h9Z;var T1k=j5G;T1k+=h5G;var r1k=W9U;r1k+=k5G;r1k+=X2Z;r1k+=q8Z;var A1k=I5Z;A1k+=t5Z;var Z1k=B1Z;Z1k+=b7G;Z1k+=L1Z;Z1k+=I5G;this[Z1k](b9G,this[i1Z][A1k][r1k]());this[T1k](b1k,this[i1Z][M9U][B1k]());},_setTime:function(){var u6G="getSeconds";var P6G="etU";var N6G="hoursAvailable";var c6G="_optionsTime";var G6G="12";var l6G="ndsRang";var z6G="TCMinutes";var t5G="seco";var X6G="hou";var x6G="sec";var F6G="ute";var E1k=t5G;E1k+=l6G;E1k+=G9h.h4Z;var g1k=x6G;g1k+=G9h.t4Z;g1k+=D1Z;g1k+=j3U;var n1k=w9G;n1k+=v1Z;var f1k=P2Z;f1k+=P6G;f1k+=z6G;var R1k=U6G;R1k+=F6G;R1k+=i1Z;var S1k=p2Z;S1k+=t9G;S1k+=i1Z;S1k+=G6G;var Y1k=X6G;Y1k+=h9Z;Y1k+=i1Z;var that=this;var d=this[i1Z][u9Z];var hours=d?d[Z9G]():X4Z;var allowed=function(prop){var d6G="_ran";var O6G='Available';var o6G="Incremen";var Q1k=o6G;Q1k+=H1Z;var C1k=d6G;C1k+=D5Z;G9h[N8Z]();return that[v2Z][prop+O6G]?that[v2Z][prop+O6G]:that[C1k](X4Z,Z4Z,that[v2Z][prop+Q1k]);};this[c6G](Y1k,this[i1Z][C5G][S1k]?K4Z:j4Z,hours,this[v2Z][N6G]);this[c6G](R1k,A4Z,d?d[f1k]():X4Z,allowed(n1k),this[i1Z][s9G]);this[c6G](j9G,A4Z,d?d[u6G]():X4Z,allowed(g1k),this[i1Z][E1k]);},_show:function(){var w6G="cro";var p6G="esiz";var v6G=" r";var M6G="_p";var s6G="scr";var L6G="oll.";var H6G='keydown.';var V6G="l.";var K6G=".DTE_Body_C";var j6G="osition";var y6G="e.";var d9k=G9h.t4Z;d9k+=D1Z;var G9k=i1Z;G9k+=w6G;G9k+=K1Z;G9k+=V6G;var F9k=G9h.t4Z;F9k+=D1Z;var P9k=i1Z;P9k+=v2Z;P9k+=h9Z;P9k+=L6G;var x9k=r5Z;x9k+=C1U;x9k+=K6G;x9k+=r8U;var t1k=v6G;t1k+=p6G;t1k+=y6G;var I1k=s6G;I1k+=G9h.t4Z;I1k+=N14;I1k+=R04;var k1k=G9h.t4Z;k1k+=D1Z;var h1k=M6G;h1k+=j6G;var that=this;var namespace=this[i1Z][X2G];this[h1k]();$(window)[k1k](I1k+namespace+t1k+namespace,function(){var l9k=x7G;l9k+=L1Z;l9k+=u9Z;l9k+=G9h.h4Z;that[l9k]();});$(x9k)[X2Z](P9k+namespace,function(){var W6G="_hi";var U9k=W6G;U9k+=r1Z;var z9k=s7Z;z9k+=G9h.F1Z;G9h[z9k]();that[U9k]();});$(o2G)[F9k](G9k+namespace,function(){var o9k=x7G;o9k+=L1Z;o9k+=r1Z;var X9k=s7Z;X9k+=G9h.F1Z;G9h[X9k]();that[o9k]();});$(document)[d9k](H6G+namespace,function(e){var w4Z=9;var c9k=J6Z;c9k+=T1I;c9k+=r1Z;var O9k=o9I;O9k+=I5U;O9k+=r1Z;if(e[c14]===w4Z||e[O9k]===H4Z||e[c9k]===v4Z){var N9k=B1Z;N9k+=L2U;N9k+=u9Z;N9k+=G9h.h4Z;that[N9k]();}});setTimeout(function(){var J6G="k.";var V9k=x6Z;V9k+=L1Z;V9k+=v2Z;V9k+=J6G;var w9k=W7U;w9k+=H7U;var u9k=G9h.U1Z;u9k+=G9h.F1Z;G9h[u9k]();$(w9k)[X2Z](V9k+namespace,function(e){var q6G="contai";var i6G="tar";var y9k=x4U;y9k+=E7Z;y9k+=H1Z;var p9k=l2U;p9k+=P2Z;p9k+=q8Z;var v9k=q6G;v9k+=D1Z;v9k+=G9h.h4Z;v9k+=h9Z;var K9k=u9Z;K9k+=G9h.t4Z;K9k+=K9Z;var L9k=i6G;L9k+=P2Z;L9k+=G9h.h4Z;L9k+=H1Z;var parents=$(e[L9k])[G9I]();if(!parents[g6I](that[K9k][v9k])[p9k]&&e[a94]!==that[b4U][y9k][X4Z]){var s9k=B1Z;s9k+=L2U;s9k+=r1Z;that[s9k]();}});},V4Z);},_writeOutput:function(focus){var Z6G="momentL";var D6G="rma";var r6G="momen";var a6G="_pa";var m6G="getUTCFull";var A6G="ocal";var T6G="mome";var e6G="momentS";var D9k=L1Z;D9k+=H4G;D9k+=E7Z;D9k+=H1Z;var m9k=u9Z;m9k+=u6Z;var a9k=B1Z;a9k+=k7Z;a9k+=u9Z;var i9k=a6G;i9k+=u9Z;var q9k=m6G;q9k+=a5G;q9k+=N4U;q9k+=h9Z;var J9k=Z9Z;J9k+=D6G;J9k+=H1Z;var H9k=e6G;H9k+=i4I;H9k+=Z74;var W9k=Z6G;W9k+=A6G;W9k+=G9h.h4Z;var j9k=r6G;j9k+=H1Z;var M9k=T6G;M9k+=D1Z;M9k+=H1Z;var date=this[i1Z][u9Z];var out=window[M9k]?window[j9k][S4G](date,undefined,this[v2Z][W9k],this[v2Z][H9k])[P4G](this[v2Z][J9k]):date[q9k]()+w54+this[i9k](date[O9G]()+o4Z)+w54+this[a9k](date[g9G]());this[m9k][D9k][v4U](out);if(focus){var Z9k=L1Z;Z9k+=D1Z;Z9k+=s7Z;Z9k+=u1U;var e9k=u9Z;e9k+=G9h.t4Z;e9k+=K9Z;this[e9k][Z9k][p4U]();}}});Editor[A9k][r9k]=X4Z;Editor[O0I][T9k]={classPrefix:b6G,disableDays:t0Z,firstDay:o4Z,format:b9k,hoursAvailable:t0Z,i18n:Editor[c34][B9k][B6G],maxDate:t0Z,minDate:t0Z,minutesAvailable:t0Z,minutesIncrement:o4Z,momentStrict:A8Z,momentLocale:C6G,onChange:function(){},secondsAvailable:t0Z,secondsIncrement:o4Z,showWeekNumber:D8Z,yearRange:V4Z};(function(){var w3G="saf";var Y6G="adio";var c3G="_v";var z3G='change';var d0G="pairs";var X1h='div.rendered';var Q6G="uploadMan";var g6G="pes";var I3G="separator";var Y4h='keydown';var l4h="ecked";var A3G="optionsPair";var S6G="heckbox";var G8G="/div>";var s8G='" />';var E6G="div.u";var m8G="feId";var T0G="che";var Y3G="multiple";var F8G="rop";var n6G="fieldTy";var S3G='change.dte';var r3G="pOp";var u3G="readonly";var X3G="prop";var L3G='text';var N3G="_val";var e3G="_editor_val";var n4h="_closeFn";var f6G="are";var K0G='</label>';var h4h="momentStrict";var y3G="<i";var a8G="_enabled";var U3G="_inp";var p3G="password";var z4h="fin";var m0G="npu";var R3G="_lastSet";var h3G="ep";var d3G="hidden";var E4h="wireFormat";var T4h="_pi";var I4h="_picker";var G3G="_input";var N4h="datepicker";var T3G="io";var I0G="_addOptions";var c0G="eId";var R6G="elec";var o3G='disabled';var X0G="_inpu";var F3G="inpu";var x3G="abled";var V0G='_';var k4h="ker";var F0k=Q6G;F0k+=L2Z;var q3k=E64;q3k+=R5Z;q3k+=j0U;var R8k=u9Z;R8k+=B2Z;R8k+=H1Z;R8k+=y0I;var X6k=h9Z;X6k+=Y6G;var O5k=H0Z;O5k+=P44;var d5k=v2Z;d5k+=S6G;var V7k=b94;V7k+=h1Z;var w7k=i1Z;w7k+=R6G;w7k+=H1Z;var c7k=H0Z;c7k+=P44;var O7k=K2U;O7k+=f6G;O7k+=G9h.U1Z;var X7k=t9Z;X7k+=H1Z;X7k+=G9h.h4Z;X7k+=h1Z;var l7k=G9h.h4Z;l7k+=B94;var t2k=H1Z;t2k+=G9h.h4Z;t2k+=W1Z;t2k+=H1Z;var C9k=n6G;C9k+=g6G;var fieldTypes=Editor[C9k];function _buttonText(conf,text){var t6G="e ";var h6G="pload";var k6G=" button";var I6G="Cho";var x8G="uploadText";var l8G="file...";var R9k=D1U;R9k+=K1Z;var S9k=E6G;S9k+=h6G;S9k+=k6G;var Y9k=B1Z;Y9k+=S0Z;G9h[G9h.I4Z]();if(text===t0Z||text===undefined){var Q9k=I6G;Q9k+=P6Z;Q9k+=t6G;Q9k+=l8G;text=conf[x8G]||Q9k;}conf[Y9k][i94](S9k)[R9k](text);}function _commonUpload(editor,conf,dropCallback,multiple){var C8G="dragDropText";var v8G="sse";var I8G="Dr";var e8G='id';var E8G='dragover';var L8G="tonIn";var g8G='dragleave dragexit';var q8G='<div class="drop"><span/></div>';var w8G="class=\"eu";var N8G="ow\"";var B8G=".drop s";var k8G="div.re";var j8G='multiple';var r8G="Drag and drop a";var c8G="iv class=\"r";var K8G="rnal";var T8G=" fi";var W8G='/>';var O8G="lue\">";var d8G="<div class=\"cell clearVa";var M8G='<input type="file" ';var p8G='<div class="editor_upload">';var D8G='input[type=file]';var y8G='<div class="cell upload limitHide">';var P8G="hange";var h8G='dragover.DTE_Upload drop.DTE_Upload';var o8G="d\"/>";var J8G='<div class="cell limitHide">';var b8G="le here to upload";var z8G="input[type=f";var i8G='<div class="cell">';var H8G='<div class="row second">';var n8G='over';var Z8G="FileReader";var V8G="_table\">";var U8G="e]";var X8G="<div class=\"re";var t8G='div.clearValue button';var A8G="v.drop";var u8G="v ";var T2k=v2Z;T2k+=P8G;var r2k=z8G;r2k+=e0U;r2k+=U8G;var Z2k=V1Z;Z2k+=L1Z;Z2k+=D1Z;Z2k+=u9Z;var O2k=u6I;O2k+=P2Z;O2k+=A1Z;O2k+=F8G;var o2k=C0U;o2k+=h9Z;var X2k=s7Z;X2k+=G9h.F1Z;var U2k=U6U;U2k+=H4G;U2k+=u1U;var z2k=x3Z;z2k+=G8G;var P2k=x3Z;P2k+=P3Z;P2k+=f5U;var x2k=r0U;x2k+=l3Z;var l2k=X8G;l2k+=a1G;l2k+=G9h.h4Z;l2k+=o8G;var t9k=r0U;t9k+=l3Z;var I9k=h24;I9k+=P3Z;I9k+=l3Z;var k9k=d8G;k9k+=O8G;var h9k=x3Z;h9k+=a0I;h9k+=C1U;h9k+=l3Z;var E9k=E3Z;E9k+=c8G;E9k+=N8G;E9k+=l3Z;var g9k=E8Z;g9k+=u8G;g9k+=w8G;g9k+=V8G;var n9k=W0U;n9k+=L8G;n9k+=c5Z;n9k+=K8G;var f9k=v2Z;f9k+=t3Z;f9k+=v8G;f9k+=i1Z;var btnClass=editor[f9k][l44][n9k];var container=$(p8G+g9k+E9k+y8G+H2G+btnClass+s8G+M8G+(multiple?j8G:U8Z)+W8G+h9k+k9k+H2G+btnClass+I9k+g0Z+t9k+H8G+J8G+q8G+g0Z+i8G+l2k+x2k+P2k+g0Z+z2k);conf[U2k]=container;conf[a8G]=A8Z;if(conf[m5Z]){var G2k=u24;G2k+=m8G;var F2k=V1Z;F2k+=i5Z;F2k+=u9Z;container[F2k](D8G)[d14](e8G,Editor[G2k](conf[m5Z]));}G9h[X2k]();if(conf[o2k]){var d2k=V1Z;d2k+=L1Z;d2k+=D1Z;d2k+=u9Z;container[d2k](D8G)[d14](conf[d14]);}_buttonText(conf);if(window[Z8G]&&conf[O2k]!==D8Z){var J2k=x6Z;J2k+=z6Z;var H2k=G9h.t4Z;H2k+=D1Z;var j2k=f74;j2k+=D1Z;var M2k=G9h.t4Z;M2k+=D1Z;var p2k=G9h.t4Z;p2k+=D1Z;var V2k=u9Z;V2k+=h9Z;V2k+=G9h.t4Z;V2k+=s7Z;var w2k=r5Z;w2k+=A8G;var u2k=r8G;u2k+=T8G;u2k+=b8G;var N2k=T7G;N2k+=H1Z;var c2k=z3Z;c2k+=B8G;c2k+=s7Z;c2k+=b4I;container[i94](c2k)[N2k](conf[C8G]||u2k);var dragDrop=container[i94](w2k);dragDrop[X2Z](V2k,function(e){var Q8G="ena";var f8G="dataTransfer";var S8G="origi";var Y8G="ile";var R8G="nalE";var L2k=B1Z;L2k+=Q8G;L2k+=i6Z;L2k+=u9Z;if(conf[L2k]){var v2k=V1Z;v2k+=Y8G;v2k+=i1Z;var K2k=S8G;K2k+=R8G;K2k+=Y64;Editor[X84](editor,conf,e[K2k][f8G][v2k],_buttonText,dropCallback);dragDrop[h4U](n8G);}G9h[G9h.I4Z]();return D8Z;})[p2k](g8G,function(e){if(conf[a8G]){var y2k=p54;y2k+=O2Z;dragDrop[h4U](y2k);}return D8Z;})[X2Z](E8G,function(e){var s2k=s7Z;s2k+=G9h.F1Z;if(conf[a8G]){dragDrop[J7U](n8G);}G9h[s2k]();return D8Z;});editor[M2k](j2k,function(){var W2k=s7Z;W2k+=G9h.F1Z;G9h[W2k]();$(n4U)[X2Z](h8G,function(e){return D8Z;});})[H2k](J2k,function(){var i2k=G9h.t4Z;i2k+=V1Z;i2k+=V1Z;var q2k=q9Z;q2k+=G9h.t4Z;q2k+=u9Z;q2k+=L2Z;G9h[G9h.I4Z]();$(q2k)[i2k](h8G);});}else{var e2k=k8G;e2k+=D1Z;e2k+=W1G;e2k+=z2Z;var D2k=V1Z;D2k+=L1Z;D2k+=D1Z;D2k+=u9Z;var m2k=G9h.U1Z;m2k+=Q8U;m2k+=D1Z;m2k+=u9Z;var a2k=X2U;a2k+=I8G;a2k+=x8U;container[J7U](a2k);container[m2k](container[D2k](e2k));}container[Z2k](t8G)[X2Z](O74,function(e){var l3G="_en";var A2k=l3G;A2k+=x3G;e[v14]();if(conf[A2k]){Editor[w0Z][X84][H9U][Z64](editor,conf,U8Z);}});container[i94](r2k)[X2Z](T2k,function(){Editor[X84](editor,conf,this[M8Z],_buttonText,function(ids){var B2k=C1U;B2k+=G9h.U1Z;B2k+=K1Z;var b2k=v2Z;b2k+=M64;b2k+=K1Z;dropCallback[b2k](editor,ids);container[i94](D8G)[B2k](U8Z);});});return container;}function _triggerChange(input){var C2k=s7Z;C2k+=G9h.F1Z;G9h[C2k]();setTimeout(function(){var P3G="rigger";var Q2k=H1Z;Q2k+=P3G;G9h[G9h.I4Z]();input[Q2k](z3G,{editor:A8Z,editorSet:A8Z});;},X4Z);}var baseFieldType=$[u0Z](A8Z,{},Editor[v2U][y2U],{get:function(conf){var S2k=U3G;S2k+=u1U;var Y2k=s7Z;Y2k+=G9h.F1Z;G9h[Y2k]();return conf[S2k][v4U]();},set:function(conf,val){var R2k=B1Z;R2k+=F3G;R2k+=H1Z;conf[G3G][v4U](val);_triggerChange(conf[R2k]);},enable:function(conf){var f2k=U6U;f2k+=H4G;f2k+=E7Z;f2k+=H1Z;conf[f2k][X3G](o3G,D8Z);},disable:function(conf){var n2k=s7Z;n2k+=F8G;conf[G3G][n2k](o3G,A8Z);},canReturnSubmit:function(conf,node){return A8Z;}});fieldTypes[d3G]={create:function(conf){var O3G="alue";var E2k=C1U;E2k+=O3G;var g2k=c3G;g2k+=M64;conf[g2k]=conf[E2k];return t0Z;},get:function(conf){G9h[N8Z]();return conf[N3G];},set:function(conf,val){var h2k=B1Z;h2k+=K5Z;h2k+=K1Z;conf[h2k]=val;}};fieldTypes[u3G]=$[u0Z](A8Z,{},baseFieldType,{create:function(conf){var V3G='<input/>';var K3G='readonly';var I2k=w3G;I2k+=G9h.h4Z;I2k+=f1U;var k2k=L0I;k2k+=H8Z;k2k+=H1Z;conf[k2k]=$(V3G)[d14]($[u0Z]({id:Editor[I2k](conf[m5Z]),type:L3G,readonly:K3G},conf[d14]||{}));return conf[G3G][X4Z];}});fieldTypes[t2k]=$[l7k](A8Z,{},baseFieldType,{create:function(conf){var v3G="put/>";var G7k=L0I;G7k+=u1G;var F7k=G9h.U1Z;F7k+=H1Z;F7k+=i9U;var U7k=H1Z;U7k+=t9Z;U7k+=H1Z;var z7k=L1Z;z7k+=u9Z;var P7k=x3Z;P7k+=i5Z;P7k+=v3G;var x7k=B1Z;x7k+=S0Z;conf[x7k]=$(P7k)[d14]($[u0Z]({id:Editor[H64](conf[z7k]),type:U7k},conf[F7k]||{}));return conf[G7k][X4Z];}});fieldTypes[p3G]=$[X7k](A8Z,{},baseFieldType,{create:function(conf){var s3G="nput/>";var M3G='password';var d7k=L1Z;d7k+=u9Z;var o7k=y3G;o7k+=s3G;conf[G3G]=$(o7k)[d14]($[u0Z]({id:Editor[H64](conf[d7k]),type:M3G},conf[d14]||{}));return conf[G3G][X4Z];}});fieldTypes[O7k]=$[c7k](A8Z,{},baseFieldType,{create:function(conf){var j3G='<textarea/>';var u7k=w3G;u7k+=G9h.h4Z;u7k+=f1U;var N7k=H0Z;N7k+=J8Z;N7k+=u9Z;conf[G3G]=$(j3G)[d14]($[N7k]({id:Editor[u7k](conf[m5Z])},conf[d14]||{}));G9h[G9h.I4Z]();return conf[G3G][X4Z];},canReturnSubmit:function(conf,node){G9h[N8Z]();return D8Z;}});fieldTypes[w7k]=$[V7k](A8Z,{},baseFieldType,{_addOptions:function(conf,opts,append){var Z3G="air";var i3G="placehold";var W3G="placeholder";var J3G="ceho";var m3G="aceholderValue";var H3G="hid";var D3G="placeholderDisabled";var q3G="lder";var a3G="rVal";var K7k=s7Z;K7k+=G9h.F1Z;var L7k=U6U;L7k+=D1Z;L7k+=s7Z;L7k+=u1U;var elOpts=conf[L7k][X4Z][M9I];var countOffset=X4Z;G9h[K7k]();if(!append){var v7k=p5Z;v7k+=p8I;elOpts[v7k]=X4Z;if(conf[W3G]!==undefined){var j7k=u9Z;j7k+=w9Z;var M7k=H3G;M7k+=r1Z;M7k+=D1Z;var s7k=K6U;s7k+=G9h.U1Z;s7k+=J3G;s7k+=q3G;var y7k=i3G;y7k+=G9h.h4Z;y7k+=a3G;y7k+=S94;var p7k=s7Z;p7k+=K1Z;p7k+=m3G;var placeholderValue=conf[p7k]!==undefined?conf[y7k]:U8Z;countOffset+=o4Z;elOpts[X4Z]=new Option(conf[s7k],placeholderValue);var disabled=conf[D3G]!==undefined?conf[D3G]:A8Z;elOpts[X4Z][M7k]=disabled;elOpts[X4Z][j7k]=disabled;elOpts[X4Z][e3G]=placeholderValue;}}else{countOffset=elOpts[m8Z];}if(opts){var W7k=s7Z;W7k+=Z3G;W7k+=i1Z;Editor[W7k](opts,conf[A3G],function(val,label,i,attr){var H7k=s7Z;H7k+=G9h.F1Z;var option=new Option(label,val);option[e3G]=val;G9h[H7k]();if(attr){$(option)[d14](attr);}elOpts[i+countOffset]=option;});}},create:function(conf){var B3G="dO";var C3G="ptio";var b3G="_ad";var Q3G='<select/>';var b7k=B1Z;b7k+=x4U;b7k+=E7Z;b7k+=H1Z;var T7k=L1Z;T7k+=r3G;T7k+=H1Z;T7k+=i1Z;var r7k=G9h.t4Z;r7k+=t14;r7k+=T3G;r7k+=I9Z;var A7k=b3G;A7k+=B3G;A7k+=C3G;A7k+=I9Z;var Z7k=x9Z;Z7k+=K1Z;Z7k+=G9h.h4Z;Z7k+=Z74;var m7k=G9h.t4Z;m7k+=D1Z;var a7k=L1Z;a7k+=u9Z;var i7k=H0Z;i7k+=G9h.h4Z;i7k+=D1Z;i7k+=u9Z;var q7k=q9U;q7k+=H1Z;q7k+=h9Z;var J7k=B1Z;J7k+=S0Z;conf[J7k]=$(Q3G)[q7k]($[i7k]({id:Editor[H64](conf[a7k]),multiple:conf[Y3G]===A8Z},conf[d14]||{}))[m7k](S3G,function(e,d){if(!d||!d[P64]){var e7k=P2Z;e7k+=G9h.h4Z;e7k+=H1Z;var D7k=x9Z;D7k+=p5Z;D7k+=Z74;conf[R3G]=fieldTypes[D7k][e7k](conf);}});fieldTypes[Z7k][A7k](conf,conf[r7k]||conf[T7k]);G9h[G9h.I4Z]();return conf[b7k][X4Z];},update:function(conf,options,append){var f3G="ddOptions";var C7k=s7Z;C7k+=G9h.F1Z;var B7k=p0U;B7k+=f3G;fieldTypes[p3I][B7k](conf,options,append);G9h[C7k]();var lastSet=conf[R3G];if(lastSet!==undefined){var Q7k=i1Z;Q7k+=G9h.h4Z;Q7k+=H1Z;fieldTypes[p3I][Q7k](conf,lastSet,A8Z);}_triggerChange(conf[G3G]);},get:function(conf){var g3G="on:selec";var E3G="ted";var n3G="opti";var k3G="ara";var E7k=p5Z;E7k+=D1Z;E7k+=P2Z;E7k+=q8Z;var R7k=n3G;R7k+=g3G;R7k+=E3G;var S7k=r14;S7k+=D1Z;S7k+=u9Z;var Y7k=B1Z;Y7k+=L1Z;Y7k+=H4G;Y7k+=u1U;var val=conf[Y7k][S7k](R7k)[y24](function(){var n7k=z64;n7k+=N3G;var f7k=G9h.U1Z;f7k+=G9h.F1Z;G9h[f7k]();return this[n7k];})[K8I]();if(conf[Y3G]){var g7k=i1Z;g7k+=h3G;g7k+=k3G;g7k+=q0Z;return conf[I3G]?val[u54](conf[g7k]):val;}return val[E7k]?val[X4Z]:t0Z;},set:function(conf,val,localUpdate){var F0G='option';var U0G="strin";var z0G="tS";var l0G="ol";var G0G="selected";var P0G="_las";var t3G="placeh";var x0G="Ar";var G5k=t3G;G5k+=l0G;G5k+=W1G;var F5k=x8U;F5k+=p9Z;F5k+=G9h.t4Z;F5k+=D1Z;var U5k=U6U;U5k+=D1Z;U5k+=H8Z;U5k+=H1Z;var z5k=r14;z5k+=D1Z;z5k+=u9Z;var P5k=l2U;P5k+=P2Z;P5k+=q8Z;var x5k=L1Z;x5k+=i1Z;x5k+=x0G;x5k+=X8I;var I7k=s64;I7k+=X8I;var h7k=G9h.U1Z;h7k+=G9h.F1Z;G9h[h7k]();if(!localUpdate){var k7k=P0G;k7k+=z0G;k7k+=G9h.h4Z;k7k+=H1Z;conf[k7k]=val;}if(conf[Y3G]&&conf[I3G]&&!$[I7k](val)){var l5k=P6U;l5k+=K1Z;l5k+=L1Z;l5k+=H1Z;var t7k=U0G;t7k+=P2Z;val=typeof val===t7k?val[l5k](conf[I3G]):[];}else if(!$[x5k](val)){val=[val];}var i,len=val[P5k],found,allFound=D8Z;var options=conf[G3G][z5k](F0G);conf[U5k][i94](F5k)[n44](function(){G9h[N8Z]();found=D8Z;for(i=X4Z;i<len;i++){if(this[e3G]==val[i]){found=A8Z;allFound=A8Z;break;}}this[G0G]=found;});if(conf[G5k]&&!allFound&&!conf[Y3G]&&options[m8Z]){options[X4Z][G0G]=A8Z;}if(!localUpdate){var X5k=X0G;X5k+=H1Z;_triggerChange(conf[X5k]);}return allFound;},destroy:function(conf){var o5k=G9h.t4Z;o5k+=V1Z;o5k+=V1Z;G9h[G9h.I4Z]();conf[G3G][o5k](S3G);}});fieldTypes[d5k]=$[O5k](A8Z,{},baseFieldType,{_addOptions:function(conf,opts,append){var o0G="emp";var N5k=B1Z;N5k+=S0Z;var c5k=G9h.U1Z;c5k+=G9h.F1Z;var val,label;G9h[c5k]();var jqInput=conf[N5k];var offset=X4Z;if(!append){var u5k=o0G;u5k+=v7Z;jqInput[u5k]();}else{var V5k=M24;V5k+=q8Z;var w5k=F3G;w5k+=H1Z;offset=$(w5k,jqInput)[V5k];}if(opts){Editor[d0G](opts,conf[A3G],function(val,label,i,attr){var O0G="ditor_val";var w0G="<input id=";var u0G="checkbox\" /";var L0G='<label for="';var N0G="\" type=\"";var v0G='input:last';var j5k=B74;j5k+=O0G;var M5k=C1U;M5k+=G9h.U1Z;M5k+=e3Z;var s5k=L1Z;s5k+=u9Z;var y5k=w3G;y5k+=c0G;var p5k=N0G;p5k+=u0G;p5k+=l3Z;var v5k=u24;v5k+=m8G;var K5k=w0G;K5k+=N3Z;var L5k=x3Z;L5k+=r5Z;L5k+=C1U;L5k+=l3Z;jqInput[R2U](L5k+K5k+Editor[v5k](conf[m5Z])+V0G+(i+offset)+p5k+L0G+Editor[y5k](conf[s5k])+V0G+(i+offset)+Q0Z+label+K0G+g0Z);G9h[G9h.I4Z]();$(v0G,jqInput)[d14](M5k,val)[X4Z][j5k]=val;if(attr){var W5k=G9h.U1Z;W5k+=H1Z;W5k+=H1Z;W5k+=h9Z;$(v0G,jqInput)[W5k](attr);}});}},create:function(conf){var y0G="addOptions";var M0G="iv />";var p0G="ipOpt";var s0G="heckb";var D5k=L0I;D5k+=H8Z;D5k+=H1Z;var m5k=p0G;m5k+=i1Z;var a5k=B1Z;a5k+=y0G;var i5k=v2Z;i5k+=s0G;i5k+=q2U;var q5k=E3Z;q5k+=M0G;var J5k=L0I;J5k+=H8Z;J5k+=H1Z;var H5k=s7Z;H5k+=G9h.F1Z;G9h[H5k]();conf[J5k]=$(q5k);fieldTypes[i5k][a5k](conf,conf[M9I]||conf[m5k]);return conf[D5k][X4Z];},get:function(conf){var H0G="ator";var W0G="separ";var J0G="sep";var j0G="oin";var i0G="unselectedValue";var q0G="input:chec";var a0G="tedValue";var C5k=f3U;C5k+=j0G;var B5k=W0G;B5k+=H0G;var b5k=J0G;b5k+=s2Z;b5k+=H0G;var Z5k=q0G;Z5k+=V8I;Z5k+=u9Z;var e5k=L0I;e5k+=s7Z;e5k+=u1U;var out=[];var selected=conf[e5k][i94](Z5k);if(selected[m8Z]){var A5k=N4U;A5k+=v2Z;A5k+=p2Z;selected[A5k](function(){G9h[G9h.I4Z]();out[v8Z](this[e3G]);});}else if(conf[i0G]!==undefined){var T5k=W4U;T5k+=R6G;T5k+=a0G;var r5k=W7G;r5k+=p2Z;out[r5k](conf[T5k]);}return conf[b5k]===undefined||conf[B5k]===t0Z?out:out[C5k](conf[I3G]);},set:function(conf,val){var D0G="separat";var e0G='|';var k5k=G9h.U1Z;k5k+=G9h.F1Z;var n5k=G9h.h4Z;n5k+=G9h.U1Z;n5k+=K8Z;var f5k=p5Z;f5k+=U1U;f5k+=p2Z;var Y5k=b64;Y5k+=n64;var Q5k=B1Z;Q5k+=L1Z;Q5k+=m0G;Q5k+=H1Z;var jqInputs=conf[Q5k][i94](w1U);if(!$[y3U](val)&&typeof val===Y5k){var R5k=D0G;R5k+=v3U;var S5k=i1Z;S5k+=s04;val=val[S5k](conf[R5k]||e0G);}else if(!$[y3U](val)){val=[val];}var i,len=val[f5k],found;jqInputs[n5k](function(){var Z0G="heck";var A0G="editor_val";var h5k=v2Z;h5k+=Z0G;h5k+=G9h.h4Z;h5k+=u9Z;var g5k=G9h.U1Z;g5k+=G9h.F1Z;found=D8Z;G9h[g5k]();for(i=X4Z;i<len;i++){var E5k=B1Z;E5k+=A0G;if(this[E5k]==val[i]){found=A8Z;break;}}this[h5k]=found;});G9h[k5k]();_triggerChange(jqInputs);},enable:function(conf){var t5k=r5Z;t5k+=u24;t5k+=q9Z;t5k+=w4U;var I5k=U3G;I5k+=u1U;conf[I5k][i94](w1U)[X3G](t5k,D8Z);},disable:function(conf){var P6k=s7Z;P6k+=h9Z;P6k+=G9h.t4Z;P6k+=s7Z;var x6k=L1Z;x6k+=D1Z;x6k+=s7Z;x6k+=u1U;var l6k=s7Z;l6k+=G9h.F1Z;G9h[l6k]();conf[G3G][i94](x6k)[P6k](o3G,A8Z);},update:function(conf,options,append){var r0G="_addOptio";var b0G="ckbox";var G6k=i1Z;G6k+=G9h.h4Z;G6k+=H1Z;var F6k=r0G;F6k+=D1Z;F6k+=i1Z;var U6k=P2Z;U6k+=f6U;var z6k=T0G;z6k+=b0G;var checkbox=fieldTypes[z6k];var currVal=checkbox[U6k](conf);checkbox[F6k](conf,options,append);checkbox[G6k](conf,currVal);}});fieldTypes[X6k]=$[u0Z](A8Z,{},baseFieldType,{_addOptions:function(conf,opts,append){var B0G="ionsPair";var val,label;var jqInput=conf[G3G];var offset=X4Z;if(!append){jqInput[J4G]();}else{offset=$(w1U,jqInput)[m8Z];}if(opts){var o6k=x8U;o6k+=H1Z;o6k+=B0G;Editor[d0G](opts,conf[o6k],function(val,label,i,attr){var E0G='<input id="';var h0G=":l";var n0G="af";var S0G=" for=";var R0G=" type=\"r";var g0G='<div>';var Y0G="<label";var f0G="adio\" name=\"";var C0G="input:";var Q0G="ast";var v6k=C0G;v6k+=K1Z;v6k+=Q0G;var K6k=x3Z;K6k+=G8G;var L6k=L1Z;L6k+=u9Z;var V6k=w3G;V6k+=G9h.h4Z;V6k+=f1U;var w6k=Y0G;w6k+=S0G;w6k+=N3Z;var u6k=F0Z;u6k+=R1Z;var N6k=N3Z;N6k+=R0G;N6k+=f0G;var c6k=i1Z;c6k+=n0G;c6k+=c0G;var O6k=G9h.U1Z;O6k+=c74;O6k+=P44;var d6k=G9h.U1Z;d6k+=G9h.F1Z;G9h[d6k]();jqInput[O6k](g0G+E0G+Editor[c6k](conf[m5Z])+V0G+(i+offset)+N6k+conf[u6k]+s8G+w6k+Editor[V6k](conf[L6k])+V0G+(i+offset)+Q0Z+label+K0G+K6k);$(v6k,jqInput)[d14](V9G,val)[X4Z][e3G]=val;if(attr){var p6k=x4U;p6k+=u1U;p6k+=h0G;p6k+=Q0G;$(p6k,jqInput)[d14](attr);}});}},create:function(conf){var k0G='<div />';var m6k=B1Z;m6k+=i5Z;m6k+=s7Z;m6k+=u1U;var W6k=G9h.t4Z;W6k+=s7Z;W6k+=G9h.h4Z;W6k+=D1Z;var j6k=L1Z;j6k+=r3G;j6k+=R4U;var M6k=x8U;M6k+=P74;var s6k=h9Z;s6k+=Y6G;var y6k=B1Z;y6k+=i5Z;y6k+=u1G;conf[y6k]=$(k0G);fieldTypes[s6k][I0G](conf,conf[M6k]||conf[j6k]);this[X2Z](W6k,function(){var q6k=i5Z;q6k+=H8Z;q6k+=H1Z;var J6k=V1Z;J6k+=O7U;var H6k=U6U;H6k+=m0G;H6k+=H1Z;conf[H6k][J6k](q6k)[n44](function(){var t0G="_preCh";var x4h="ked";var i6k=t0G;i6k+=l4h;if(this[i6k]){var a6k=v2Z;a6k+=U5U;a6k+=v2Z;a6k+=x4h;this[a6k]=A8Z;}});});return conf[m6k][X4Z];},get:function(conf){var P4h=":ch";var A6k=s7Z;A6k+=G9h.F1Z;var Z6k=L1Z;Z6k+=G1G;Z6k+=P4h;Z6k+=l4h;var e6k=z4h;e6k+=u9Z;var D6k=B1Z;D6k+=i5Z;D6k+=H8Z;D6k+=H1Z;var el=conf[D6k][e6k](Z6k);G9h[A6k]();return el[m8Z]?el[X4Z][e3G]:undefined;},set:function(conf,val){var F4h="eck";var U4h="nput:ch";var Y6k=L1Z;Y6k+=U4h;Y6k+=F4h;Y6k+=z2Z;var Q6k=B1Z;Q6k+=x4U;Q6k+=u1U;var r6k=V1Z;r6k+=L1Z;r6k+=D1Z;r6k+=u9Z;G9h[N8Z]();var that=this;conf[G3G][r6k](w1U)[n44](function(){var X4h="_preChecked";var d4h="checked";var o4h="preChec";var G4h="_editor_v";var b6k=G4h;b6k+=M64;var T6k=G9h.U1Z;T6k+=G9h.F1Z;this[X4h]=D8Z;G9h[T6k]();if(this[b6k]==val){var B6k=T0G;B6k+=v2Z;B6k+=J6Z;B6k+=z2Z;this[B6k]=A8Z;this[X4h]=A8Z;}else{var C6k=B1Z;C6k+=o4h;C6k+=V8I;C6k+=u9Z;this[d4h]=D8Z;this[C6k]=D8Z;}});_triggerChange(conf[Q6k][i94](Y6k));},enable:function(conf){var n6k=I94;n6k+=u9Z;var f6k=s7Z;f6k+=F8G;var R6k=L0I;R6k+=H8Z;R6k+=H1Z;var S6k=G9h.U1Z;S6k+=G9h.F1Z;G9h[S6k]();conf[R6k][i94](w1U)[f6k](n6k,D8Z);},disable:function(conf){var E6k=P7Z;E6k+=x8U;var g6k=V1Z;g6k+=i5Z;g6k+=u9Z;conf[G3G][g6k](w1U)[E6k](o3G,A8Z);},update:function(conf,options,append){var O4h='[value="';var x8k=C1U;x8k+=G9h.U1Z;x8k+=f7Z;x8k+=G9h.h4Z;var l8k=G9h.U1Z;l8k+=H1Z;l8k+=i9U;var t6k=p5Z;t6k+=D1Z;t6k+=U2U;var I6k=L1Z;I6k+=H4G;I6k+=u1U;var k6k=z4h;k6k+=u9Z;var h6k=C8U;h6k+=u9Z;h6k+=T3G;var radio=fieldTypes[h6k];var currVal=radio[W9U](conf);radio[I0G](conf,options,append);var inputs=conf[G3G][k6k](I6k);radio[H9U](conf,inputs[g6I](O4h+currVal+L8Z)[t6k]?currVal:inputs[D54](X4Z)[l8k](x8k));}});fieldTypes[s4G]=$[u0Z](A8Z,{},baseFieldType,{create:function(conf){var u4h="ateForm";var w4h="qu";var V4h="eryu";var K4h="eFo";var c4h="nput />";var L4h="Class";var v4h="rmat";var p4h="RFC_2822";var j8k=U6U;j8k+=m0G;j8k+=H1Z;var o8k=G9h.U1Z;o8k+=H1Z;o8k+=H1Z;o8k+=h9Z;var X8k=H1Z;X8k+=H0Z;var G8k=L1Z;G8k+=u9Z;var F8k=i1Z;F8k+=G9h.U1Z;F8k+=m8G;var U8k=t9Z;U8k+=c5Z;U8k+=h1Z;var z8k=C0U;z8k+=h9Z;var P8k=y3G;P8k+=c4h;conf[G3G]=$(P8k)[z8k]($[U8k]({id:Editor[F8k](conf[G8k]),type:X8k},conf[o8k]));if($[N4h]){var c8k=u9Z;c8k+=u4h;c8k+=G9h.U1Z;c8k+=H1Z;var O8k=f3U;O8k+=w4h;O8k+=V4h;O8k+=L1Z;var d8k=G9h.U1Z;d8k+=u9Z;d8k+=u9Z;d8k+=L4h;conf[G3G][d8k](O8k);if(!conf[c8k]){var N8k=r3U;N8k+=K4h;N8k+=v4h;conf[N8k]=$[N4h][p4h];}setTimeout(function(){var M4h='#ui-datepicker-div';var s4h="dateFormat";var y4h="ateImag";var p8k=X2U;p8k+=O1U;var v8k=r5Z;v8k+=i1Z;v8k+=C5Z;var K8k=v2Z;K8k+=i1Z;K8k+=i1Z;var w8k=u9Z;w8k+=y4h;w8k+=G9h.h4Z;var u8k=U6U;u8k+=H4G;u8k+=E7Z;u8k+=H1Z;$(conf[u8k])[N4h]($[u0Z]({dateFormat:conf[s4h],buttonImage:conf[w8k],buttonImageOnly:A8Z,onSelect:function(){var L8k=v2Z;L8k+=a24;L8k+=T8Z;var V8k=G9h.U1Z;V8k+=G9h.F1Z;G9h[V8k]();conf[G3G][p4U]()[L8k]();}},conf[L4U]));$(M4h)[K8k](v8k,p8k);},V4Z);}else{var M8k=u9Z;M8k+=B2Z;var s8k=H1Z;s8k+=e7Z;s8k+=G9h.h4Z;var y8k=q9U;y8k+=i9U;conf[G3G][y8k](s8k,M8k);}return conf[j8k][X4Z];},set:function(conf,val){var W4h='hasDatepicker';var j4h="atepicker";var H4h="ang";var H8k=u9Z;H8k+=j4h;var W8k=s7Z;W8k+=G9h.F1Z;G9h[W8k]();if($[H8k]&&conf[G3G][K4U](W4h)){var i8k=K8Z;i8k+=H4h;i8k+=G9h.h4Z;var q8k=i1Z;q8k+=f6U;q8k+=A1Z;q8k+=B2Z;var J8k=B1Z;J8k+=i5Z;J8k+=u1G;conf[J8k][N4h](q8k,val)[i8k]();}else{var a8k=C1U;a8k+=G9h.U1Z;a8k+=K1Z;$(conf[G3G])[a8k](val);}},enable:function(conf){var q4h="tepicker";var J4h="datep";var m8k=J4h;m8k+=k44;m8k+=O2Z;if($[m8k]){var e8k=J8Z;e8k+=Y3Z;e8k+=K1Z;e8k+=G9h.h4Z;var D8k=M0Z;D8k+=q4h;conf[G3G][D8k](e8k);}else{var Z8k=P7Z;Z8k+=x8U;$(conf[G3G])[Z8k](o3G,D8Z);}},disable:function(conf){var a4h="icker";var i4h="epicker";var A8k=r3U;A8k+=i4h;G9h[N8Z]();if($[A8k]){var b8k=w94;b8k+=i6Z;var T8k=r3U;T8k+=h3G;T8k+=a4h;var r8k=U6U;r8k+=m0G;r8k+=H1Z;conf[r8k][T8k](b8k);}else{$(conf[G3G])[X3G](o3G,A8Z);}},owns:function(conf,node){var m4h="i-datepicker-header";var e4h='div.ui-datepicker';var D4h="paren";var S8k=K1Z;S8k+=G9h.h4Z;S8k+=p8I;var Y8k=E6G;Y8k+=m4h;var Q8k=s7Z;Q8k+=s2Z;Q8k+=J8Z;Q8k+=R4U;var C8k=K1Z;C8k+=p44;var B8k=D4h;B8k+=R4U;return $(node)[B8k](e4h)[C8k]||$(node)[Q8k](Y8k)[S8k]?A8Z:D8Z;}});fieldTypes[R8k]=$[u0Z](A8Z,{},baseFieldType,{create:function(conf){var Z4h="eyInp";var B4h="<inp";var b4h="cker";var r4h="yFormat";var A4h="tet";var C4h="ut />";var X3k=v2Z;X3k+=x1I;var z3k=J6Z;z3k+=Z4h;z3k+=u1U;var P3k=s7Z;P3k+=G9h.F1Z;var l3k=B1Z;l3k+=g04;l3k+=Z4U;var I8k=M0Z;I8k+=A4h;I8k+=D6Z;I8k+=G9h.h4Z;var k8k=I5Z;k8k+=t3Z;k8k+=r4h;var h8k=H0Z;h8k+=G9h.h4Z;h8k+=D1Z;h8k+=u9Z;var E8k=f1Z;E8k+=n1Z;E8k+=K9Z;E8k+=G9h.h4Z;var g8k=T4h;g8k+=b4h;var n8k=q9U;n8k+=i9U;var f8k=B4h;f8k+=C4h;conf[G3G]=$(f8k)[n8k]($[u0Z](A8Z,{id:Editor[H64](conf[m5Z]),type:L3G},conf[d14]));conf[g8k]=new Editor[E8k](conf[G3G],$[h8k]({format:conf[k8k]||conf[P4G],i18n:this[N0Z][I8k],onChange:function(){setTimeout(function(){var t8k=s7Z;t8k+=G9h.F1Z;G9h[t8k]();conf[G3G][I34](z3G);},X4Z);}},conf[L4U]));conf[l3k]=function(){var Q4h="pic";var x3k=B1Z;x3k+=Q4h;x3k+=V8I;x3k+=h9Z;conf[x3k][v24]();};G9h[P3k]();if(conf[z3k]===D8Z){var F3k=G9h.t4Z;F3k+=D1Z;var U3k=U3G;U3k+=u1U;conf[U3k][F3k](Y4h,function(e){var R4h="De";var f4h="lt";var S4h="prevent";var G3k=S4h;G3k+=R4h;G3k+=c0Z;G3k+=f4h;e[G3k]();});}this[X2Z](X3k,conf[n4h]);return conf[G3G][X4Z];},get:function(conf){var g4h="wireFo";var w3k=g4h;w3k+=h9Z;w3k+=v5U;w3k+=H1Z;var u3k=w0I;u3k+=H1Z;var N3k=V1Z;N3k+=v3U;N3k+=K9Z;N3k+=q9U;var c3k=T4h;c3k+=T8Z;c3k+=G9h.h4Z;c3k+=h9Z;var O3k=s7Z;O3k+=G9h.F1Z;var d3k=C1U;d3k+=G9h.U1Z;d3k+=K1Z;var o3k=U3G;o3k+=u1U;let val=conf[o3k][d3k]();G9h[O3k]();let inst=conf[c3k][v2Z];return conf[E4h]&&moment?moment(val,inst[N3k],inst[R4G],inst[h4h])[u3k](conf[w3k]):val;},set:function(conf,val){var K3k=C1U;K3k+=G9h.U1Z;K3k+=K1Z;var L3k=G9h.U1Z;L3k+=G9h.F1Z;var V3k=B1Z;V3k+=W9I;V3k+=v2Z;V3k+=k4h;let inst=conf[V3k][v2Z];G9h[L3k]();conf[I4h][K3k](conf[E4h]&&moment?moment(val,conf[E4h],inst[R4G],inst[h4h])[P4G](inst[P4G]):val);_triggerChange(conf[G3G]);},owns:function(conf,node){var t4h="owns";var v3k=s7Z;v3k+=G9h.F1Z;G9h[v3k]();return conf[I4h][t4h](node);},errorMessage:function(conf,msg){var l1h="orMsg";var y3k=I4U;y3k+=l1h;var p3k=s7Z;p3k+=G9h.F1Z;G9h[p3k]();conf[I4h][y3k](msg);},destroy:function(conf){var x1h="destr";var j3k=x1h;j3k+=a9U;var M3k=v2Z;M3k+=K1Z;M3k+=G9h.t4Z;M3k+=x9Z;var s3k=G9h.t4Z;s3k+=V1Z;s3k+=V1Z;this[s3k](M3k,conf[n4h]);conf[G3G][k6U](Y4h);conf[I4h][j3k]();},minDate:function(conf,min){var H3k=T4h;H3k+=v2Z;H3k+=k4h;var W3k=G9h.U1Z;W3k+=G9h.F1Z;G9h[W3k]();conf[H3k][U6G](min);},maxDate:function(conf,max){var P1h="max";var J3k=s7Z;J3k+=G9h.F1Z;G9h[J3k]();conf[I4h][P1h](max);}});fieldTypes[q3k]=$[u0Z](A8Z,{},baseFieldType,{create:function(conf){var editor=this;var container=_commonUpload(editor,conf,function(val){var z1h="tUplo";var e3k=j94;e3k+=z1h;e3k+=j0U;var D3k=B74;D3k+=Z84;D3k+=H1Z;var m3k=v2Z;m3k+=G9h.U1Z;m3k+=K1Z;m3k+=K1Z;var a3k=E7Z;a3k+=s7Z;a3k+=K1Z;a3k+=a84;var i3k=s7Z;i3k+=G9h.F1Z;G9h[i3k]();Editor[w0Z][a3k][H9U][m3k](editor,conf,val[X4Z]);editor[D3k](e3k,[conf[y0Z],val[X4Z]]);});return container;},get:function(conf){var Z3k=B1Z;Z3k+=K5Z;Z3k+=K1Z;G9h[N8Z]();return conf[Z3k];},set:function(conf,val){var o1h="oFileText";var c1h="clearText";var O1h="noCl";var F1h="rText";var G1h="div.clearValue bu";var d1h='No file';var U1h=".edito";var N1h="oClear";var I3k=c3G;I3k+=M64;var k3k=I64;k3k+=a84;k3k+=U1h;k3k+=h9Z;var h3k=i5Z;h3k+=u1G;var E3k=X0G;E3k+=H1Z;var R3k=x6Z;R3k+=N4U;R3k+=F1h;var S3k=G1h;S3k+=d74;var Y3k=r14;Y3k+=D1Z;Y3k+=u9Z;var r3k=U6U;r3k+=D1Z;r3k+=H8Z;r3k+=H1Z;var A3k=B1Z;A3k+=K5Z;A3k+=K1Z;conf[A3k]=val;var container=conf[r3k];if(conf[M9U]){var b3k=c3G;b3k+=G9h.U1Z;b3k+=K1Z;var T3k=V1Z;T3k+=L1Z;T3k+=D1Z;T3k+=u9Z;var rendered=container[T3k](X1h);if(conf[b3k]){rendered[R9U](conf[M9U](conf[N3G]));}else{var Q3k=h7G;Q3k+=b4I;Q3k+=l3Z;var C3k=D1Z;C3k+=o1h;var B3k=G9h.U1Z;B3k+=c74;B3k+=G9h.h4Z;B3k+=h1Z;rendered[J4G]()[B3k](D2G+(conf[C3k]||d1h)+Q3k);}}var button=container[Y3k](S3k);if(val&&conf[R3k]){var n3k=O1h;n3k+=q5G;var f3k=p2Z;f3k+=H1Z;f3k+=K9Z;f3k+=K1Z;button[f3k](conf[c1h]);container[h4U](n3k);}else{var g3k=D1Z;g3k+=N1h;container[J7U](g3k);}conf[E3k][i94](h3k)[A4I](k3k,[conf[I3k]]);},enable:function(conf){var t3k=s7Z;t3k+=F8G;conf[G3G][i94](w1U)[t3k](o3G,D8Z);conf[a8G]=A8Z;},disable:function(conf){var U0k=B1Z;U0k+=J8Z;U0k+=x3G;var z0k=r5Z;z0k+=u24;z0k+=i6Z;z0k+=u9Z;var P0k=s7Z;P0k+=h9Z;P0k+=G9h.t4Z;P0k+=s7Z;var x0k=r14;x0k+=D1Z;x0k+=u9Z;var l0k=B1Z;l0k+=i5Z;l0k+=u1G;conf[l0k][x0k](w1U)[P0k](z0k,A8Z);G9h[N8Z]();conf[U0k]=D8Z;},canReturnSubmit:function(conf,node){G9h[N8Z]();return D8Z;}});fieldTypes[F0k]=$[u0Z](A8Z,{},baseFieldType,{_showHide:function(conf){var w1h="_container";var V1h='div.limitHide';var u1h="limit";var O0k=B1Z;O0k+=C1U;O0k+=G9h.U1Z;O0k+=K1Z;var d0k=a24;d0k+=E3U;d0k+=H1Z;var o0k=q9Z;o0k+=R5Z;o0k+=T8Z;var X0k=K1Z;X0k+=J8Z;X0k+=P2Z;X0k+=q8Z;var G0k=I5Z;G0k+=t5Z;G9h[G9h.I4Z]();if(!conf[u1h]){return;}conf[w1h][i94](V1h)[g4U](G0k,conf[N3G][X0k]>=conf[u1h]?E4U:o0k);conf[e84]=conf[d0k]-conf[O0k][m8Z];},create:function(conf){var K1h=".rem";var L1h="_con";var M1h='multi';var a0k=L1h;a0k+=j0Z;a0k+=i5Z;a0k+=O2Z;var y0k=Y0U;y0k+=d74;y0k+=K1h;y0k+=E8I;var p0k=x6Z;p0k+=Y3U;p0k+=J6Z;var v0k=G9h.t4Z;v0k+=D1Z;var K0k=A4U;K0k+=t4U;G9h[N8Z]();var editor=this;var container=_commonUpload(editor,conf,function(val){var v1h="stU";var p1h="cat";var y1h="_va";var s1h="uploadMany";var L0k=D1Z;L0k+=G9h.U1Z;L0k+=R1Z;var V0k=T64;V0k+=v1h;V0k+=h7Z;V0k+=j0U;var w0k=c3G;w0k+=G9h.U1Z;w0k+=K1Z;var u0k=i1Z;u0k+=G9h.h4Z;u0k+=H1Z;var N0k=v2Z;N0k+=X2Z;N0k+=p1h;var c0k=y1h;c0k+=K1Z;conf[c0k]=conf[N3G][N0k](val);Editor[w0Z][s1h][u0k][Z64](editor,conf,conf[w0k]);editor[O44](V0k,[conf[L0k],conf[N3G]]);},A8Z);container[K0k](M1h)[v0k](p0k,y0k,function(e){var W1h="Propa";var q1h="ny";var J1h="uploadMa";var H1h="gatio";var j1h="_enabl";var j0k=j1h;j0k+=z2Z;var M0k=G9h.U1Z;M0k+=G9h.F1Z;var s0k=H9I;s0k+=W1h;s0k+=H1h;s0k+=D1Z;e[s0k]();G9h[M0k]();if(conf[j0k]){var i0k=x9Z;i0k+=H1Z;var q0k=J1h;q0k+=q1h;var J0k=c3G;J0k+=M64;var H0k=L1Z;H0k+=u9Z;H0k+=W1Z;var W0k=u9Z;W0k+=v9I;var idx=$(this)[W0k](H0k);conf[J0k][i14](idx,o4Z);Editor[w0Z][q0k][i0k][Z64](editor,conf,conf[N3G]);}});conf[a0k]=container;return container;},get:function(conf){return conf[N3G];},set:function(conf,val){var i1h="upload.";var g1h="pan>";var Z1h="tions must have an ";var D1h="loadMany";var m1h="Hi";var e1h="Upload collec";var r1h="endTo";var a1h="_sho";var n1h="noFileTe";var T1h='<ul/>';var f1h="o f";var A1h="array as a value";var f0k=i1h;f0k+=K9I;f0k+=q0Z;var R0k=U3G;R0k+=E7Z;R0k+=H1Z;var S0k=a1h;S0k+=M5Z;S0k+=m1h;S0k+=r1Z;var Y0k=E7Z;Y0k+=s7Z;Y0k+=D1h;var e0k=u9Z;e0k+=Q6U;var D0k=B1Z;D0k+=i5Z;D0k+=H8Z;D0k+=H1Z;if(!val){val=[];}if(!$[y3U](val)){var m0k=e1h;m0k+=Z1h;m0k+=A1h;throw m0k;}conf[N3G]=val;var that=this;var container=conf[D0k];if(conf[e0k]){var Z0k=V1Z;Z0k+=L1Z;Z0k+=h1Z;var rendered=container[Z0k](X1h)[J4G]();if(val[m8Z]){var A0k=G9h.U1Z;A0k+=s7Z;A0k+=s7Z;A0k+=r1h;var list=$(T1h)[A0k](rendered);$[n44](val,function(i,file){var Y1h='<li>';var B1h=" remove";var S1h=' <button class="';var Q1h="a-idx=\"";var C1h="\" dat";var R1h='</li>';var b1h="\">&times;</";var b0k=b1h;b0k+=T34;b0k+=D1Z;b0k+=l3Z;var T0k=B1h;T0k+=C1h;T0k+=Q1h;var r0k=s7Z;r0k+=G9h.F1Z;G9h[r0k]();list[R2U](Y1h+conf[M9U](file,i)+S1h+that[B4U][l44][s2U]+T0k+i+b0k+R1h);});}else{var Q0k=m14;Q0k+=f1h;Q0k+=m84;var C0k=n1h;C0k+=o54;var B0k=e0I;B0k+=g1h;rendered[R2U](B0k+(conf[C0k]||Q0k)+e2G);}}Editor[w0Z][Y0k][S0k](conf);conf[R0k][i94](w1U)[A4I](f0k,[conf[N3G]]);},enable:function(conf){var E0k=s7Z;E0k+=u5Z;E0k+=s7Z;var g0k=B1Z;g0k+=S0Z;var n0k=G9h.U1Z;n0k+=G9h.F1Z;G9h[n0k]();conf[g0k][i94](w1U)[E0k](o3G,D8Z);conf[a8G]=A8Z;},disable:function(conf){var E1h="isabl";var h0k=u9Z;h0k+=E1h;h0k+=z2Z;conf[G3G][i94](w1U)[X3G](h0k,A8Z);conf[a8G]=D8Z;},canReturnSubmit:function(conf,node){G9h[G9h.I4Z]();return D8Z;}});}());if(DataTable[H0Z][k0k]){var x4Z=z2Z;x4Z+=C9U;x4Z+=G9h.t4Z;x4Z+=h1h;var l4Z=G9h.h4Z;l4Z+=W1Z;l4Z+=H1Z;var t0k=M3U;t0k+=k1h;var I0k=G9h.h4Z;I0k+=W1Z;I0k+=c5Z;I0k+=h1Z;$[I0k](Editor[t0k],DataTable[l4Z][x4Z]);}DataTable[P4Z][z4Z]=Editor[U4Z];Editor[F4Z]={};Editor[i4U][I1h]=u8Z;Editor[M6Z]=G4Z;return Editor;}));

/*! Bootstrap integration for DataTables' Editor
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/*
 * Set the default display controller to be our bootstrap control 
 */
DataTable.Editor.defaults.display = "bootstrap";


/*
 * Alter the buttons that Editor adds to TableTools so they are suitable for bootstrap
 */
var i18nDefaults = DataTable.Editor.defaults.i18n;
i18nDefaults.create.title = '<h5 class="modal-title">'+i18nDefaults.create.title+'</h5>';
i18nDefaults.edit.title = '<h5 class="modal-title">'+i18nDefaults.edit.title+'</h5>';
i18nDefaults.remove.title = '<h5 class="modal-title">'+i18nDefaults.remove.title+'</h5>';

var tt = DataTable.TableTools;
if ( tt ) {
	tt.BUTTONS.editor_create.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_edit.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_remove.formButtons[0].className = "btn btn-danger";
}


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	"header": {
		"wrapper": "DTE_Header modal-header"
	},
	"body": {
		"wrapper": "DTE_Body modal-body"
	},
	"footer": {
		"wrapper": "DTE_Footer modal-footer"
	},
	"form": {
		"tag": "form-horizontal",
		"button": "btn",
		"buttonInternal": "btn btn-outline-secondary"
	},
	"field": {
		"wrapper": "DTE_Field form-group row",
		"label":   "col-lg-4 col-form-label",
		"input":   "col-lg-8",
		"error":   "error is-invalid",
		"msg-labelInfo": "form-text text-secondary small",
		"msg-info":      "form-text text-secondary small",
		"msg-message":   "form-text text-secondary small",
		"msg-error":     "form-text text-danger small",
		"multiValue":    "card multi-value",
		"multiInfo":     "small",
		"multiRestore":  "card multi-restore"
	}
} );

$.extend( true, DataTable.ext.buttons, {
	create: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	edit: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	remove: {
		formButtons: {
			className: 'btn-danger'
		}
	}
} );


/*
 * Bootstrap display controller - this is effectively a proxy to the Bootstrap
 * modal control.
 */

DataTable.Editor.display.bootstrap = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		var conf = {
			// Note that `modal-dialog-scrollable` is BS4.3+ only. It has no effect on 4.0-4.2
			content: $(
				'<div class="modal fade DTED">'+
					'<div class="modal-dialog modal-dialog-scrollable" />'+
				'</div>'
			),
			close: $('<button class="close">&times;</div>')
				.on('click', function () {
					dte.close('icon');
				}),
			shown: false,
			fullyShow: false
		}

		// This is a bit horrible, but if you mousedown and then drag out of the modal container, we don't
		// want to trigger a background action.
		var allowBackgroundClick = false;
		$(document).on('mousedown', 'div.modal', function (e) {
			allowBackgroundClick = $(e.target).hasClass('modal') && conf.shown
				? true
				: false;
		} );

		$(document).on('click', 'div.modal', function (e) {
			if ( $(e.target).hasClass('modal') && allowBackgroundClick ) {
				dte.background();
			}
		} );

		// Add `form-control` to required elements
		dte.on( 'displayOrder.dtebs', function ( e, display, action, form ) {
			$.each( dte.s.fields, function ( key, field ) {
				$('input:not([type=checkbox]):not([type=radio]), select, textarea', field.node() )
					.addClass( 'form-control' );
			} );
		} );

		dte._bootstrapDisplay = conf;

		return DataTable.Editor.display.bootstrap;
	},

	"open": function ( dte, append, callback ) {
		var conf = dte._bootstrapDisplay;

		$(append).addClass('modal-content');

		if ( conf._shown ) {
			// Modal already up, so just draw in the new content
			var content = conf.content.find('div.modal-dialog');
			content.children().detach();
			content.append( append );

			if ( callback ) {
				callback();
			}
			return;
		}

		conf.shown = true;
		conf.fullyDisplayed = false;

		var content = conf.content.find('div.modal-dialog');
		content.children().detach();
		content.append( append );

		$('div.modal-header', append).append( conf.close );

		$(conf.content)
			.one('shown.bs.modal', function () {
				// Can only give elements focus when shown
				if ( dte.s.setFocus ) {
					dte.s.setFocus.focus();
				}

				conf.fullyDisplayed = true;

				if ( callback ) {
					callback();
				}
			})
			.one('hidden', function () {
				conf.shown = false;
			})
			.appendTo( 'body' )
			.modal( {
				backdrop: "static",
				keyboard: false
			} );
	},

	"close": function ( dte, callback ) {
		var conf = dte._bootstrapDisplay;

		if ( !conf.shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// Check if actually displayed or not before hiding. BS4 doesn't like `hide`
		// before it has been fully displayed
		if ( ! conf.fullyDisplayed ) {
			$(conf.content)
				.one('shown.bs.modal', function () {
					conf.close( dte, callback );
				} );

			return;
		}

		$(conf.content)
			.one( 'hidden.bs.modal', function () {
				$(this).detach();
			} )
			.modal('hide');

		conf.shown = false;
		conf.fullyDisplayed = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return dte._bootstrapDisplay.content[0];
	}
} );


return DataTable.Editor;
}));


