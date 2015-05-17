/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

 /*
 * # Semantic UI - 1.8.1
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,t,n,i){e.site=e.fn.site=function(o){var a,r,s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),f=e.isPlainObject(o)?e.extend(!0,{},e.site.settings,o):e.extend({},e.site.settings),m=f.namespace,g=f.error,p="module-"+m,v=e(n),h=v,b=this,y=h.data(p);return a={initialize:function(){a.instantiate()},instantiate:function(){a.verbose("Storing instance of site",a),y=a,h.data(p,a)},normalize:function(){a.fix.console(),a.fix.requestAnimationFrame()},fix:{console:function(){a.debug("Normalizing window.console"),(console===i||console.log===i)&&(a.verbose("Console not available, normalizing events"),a.disable.console()),("undefined"==typeof console.group||"undefined"==typeof console.groupEnd||"undefined"==typeof console.groupCollapsed)&&(a.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),"undefined"==typeof console.markTimeline&&(a.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){a.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){a.debug("Normalizing requestAnimationFrame"),t.requestAnimationFrame===i&&(a.debug("RequestAnimationFrame not available, normailizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return e.fn[t]!==i&&e.fn[t].settings!==i},enabled:{modules:function(t){var n=[];return t=t||f.modules,e.each(t,function(e,t){a.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||f.modules,e.each(t,function(e,t){a.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,o,r){o="string"==typeof o?"all"===o?f.modules:[o]:o||f.modules,r=r!==i?r:!0,e.each(o,function(i,o){var s,c=a.moduleExists(o)?e.fn[o].settings.namespace||!1:!0;a.moduleExists(o)&&(a.verbose("Changing default setting",t,n,o),e.fn[o].settings[t]=n,r&&c&&(s=e(":data(module-"+c+")"),s.length>0&&(a.verbose("Modifying existing settings",s),s[o]("setting",t,n))))})},settings:function(t,n,o){n="string"==typeof n?[n]:n||f.modules,o=o!==i?o:!0,e.each(n,function(n,i){var r;a.moduleExists(i)&&(a.verbose("Changing default setting",t,i),e.extend(!0,e.fn[i].settings,t),o&&m&&(r=e(":data(module-"+m+")"),r.length>0&&(a.verbose("Modifying existing settings",r),r[i]("setting",t))))})}},enable:{console:function(){a.console(!0)},debug:function(e,t){e=e||f.modules,a.debug("Enabling debug for modules",e),a.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||f.modules,a.debug("Enabling verbose debug for modules",e),a.change.setting("verbose",!0,e,t)}},disable:{console:function(){a.console(!1)},debug:function(e,t){e=e||f.modules,a.debug("Disabling debug for modules",e),a.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||f.modules,a.debug("Disabling verbose debug for modules",e),a.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(y.cache.console===i)return void a.error(g.console);a.debug("Restoring console function"),t.console=y.cache.console}else a.debug("Disabling console function"),y.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){a.verbose("Destroying previous site for",h),h.removeData(p)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){f.debug&&(f.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,f.name+":"),a.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,f.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Element:b,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var s,c,l,u=y;return n=n||d,o=b||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(r)?r.push(l):r!==i?r=[r,l]:l!==i&&(r=l),c}},u?(y===i&&a.initialize(),a.invoke(l)):(y!==i&&a.destroy(),a.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!0,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","video","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,f=s.className,m=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),h=[],b=arguments[0],y="string"==typeof b,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),T=(e(this).find(d.prompt),e(this).find(d.submit)),k=e(this).find(d.clear),S=e(this).find(d.reset),A=[],P=!1,E=this,F=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.set.defaults(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),F=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",F),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+m,t.event.field.keydown),o.on("submit"+m,t.validate.form),l.on("blur"+m,t.event.field.blur),t.attachEvents(T,"submit"),t.attachEvents(S,"reset"),t.attachEvents(k,"clear"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+m,t.event.field.change)})},clear:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(f.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(f.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("clear")):s?i.checkbox("uncheck"):(t.verbose("Resetting field value",n,r),n.val(""))})},reset:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(f.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(f.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("restore defaults")):s?(t.verbose("Resetting checkbox value",i,r),i.checkbox(r===!0?"check":"uncheck")):(t.verbose("Resetting field value",n,r),n.val(r))})},removeEvents:function(){o.off(m),l.off(m),T.off(m),l.off(m)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).length>0&&(T.addClass(f.pressed),P||(i.one("keyup"+m,t.event.field.keyup),t.submit(),t.debug("Enter pressed on input submitting form")),P=!0)},keyup:function(){P=!1,T.removeClass(f.pressed)},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(f.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(f.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e||"hidden"==e?"change":t.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).length>0?l.filter("#"+n):l.filter('[name="'+n+'"]').length>0?l.filter('[name="'+n+'"]'):l.filter("[data-"+u.validate+'="'+n+'"]').length>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1},value:function(e){var n,i=[];return i.push(e),n=t.get.values.call(E,i),n[e]},values:function(n){var i={};return e.isArray(n)||(n=l),e.each(n,function(n,o){var a="string"==typeof o?t.get.field(o):e(o),r=(a.prop("type"),a.prop("name")),s=a.val(),c=a.is(d.checkbox),l=a.is(d.radio),u=c?a.is(":checked"):!1;if(r)if(l)u&&(i[r]=s);else if(c){if(!u)return t.debug("Omitted unchecked checkbox",a),!0;i[r]=!0}else i[r]=s}),i}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).length>0?!0:l.filter('[name="'+e+'"]').length>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.children(d.prompt),u=0!==l.length;a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(f.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.children(d.prompt);r.removeClass(f.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(f.error).addClass(f.success)},defaults:function(){l.each(function(){var t=e(this),n=t.filter(d.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(u.defaultValue,i)})},error:function(){o.removeClass(f.success).addClass(f.error)},value:function(e,n){var i={};return i[e]=n,t.set.values.call(E,i)},values:function(n){e.isEmptyObject(n)||(e.each(n,function(e,n){var i=t.get.field(e),o=i.parent(),a=o.is(d.uiCheckbox),r=o.is(d.uiDropdown),s=i.is(d.radio),c=i.length>0;c&&(s&&a?(t.verbose("Selecting radio value",n,i),i.filter('[value="'+n+'"]').parent(d.uiCheckbox).checkbox("check")):a?(t.verbose("Setting checkbox value",n,o),o.checkbox(n===!0?"check":"uncheck")):r?(t.verbose("Setting dropdown value",n,o),o.dropdown("set selected",n)):(t.verbose("Setting field value",n,i),i.val(n)))}),t.validate.form())}},validate:{form:function(n){var a=!0;return P?!1:(A=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),s.onSuccess.call(E,n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(A),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),s.onFailure.call(E,A)))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return o.prop("disabled")?(t.debug("Field is disabled. Skipping",n.identifier),a=!0):n.optional&&""===e.trim(o.val())?(t.debug("Field is optional and empty. Skipping",n.identifier),a=!0):n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),s.onValid.call(o),!0):(A=A.concat(r),t.add.prompt(n.identifier,r),s.onInvalid.call(o,r),!1)},rule:function(n,o){var a,r,c=t.get.field(n.identifier),l=o.type,u=e.trim(c.val()+""),d=/\[(.*)\]/i,f=d.exec(l),m=!0;return f!==i&&null!==f?(a=""+f[1],r=l.replace(f[0],""),m=s.rules[r].call(E,u,a)):m=s.rules[l].call(c,u),m}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(h,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.length>1&&(n+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&h.length>0&&(console.groupCollapsed(n),console.table?console.table(h):e.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||x,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(F===i&&t.initialize(),t.invoke(b)):(F!==i&&t.destroy(),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:".reset",submit:".submit",uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").length>0},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(t)},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},empty:function(e){return!(e===i||""===e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)},is:function(e,t){return e==t},length:function(e,t){return e!==i?e.length>=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).length>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').length>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').length>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},not:function(e,t){return e!=t},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.accordion=function(n){{var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var d,f,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),g=m.className,p=m.namespace,v=m.selector,h=m.error,b="."+p,y="module-"+p,x=a.selector||"",w=e(this),C=w.find(v.title),T=w.find(v.content),k=this,S=w.data(y);f={initialize:function(){f.debug("Initializing accordion with bound events",w),w.on("click"+b,v.title,f.event.click),f.observeChanges(),f.instantiate()},instantiate:function(){S=f,w.data(y,f)},destroy:function(){f.debug("Destroying previous accordion for",w),w.removeData(y),C.off(b)},refresh:function(){C=w.find(v.title),T=w.find(v.content)},observeChanges:function(){"MutationObserver"in t&&(d=new MutationObserver(function(){f.debug("DOM tree modified, updating selector cache"),f.refresh()}),d.observe(k,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",d))},event:{click:function(){f.toggle.call(this)}},toggle:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(T),a=o.is(":visible");f.debug("Toggling visibility of content",n),a?m.collapsible?f.close.call(n):f.debug("Cannot close accordion content collapsing is disabled"):f.open.call(n)},open:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(T),a=o.is(":animated"),r=o.hasClass(g.active);a||r||(f.debug("Opening accordion content",n),m.exclusive&&f.closeOthers.call(n),n.addClass(g.active),m.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?o.children().transition({animation:"fade in",useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):o.children().stop().animate({opacity:1},m.duration,f.resetOpacity)),o.stop().slideDown(m.duration,m.easing,function(){o.addClass(g.active),f.reset.display.call(this),m.onOpen.call(this),m.onChange.call(this)}))},close:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(T),a=o.hasClass(g.active);a&&(f.debug("Closing accordion content",o),n.removeClass(g.active),o.removeClass(g.active).show(),m.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?o.children().transition({animation:"fade out",useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):o.children().stop().animate({opacity:0},m.duration,f.resetOpacity)),o.stop().slideUp(m.duration,m.easing,function(){f.reset.display.call(this),m.onClose.call(this),m.onChange.call(this)}))},closeOthers:function(t){var n,o,a,r=t!==i?C.eq(t):e(this),s=r.parents(v.content).prev(v.title),c=r.closest(v.accordion),l=v.title+"."+g.active+":visible",u=v.content+"."+g.active+":visible";m.closeNested?(n=c.find(l).not(s),a=n.next(T)):(n=c.find(l).not(s),o=c.find(u).find(l).not(s),n=n.not(o),a=n.next(T)),n.length>0&&(f.debug("Exclusive enabled, closing other content",n),n.removeClass(g.active),m.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):a.children().stop().animate({opacity:0},m.duration,f.resetOpacity)),a.stop().slideUp(m.duration,m.easing,function(){e(this).removeClass(g.active),f.reset.display.call(this)}))},reset:{display:function(){f.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){f.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){return f.debug("Changing internal",t,n),n===i?f[t]:void(e.isPlainObject(t)?e.extend(!0,f,t):f[t]=n)},debug:function(){m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||u,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},l?(S===i&&f.initialize(),f.invoke(c)):(S!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",debug:!1,verbose:!0,performance:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:500,easing:"easeOutQuint",onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active"},selector:{accordion:".accordion",title:".title",content:".content"}},e.extend(e.easing,{easeOutQuint:function(e,t,n,i,o){return i*((t=t/o-1)*t*t*t*t+1)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.checkbox=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m=e.extend(!0,{},e.fn.checkbox.settings,n),g=m.className,p=m.namespace,v=m.selector,h=m.error,b="."+p,y="module-"+p,x=e(this),w=e(this).find(v.label).first(),C=e(this).find(v.input),T=x.data(y),k=this;f={initialize:function(){f.verbose("Initializing checkbox",m),f.create.label(),f.add.events(),f.is.checked()?(f.set.checked(),m.fireOnInit&&m.onChecked.call(C.get())):(f.remove.checked(),m.fireOnInit&&m.onUnchecked.call(C.get())),f.observeChanges(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),T=f,x.data(y,f)},destroy:function(){f.verbose("Destroying module"),f.remove.events(),x.removeData(y)},refresh:function(){x=e(this),w=e(this).find(v.label).first(),C=e(this).find(v.input)},observeChanges:function(){"MutationObserver"in t&&(a=new MutationObserver(function(){f.debug("DOM tree modified, updating selector cache"),f.refresh()}),a.observe(k,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",a))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(f[n])?f[n]:f.toggle,i.length>0?(f.debug("Attaching checkbox events to element",t,n),i.on("click"+b,n)):f.error(h.notFound)},event:{keydown:function(e){var t=e.which,n={enter:13,space:32,escape:27};t==n.escape&&(f.verbose("Escape key pressed blurring field"),x.blur()),e.ctrlKey||t!=n.enter&&t!=n.space||(f.verbose("Enter key pressed, toggling checkbox"),f.toggle.call(this),e.preventDefault())}},is:{radio:function(){return x.hasClass(g.radio)},checked:function(){return C.prop("checked")!==i&&C.prop("checked")},unchecked:function(){return!f.is.checked()}},can:{change:function(){return!(x.hasClass(g.disabled)||x.hasClass(g.readOnly)||C.prop("disabled"))},uncheck:function(){return"boolean"==typeof m.uncheckable?m.uncheckable:!f.is.radio()}},set:{checked:function(){x.addClass(g.checked)},tab:function(){C.attr("tabindex")===i&&C.attr("tabindex",0)}},create:{label:function(){C.prevAll(v.label).length>0?(C.prev(v.label).detach().insertAfter(C),f.debug("Moving existing label",w)):f.has.label()||(w=e("<label>").insertAfter(C),f.debug("Creating label",w))}},has:{label:function(){return w.length>0}},add:{events:function(){f.verbose("Attaching checkbox events"),x.on("click"+b,f.toggle).on("keydown"+b,v.input,f.event.keydown)}},remove:{checked:function(){x.removeClass(g.checked)},events:function(){f.debug("Removing events"),x.off(b).removeData(y),C.off(b,f.event.keydown),w.off(b)}},enable:function(){f.debug("Enabling checkbox functionality"),x.removeClass(g.disabled),C.prop("disabled",!1),m.onEnabled.call(C.get())},disable:function(){f.debug("Disabling checkbox functionality"),x.addClass(g.disabled),C.prop("disabled","disabled"),m.onDisabled.call(C.get())},check:function(){f.debug("Enabling checkbox",C),C.prop("checked",!0).trigger("change"),f.set.checked(),m.onChange.call(C.get()),m.onChecked.call(C.get())},uncheck:function(){f.debug("Disabling checkbox"),C.prop("checked",!1).trigger("change"),f.remove.checked(),m.onChange.call(C.get()),m.onUnchecked.call(C.get())},toggle:function(){return f.can.change()?(f.verbose("Determining new checkbox state"),void(f.is.unchecked()?f.check():f.is.checked()&&f.can.uncheck()&&f.uncheck())):(console.log(f.can.change()),void f.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||d,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(T===i&&f.initialize(),f.invoke(l)):(T!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!0,onChange:function(){},onChecked:function(){},onUnchecked:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",disabled:"disabled",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{input:'input[type="checkbox"], input[type="radio"]',label:"label"}}}(jQuery,window,document),function(e,t,n,i){e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return a.each(function(){var d,f,m,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,v=g.namespace,h=g.className,b=g.error,y="."+v,x="module-"+v,w=a.selector||"",C="ontouchstart"in n.documentElement?"touchstart":"click",T=e(this),k=this,S=T.data(x);m={preinitialize:function(){m.is.dimmer()?(f=T.parent(),d=T):(f=T,d=m.has.dimmer()?g.dimmerName?f.children(p.dimmer).filter("."+g.dimmerName):f.children(p.dimmer):m.create())},initialize:function(){m.debug("Initializing dimmer",g),"hover"==g.on?f.on("mouseenter"+y,m.show).on("mouseleave"+y,m.hide):"click"==g.on&&f.on(C+y,m.toggle),m.is.page()&&(m.debug("Setting as a page dimmer",f),m.set.pageDimmer()),m.is.closable()&&(m.verbose("Adding dimmer close event",d),d.on(C+y,m.event.click)),m.set.dimmable(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),S=m,T.data(x,S)},destroy:function(){m.verbose("Destroying previous module",d),T.removeData(x),f.off(y),d.off(y)},event:{click:function(t){m.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).length||e(t.target).is(p.content))&&(m.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);m.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.variation&&(m.debug("Creating dimmer with variation",g.variation),t.addClass(h.variation)),g.dimmerName&&(m.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(f),t},show:function(t){t=e.isFunction(t)?t:function(){},m.debug("Showing dimmer",d,g),m.is.dimmed()&&!m.is.animating()||!m.is.enabled()?m.debug("Dimmer is already shown or disabled"):(m.animate.show(t),g.onShow.call(k),g.onChange.call(k))},hide:function(t){t=e.isFunction(t)?t:function(){},m.is.dimmed()||m.is.animating()?(m.debug("Hiding dimmer",d),m.animate.hide(t),g.onHide.call(k),g.onChange.call(k)):m.debug("Dimmer is not visible")
},toggle:function(){m.verbose("Toggling dimmer visibility",d),m.is.dimmed()?m.hide():m.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?d.transition({animation:g.transition+" in",queue:!1,duration:m.get.duration(),onStart:function(){m.set.dimmed()},onComplete:function(){m.set.active(),t()}}):(m.verbose("Showing dimmer animation with javascript"),m.set.dimmed(),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(m.get.duration(),1,function(){d.removeAttr("style"),m.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(m.verbose("Hiding dimmer with css"),d.transition({animation:g.transition+" out",queue:!1,duration:m.get.duration(),onStart:function(){m.remove.dimmed()},onComplete:function(){m.remove.active(),t()}})):(m.verbose("Hiding dimmer with javascript"),m.remove.dimmed(),d.stop().fadeOut(m.get.duration(),function(){m.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?m.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?T.children(p.dimmer).filter("."+g.dimmerName).length>0:T.children(p.dimmer).length>0}},is:{active:function(){return d.hasClass(h.active)},animating:function(){return d.is(":animated")||d.hasClass(h.animating)},closable:function(){return"auto"==g.closable?"hover"==g.on?!1:!0:g.closable},dimmer:function(){return T.is(p.dimmer)},dimmable:function(){return T.is(p.dimmable)},dimmed:function(){return f.hasClass(h.dimmed)},disabled:function(){return f.hasClass(h.disabled)},enabled:function(){return!m.is.disabled()},page:function(){return f.is("body")},pageDimmer:function(){return d.hasClass(h.pageDimmer)}},can:{show:function(){return!d.hasClass(h.disabled)}},set:{active:function(){d.addClass(h.active)},dimmable:function(){f.addClass(h.dimmable)},dimmed:function(){f.addClass(h.dimmed)},pageDimmer:function(){d.addClass(h.pageDimmer)},disabled:function(){d.addClass(h.disabled)}},remove:{active:function(){d.removeClass(h.active)},dimmed:function(){f.removeClass(h.dimmed)},disabled:function(){d.removeClass(h.disabled)}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",w&&(t+=" '"+w+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||u,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},m.preinitialize(),l?(S===i&&m.initialize(),m.invoke(c)):(S!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",debug:!1,verbose:!0,performance:!0,dimmerName:!1,variation:!1,closable:"auto",transition:"fade",useCSS:!0,on:!1,duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},selector:{dimmable:".dimmable",dimmer:".ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],f=arguments[0],m="string"==typeof f,g=[].slice.call(arguments,1);return r.each(function(){var p,v,h,b,y=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),x=y.className,w=y.metadata,C=y.namespace,T=y.selector,k=y.error,S="."+C,A="module-"+C,P=e(this),E=P.find(T.text),F=P.find(T.search),R=P.find(T.input),D=P.prev().find(T.text).length>0?P.prev().find(T.text):P.prev(),O=P.children(T.menu),z=O.find(T.item),j=!1,q=!1,N=this,I=P.data(A);b={initialize:function(){b.debug("Initializing dropdown",y),b.is.alreadySetup()?b.error(k.alreadySetup):b.setup.layout(),b.save.defaults(),b.set.selected(),b.create.id(),l&&b.bind.touchEvents(),b.bind.mouseEvents(),b.bind.keyboardEvents(),b.observeChanges(),b.instantiate()},instantiate:function(){b.verbose("Storing instance of dropdown",b),I=b,P.data(A,b)},destroy:function(){b.verbose("Destroying previous dropdown for",P),b.remove.tabbable(),P.off(S).removeData(A),O.off(S),s.off(p)},observeChanges:function(){"MutationObserver"in t&&(h=new MutationObserver(function(e){b.is.selectMutation(e)?(b.debug("<select> modified, recreating menu"),b.setup.select()):(b.debug("DOM tree modified, updating selector cache"),b.refresh())}),h.observe(N,{childList:!0,subtree:!0}),b.debug("Setting up mutation observer",h))},create:{id:function(){b.verbose("Creating unique id for element"),v=b.get.uniqueID(),p="."+v}},search:function(){var e;e=F.val(),b.verbose("Searching for query",e),b.filter(e),b.is.searchSelection()&&b.can.show()&&b.show()},setup:{layout:function(){P.is("select")&&b.setup.select(),b.is.search()&&!b.is.searchable()&&(F=e("<input />").addClass(x.search).insertBefore(E)),y.allowTab&&b.set.tabbable()},select:function(){var t=b.get.selectValues();b.debug("Dropdown initialized on a select",t),P.is("select")&&(R=P),R.parent(T.dropdown).length>0?(b.debug("UI dropdown already exists. Creating dropdown menu only"),P=R.closest(T.dropdown),O=P.children(T.menu),0===O.length&&(O=e("<div />").addClass(x.menu).appendTo(P)),O.html(y.templates.menu(t))):(b.debug("Creating entire dropdown from select"),P=e("<div />").attr("class",R.attr("class")).addClass(x.selection).addClass(x.dropdown).html(y.templates.dropdown(t)).insertBefore(R),R.removeAttr("class").prependTo(P)),b.refresh()}},refresh:function(){b.verbose("Refreshing selector cache"),E=P.find(T.text),F=P.find(T.search),R=P.find(T.input),D=P.prev().find(T.text).length>0?P.prev().find(T.text):P.prev(),O=P.children(T.menu),z=O.find(T.item)},toggle:function(){b.verbose("Toggling menu visibility"),b.is.active()?b.hide():b.show()},show:function(t){t=e.isFunction(t)?t:function(){},b.is.searchSelection()&&b.is.allFiltered()||b.can.show()&&!b.is.active()&&(b.debug("Showing dropdown"),b.animate.show(function(){b.can.click()&&b.bind.intent(),b.set.visible(),t.call(N)}),y.onShow.call(N))},hide:function(t){t=e.isFunction(t)?t:function(){},b.is.active()&&(b.debug("Hiding dropdown"),b.animate.hide(function(){b.remove.visible(),t.call(N)}),y.onHide.call(N))},hideOthers:function(){b.verbose("Finding other dropdowns to hide"),r.not(P).has(T.menu+":visible:not(."+x.animating+")").dropdown("hide")},hideSubMenus:function(){var e=O.find(T.menu);e.transition("hide")},bind:{keyboardEvents:function(){b.debug("Binding keyboard events"),P.on("keydown"+S,b.event.keydown),b.is.searchable()&&P.on(b.get.inputEvent(),T.search,b.event.input)},touchEvents:function(){b.debug("Touch device detected binding additional touch events"),b.is.searchSelection()||P.on("touchstart"+S,b.event.test.toggle),O.on("touchstart"+S,T.item,b.event.item.mouseenter)},mouseEvents:function(){b.verbose("Mouse detected binding mouse events"),b.is.searchSelection()?P.on("mousedown"+S,T.menu,b.event.menu.activate).on("mouseup"+S,T.menu,b.event.menu.deactivate).on("click"+S,T.search,b.show).on("focus"+S,T.search,b.event.searchFocus).on("blur"+S,T.search,b.event.searchBlur).on("click"+S,T.text,b.event.searchTextFocus):("click"==y.on?P.on("click"+S,b.event.test.toggle):"hover"==y.on?P.on("mouseenter"+S,b.delay.show).on("mouseleave"+S,b.delay.hide):P.on(y.on+S,b.toggle),P.on("mousedown"+S,b.event.mousedown).on("mouseup"+S,b.event.mouseup).on("focus"+S,b.event.focus).on("blur"+S,b.event.blur)),O.on("mouseenter"+S,T.item,b.event.item.mouseenter).on("mouseleave"+S,T.item,b.event.item.mouseleave).on("click"+S,T.item,b.event.item.click)},intent:function(){b.verbose("Binding hide intent event to document"),l&&s.on("touchstart"+p,b.event.test.touch).on("touchmove"+p,b.event.test.touch),s.on("click"+p,b.event.test.hide)}},unbind:{intent:function(){b.verbose("Removing hide intent event from document"),l&&s.off("touchstart"+p).off("touchmove"+p),s.off("click"+p)}},filter:function(t){var n=e(),i=b.escape.regExp(t),o=new RegExp("^"+i,"igm"),a=new RegExp(i,"ig");b.verbose("Searching for matching values"),z.each(function(){var t=e(this),i=String(b.get.choiceText(t,!1)),r=String(b.get.choiceValue(t,i));i.match(o)||r.match(o)?n=n.add(t):y.fullTextSearch&&(i.match(a)||r.match(a))&&(n=n.add(t))}),b.debug("Setting filter",t),b.remove.filteredItem(),z.not(n).addClass(x.filtered),b.verbose("Selecting first non-filtered element"),b.remove.selectedItem(),z.not("."+x.filtered).eq(0).addClass(x.selected),b.is.allFiltered()&&(b.debug("All items filtered, hiding dropdown",t),b.is.searchSelection()&&b.hide(),y.onNoResults.call(N,t))},focusSearch:function(){b.is.search()&&F.focus()},event:{mousedown:function(){j=!0},mouseup:function(){j=!1},focus:function(){!j&&b.is.hidden()&&b.show()},blur:function(){var e=n.activeElement===this;j||e||b.hide()},searchFocus:function(){j=!0,b.show()},searchBlur:function(){var e=n.activeElement===this;q||e||b.hide()},searchTextFocus:function(){j=!0,F.focus()},input:function(){b.is.searchSelection()&&b.set.filtered(),clearTimeout(b.timer),b.timer=setTimeout(b.search,y.delay.search)},keydown:function(e){{var t,n=z.not(x.filtered).filter("."+x.selected).eq(0),i=O.children("."+x.active).eq(0),o=n.length>0?n:i,a=o.length>0?o.siblings(":not(."+x.filtered+")").andSelf():O.children(":not(."+x.filtered+")"),r=o.children(T.menu),s=o.closest(T.menu),c=s[0]!==O[0],l=s.is(":visible"),u=e.which,d={enter:13,escape:27,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},f=r.length>0,m=o.length>0;a.size()-1}if(b.is.visible()){if(u==d.enter&&m&&(f&&!y.allowCategorySelection?(b.verbose("Pressed enter on unselectable category, opening sub menu"),u=d.rightArrow):(b.verbose("Enter key pressed, choosing selected item"),b.event.item.click.call(o,e))),u==d.leftArrow&&(c&&(b.verbose("Left key pressed, closing sub-menu"),b.animate.hide(!1,s),o.removeClass(x.selected),s.closest(T.item).addClass(x.selected)),e.preventDefault()),u==d.rightArrow&&(f&&(b.verbose("Right key pressed, opening sub-menu"),b.animate.show(!1,r),o.removeClass(x.selected),r.find(T.item).eq(0).addClass(x.selected)),e.preventDefault()),u==d.upArrow){if(t=m&&l?o.prevAll(T.item+":not(."+x.filtered+")").eq(0):z.eq(0),a.index(t)<0)return void b.verbose("Up key pressed but reached top of current menu");b.verbose("Up key pressed, changing active item"),o.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}if(u==d.downArrow){if(t=m&&l?t=o.nextAll(T.item+":not(."+x.filtered+")").eq(0):z.eq(0),0===t.length)return void b.verbose("Down key pressed but reached bottom of current menu");b.verbose("Down key pressed, changing active item"),z.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}}else u==d.enter&&(b.verbose("Enter key pressed, showing dropdown"),b.show()),u==d.escape&&(b.verbose("Escape key pressed, closing dropdown"),b.hide()),u==d.downArrow&&(b.verbose("Down key pressed, showing dropdown"),b.show())},test:{toggle:function(e){b.determine.eventInMenu(e,b.toggle)&&e.preventDefault()},touch:function(e){b.determine.eventInMenu(e,function(){"touchstart"==e.type?b.timer=setTimeout(b.hide,y.delay.touch):"touchmove"==e.type&&clearTimeout(b.timer)}),e.stopPropagation()},hide:function(e){b.determine.eventInModule(e,b.hide)}},menu:{activate:function(){q=!0},deactivate:function(){q=!1}},item:{mouseenter:function(t){var n=e(this).children(T.menu),i=e(this).siblings(T.item).children(T.menu);n.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Showing sub-menu",n),e.each(i,function(){b.animate.hide(!1,e(this))}),b.animate.show(!1,n)},y.delay.show),t.preventDefault())},mouseleave:function(){var t=e(this).children(T.menu);t.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Hiding sub-menu",t),b.animate.hide(!1,t)},y.delay.hide))},click:function(t){var n=e(this),i=e(t.target),o=n.find(T.menu),a=b.get.choiceText(n),r=b.get.choiceValue(n,a),s=function(){b.remove.searchTerm(),b.determine.selectAction(a,r)},c=o.length>0,l=o.find(i).length>0;l||c&&!y.allowCategorySelection||s()}},resetStyle:function(){e(this).removeAttr("style")}},determine:{selectAction:function(t,n){b.verbose("Determining action",y.action),e.isFunction(b.action[y.action])?(b.verbose("Triggering preset action",y.action,t,n),b.action[y.action](t,n)):e.isFunction(y.action)?(b.verbose("Triggering user action",y.action,t,n),y.action(t,n)):b.error(k.action,y.action)},eventInModule:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(P).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown, canceling callback"),!1)},eventInMenu:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(O).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},select:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},combo:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},hide:function(){b.hide(function(){b.remove.filteredItem()})}},get:{text:function(){return E.text()},value:function(){return R.length>0?R.val():P.data(w.value)},choiceText:function(e,t){return t=t!==i?t:y.preserveHTML,e!==i?(e.find(T.menu).length>0&&(b.verbose("Retreiving text of element with sub-menu"),e=e.clone(),e.find(T.menu).remove(),e.find(T.menuIcon).remove()),e.data(w.text)!==i?e.data(w.text):t?e.html().trim():e.text().trim()):void 0},choiceValue:function(e,t){return t=t||b.get.choiceText(e),e.data(w.value)!==i?e.data(w.value):"string"==typeof t?t.toLowerCase().trim():t.trim()},inputEvent:function(){var e=F[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={};return t.values=y.sortSelect?{}:[],P.find("option").each(function(){var n=e(this).html(),o=e(this).attr("value")!==i?e(this).attr("value"):n;""===o?t.placeholder=n:y.sortSelect?t.values[o]={name:n,value:o}:t.values.push({name:n,value:o})}),y.sortSelect?b.debug("Retrieved and sorted values from select",t):b.debug("Retreived values from select",t),t},activeItem:function(){return z.filter("."+x.active)},item:function(t,n){var o=!1;return t=t!==i?t:b.get.value()!==i?b.get.value():b.get.text(),n=""===t||0===t?!0:n||!1,t!==i?z.each(function(){var i=e(this),a=b.get.choiceText(i),r=b.get.choiceValue(i,a);n?(b.verbose("Ambiguous dropdown value using strict type check",i,t),r===t?o=e(this):o||a!==t||(o=e(this))):r==t?(b.verbose("Found select item by value",r,t),o=e(this)):o||a!=t||(b.verbose("Found select item by text",a,t),o=e(this))}):t=b.get.text(),o||!1},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},restore:{defaults:function(){b.restore.defaultText(),b.restore.defaultValue()},defaultText:function(){var e=P.data(w.defaultText);b.debug("Restoring default text",e),b.set.text(e),E.addClass(x.placeholder)},defaultValue:function(){var e=P.data(w.defaultValue);e!==i&&(b.debug("Restoring default value",e),e.length?b.set.selected(e):(b.remove.activeItem(),b.remove.selectedItem()))}},save:{defaults:function(){b.save.defaultText(),b.save.placeholderText(),b.save.defaultValue()},defaultValue:function(){P.data(w.defaultValue,b.get.value())},defaultText:function(){P.data(w.defaultText,E.text())},placeholderText:function(){E.hasClass(x.placeholder)&&P.data(w.placeholderText,E.text())}},clear:function(){var e=P.data(w.placeholderText);b.set.text(e),b.set.value(""),b.remove.activeItem(),b.remove.selectedItem(),E.addClass(x.placeholder)},set:{filtered:function(){var e=F.val(),t="string"==typeof e&&e.length>0;t?E.addClass(x.filtered):E.removeClass(x.filtered)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.val("").attr("tabindex",0),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),P.attr("tabindex")||(P.attr("tabindex",0),O.attr("tabindex","-1")))},scrollPosition:function(e,t){var n,o,a,r,s,c,l,u,d,f=5;e=e||b.get.activeItem(),n=e&&e.length>0,t=t!==i?t:!1,e&&n&&(O.hasClass(x.visible)||O.addClass(x.loading),l=O.height(),a=e.height(),c=O.scrollTop(),s=O.offset().top,r=e.offset().top,o=c-s+r,d=o+f>c+l,u=c>o-f,b.debug("Scrolling to active item",o),(u||d||t)&&O.scrollTop(o).removeClass(x.loading))},text:function(e){"combo"==y.action?(b.debug("Changing combo button text",e,D),y.preserveHTML?D.html(e):D.text(e)):"select"!==y.action&&(b.debug("Changing text",e,E),E.removeClass(x.filtered).removeClass(x.placeholder),y.preserveHTML?E.html(e):E.text(e))},value:function(e){b.debug("Adding selected value to hidden input",e,R),R.length>0?R.val(e).trigger("change"):P.data(w.value,e)},active:function(){P.addClass(x.active)},visible:function(){P.addClass(x.visible)},selected:function(e){var t,n,i=b.get.item(e);i&&(b.debug("Setting selected menu item to",i),b.remove.activeItem(),b.remove.selectedItem(),i.addClass(x.active).addClass(x.selected),t=b.get.choiceText(i),n=b.get.choiceValue(i,t),b.set.text(t),b.set.value(n),y.onChange.call(N,e,t,i))}},remove:{active:function(){P.removeClass(x.active)},visible:function(){P.removeClass(x.visible)},activeItem:function(){z.removeClass(x.active)},filteredItem:function(){z.removeClass(x.filtered)},searchTerm:function(){F.val("")},selectedItem:function(){z.removeClass(x.selected)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.attr("tabindex","-1"),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),P.attr("tabindex","-1"),O.attr("tabindex","-1"))}},is:{active:function(){return P.hasClass(x.active)},alreadySetup:function(){return P.is("select")&&P.parent(T.dropdown).length>0},animating:function(e){return e?e.is(":animated")||e.transition&&e.transition("is animating"):O.is(":animated")||O.transition&&O.transition("is animating")},allFiltered:function(){return z.filter("."+x.filtered).length===z.length},hidden:function(e){return e?e.is(":hidden"):O.is(":hidden")},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){return i.target&&e(i.target).is("select")?(n=!0,!0):void 0}),n},search:function(){return P.hasClass(x.search)},searchable:function(){return F.length>0},searchSelection:function(){return b.is.searchable()&&F.parent().is(P)},selection:function(){return P.hasClass(x.selection)},upward:function(){return P.hasClass(x.upward)},visible:function(e){return e?e.is(":visible"):O.is(":visible")}},can:{click:function(){return l||"click"==y.on},show:function(){return!P.hasClass(x.disabled)}},animate:{show:function(t,n){var o=n||O,a=n?function(){}:function(){b.hideSubMenus(),b.hideOthers(),b.set.active()};t=e.isFunction(t)?t:function(){},b.set.scrollPosition(b.get.activeItem(),!0),b.verbose("Doing menu show animation",o),(b.is.hidden(o)||b.is.animating(o))&&("auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down",b.verbose("Automatically determining animation based on animation direction",y.transition)),"none"==y.transition?t.call(N):e.fn.transition!==i&&P.transition("is supported")?o.transition({animation:y.transition+" in",debug:y.debug,verbose:y.verbose,duration:y.duration,queue:!0,onStart:a,onComplete:function(){t.call(N)}}):"slide down"==y.transition?(a(),o.hide().clearQueue().children().clearQueue().css("opacity",0).delay(50).animate({opacity:1},y.duration,"easeOutQuad",b.event.resetStyle).end().slideDown(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(N)})):"fade"==y.transition?(a(),o.hide().clearQueue().fadeIn(y.duration,function(){b.event.resetStyle.call(this),t.call(N)})):b.error(k.transition,y.transition))},hide:function(t,n){var o=n||O,a=(n?.9*y.duration:y.duration,n?function(){}:function(){b.can.click()&&b.unbind.intent(),b.focusSearch(),b.remove.active()});t=e.isFunction(t)?t:function(){},(b.is.visible(o)||b.is.animating(o))&&(b.verbose("Doing menu hide animation",o),"auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down"),"none"==y.transition?t.call(N):e.fn.transition!==i&&P.transition("is supported")?o.transition({animation:y.transition+" out",duration:y.duration,debug:y.debug,verbose:y.verbose,queue:!0,onStart:a,onComplete:function(){t.call(N)}}):"slide down"==y.transition?(a(),o.show().clearQueue().children().clearQueue().css("opacity",1).animate({opacity:0},100,"easeOutQuad",b.event.resetStyle).end().delay(50).slideUp(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(N)})):"fade"==y.transition?(a(),o.show().clearQueue().fadeOut(150,function(){b.event.resetStyle.call(this),t.call(N)})):b.error(k.transition))}},delay:{show:function(){b.verbose("Delaying show event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.show,y.delay.show)},hide:function(){b.verbose("Delaying hide event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.hide,y.delay.hide)}},escape:{regExp:function(e){return e=String(e),e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,y,t);else{if(n===i)return y[t];y[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){y.debug&&(y.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,y.name+":"),b.debug.apply(console,arguments)))},verbose:function(){y.verbose&&y.debug&&(y.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,y.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,y.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;y.performance&&(t=(new Date).getTime(),i=u||t,n=t-i,u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:N,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,100)},display:function(){var t=y.name+":",n=0;u=!1,clearTimeout(b.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,c,l=I;return n=n||g,o=N||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(b.error(k.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},m?(I===i&&b.initialize(),b.invoke(f)):(I!==i&&b.destroy(),b.initialize())}),a!==i?a:this},e.fn.dropdown.settings={debug:!1,verbose:!0,performance:!0,on:"click",action:"activate",allowTab:!0,fullTextSearch:!1,preserveHTML:!0,sortSelect:!1,allowCategorySelection:!1,delay:{hide:300,show:200,search:50,touch:50},transition:"auto",duration:250,onNoResults:function(){},onChange:function(){},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",method:"The method you called is not defined.",transition:"The requested transition was not found"},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholderText",text:"text",value:"value"},selector:{dropdown:".ui.dropdown",input:'> input[type="hidden"], > select',item:".item",menu:".menu",menuIcon:".dropdown.icon",search:"> input.search, .menu > .search > input, .menu > input.search",text:"> .text:not(.icon)"},className:{active:"active",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",loading:"loading",menu:"menu",placeholder:"default",search:"search",selected:"selected",selection:"selection",upward:"upward",visible:"visible"}},e.fn.dropdown.settings.templates={menu:function(t){var n=(t.placeholder||!1,t.values||{},"");return e.each(t.values,function(e,t){n+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),n},dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.modal=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("body"),u=r.selector||"",d=(new Date).getTime(),f=[],m=arguments[0],g="string"==typeof m,p=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,h,b,y,x,w,C,T,k,S=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),A=S.selector,P=S.className,E=S.namespace,F=S.error,R="."+E,D="module-"+E,O=e(this),z=e(S.context),j=O.find(A.close),q=this,N=O.data(D);k={initialize:function(){k.verbose("Initializing dimmer",z),k.create.id(),k.create.dimmer(),k.refreshModals(),k.verbose("Attaching close events",j),k.bind.events(),k.observeChanges(),k.instantiate()},instantiate:function(){k.verbose("Storing instance of modal"),N=k,O.data(D,N)},create:{dimmer:function(){var t={debug:S.debug,dimmerName:"modals",duration:{show:S.duration,hide:S.duration}},n=e.extend(!0,t,S.dimmerSettings);return e.fn.dimmer===i?void k.error(F.dimmer):(k.debug("Creating dimmer with settings",n),y=z.dimmer(n),S.detachable&&(k.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",O)),void(x=y.dimmer("get dimmer")))},id:function(){k.verbose("Creating unique id for element"),C=k.get.uniqueID(),w="."+C}},destroy:function(){k.verbose("Destroying previous modal"),O.removeData(D).off(R),s.off(w),j.off(R),z.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&(T=new MutationObserver(function(){k.debug("DOM tree modified, refreshing"),k.refresh()}),T.observe(q,{childList:!0,subtree:!0}),k.debug("Setting up mutation observer",T))},refresh:function(){k.remove.scrolling(),k.cacheSizes(),k.set.screenHeight(),k.set.type(),k.set.position()},refreshModals:function(){h=O.siblings(A.modal),r=h.add(O)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(k[n])?k[n]:k.toggle,i.length>0?(k.debug("Attaching modal events to element",t,n),i.off(R).on("click"+R,n)):k.error(F.notFound,t)},bind:{events:function(){j.on("click"+R,k.event.close),s.on("resize"+w,k.event.resize)}},get:{uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{close:function(){k.verbose("Closing element pressed"),e(this).is(A.approve)?S.onApprove.call(q)!==!1?k.hide():k.verbose("Approve callback returned false cancelling hide"):e(this).is(A.deny)?S.onDeny.call(q)!==!1?k.hide():k.verbose("Deny callback returned false cancelling hide"):k.hide()},click:function(t){0===e(t.target).closest(O).length&&(k.debug("Dimmer clicked, hiding all modals"),k.is.active()&&(k.remove.clickaway(),S.allowMultiple?k.hide():k.hideAll()))},debounce:function(e,t){clearTimeout(k.timer),k.timer=setTimeout(e,t)},keyboard:function(e){var t=e.which,n=27;t==n&&(S.closable?(k.debug("Escape key pressed hiding modal"),k.hide()):k.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&v(k.refresh)}},toggle:function(){k.is.active()||k.is.animating()?k.hide():k.show()},show:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},k.is.animating()||!k.is.active()?(k.showDimmer(),k.cacheSizes(),k.set.position(),k.set.screenHeight(),k.set.type(),k.set.clickaway(),!S.allowMultiple&&h.filter(":visible").length>0?(k.debug("Other modals visible, queueing show animation"),k.hideOthers(k.showModal)):(S.onShow.call(q),S.transition&&e.fn.transition!==i&&O.transition("is supported")?(k.debug("Showing modal with css animations"),O.transition({debug:S.debug,animation:S.transition+" in",queue:S.queue,duration:S.duration,useFailSafe:!0,onComplete:function(){S.onVisible.apply(q),k.add.keyboardShortcuts(),k.save.focus(),k.set.active(),k.set.autofocus(),t()}})):(k.debug("Showing modal with javascript"),O.fadeIn(S.duration,S.easing,function(){S.onVisible.apply(q),k.add.keyboardShortcuts(),k.save.focus(),k.set.active(),t()})))):k.debug("Modal is already visible")},hideModal:function(t){t=e.isFunction(t)?t:function(){},k.debug("Hiding modal"),S.onHide.call(q),(k.is.animating()||k.is.active())&&(S.transition&&e.fn.transition!==i&&O.transition("is supported")?(k.remove.active(),O.transition({debug:S.debug,animation:S.transition+" out",queue:S.queue,duration:S.duration,useFailSafe:!0,onStart:function(){k.othersActive()||k.hideDimmer(),k.remove.keyboardShortcuts()},onComplete:function(){S.onHidden.call(q),k.restore.focus(),t()}})):(k.remove.active(),k.othersActive()||k.hideDimmer(),k.remove.keyboardShortcuts(),O.fadeOut(S.duration,S.easing,function(){S.onHidden.call(q),k.restore.focus(),t()})))},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(k.debug("Showing dimmer"),y.dimmer("show")):k.debug("Dimmer already visible")},hideDimmer:function(){return y.dimmer("is animating")||y.dimmer("is active")?void y.dimmer("hide",function(){S.transition&&e.fn.transition!==i&&O.transition("is supported")&&(k.remove.clickaway(),k.remove.screenHeight())}):void k.debug("Dimmer is not visible cannot hide")},hideAll:function(t){t=e.isFunction(t)?t:function(){},r.is(":visible")&&(k.debug("Hiding all visible modals"),k.hideDimmer(),r.filter(":visible").modal("hide modal",t))
},hideOthers:function(t){t=e.isFunction(t)?t:function(){},h.is(":visible")&&(k.debug("Hiding other modals",h),h.filter(":visible").modal("hide modal",t))},othersActive:function(){return h.filter("."+P.active).length>0},add:{keyboardShortcuts:function(){k.verbose("Adding keyboard shortcuts"),c.on("keyup"+R,k.event.keyboard)}},save:{focus:function(){b=e(n.activeElement).blur()}},restore:{focus:function(){b&&b.length>0&&b.focus()}},remove:{active:function(){O.removeClass(P.active)},clickaway:function(){S.closable&&x.off("click"+w)},screenHeight:function(){k.cache.height>k.cache.pageHeight&&(k.debug("Removing page height"),l.css("height",""))},keyboardShortcuts:function(){k.verbose("Removing keyboard shortcuts"),c.off("keyup"+R)},scrolling:function(){y.removeClass(P.scrolling),O.removeClass(P.scrolling)}},cacheSizes:function(){var o=O.outerHeight();(k.cache===i||0!==o)&&(k.cache={pageHeight:e(n).outerHeight(),height:o+S.offset,contextHeight:"body"==S.context?e(t).height():y.height()}),k.debug("Caching modal and container sizes",k.cache)},can:{fit:function(){return k.cache.height<k.cache.contextHeight}},is:{active:function(){return O.hasClass(P.active)},animating:function(){return O.transition("is supported")?O.transition("is animating"):O.is(":visible")},scrolling:function(){return y.hasClass(P.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){if(S.autofocus){var e=O.find(":input:visible"),t=e.filter("[autofocus]"),n=t.length>0?t:e;n.first().focus()}},clickaway:function(){S.closable&&x.on("click"+w,k.event.click)},screenHeight:function(){k.cache.height>k.cache.pageHeight?(k.debug("Modal is taller than page content, resizing page height"),l.css("height",k.cache.height+S.padding)):l.css("height","")},active:function(){O.addClass(P.active)},scrolling:function(){y.addClass(P.scrolling),O.addClass(P.scrolling)},type:function(){k.can.fit()?(k.verbose("Modal fits on screen"),k.othersActive||k.remove.scrolling()):(k.verbose("Modal cannot fit on screen setting to scrolling"),k.set.scrolling())},position:function(){k.verbose("Centering modal on page",k.cache),O.css(k.can.fit()?{top:"",marginTop:-(k.cache.height/2)}:{marginTop:"",top:c.scrollTop()})}},setting:function(t,n){if(k.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];S[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},debug:function(){S.debug&&(S.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,S.name+":"),k.debug.apply(console,arguments)))},verbose:function(){S.verbose&&S.debug&&(S.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,S.name+":"),k.verbose.apply(console,arguments)))},error:function(){k.error=Function.prototype.bind.call(console.error,console,S.name+":"),k.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;S.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:q,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,100)},display:function(){var t=S.name+":",n=0;d=!1,clearTimeout(k.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,c,l=N;return n=n||p,o=q||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},g?(N===i&&k.initialize(),k.invoke(m)):(N!==i&&k.destroy(),k.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",debug:!1,verbose:!0,performance:!0,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,dimmerSettings:{closable:!1,useCSS:!0},context:"body",queue:!1,duration:500,easing:"easeOutExpo",offset:0,transition:"scale",padding:30,onShow:function(){},onHide:function(){},onVisible:function(){},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:".close, .actions .button",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",scrolling:"scrolling"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.nag=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){{var a,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),m=(f.className,f.selector),g=f.error,p=f.namespace,v="."+p,h=p+"-module",b=e(this),y=b.find(m.close),x=e(f.context?f.context:"body"),w=this,C=b.data(h);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}a={initialize:function(){a.verbose("Initializing element"),b.data(h,a),y.on("click"+v,a.dismiss),f.detachable&&b.parent()[0]!==x[0]&&b.detach().prependTo(x),f.displayTime>0&&setTimeout(a.hide,f.displayTime),a.show()},destroy:function(){a.verbose("Destroying instance"),b.removeData(h).off(v)},show:function(){a.should.show()&&!b.is(":visible")&&(a.debug("Showing nag",f.animation.show),"fade"==f.animation.show?b.fadeIn(f.duration,f.easing):b.slideDown(f.duration,f.easing))},hide:function(){a.debug("Showing nag",f.animation.hide),"fade"==f.animation.show?b.fadeIn(f.duration,f.easing):b.slideUp(f.duration,f.easing)},onHide:function(){a.debug("Removing nag",f.animation.hide),b.remove(),f.onHide&&f.onHide()},dismiss:function(e){f.storageMethod&&a.storage.set(f.key,f.value),a.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return f.persist?(a.debug("Persistent nag is set, can show nag"),!0):a.storage.get(f.key)!=f.value.toString()?(a.debug("Stored value is not set, can show nag",a.storage.get(f.key)),!0):(a.debug("Stored value is set, cannot show nag",a.storage.get(f.key)),!1)}},get:{storageOptions:function(){var e={};return f.expires&&(e.expires=f.expires),f.domain&&(e.domain=f.domain),f.path&&(e.path=f.path),e}},clear:function(){a.storage.remove(f.key)},storage:{set:function(n,o){var r=a.get.storageOptions();if("localstorage"==f.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),a.debug("Value stored using local storage",n,o);else{if(e.cookie===i)return void a.error(g.noCookieStorage);e.cookie(n,o,r),a.debug("Value stored using cookie",n,o,r)}},get:function(n){var o;return"localstorage"==f.storageMethod&&t.localStorage!==i?o=t.localStorage.getItem(n):e.cookie!==i?o=e.cookie(n):a.error(g.noCookieStorage),("undefined"==o||"null"==o||o===i||null===o)&&(o=i),o},remove:function(n){var o=a.get.storageOptions();"local"==f.storageMethod&&t.store!==i?t.localStorage.removeItem(n):e.cookie!==i?e.removeCookie(n,o):a.error(g.noStorage)}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){f.debug&&(f.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,f.name+":"),a.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,f.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:w,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,r){var s,c,l,u=C;return n=n||d,r=w||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(C===i&&a.initialize(),a.invoke(l)):(C!==i&&a.destroy(),a.initialize())}),o!==i?o:this},e.fn.nag.settings={name:"Nag",debug:!1,verbose:!0,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.popup=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l=("ontouchstart"in n.documentElement,(new Date).getTime()),u=[],d=arguments[0],f="string"==typeof d,m=[].slice.call(arguments,1);return r.each(function(){var n,r,g,p=e.isPlainObject(o)?e.extend(!0,{},e.fn.popup.settings,o):e.extend({},e.fn.popup.settings),v=p.selector,h=p.className,b=p.error,y=p.metadata,x=p.namespace,w="."+p.namespace,C="module-"+x,T=e(this),k=e(p.context),S=p.target?e(p.target):T,A=e(t),P=e("body"),E=0,F=!1,R=this,D=T.data(C);g={initialize:function(){g.debug("Initializing module",T),"click"==p.on?T.on("click"+w,g.toggle):g.get.startEvent()&&T.on(g.get.startEvent()+w,g.event.start).on(g.get.endEvent()+w,g.event.end),p.target&&g.debug("Target set to element",S),A.on("resize"+w,g.event.resize),!g.exists()&&p.preserve&&g.create(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),D=g,T.data(C,D)},refresh:function(){p.popup?n=e(p.popup).eq(0):p.inline&&(n=S.next(v.popup).eq(0)),p.popup?(n.addClass(h.loading),r=g.get.offsetParent(),n.removeClass(h.loading),p.movePopup&&g.has.popup()&&g.get.offsetParent(n)[0]!==r[0]&&(g.debug("Moving popup to the same offset parent as activating element"),n.detach().appendTo(r))):r=p.inline?g.get.offsetParent(S):g.has.popup()?g.get.offsetParent(n):P,r.is("html")&&(g.debug("Setting page as offset parent"),r=P)},reposition:function(){g.refresh(),g.set.position()},destroy:function(){g.debug("Destroying previous module"),n&&!p.preserve&&g.removePopup(),clearTimeout(g.hideTimer),clearTimeout(g.showTimer),T.off(w).removeData(C)},event:{start:function(){var t=e.isPlainObject(p.delay)?p.delay.show:p.delay;clearTimeout(g.hideTimer),g.showTimer=setTimeout(function(){!g.is.hidden()||g.is.active()&&g.is.dropdown()||g.show()},t)},end:function(){var t=e.isPlainObject(p.delay)?p.delay.hide:p.delay;clearTimeout(g.showTimer),g.hideTimer=setTimeout(function(){g.is.visible()&&g.hide()},t)},resize:function(){g.is.visible()&&g.set.position()}},create:function(){var t=T.data(y.html)||p.html,i=T.data(y.variation)||p.variation,o=T.data(y.title)||p.title,a=T.data(y.content)||T.attr("title")||p.content;t||a||o?(g.debug("Creating pop-up html"),t||(t=p.templates.popup({title:o,content:a})),n=e("<div/>").addClass(h.popup).addClass(i).html(t),i&&n.addClass(i),p.inline?(g.verbose("Inserting popup element inline",n),n.insertAfter(T)):(g.verbose("Appending popup element to body",n),n.appendTo(k)),g.refresh(),p.hoverable&&g.bind.popup(),p.onCreate.call(n,R)):0!==S.next(v.popup).length?(g.verbose("Pre-existing popup found"),p.inline=!0,p.popup=S.next(v.popup),g.refresh(),p.hoverable&&g.bind.popup()):p.popup?(g.verbose("Used popup specified in settings"),g.refresh(),p.hoverable&&g.bind.popup()):g.debug("No content specified skipping display",R)},toggle:function(){g.debug("Toggling pop-up"),g.is.hidden()?(g.debug("Popup is hidden, showing pop-up"),g.unbind.close(),g.hideAll(),g.show()):(g.debug("Popup is visible, hiding pop-up"),g.hide())},show:function(t){t=e.isFunction(t)?t:function(){},g.debug("Showing pop-up",p.transition),g.exists()?p.preserve||p.popup||g.refresh():g.create(),n&&g.set.position()&&(g.save.conditions(),g.animate.show(t))},hide:function(t){t=e.isFunction(t)?t:function(){},g.remove.visible(),g.unbind.close(),g.is.visible()&&(g.restore.conditions(),g.animate.hide(t))},hideAll:function(){e(v.popup).filter(":visible").transition(p.transition)},hideGracefully:function(t){t&&0===e(t.target).closest(v.popup).length?(g.debug("Click occurred outside popup hiding popup"),g.hide()):g.debug("Click was inside popup, keeping popup open")},exists:function(){return n?p.inline||p.popup?g.has.popup():n.closest(k).length>=1?!0:!1:!1},removePopup:function(){g.debug("Removing popup",n),g.has.popup()&&!p.popup&&(n.remove(),n=i),p.onRemove.call(n,R)},save:{conditions:function(){g.cache={title:T.attr("title")},g.cache.title&&T.removeAttr("title"),g.verbose("Saving original attributes",g.cache.title)}},restore:{conditions:function(){return g.cache&&g.cache.title&&(T.attr("title",g.cache.title),g.verbose("Restoring original attributes",g.cache.title)),!0}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},p.transition&&e.fn.transition!==i&&T.transition("is supported")?(g.set.visible(),n.transition({animation:p.transition+" in",queue:!1,debug:p.debug,verbose:p.verbose,duration:p.duration,onComplete:function(){g.bind.close(),t.call(n,R),p.onVisible.call(n,R)}})):(g.set.visible(),n.stop().fadeIn(p.duration,p.easing,function(){g.bind.close(),t.call(n,R),p.onVisible.call(n,R)})),p.onShow.call(n,R)},hide:function(t){t=e.isFunction(t)?t:function(){},g.debug("Hiding pop-up"),p.transition&&e.fn.transition!==i&&T.transition("is supported")?n.transition({animation:p.transition+" out",queue:!1,duration:p.duration,debug:p.debug,verbose:p.verbose,onComplete:function(){g.reset(),t.call(n,R),p.onHidden.call(n,R)}}):n.stop().fadeOut(p.duration,p.easing,function(){g.reset(),t.call(n,R),p.onHidden.call(n,R)}),p.onHide.call(n,R)}},get:{startEvent:function(){return"hover"==p.on?"mouseenter":"focus"==p.on?"focus":!1},endEvent:function(){return"hover"==p.on?"mouseleave":"focus"==p.on?"blur":!1},offsetParent:function(t){var n=t!==i?t[0]:T[0],o=n.parentNode,a=e(o);if(o)for(var r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");o&&!c&&s&&r;)o=o.parentNode,a=e(o),r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");return a&&a.length>0?a:e()},offstagePosition:function(i){var o={top:e(t).scrollTop(),bottom:e(t).scrollTop()+e(t).height(),left:0,right:e(t).width()},a={width:n.width(),height:n.height(),offset:n.offset()},r={},s=[];return i=i||!1,a.offset&&i&&(g.verbose("Checking if outside viewable area",a.offset),r={top:a.offset.top<o.top,bottom:a.offset.top+a.height>o.bottom,right:a.offset.left+a.width>o.right,left:a.offset.left<o.left}),e.each(r,function(e,t){t&&s.push(e)}),s.length>0?s.join(" "):!1},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o={top:"bottom",bottom:"top",left:"right",right:"left"},a={left:"center",center:"right",right:"left"},r={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"},s="top"==n||"bottom"==n,c=!1,l=!1,u=!1;return F||(g.verbose("All available positions available"),F=g.get.positions()),g.debug("Recording last position tried",e),F[e]=!0,"opposite"===p.prefer&&(u=[o[n],i],u=u.join(" "),c=F[u]===!0,g.debug("Trying opposite strategy",u)),"adjacent"===p.prefer&&s&&(u=[n,a[i]],u=u.join(" "),l=F[u]===!0,g.debug("Trying adjacent strategy",u)),(l||c)&&(g.debug("Using backup position",u),u=r[e]),u}},set:{position:function(o,a){var s,c,l,u=(e(t).width(),e(t).height(),S.outerWidth()),d=S.outerHeight(),f=n.outerWidth(),m=n.outerHeight(),v=r.outerWidth(),x=r.outerHeight(),w=p.distanceAway,C=S[0],k=p.inline?parseInt(t.getComputedStyle(C).getPropertyValue("margin-top"),10):0,A=p.inline?parseInt(t.getComputedStyle(C).getPropertyValue(g.is.rtl()?"margin-right":"margin-left"),10):0,P=p.inline||p.popup?S.position():S.offset();switch(o=o||T.data(y.position)||p.position,a=a||T.data(y.offset)||p.offset,E==p.maxSearchDepth&&p.lastResort&&(g.debug("Using last resort position to display",p.lastResort),o=p.lastResort),p.inline&&(g.debug("Adding targets margin to calculation"),"left center"==o||"right center"==o?(a+=k,w+=-A):"top left"==o||"top center"==o||"top right"==o?(a+=A,w-=k):(a+=A,w+=k)),g.debug("Calculating popup positioning",o),s=o,g.is.rtl()&&(s=s.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),g.debug("RTL: Popup positioning updated",s)),s){case"top left":c={top:"auto",bottom:x-P.top+w,left:P.left+a,right:"auto"};break;case"top center":c={bottom:x-P.top+w,left:P.left+u/2-f/2+a,top:"auto",right:"auto"};break;case"top right":c={bottom:x-P.top+w,right:v-P.left-u-a,top:"auto",left:"auto"};break;case"left center":c={top:P.top+d/2-m/2+a,right:v-P.left+w,left:"auto",bottom:"auto"};break;case"right center":c={top:P.top+d/2-m/2+a,left:P.left+u+w,bottom:"auto",right:"auto"};break;case"bottom left":c={top:P.top+d+w,left:P.left+a,bottom:"auto",right:"auto"};break;case"bottom center":c={top:P.top+d+w,left:P.left+u/2-f/2+a,bottom:"auto",right:"auto"};break;case"bottom right":c={top:P.top+d+w,right:v-P.left-u-a,left:"auto",bottom:"auto"}}if(c===i&&g.error(b.invalidPosition,o),g.debug("Calculated popup positioning values",c),n.css(c).removeClass(h.position).addClass(o).addClass(h.loading),l=g.get.offstagePosition(o)){if(g.debug("Popup cant fit into viewport",l),E<p.maxSearchDepth)return E++,o=g.get.nextPosition(o),g.debug("Trying new position",o),n?g.set.position(o):!1;if(!p.lastResort)return g.debug("Popup could not find a position in view",n),g.error(b.cannotPlace),g.remove.attempts(),g.remove.loading(),g.reset(),!1}return g.debug("Position is on stage",o),g.remove.attempts(),g.set.fluidWidth(),g.remove.loading(),!0},fluidWidth:function(){p.setFluidWidth&&n.hasClass(h.fluid)&&n.css("width",r.width())},visible:function(){T.addClass(h.visible)}},remove:{loading:function(){n.removeClass(h.loading)},visible:function(){T.removeClass(h.visible)},attempts:function(){g.verbose("Resetting all searched positions"),E=0,F=!1}},bind:{popup:function(){g.verbose("Allowing hover events on popup to prevent closing"),n&&g.has.popup()&&n.on("mouseenter"+w,g.event.start).on("mouseleave"+w,g.event.end)},close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully),k.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully)),"click"==p.on&&p.closable&&(g.verbose("Binding popup close event to document"),s.on("click"+w,function(e){g.verbose("Pop-up clickaway intent detected"),g.hideGracefully.call(R,e)}))}},unbind:{close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.off("scroll"+w,g.hide),k.off("scroll"+w,g.hide)),"click"==p.on&&p.closable&&(g.verbose("Removing close event from document"),s.off("click"+w))}},has:{popup:function(){return n&&n.length>0}},is:{active:function(){return T.hasClass(h.active)},animating:function(){return n&&n.is(":animated")||n.hasClass(h.animating)},visible:function(){return n&&n.is(":visible")},dropdown:function(){return T.hasClass(h.dropdown)},hidden:function(){return!g.is.visible()},rtl:function(){return"rtl"==T.css("direction")}},reset:function(){g.remove.visible(),p.preserve?e.fn.transition!==i&&n.transition("remove transition"):g.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;l=!1,clearTimeout(g.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,o){var r,s,c,l=D;return n=n||m,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},f?(D===i&&g.initialize(),g.invoke(d)):(D!==i&&g.destroy(),g.initialize())}),a!==i?a:this},e.fn.popup.settings={name:"Popup",debug:!1,verbose:!0,performance:!0,namespace:"popup",onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onHidden:function(){},variation:"",content:!1,html:!1,title:!1,on:"hover",closable:!0,hideOnScroll:"auto",context:"body",position:"top left",prefer:"opposite",lastResort:!1,delay:{show:30,hide:0},setFluidWidth:!0,movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,duration:200,easing:"easeOutQuint",transition:"scale",distanceAway:0,offset:0,maxSearchDepth:20,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"No visible position could be found for the popup",method:"The method you called is not defined."},metadata:{content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},popup:function(t){var n="",o=e.fn.popup.settings.templates.escape;return typeof t!==i&&(typeof t.title!==i&&t.title&&(t.title=o(t.title),n+='<div class="header">'+t.title+"</div>"),typeof t.content!==i&&t.content&&(t.content=o(t.content),n+='<div class="content">'+t.content+"</div>")),n}}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),g=m.className,p=m.metadata,v=m.namespace,h=m.selector,b=m.error,y="."+v,x="module-"+v,w=e(this),C=e(this).find(h.bar),T=e(this).find(h.progress),k=e(this).find(h.label),S=this,A=w.data(x),P=!1;f={initialize:function(){f.debug("Initializing progress bar",m),a=f.get.transitionEnd(),f.read.metadata(),f.set.duration(),f.set.initials(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of progress",f),A=f,w.data(x,f)},destroy:function(){f.verbose("Destroying previous progress for",w),clearInterval(A.interval),f.remove.state(),w.removeData(x),A=i},reset:function(){f.set.percent(0)},complete:function(){(f.percent===i||f.percent<100)&&f.set.percent(100)},read:{metadata:function(){w.data(p.percent)&&(f.verbose("Current percent value set from metadata"),f.percent=w.data(p.percent)),w.data(p.total)&&(f.verbose("Total value set from metadata"),f.total=w.data(p.total)),w.data(p.value)&&(f.verbose("Current value set from metadata"),f.value=w.data(p.value))},currentValue:function(){return f.value!==i?f.value:!1}},increment:function(e){var t,n,i,o=f.total||!1;o?(n=f.value||0,e=e||1,i=n+e,t=f.total,f.debug("Incrementing value by",e,n,t),i>t&&(f.debug("Value cannot increment above total",t),i=t),f.set.progress(i)):(n=f.percent||0,e=e||f.get.randomValue(),i=n+e,t=100,f.debug("Incrementing percentage by",e,n),i>t&&(f.debug("Value cannot increment above 100 percent"),i=t),f.set.progress(i))},decrement:function(e){var t,n,i=f.total||!1,o=0;i?(t=f.value||0,e=e||1,n=t-e,f.debug("Decrementing value by",e,t)):(t=f.percent||0,e=e||f.get.randomValue(),n=t-e,f.debug("Decrementing percentage by",e,t)),o>n&&(f.debug("Value cannot decrement below 0"),n=0),f.set.progress(n)},get:{text:function(e){var t=f.value||0,n=f.total||0,i=f.is.visible()&&P?f.get.displayPercent():f.percent||0,o=f.total>0?n-t:100-i;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),f.debug("Adding variables to progress bar text",e),e},randomValue:function(){return f.debug("Generating random increment percentage"),Math.floor(Math.random()*m.random.max+m.random.min)},transitionEnd:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},displayPercent:function(){var e=C.width(),t=w.width(),n=parseInt(C.css("min-width"),10),i=e>n?e/t*100:f.percent;return Math.round(0===m.precision?i:10*i*m.precision/(10*m.precision))},percent:function(){return f.percent||0},value:function(){return f.value||!1},total:function(){return f.total||!1}},is:{success:function(){return w.hasClass(g.success)},warning:function(){return w.hasClass(g.warning)},error:function(){return w.hasClass(g.error)},active:function(){return w.hasClass(g.active)},visible:function(){return w.is(":visible")}},remove:{state:function(){f.verbose("Removing stored state"),delete f.total,delete f.percent,delete f.value},active:function(){f.verbose("Removing active state"),w.removeClass(g.active)},success:function(){f.verbose("Removing success state"),w.removeClass(g.success)},warning:function(){f.verbose("Removing warning state"),w.removeClass(g.warning)},error:function(){f.verbose("Removing error state"),w.removeClass(g.error)}},set:{barWidth:function(e){e>100?f.error(b.tooHigh,e):0>e?f.error(b.tooLow,e):(C.css("width",e+"%"),w.attr("data-percent",parseInt(e,10)))},duration:function(e){e=e||m.duration,e="number"==typeof e?e+"ms":e,f.verbose("Setting progress bar transition duration",e),C.css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},initials:function(){m.total!==!1&&(f.verbose("Current total set in settings",m.total),f.total=m.total),m.value!==!1&&(f.verbose("Current value set in settings",m.value),f.value=m.value),m.percent!==!1&&(f.verbose("Current percent set in settings",m.percent),f.percent=m.percent),f.percent!==i?f.set.percent(f.percent):f.value!==i&&f.set.progress(f.value)},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e>0&&1>e&&(f.verbose("Module percentage passed as decimal, converting"),e=100*e),e=Math.round(0===m.precision?e:10*e*m.precision/(10*m.precision)),f.percent=e,f.total?f.value=Math.round(e/100*f.total):m.limitValues&&(f.value=f.value>100?100:f.value<0?0:f.value),f.set.barWidth(e),f.is.visible()&&f.set.labelInterval(),f.set.labels(),m.onChange.call(S,e,f.value,f.total)},labelInterval:function(){var e=function(){f.verbose("Bar finished animating, removing continuous label updates"),clearInterval(f.interval),P=!1,f.set.labels()};clearInterval(f.interval),C.one(a+y,e),f.timer=setTimeout(e,m.duration+100),P=!0,f.interval=setInterval(f.set.labels,m.framerate)},labels:function(){f.verbose("Setting both bar progress and outer label text"),f.set.barLabel(),f.set.state()},label:function(e){e=e||"",e&&(e=f.get.text(e),f.debug("Setting label to text",e),k.text(e))},state:function(e){e=e!==i?e:f.percent,100===e?!m.autoSuccess||f.is.warning()||f.is.error()?(f.verbose("Reached 100% removing active state"),f.remove.active()):(f.set.success(),f.debug("Automatically triggering success at 100%")):e>0?(f.verbose("Adjusting active progress bar label",e),f.set.active()):(f.remove.active(),f.set.label(m.text.active))},barLabel:function(e){e!==i?T.text(f.get.text(e)):"ratio"==m.label&&f.total?(f.debug("Adding ratio to bar label"),T.text(f.get.text(m.text.ratio))):"percent"==m.label&&(f.debug("Adding percentage to bar label"),T.text(f.get.text(m.text.percent)))},active:function(e){e=e||m.text.active,f.debug("Setting active state"),m.showActivity&&!f.is.active()&&w.addClass(g.active),f.remove.warning(),f.remove.error(),f.remove.success(),e&&f.set.label(e),m.onActive.call(S,f.value,f.total)},success:function(e){e=e||m.text.success,f.debug("Setting success state"),w.addClass(g.success),f.remove.active(),f.remove.warning(),f.remove.error(),f.complete(),e&&f.set.label(e),m.onSuccess.call(S,f.total)},warning:function(e){e=e||m.text.warning,f.debug("Setting warning state"),w.addClass(g.warning),f.remove.active(),f.remove.success(),f.remove.error(),f.complete(),e&&f.set.label(e),m.onWarning.call(S,f.value,f.total)},error:function(e){e=e||m.text.error,f.debug("Setting error state"),w.addClass(g.error),f.remove.active(),f.remove.success(),f.remove.warning(),f.complete(),e&&f.set.label(e),m.onError.call(S,f.value,f.total)},total:function(e){f.total=e},progress:function(e){var t,n="string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e;n===!1&&f.error(b.nonNumeric,e),f.total?(f.value=n,t=n/f.total*100,f.debug("Calculating percent complete from total",t),f.set.percent(t)):(t=n,f.debug("Setting value to exact percentage value",t),f.set.percent(t))}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))
},error:function(){f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=A;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(A===i&&f.initialize(),f.invoke(l)):(A!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!0,performance:!0,random:{min:2,max:5},duration:300,autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:1,framerate:1e3/30,percent:!1,total:!1,value:!1,onChange:function(){},onSuccess:function(){},onActive:function(){},onError:function(){},onWarning:function(){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return o.each(function(){var d,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),m=f.namespace,g=f.className,p=f.metadata,v=f.selector,h=(f.error,"."+m),b="module-"+m,y=this,x=e(this).data(b),w=e(this),C=w.find(v.icon);d={initialize:function(){d.verbose("Initializing rating module",f),0===C.length&&d.setup.layout(),f.interactive?d.enable():d.disable(),f.initialRating&&(d.debug("Setting initial rating"),d.setRating(f.initialRating)),w.data(p.rating)&&(d.debug("Rating found in metadata"),d.setRating(w.data(p.rating))),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",f),x=d,w.data(b,d)},destroy:function(){d.verbose("Destroying previous instance",x),w.removeData(b),C.off(h)},refresh:function(){C=w.find(v.icon)},setup:{layout:function(){var t=w.data(p.maxRating)||f.maxRating;d.debug("Generating icon html dynamically"),w.html(e.fn.rating.settings.templates.icon(t)),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),w.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){w.removeClass(g.selected),C.removeClass(g.selected)},click:function(){var t=e(this),n=d.getRating(),i=C.index(t)+1,o="auto"==f.clearable?1===C.length:f.clearable;o&&n==i?d.clearRating():d.setRating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.setRating(0)},getRating:function(){var e=C.filter("."+g.active).length;return d.verbose("Current rating retrieved",e),e},enable:function(){d.debug("Setting rating to interactive mode"),C.on("mouseenter"+h,d.event.mouseenter).on("mouseleave"+h,d.event.mouseleave).on("click"+h,d.event.click),w.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),C.off(h),w.addClass(g.disabled)},setRating:function(e){var t=e-1>=0?e-1:0,n=C.eq(t);w.removeClass(g.selected),C.removeClass(g.selected).removeClass(g.active),e>0&&(d.verbose("Setting current rating to",e),n.prevAll().andSelf().addClass(g.active)),f.onRate.call(y,e)},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(n===i)return d[t];d[t]=n}},debug:function(){f.debug&&(f.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,f.name+":"),d.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,f.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,100)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,c,l=x;return o=o||u,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,o):s!==i&&(c=s),e.isArray(n)?n.push(c):n!==i?n=[n,c]:c!==i&&(n=c),s}},l?(x===i&&d.initialize(),d.invoke(c)):(x!==i&&d.destroy(),d.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",debug:!1,verbose:!0,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",onRate:function(){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";e>=t;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.search=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1);return e(this).each(function(){var m,g=e.extend(!0,{},e.fn.search.settings,o),p=g.className,v=g.metadata,h=g.regExp,b=g.selector,y=g.error,x=g.namespace,w="."+x,C=x+"-module",T=e(this),k=T.find(b.prompt),S=T.find(b.searchButton),A=T.find(b.results),P=(T.find(b.result),T.find(b.category),this),E=T.data(C);m={initialize:function(){m.verbose("Initializing module");var e=k[0],t=e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup";g.automatic&&k.on(t+w,m.throttle),k.on("focus"+w,m.event.focus).on("blur"+w,m.event.blur).on("keydown"+w,m.handleKeyboard),S.on("click"+w,m.query),A.on("mousedown"+w,m.event.result.mousedown).on("mouseup"+w,m.event.result.mouseup).on("click"+w,b.result,m.event.result.click),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),E=m,T.data(C,m)},destroy:function(){m.verbose("Destroying instance"),T.removeData(C),k.off(w),S.off(w),A.off(w)},event:{focus:function(){m.set.focus(),clearTimeout(m.timer),m.throttle(),m.has.minimumCharacters()&&m.showResults()},blur:function(){var e=n.activeElement===this;e||m.resultsClicked||(m.cancel.query(),m.remove.focus(),m.timer=setTimeout(m.hideResults,g.hideDelay))},result:{mousedown:function(){m.resultsClicked=!0},mouseup:function(){m.resultsClicked=!1},click:function(n){m.debug("Search result selected");var i=e(this),o=i.find(b.title).eq(0),a=i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,c=(o.html(),o.length>0?o.text():!1),l=m.get.results(),u=m.get.result(c,l);return e.isFunction(g.onSelect)&&g.onSelect.call(P,u,l)===!1?void m.debug("Custom onSelect callback cancelled default select action"):(m.hideResults(),c&&m.set.value(c),void(r&&(m.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)))}}},handleKeyboard:function(e){var t,n=T.find(b.result),i=T.find(b.category),o=n.index(n.filter("."+p.active)),a=n.length,r=e.which,s={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40};if(r==s.escape&&(m.verbose("Escape key pressed, blurring search field"),k.trigger("blur")),m.is.visible())if(r==s.enter){if(m.verbose("Enter key pressed, selecting active result"),n.filter("."+p.active).length>0)return m.event.result.click.call(n.filter("."+p.active),e),e.preventDefault(),!1}else r==s.upArrow?(m.verbose("Up key pressed, changing active result"),t=0>o-1?o:o-1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault()):r==s.downArrow&&(m.verbose("Down key pressed, changing active result"),t=o+1>=a?o:o+1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault());else r==s.enter&&(m.verbose("Enter key pressed, executing query"),m.query(),m.set.buttonPressed(),k.one("keyup",m.remove.buttonFocus))},setup:{api:function(){var e={on:!1,action:"search",onFailure:m.error};m.verbose("First request, initializing API"),T.api(e)}},can:{useAPI:function(){return e.fn.api!==i},transition:function(){return g.transition&&e.fn.transition!==i&&T.transition("is supported")}},is:{empty:function(){return""===A.html()},visible:function(){return A.filter(":visible").length>0},focused:function(){return k.filter(":focus").length>0}},get:{value:function(){return k.val()},results:function(){var e=T.data(v.results);return e},result:function(t,n){var o=!1;return t=t||m.get.value(),n=n||m.get.results(),"category"===g.type?(m.debug("Finding result from category results",t),e.each(n,function(e,n){return n.results!==i&&(o=m.search.object(t,n.results)[0],o.length>0)?!0:void 0})):(m.debug("Finding result in results object",t),o=m.search.object(t,n)[0]),o}},set:{focus:function(){T.addClass(p.focus)},loading:function(){T.addClass(p.loading)},value:function(e){m.verbose("Setting search input value",e),k.val(e)},buttonPressed:function(){S.addClass(p.pressed)}},remove:{loading:function(){T.removeClass(p.loading)},focus:function(){T.removeClass(p.focus)},buttonPressed:function(){S.removeClass(p.pressed)}},query:function(){var t=m.get.value(),n=m.read.cachedHTML(t);n?(m.debug("Reading result for "+t+" from cache"),m.addResults(n)):(m.debug("Querying for "+t),e.isPlainObject(g.source)||e.isArray(g.source)?m.search.local(t):m.can.useAPI()?g.apiSettings?(m.debug("Searching with specified API settings",g.apiSettings),m.search.remote(t)):e.api.settings.api.search!==i&&(m.debug("Searching with default search API endpoint"),m.search.remote(t)):m.error(y.source),g.onSearchQuery.call(P,t))},search:{local:function(e){var t,n=m.search.object(e,g.content);m.set.loading(),m.save.results(n),m.debug("Returned local search results",n),t=m.generateResults({results:n}),m.remove.loading(),m.write.cachedHTML(e,t),m.addResults(t)},remote:function(t){var n={onSuccess:function(e){m.parse.response.call(P,e,t)},urlData:{query:t}};T.api("get request")||m.setup.api(),e.extend(!0,n,g.apiSettings),m.debug("Executing search",n),m.cancel.query(),T.api("setting",n).api("query")},object:function(t,n){var o=[],a=[],r=e.isArray(g.searchFields)?g.searchFields:[g.searchFields],s=new RegExp(h.exact+t,"i"),c=new RegExp(t,"i");return n=n||g.source,n===i?(m.error(y.source),[]):(e.each(r,function(t,i){e.each(n,function(t,n){var r="string"==typeof n[i],l=-1==e.inArray(n,o)&&-1==e.inArray(n,a);r&&l&&(n[i].match(s)?o.push(n):g.searchFullText&&n[i].match(c)&&a.push(n))})}),e.merge(o,a))}},parse:{response:function(e,t){var n=m.generateResults(e);m.verbose("Parsing server response",e),e!==i&&(t&&(m.write.cachedHTML(t,n),e.results!==i&&m.save.results(e.results)),m.addResults(n))}},throttle:function(){clearTimeout(m.timer),m.has.minimumCharacters()?m.timer=setTimeout(m.query,g.searchDelay):m.hideResults()},cancel:{query:function(){m.can.useAPI()&&T.api("abort")}},has:{minimumCharacters:function(){var e=m.get.value(),t=e.length;return t>=g.minCharacters}},read:{cachedHTML:function(e){var t=T.data(v.cache);return g.cache?(m.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==i?t[e]:!1):!1}},save:{results:function(e){m.verbose("Saving current search results to metadata",e),T.data(v.results,e)}},write:{cachedHTML:function(e,t){var n=T.data(v.cache)!==i?T.data(v.cache):{};g.cache&&(m.verbose("Writing generated html to cache",e,t),n[e]=t,T.data(v.cache,n))}},addResults:function(t){return e.isFunction(g.onResultsAdd)&&g.onResultsAdd.call(A,t)===!1?(m.debug("onResultsAdd callback cancelled default action"),!1):(A.html(t),void m.showResults())},showResults:function(){m.is.visible()||!m.is.focused()||m.is.empty()||(m.can.transition()?(m.debug("Showing results with css animations"),A.transition({animation:g.transition+" in",duration:g.duration,queue:!0})):(m.debug("Showing results with javascript"),A.stop().fadeIn(g.duration,g.easing)),g.onResultsOpen.call(A))},hideResults:function(){m.is.visible()&&(m.can.transition()?(m.debug("Hiding results with css animations"),A.transition({animation:g.transition+" out",duration:g.duration,queue:!0})):(m.debug("Hiding results with javascript"),A.stop().fadeOut(g.duration,g.easing)),g.onResultsClose.call(A))},generateResults:function(t){m.debug("Generating html from response",t);var n=g.templates[g.type],i=e.isPlainObject(t.results)&&!e.isEmptyObject(t.results),o=e.isArray(t.results)&&t.results.length>0,a="";return i||o?(g.maxResults>0&&(i?m.error(y.maxResults):t.results=t.results.slice(0,g.maxResults)),e.isFunction(n)?a=n(t):m.error(y.noTemplate,!1)):a=m.displayMessage(y.noResults,"empty"),g.onResults.call(P,t),a},displayMessage:function(e,t){return t=t||"standard",m.debug("Displaying message",e,t),m.addResults(g.templates.message(e,t)),g.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=g.name+":",n=0;c=!1,clearTimeout(m.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=E;return n=n||f,o=P||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(E===i&&m.initialize(),m.invoke(u)):(E!==i&&m.destroy(),m.initialize())}),a!==i?a:this},e.fn.search.settings={name:"Search Module",namespace:"search",debug:!1,verbose:!0,performance:!0,type:"standard",minCharacters:1,apiSettings:!1,source:!1,searchFields:["title","description"],searchFullText:!0,automatic:"true",hideDelay:0,searchDelay:100,maxResults:7,cache:!0,transition:"scale",duration:300,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(){},onResults:function(){},onResultsOpen:function(){},onResultsClose:function(){},className:{active:"active",empty:"empty",focus:"focus",loading:"loading",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noTemplate:"A valid template name was not specified.",serverError:"There was an issue with querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results"},regExp:{exact:"(?:s|^)"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t){var n="",o=e.fn.search.settings.templates.escape;return t.results!==i?(e.each(t.results,function(t,a){a.results!==i&&a.results.length>0&&(n+='<div class="category"><div class="name">'+a.name+"</div>",e.each(a.results,function(e,t){n+='<div class="result">',t.url&&(n+='<a href="'+t.url+'"></a>'),t.image!==i&&(t.image=o(t.image),n+='<div class="image"> <img src="'+t.image+'" alt=""></div>'),n+='<div class="content">',t.price!==i&&(t.price=o(t.price),n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(t.title=o(t.title),n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div></div>"}),n+="</div>")}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1},standard:function(t){var n="";return t.results!==i?(e.each(t.results,function(e,t){n+=t.url?'<a class="result" href="'+t.url+'">':'<a class="result">',t.image!==i&&(n+='<div class="image"> <img src="'+t.image+'"></div>'),n+='<div class="content">',t.price!==i&&(n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div>",n+="</a>"}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),f=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,m,g,p=r.selector||"",v=e.extend(!0,{},e.fn.shape.settings,o),h=v.namespace,b=v.selector,y=v.error,x=v.className,w="."+h,C="module-"+h,T=e(this),k=T.find(b.sides),S=T.find(b.side),A=!1,P=this,E=T.data(C);g={initialize:function(){g.verbose("Initializing module for",P),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),E=g,T.data(C,E)},destroy:function(){g.verbose("Destroying previous module for",P),T.removeData(C).off(w)},refresh:function(){g.verbose("Refreshing selector cache for",P),T=e(P),k=e(this).find(b.shape),S=e(this).find(b.side)},repaint:function(){g.verbose("Forcing repaint event");{var e=k.get(0)||n.createElement("div");e.offsetWidth}},animate:function(e,n){g.verbose("Animating box with properties",e),n=n||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},v.beforeChange.call(m.get()),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),T.addClass(x.animating),k.css(e).one(g.get.transitionEvent(),n),g.set.duration(v.duration),f(function(){T.addClass(x.animating),t.addClass(x.hidden)})):n()},queue:function(e){g.debug("Queueing animation of",e),k.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){T.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),T.removeClass(x.animating).attr("style","").removeAttr("style"),k.attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style").removeClass(x.hidden),m.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return S.filter("."+x.active)[0]==m[0]},animating:function(){return T.hasClass(x.animating)}},set:{defaultSide:function(){t=T.find("."+v.className.active),m=t.next(b.side).length>0?t.next(b.side):T.find(b.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",m)},duration:function(e){e=e||v.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting animation duration",e),k.add(S).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},stageSize:function(){var e=T.clone().addClass(x.loading),t=e.find("."+v.className.active),n=A?e.find(b.side).eq(A):t.next(b.side).length>0?t.next(b.side):e.find(b.side).first(),i={};t.removeClass(x.active),n.addClass(x.active),e.insertAfter(T),i={width:n.outerWidth(),height:n.outerHeight()},e.remove(),T.css(i),g.verbose("Resizing stage to fit new content",i)},nextSide:function(e){A=e,m=S.filter(e),A=S.index(m),0===m.length&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",m)},active:function(){g.verbose("Setting new side to active",m),S.removeClass(x.active),m.addClass(x.active),v.onChange.call(m.get()),g.set.defaultSide()}},flip:{up:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip up"):(g.debug("Flipping up",m),g.set.stageSize(),g.stage.above(),g.animate(g.get.transform.up()))):void g.debug("Side already visible",m)},down:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip down"):(g.debug("Flipping down",m),g.set.stageSize(),g.stage.below(),g.animate(g.get.transform.down()))):void g.debug("Side already visible",m)},left:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip left"):(g.debug("Flipping left",m),g.set.stageSize(),g.stage.left(),g.animate(g.get.transform.left()))):void g.debug("Side already visible",m)},right:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip right"):(g.debug("Flipping right",m),g.set.stageSize(),g.stage.right(),g.animate(g.get.transform.right()))):void g.debug("Side already visible",m)},over:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",m),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over()))):void g.debug("Side already visible",m)},back:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",m),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back()))):void g.debug("Side already visible",m)}},get:{transform:{up:function(){var e={y:-((t.outerHeight()-m.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(-90deg)"}},down:function(){var e={y:-((t.outerHeight()-m.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(90deg)"}},left:function(){var e={x:-((t.outerWidth()-m.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(90deg)"}},right:function(){var e={x:-((t.outerWidth()-m.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(-90deg)"}},over:function(){var e={x:-((t.outerWidth()-m.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(180deg)"}},back:function(){var e={x:-((t.outerWidth()-m.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(b.side).length>0?t.next(b.side):T.find(b.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight()-m.outerHeight())/2,depth:{active:m.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as above",m,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight()-m.outerHeight())/2,depth:{active:m.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as below",m,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e={origin:(t.outerWidth()-m.outerWidth())/2,depth:{active:m.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",m,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-90deg) translateZ("+e.depth.next+"px)"})},right:function(){var e={origin:(t.outerWidth()-m.outerWidth())/2,depth:{active:m.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",m,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(90deg) translateZ("+e.depth.next+"px)"})},behind:function(){var e={origin:(t.outerWidth()-m.outerWidth())/2,depth:{active:m.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as behind",m,e),t.css({transform:"rotateY(0deg)"}),m.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,c,l=E;return n=n||d,o=P||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},u?(E===i&&g.initialize(),g.invoke(l)):(E!==i&&g.destroy(),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",debug:!1,verbose:!0,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:700,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sidebar=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("html"),u=e("head"),d=r.selector||"",f=(new Date).getTime(),m=[],g=arguments[0],p="string"==typeof g,v=[].slice.call(arguments,1),h=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,y,x,w,C,T=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),k=T.selector,S=T.className,A=T.namespace,P=T.regExp,E=T.error,F="."+A,R="module-"+A,D=e(this),O=e(T.context),z=D.children(k.sidebar),j=O.children(k.fixed),q=O.children(k.pusher),N=this,I=D.data(R);C={initialize:function(){C.debug("Initializing sidebar",o),C.create.id(),w=C.get.transitionEvent(),("auto"==T.useLegacy&&C.is.legacy()||T.useLegacy===!0)&&(T.transition="overlay",T.useLegacy=!0),C.is.ios()&&C.set.ios(),T.delaySetup?h(C.setup.layout):C.setup.layout(),C.instantiate()},instantiate:function(){C.verbose("Storing instance of module",C),I=C,D.data(R,C)},create:{id:function(){C.verbose("Creating unique id for element"),y=C.get.uniqueID(),b="."+y}},destroy:function(){C.verbose("Destroying previous module for",D),C.remove.direction(),D.off(F).removeData(R),O.off(b),s.off(b),c.off(b)},event:{clickaway:function(e){var t=q.find(e.target).length>0||q.is(e.target),n=O.is(e.target);t&&(C.verbose("User clicked on dimmed page"),C.hide()),n&&(C.verbose("User clicked on dimmable context (scaled out page)"),C.hide())},touch:function(){},containScroll:function(){N.scrollTop<=0&&(N.scrollTop=1),N.scrollTop+N.offsetHeight>=N.scrollHeight&&(N.scrollTop=N.scrollHeight-N.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(k.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){C.verbose("Adding clickaway events to context",O),T.closable&&O.on("click"+b,C.event.clickaway).on("touchend"+b,C.event.clickaway)},scrollLock:function(){T.scrollLock&&(C.debug("Disabling page scroll"),s.on("DOMMouseScroll"+b,C.event.scroll)),C.verbose("Adding events to contain sidebar scroll"),c.on("touchmove"+b,C.event.touch),D.on("scroll"+F,C.event.containScroll)
}},unbind:{clickaway:function(){C.verbose("Removing clickaway events from context",O),O.off(b)},scrollLock:function(){C.verbose("Removing scroll lock from page"),c.off(b),s.off(b),D.off("scroll"+F)}},add:{bodyCSS:function(){var t,n=D.outerWidth(),i=D.outerHeight(),o=C.get.direction(),a={left:n,right:-n,top:i,bottom:-i};C.is.rtl()&&(C.verbose("RTL detected, flipping widths"),a.left=-n,a.right=n),t='<style title="'+A+'">',"left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),C.is.ie()&&("left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),t+=" .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),t+="</style>",u.append(t),r=e("style[title="+A+"]"),C.debug("Adding sizing css to head",r)}},refresh:function(){C.verbose("Refreshing selector cache"),O=e(T.context),z=O.children(k.sidebar),q=O.children(k.pusher),j=O.children(k.fixed)},refreshSidebars:function(){C.verbose("Refreshing other sidebars"),z=O.children(k.sidebar)},repaint:function(){C.verbose("Forcing repaint event"),N.style.display="none",N.offsetHeight,N.scrollTop=N.scrollTop,N.style.display=""},setup:{layout:function(){0===O.children(k.pusher).length&&(C.debug("Adding wrapper element for sidebar"),C.error(E.pusher),q=e('<div class="pusher" />'),O.children().not(k.omitted).not(z).wrapAll(q),C.refresh()),(0===D.nextAll(k.pusher).length||D.nextAll(k.pusher)[0]!==q[0])&&(C.debug("Moved sidebar to correct parent element"),C.error(E.movedSidebar,N),D.detach().prependTo(O),C.refresh()),C.set.pushable(),C.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(C[n])?C[n]:C.toggle,i.length>0?(C.debug("Attaching sidebar events to element",t,n),i.on("click"+F,n)):C.error(E.notFound,t)},show:function(t){var n=T.useLegacy===!0?C.legacyPushPage:C.pushPage;t=e.isFunction(t)?t:function(){},C.is.hidden()?(C.refreshSidebars(),T.overlay&&(C.error(E.overlay),T.transition="overlay"),C.refresh(),C.othersActive()&&"overlay"!==C.get.transition()&&(C.debug("Other sidebars currently visible"),T.transition="overlay",T.exclusive&&C.hideOthers()),n(function(){t.call(N),T.onShow.call(N)}),T.onChange.call(N),T.onVisible.call(N)):C.debug("Sidebar is already visible")},hide:function(t){var n=T.useLegacy===!0?C.legacyPullPage:C.pullPage;t=e.isFunction(t)?t:function(){},(C.is.visible()||C.is.animating())&&(C.debug("Hiding sidebar",t),C.refreshSidebars(),n(function(){t.call(N),T.onHidden.call(N)}),T.onChange.call(N),T.onHide.call(N))},othersAnimating:function(){return z.not(D).filter("."+S.animating).length>0},othersVisible:function(){return z.not(D).filter("."+S.visible).length>0},othersActive:function(){return C.othersVisible()||C.othersAnimating()},hideOthers:function(e){var t=z.not(D).filter("."+S.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){i++,i==n&&e()})},toggle:function(){C.verbose("Determining toggled direction"),C.is.hidden()?C.show():C.hide()},pushPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"===o||C.othersActive()?D:q;t=e.isFunction(t)?t:function(){},"scale down"==T.transition&&C.scrollToTop(),C.set.transition(o),C.repaint(),n=function(){C.bind.clickaway(),C.add.bodyCSS(),C.set.animating(),C.set.visible(),C.othersVisible()||T.dimPage&&q.addClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.bind.scrollLock(),t.call(N))},a.off(w+b),a.on(w+b,i),h(n)},pullPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"==o||C.othersActive()?D:q;t=e.isFunction(t)?t:function(){},C.verbose("Removing context push state",C.get.direction()),C.set.transition(o),C.unbind.clickaway(),C.unbind.scrollLock(),n=function(){C.set.animating(),C.remove.visible(),T.dimPage&&!C.othersVisible()&&q.removeClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.remove.transition(),C.remove.bodyCSS(),("scale down"==o||T.returnScroll&&C.is.mobile())&&C.scrollBack(),t.call(N))},a.off(w+b),a.on(w+b,i),h(n)},legacyPushPage:function(t){var n=D.width(),i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]=n,C.debug("Using javascript to push context",o),C.set.visible(),C.set.transition(),C.set.animating(),T.dimPage&&q.addClass(S.dimmed),O.css("position","relative").animate(o,T.duration,T.easing,function(){C.remove.animating(),C.bind.clickaway(),t.call(N)})},legacyPullPage:function(t){var n=0,i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]="0px",C.debug("Using javascript to pull context",o),C.unbind.clickaway(),C.set.animating(),C.remove.visible(),T.dimPage&&!C.othersActive()&&q.removeClass(S.dimmed),O.css("position","relative").animate(o,T.duration,T.easing,function(){C.remove.animating(),t.call(N)})},scrollToTop:function(){C.verbose("Scrolling to top of page to avoid animation issues"),x=e(t).scrollTop(),D.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){C.verbose("Scrolling back to original page position"),t.scrollTo(0,x)},set:{ios:function(){l.addClass(S.ios)},pushed:function(){O.addClass(S.pushed)},pushable:function(){O.addClass(S.pushable)},active:function(){D.addClass(S.active)},animating:function(){D.addClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.addClass(e)},direction:function(e){e=e||C.get.direction(),D.addClass(S[e])},visible:function(){D.addClass(S.visible)},overlay:function(){D.addClass(S.overlay)}},remove:{bodyCSS:function(){C.debug("Removing body css styles",r),r&&r.length>0&&r.remove()},pushed:function(){O.removeClass(S.pushed)},pushable:function(){O.removeClass(S.pushable)},active:function(){D.removeClass(S.active)},animating:function(){D.removeClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.removeClass(e)},direction:function(e){e=e||C.get.direction(),D.removeClass(S[e])},visible:function(){D.removeClass(S.visible)},overlay:function(){D.removeClass(S.overlay)}},get:{direction:function(){return D.hasClass(S.top)?S.top:D.hasClass(S.right)?S.right:D.hasClass(S.bottom)?S.bottom:S.left},transition:function(){var e,t=C.get.direction();return e=C.is.mobile()?"auto"==T.mobileTransition?T.defaultTransition.mobile[t]:T.mobileTransition:"auto"==T.transition?T.defaultTransition.computer[t]:T.transition,C.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},is:{ie:function(){var e=!t.ActiveXObject&&"ActiveXObject"in t,n="ActiveXObject"in t;return e||n},legacy:function(){var e,o=n.createElement("div"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};n.body.insertBefore(o,null);for(var r in a)o.style[r]!==i&&(o.style[r]="translate3d(1px,1px,1px)",e=t.getComputedStyle(o).getPropertyValue(a[r]));return n.body.removeChild(o),!(e!==i&&e.length>0&&"none"!==e)},ios:function(){var e=navigator.userAgent,t=e.match(P.ios);return t?(C.verbose("Browser was found to be iOS",e),!0):!1},mobile:function(){var e=navigator.userAgent,t=e.match(P.mobile);return t?(C.verbose("Browser was found to be mobile",e),!0):(C.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!C.is.visible()},visible:function(){return D.hasClass(S.visible)},open:function(){return C.is.visible()},closed:function(){return C.is.hidden()},vertical:function(){return D.hasClass(S.top)},animating:function(){return O.hasClass(S.animating)},rtl:function(){return"rtl"==D.css("direction")}},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){T.debug&&(T.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,T.name+":"),C.debug.apply(console,arguments)))},verbose:function(){T.verbose&&T.debug&&(T.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,T.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,T.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;T.performance&&(t=(new Date).getTime(),i=f||t,n=t-i,f=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:N,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,100)},display:function(){var t=T.name+":",n=0;f=!1,clearTimeout(C.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",d&&(t+=" '"+d+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,c,l=I;return n=n||v,o=N||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(C.error(E.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},p?(I===i&&C.initialize(),C.invoke(g)):(I!==i&&C.invoke("destroy"),C.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",debug:!1,verbose:!0,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,useLegacy:"auto",duration:500,easing:"easeInOutQuint",onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}},e.extend(e.easing,{easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sticky=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m,g=e.extend(!0,{},e.fn.sticky.settings,n),p=g.className,v=g.namespace,h=g.error,b="."+v,y="module-"+v,x=e(this),w=e(t),C=x.offsetParent(),T=e(g.scrollContext),k=(x.selector||"",x.data(y)),S=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},A=this;m={initialize:function(){return a=g.context?e(g.context):C,0===a.length?void m.error(h.invalidContext,g.context,x):(m.verbose("Initializing sticky",g,C),m.save.positions(),m.is.hidden()&&m.error(h.visible,x),m.cache.element.height>m.cache.context.height?(m.reset(),void m.error(h.elementSize,x)):(w.on("resize"+b,m.event.resize),T.on("scroll"+b,m.event.scroll),m.observeChanges(),void m.instantiate()))},instantiate:function(){m.verbose("Storing instance of module",m),k=m,x.data(y,m)},destroy:function(){m.verbose("Destroying previous module"),m.reset(),f&&f.disconnect(),w.off("resize"+b,m.event.resize),T.off("scroll"+b,m.event.scroll),x.removeData(y)},observeChanges:function(){var e=a[0];g.observeChanges&&"MutationObserver"in t&&(f=new MutationObserver(function(){clearTimeout(m.timer),m.timer=setTimeout(function(){m.verbose("DOM tree modified, updating sticky menu"),m.refresh()},200)}),f.observe(A,{childList:!0,subtree:!0}),f.observe(e,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",f))},event:{resize:function(){S(function(){m.refresh(),m.stick()})},scroll:function(){S(function(){m.stick(),g.onScroll.call(A)})}},refresh:function(e){m.reset(),e&&(C=x.offsetParent()),m.save.positions(),m.stick(),g.onReposition.call(A)},supports:{sticky:function(){{var t=e("<div/>");t.get()}return t.addClass(p.supported),t.css("position").match("sticky")}},save:{scroll:function(e){m.lastScroll=e},positions:function(){var e={height:w.height()},t={margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()},n={offset:a.offset(),height:a.outerHeight()};m.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},m.set.containerSize(),m.set.size(),m.stick(),m.debug("Caching element positions",m.cache)}},get:{direction:function(e){var t="down";return e=e||T.scrollTop(),m.lastScroll!==i&&(m.lastScroll<e?t="down":m.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||T.scrollTop(),m.lastScroll?e-m.lastScroll:0},currentElementScroll:function(){return m.is.top()?Math.abs(parseInt(x.css("top"),10))||0:Math.abs(parseInt(x.css("bottom"),10))||0},elementScroll:function(e){e=e||T.scrollTop();var t,n=m.cache.element,i=m.cache.window,o=m.get.scrollChange(e),a=n.height-i.height+g.offset,r=m.get.currentElementScroll(),s=r+o;return t=m.cache.fits||0>s?0:s>a?a:s}},remove:{offset:function(){x.css("margin-top","")}},set:{offset:function(){m.verbose("Setting offset on element",g.offset),x.css("margin-top",g.offset)},containerSize:function(){var e=C.get(0).tagName;"HTML"===e||"body"==e?C=x.offsetParent():(m.debug("Settings container size",m.cache.context.height),C.height(m.cache.context.height))},scroll:function(e){m.debug("Setting scroll on element",e),m.is.top()&&x.css("bottom","").css("top",-e),m.is.bottom()&&x.css("top","").css("bottom",e)},size:function(){0!==m.cache.element.height&&0!==m.cache.element.width&&x.css({width:m.cache.element.width,height:m.cache.element.height})}},is:{top:function(){return x.hasClass(p.top)},bottom:function(){return x.hasClass(p.bottom)},initialPosition:function(){return!m.is.fixed()&&!m.is.bound()},hidden:function(){return!x.is(":visible")},bound:function(){return x.hasClass(p.bound)},fixed:function(){return x.hasClass(p.fixed)}},stick:function(){var e=m.cache,t=e.fits,n=e.element,i=e.window,o=e.context,a=m.is.bottom()&&g.pushing?g.bottomOffset:g.offset,r={top:T.scrollTop()+a,bottom:T.scrollTop()+a+i.height},s=(m.get.direction(r.top),m.get.elementScroll(r.top)),c=!t,l=0!==n.height;m.save.scroll(r.top),l&&(m.is.initialPosition()?r.top>=n.top&&(m.debug("Element passed, fixing element to page"),m.fixTop()):m.is.fixed()?m.is.top()?r.top<n.top?(m.debug("Fixed element reached top of container"),m.setInitialPosition()):n.height+r.top-s>o.bottom?(m.debug("Fixed element reached bottom of container"),m.bindBottom()):c&&m.set.scroll(s):m.is.bottom()&&(r.bottom-n.height<n.top?(m.debug("Bottom fixed rail has reached top of container"),m.setInitialPosition()):r.bottom>o.bottom?(m.debug("Bottom fixed rail has reached bottom of container"),m.bindBottom()):c&&m.set.scroll(s)):m.is.bottom()&&(g.pushing?m.is.bound()&&r.bottom<o.bottom&&(m.debug("Fixing bottom attached element to bottom of browser."),m.fixBottom()):m.is.bound()&&r.top<o.bottom-n.height&&(m.debug("Fixing bottom attached element to top of browser."),m.fixTop())))},bindTop:function(){m.debug("Binding element to top of parent container"),m.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.bottom).addClass(p.bound).addClass(p.top),g.onTop.call(A),g.onUnstick.call(A)},bindBottom:function(){m.debug("Binding element to bottom of parent container"),m.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.top).addClass(p.bound).addClass(p.bottom),g.onBottom.call(A),g.onUnstick.call(A)},setInitialPosition:function(){m.unfix(),m.unbind()},fixTop:function(){m.debug("Fixing element to top of page"),m.set.offset(),x.css("left",m.cache.element.left).removeClass(p.bound).removeClass(p.bottom).addClass(p.fixed).addClass(p.top),g.onStick.call(A)},fixBottom:function(){m.debug("Sticking element to bottom of page"),m.set.offset(),x.css("left",m.cache.element.left).removeClass(p.bound).removeClass(p.top).addClass(p.fixed).addClass(p.bottom),g.onStick.call(A)},unbind:function(){m.debug("Removing absolute position on element"),m.remove.offset(),x.removeClass(p.bound).removeClass(p.top).removeClass(p.bottom)},unfix:function(){m.debug("Removing fixed position on element"),m.remove.offset(),x.removeClass(p.fixed).removeClass(p.top).removeClass(p.bottom),g.onUnstick.call(A)},reset:function(){m.debug("Reseting elements position"),m.unbind(),m.unfix(),m.resetCSS()},resetCSS:function(){x.css({top:"",bottom:"",width:"",height:""}),C.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,0)},display:function(){var t=g.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=k;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(k===i&&m.initialize(),m.invoke(l)):(k!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!1,performance:!1,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,observeChanges:!0,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.tab=function(n){var o,a,r=e(e.isFunction(this)?t:this),s=e.isPlainObject(n)?e.extend(!0,{},e.fn.tab.settings,n):e.extend({},e.fn.tab.settings),c=r.selector||"",l=(new Date).getTime(),u=[],d=arguments[0],f="string"==typeof d,m=[].slice.call(arguments,1);return r.each(function(){var n,g,p,v,h,b=s.className,y=s.metadata,x=s.selector,w=s.error,C="."+s.namespace,T="module-"+s.namespace,k=e(this),S={},A=!0,P=0,E=this,F=k.data(T);o={initialize:function(){o.debug("Initializing tab menu item",k),o.determineTabs(),o.debug("Determining tabs",s.context,g),s.auto&&(o.verbose("Setting up automatic tab retrieval from server"),s.apiSettings={url:s.path+"/{$tab}"}),e.isWindow(E)||(o.debug("Attaching tab activation events to element",k),k.on("click"+C,o.event.click)),o.instantiate()},determineTabs:function(){var t;"parent"===s.context?(k.closest(x.ui).length>0?(t=k.closest(x.ui),o.verbose("Using closest UI element for determining parent",t)):t=k,n=t.parent(),o.verbose("Determined parent element for creating context",n)):s.context?(n=e(s.context),o.verbose("Using selector for tab context",s.context,n)):n=e("body"),s.childrenOnly?(g=n.children(x.tabs),o.debug("Searching tab context children for tabs",n,g)):(g=n.find(x.tabs),o.debug("Searching tab context for tabs",n,g))},initializeHistory:function(){if(s.history){if(o.debug("Initializing page state"),e.address===i)return o.error(w.state),!1;if("state"==s.historyType){if(o.debug("Using HTML5 to manage state"),s.path===!1)return o.error(w.path),!1;e.address.history(!0).state(s.path)}e.address.bind("change",o.event.history.change)}},instantiate:function(){o.verbose("Storing instance of module",o),F=o,k.data(T,o)},destroy:function(){o.debug("Destroying tabs",k),k.removeData(T).off(C)},event:{click:function(t){var n=e(this).data(y.tab);n!==i?(s.history?(o.verbose("Updating page state",t),e.address.value(n)):(o.verbose("Changing tab",t),o.changeTab(n)),t.preventDefault()):o.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||o.get.initialPath(),a=s.templates.determineTitle(n)||!1;o.performance.display(),o.debug("History change event",n,t),h=t,n!==i&&o.changeTab(n),a&&e.address.title(a)}}},refresh:function(){p&&(o.debug("Refreshing tab",p),o.changeTab(p))},cache:{read:function(e){return e!==i?S[e]:!1},add:function(e,t){e=e||p,o.debug("Adding cached content for",e),S[e]=t},remove:function(e){e=e||p,o.debug("Removing cached content for",e),delete S[e]}},set:{state:function(t){e.address.value(t)}},changeTab:function(i){var a=t.history&&t.history.pushState,r=a&&s.ignoreFirstLoad&&A,c=s.auto||e.isPlainObject(s.apiSettings),l=c&&!r?o.utilities.pathToArray(i):o.get.defaultPathArray(i);i=o.utilities.arrayToPath(l),e.each(l,function(t,a){var u,d,f,m,g=l.slice(0,t+1),b=o.utilities.arrayToPath(g),y=o.is.tab(b),x=t+1==l.length,C=o.get.tabElement(b);if(o.verbose("Looking for tab",a),y){if(o.verbose("Tab was found",a),p=b,v=o.utilities.filterArray(l,g),x?m=!0:(d=l.slice(0,t+2),f=o.utilities.arrayToPath(d),m=!o.is.tab(f),m&&o.verbose("Tab parameters found",d)),m&&c)return r?(o.debug("Ignoring remote content on first tab load",b),A=!1,o.cache.add(i,C.html()),o.activate.all(b),s.onTabInit.call(C,b,v,h),s.onTabLoad.call(C,b,v,h)):(o.activate.navigation(b),o.content.fetch(b,i)),!1;o.debug("Opened local tab",b),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),s.onTabLoad.call(C,b,v,h)}else{if(-1!=i.search("/")||""===i)return o.error(w.missingTab,k,n,b),!1;if(u=e("#"+i+', a[name="'+i+'"]'),b=u.closest("[data-tab]").data("tab"),C=o.get.tabElement(b),u&&u.length>0&&b)return o.debug("No tab found, but deep anchor link present, opening parent tab"),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),!1}})},content:{fetch:function(t,n){var a,r,c=o.get.tabElement(t),l={dataType:"html",stateContext:c,onSuccess:function(e){o.cache.add(n,e),o.content.update(t,e),t==p?(o.debug("Content loaded",t),o.activate.tab(t)):o.debug("Content loaded in background",t),s.onTabInit.call(c,t,v,h),s.onTabLoad.call(c,t,v,h)},urlData:{tab:n}},u=c.data(y.promise)||!1,d=u&&"pending"===u.state();n=n||t,r=o.cache.read(n),s.cache&&r?(o.debug("Showing existing content",n),o.content.update(t,r),o.activate.tab(t),s.onTabLoad.call(c,t,v,h)):d?(o.debug("Content is already loading",n),c.addClass(b.loading)):e.api!==i?(a=e.extend(!0,{headers:{"X-Remote":!0}},s.apiSettings,l),o.debug("Retrieving remote content",n,a),e.api(a)):o.error(w.api)},update:function(e,t){o.debug("Updating html for",e);var n=o.get.tabElement(e);n.html(t)}},activate:{all:function(e){o.activate.tab(e),o.activate.navigation(e)},tab:function(e){var t=o.get.tabElement(e);o.verbose("Showing tab content for",t),t.addClass(b.active).siblings(g).removeClass(b.active+" "+b.loading)},navigation:function(e){var t=o.get.navElement(e);o.verbose("Activating tab navigation for",t,e),t.addClass(b.active).siblings(r).removeClass(b.active+" "+b.loading)}},deactivate:{all:function(){o.deactivate.navigation(),o.deactivate.tabs()},navigation:function(){r.removeClass(b.active)},tabs:function(){g.removeClass(b.active+" "+b.loading)}},is:{tab:function(e){return e!==i?o.get.tabElement(e).length>0:!1}},get:{initialPath:function(){return r.eq(0).data(y.tab)||g.eq(0).data(y.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return o.utilities.pathToArray(o.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+y.tab+'^="'+e+'/"]').eq(0),n=t.data(y.tab)||!1;if(n){if(o.debug("Found default tab",n),P<s.maxDepth)return P++,o.get.defaultPath(n);o.error(w.recursion)}else o.debug("No default tabs found for",e,g);return P=0,e},navElement:function(e){return e=e||p,r.filter("[data-"+y.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,a;return e=e||p,i=o.utilities.pathToArray(e),a=o.utilities.last(i),t=g.filter("[data-"+y.tab+'="'+a+'"]'),n=g.filter("[data-"+y.tab+'="'+e+'"]'),t.length>0?t:n},tab:function(){return p}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return e.isArray(t)?t[t.length-1]:!1},pathToArray:function(e){return e===i&&(e=p),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return e.isArray(t)?t.join("/"):!1}},setting:function(t,n){if(o.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(n===i)return o[t];o[t]=n}},debug:function(){s.debug&&(s.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,s.name+":"),o.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),o.verbose.apply(console,arguments)))},error:function(){o.error=Function.prototype.bind.call(console.error,console,s.name+":"),o.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;s.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,100)},display:function(){var t=s.name+":",n=0;l=!1,clearTimeout(o.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,r){var s,c,l,u=F;return n=n||m,r=E||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,a){var r=n!=s?a+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||n==s)return u[a]!==i?(c=u[a],!1):(o.error(w.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},f?(F===i&&o.initialize(),o.invoke(d)):(F!==i&&o.destroy(),o.initialize())}),o&&!f&&o.initializeHistory(),a!==i?a:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",debug:!1,verbose:!0,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,alwaysRefresh:!1,cache:!0,ignoreFirstLoad:!1,apiSettings:!1,onTabInit:function(){},onTabLoad:function(){},templates:{determineTitle:function(){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found for this context.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.transition=function(){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments,u=l[0],d=[].slice.call(arguments,1),f="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var t,m,g,p,v,h,b,y,x,w,C,T,k=e(this),S=this;T={initialize:function(){w="module-"+x,t=T.get.settings.apply(S,l),p=t.className,v=t.metadata,h=T.get.animationStartEvent(),b=T.get.animationEndEvent(),y=T.get.animationName(),g=t.error,x=t.namespace,C="."+t.namespace,m=k.data(w)||T,f&&(f=T.invoke(u)),f===!1&&(T.verbose("Converted arguments into settings object",t),T.animate(),T.instantiate())},instantiate:function(){T.verbose("Storing instance of module",T),k.data(w,m)},destroy:function(){T.verbose("Destroying previous module for",S),k.removeData(w)},refresh:function(){T.verbose("Refreshing display type on next animation"),delete T.displayType},forceRepaint:function(){T.verbose("Forcing element repaint");var e=k.parent(),t=k.next();0===t.length?k.detach().appendTo(e):k.detach().insertBefore(t)},repaint:function(){T.verbose("Repainting element");S.offsetWidth},animate:function(e){if(t=e||t,!T.is.supported())return T.error(g.support),!1;if(T.debug("Preparing animation",t.animation),T.is.animating()){if(t.queue)return!t.allowRepeats&&T.has.direction()&&T.is.occurring()&&T.queuing!==!0?T.debug("Animation is currently occurring, preventing queueing same animation",t.animation):T.queue(t.animation),!1;
if(!t.allowRepeats&&T.is.occurring())return T.debug("Animation is already occurring, will not execute repeated animation",t.animation),!1}T.can.animate()?T.set.animating(t.animation):T.error(g.noAnimation,t.animation,S)},reset:function(){T.debug("Resetting animation to beginning conditions"),T.remove.animationEndCallback(),T.restore.conditions(),T.remove.animating()},queue:function(e){T.debug("Queueing animation of",e),T.queuing=!0,k.one(b+C,function(){T.queuing=!1,T.repaint(),T.animate.apply(this,t)})},complete:function(){T.verbose("CSS animation complete",t.animation),T.remove.animationEndCallback(),T.remove.failSafe(),T.is.looping()||(T.is.outward()?(T.verbose("Animation is outward, hiding element"),T.restore.conditions(),T.hide(),t.onHide.call(this)):T.is.inward()?(T.verbose("Animation is outward, showing element"),T.restore.conditions(),T.show(),T.set.display(),t.onShow.call(this)):T.restore.conditions(),T.remove.animation(),T.remove.animating()),t.onComplete.call(this)},has:{direction:function(n){var i=!1;return n=n||t.animation,"string"==typeof n&&(n=n.split(" "),e.each(n,function(e,t){(t===p.inward||t===p.outward)&&(i=!0)})),i},inlineDisplay:function(){var t=k.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){e=e||t.animation,T.is.animating()||T.save.conditions(),T.remove.direction(),T.remove.animationEndCallback(),T.can.transition()&&!T.has.direction()&&T.set.direction(),T.remove.hidden(),T.set.display(),k.addClass(p.animating+" "+p.transition+" "+e).addClass(e).one(b+".complete"+C,T.complete),t.useFailSafe&&T.add.failSafe(),T.set.duration(t.duration),t.onStart.call(this),T.debug("Starting tween",e,k.attr("class"))},duration:function(e,n){n=n||t.duration,n="number"==typeof n?n+"ms":n,T.verbose("Setting animation duration",n),(n||0===n)&&k.css({"-webkit-animation-duration":n,"-moz-animation-duration":n,"-ms-animation-duration":n,"-o-animation-duration":n,"animation-duration":n})},display:function(){var e=T.get.style(),t=T.get.displayType(),n=e+"display: "+t+" !important;";k.css("display",""),T.refresh(),k.css("display")!==t&&(T.verbose("Setting inline visibility to",t),k.attr("style",n))},direction:function(){k.is(":visible")&&!T.is.hidden()?(T.debug("Automatically determining the direction of animation","Outward"),k.removeClass(p.inward).addClass(p.outward)):(T.debug("Automatically determining the direction of animation","Inward"),k.removeClass(p.outward).addClass(p.inward))},looping:function(){T.debug("Transition set to loop"),k.addClass(p.looping)},hidden:function(){T.is.hidden()||(k.addClass(p.transition).addClass(p.hidden),"none"!==k.css("display")&&(T.verbose("Overriding default display to hide element"),k.css("display","none")))},visible:function(){k.addClass(p.transition).addClass(p.visible)}},save:{displayType:function(e){k.data(v.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,T.verbose("Saving existence of transition",t,n)},conditions:function(){k.attr("class")||!1,k.attr("style")||"";k.removeClass(t.animation),T.remove.direction(),T.cache={className:k.attr("class"),style:T.get.style()},T.verbose("Saving original attributes",T.cache)}},restore:{conditions:function(){return T.cache===i?!1:(T.cache.className?k.attr("class",T.cache.className):k.removeAttr("class"),T.cache.style&&(T.verbose("Restoring original style attribute",T.cache.style),k.attr("style",T.cache.style)),T.is.looping()&&T.remove.looping(),void T.verbose("Restoring original attributes",T.cache))}},add:{failSafe:function(){var e=T.get.duration();T.timer=setTimeout(T.complete,e+100),T.verbose("Adding fail safe timer",T.timer)}},remove:{animating:function(){k.removeClass(p.animating)},animation:function(){k.css({"-webkit-animation":"","-moz-animation":"","-ms-animation":"","-o-animation":"",animation:""})},animationEndCallback:function(){k.off(".complete")},display:function(){k.css("display","")},direction:function(){k.removeClass(p.inward).removeClass(p.outward)},failSafe:function(){T.verbose("Removing fail safe timer",T.timer),T.timer&&clearTimeout(T.timer)},hidden:function(){k.removeClass(p.hidden)},visible:function(){k.removeClass(p.visible)},looping:function(){T.debug("Transitions are no longer looping"),k.removeClass(p.looping),T.forceRepaint()},transition:function(){k.removeClass(p.visible).removeClass(p.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},duration:function(e){return e=e||t.duration,e===!1&&(e=k.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(){return t.displayType?t.displayType:(k.data(v.displayType)===i&&T.can.transition(!0),k.data(v.displayType))},style:function(){var e=k.attr("style")||"";return e.replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationName:function(){var e,t=n.createElement("div"),o={animation:"animationName",OAnimation:"oAnimationName",MozAnimation:"mozAnimationName",WebkitAnimation:"webkitAnimationName"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationStartEvent:function(){var e,t=n.createElement("div"),o={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{transition:function(n){var o,a,r,s,c,l=k.attr("class"),u=k.prop("tagName"),d=t.animation,f=T.get.transitionExists(d);if(f===i||n){if(T.verbose("Determining whether animation exists"),o=e("<"+u+" />").addClass(l).insertAfter(k),a=o.addClass(d).removeClass(p.inward).removeClass(p.outward).addClass(p.animating).addClass(p.transition).css(y),r=o.addClass(p.inward).css(y),c=o.attr("class",l).removeAttr("style").removeClass(p.hidden).removeClass(p.visible).show().css("display"),T.verbose("Determining final display state",c),o.remove(),a!=r)T.debug("Direction exists for animation",d),s=!0;else{if("none"==a||!a)return void T.debug("No animation defined in css",d);T.debug("Static animation found",d,c),s=!1}T.save.displayType(c),T.save.transitionExists(d,s)}return f!==i?f:s},animate:function(){return T.can.transition()!==i}},is:{animating:function(){return k.hasClass(p.animating)},inward:function(){return k.hasClass(p.inward)},outward:function(){return k.hasClass(p.outward)},looping:function(){return k.hasClass(p.looping)},occurring:function(e){return e=e||t.animation,e="."+e.replace(" ","."),k.filter(e).length>0},visible:function(){return k.is(":visible")},hidden:function(){return"hidden"===k.css("visibility")},supported:function(){return y!==!1&&b!==!1}},hide:function(){T.verbose("Hiding element"),T.is.animating()&&T.reset(),T.remove.display(),T.remove.visible(),T.set.hidden(),T.repaint()},show:function(e){T.verbose("Showing element",e),T.remove.hidden(),T.set.visible(),T.repaint()},start:function(){T.verbose("Starting animation"),k.removeClass(p.disabled)},stop:function(){T.debug("Stopping animation"),k.addClass(p.disabled)},toggle:function(){T.debug("Toggling play status"),k.toggleClass(p.disabled)},setting:function(n,o){if(T.debug("Changing setting",n,o),e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},debug:function(){t.debug&&(t.performance?T.performance.log(arguments):(T.debug=Function.prototype.bind.call(console.info,console,t.name+":"),T.debug.apply(console,arguments)))},verbose:function(){t.verbose&&t.debug&&(t.performance?T.performance.log(arguments):(T.verbose=Function.prototype.bind.call(console.info,console,t.name+":"),T.verbose.apply(console,arguments)))},error:function(){T.error=Function.prototype.bind.call(console.error,console,t.name+":"),T.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;t.performance&&(n=(new Date).getTime(),o=s||n,i=n-o,s=n,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":i})),clearTimeout(T.performance.timer),T.performance.timer=setTimeout(T.performance.display,600)},display:function(){var n=t.name+":",o=0;s=!1,clearTimeout(T.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",r&&(n+=" '"+r+"'"),a.length>1&&(n+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(n),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=m;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s!==i?s:!1}},T.initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",debug:!1,verbose:!0,performance:!0,namespace:"transition",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"There is no css animation matching the one you specified.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.video=function(n){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var f,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.video.settings,n):e.extend({},e.fn.video.settings),g=m.selector,p=m.className,v=m.error,h=m.metadata,b=m.namespace,y=m.templates,x="."+b,w="module-"+b,C=(e(t),e(this)),T=C.find(g.placeholder),k=C.find(g.playButton),S=C.find(g.embed),A=this,P=C.data(w);f={initialize:function(){f.debug("Initializing video"),f.create(),T.on("click"+x,f.play),k.on("click"+x,f.play),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),P=f,C.data(w,f)},create:function(){var e=C.data(h.image),t=y.video(e);C.html(t),f.refresh(),e||f.play(),f.debug("Creating html for video element",t)},destroy:function(){f.verbose("Destroying previous instance of video"),f.reset(),C.removeData(w).off(x),T.off(x),k.off(x)},refresh:function(){f.verbose("Refreshing selector cache"),T=C.find(g.placeholder),k=C.find(g.playButton),S=C.find(g.embed)},change:function(e,t,n){f.debug("Changing video to ",e,t,n),C.data(h.source,e).data(h.id,t).data(h.url,n),m.onChange()},reset:function(){f.debug("Clearing video embed and showing placeholder"),C.removeClass(p.active),S.html(" "),T.show(),m.onReset()},play:function(){f.debug("Playing video");var e=C.data(h.source)||!1,t=C.data(h.url)||!1,n=C.data(h.id)||!1;S.html(f.generate.html(e,n,t)),C.addClass(p.active),m.onPlay()},get:{source:function(e){return"string"!=typeof e?!1:-1!==e.search("youtube.com")?"youtube":-1!==e.search("vimeo.com")?"vimeo":!1},id:function(e){return e.match(m.regExp.youtube)?e.match(m.regExp.youtube)[1]:e.match(m.regExp.vimeo)?e.match(m.regExp.vimeo)[2]:!1}},generate:{html:function(e,t,n){f.debug("Generating embed html");var i;return e=e||m.source,t=t||m.id,e&&t||n?(e&&t||(e=f.get.source(n),t=f.get.id(n)),"vimeo"==e?i='<iframe src="//player.vimeo.com/video/'+t+"?="+f.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>':"youtube"==e&&(i='<iframe src="//www.youtube.com/embed/'+t+"?="+f.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')):f.error(v.noVideo),i},url:function(e){var t=m.api?1:0,n="auto"===m.autoplay?C.data("image")!==i:m.autoplay,o=m.hd?1:0,a=m.showUI?1:0,r=m.showUI?0:1,s="";return"vimeo"==e&&(s="api="+t+"&amp;title="+a+"&amp;byline="+a+"&amp;portrait="+a+"&amp;autoplay="+n,m.color&&(s+="&amp;color="+m.color)),"ustream"==e?(s="autoplay="+n,m.color&&(s+="&amp;color="+m.color)):"youtube"==e&&(s="enablejsapi="+t+"&amp;autoplay="+n+"&amp;autohide="+r+"&amp;hq="+o+"&amp;modestbranding=1",m.color&&(s+="&amp;color="+m.color)),s}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=P;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(v.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(P===i&&f.initialize(),f.invoke(l)):(P!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.video.settings={name:"Video",namespace:"video",debug:!1,verbose:!0,performance:!0,metadata:{id:"id",image:"image",source:"source",url:"url"},source:!1,url:!1,id:!1,aspectRatio:16/9,onPlay:function(){},onReset:function(){},onChange:function(){},onPause:function(){},onStop:function(){},width:"auto",height:"auto",autoplay:"auto",color:"#442359",hd:!0,showUI:!1,api:!0,regExp:{youtube:/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,vimeo:/http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/},error:{noVideo:"No video specified",method:"The method you called is not defined"},className:{active:"active"},selector:{embed:".embed",placeholder:".placeholder",playButton:".play"}},e.fn.video.settings.templates={video:function(e){var t="";return e&&(t+='<i class="video play icon"></i><img class="placeholder" src="'+e+'">'),t+='<div class="embed"></div>'}}}(jQuery,window,document),function(e,t,n,i){e.api=e.fn.api=function(n){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var t,a,f,m,g,p=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),v=p.namespace,h=p.metadata,b=p.selector,y=p.error,x=p.className,w="."+v,C="module-"+v,T=e(this),k=T.closest(b.form),S=p.stateContext?e(p.stateContext):T,A=this,P=S.get(),E=T.data(C);g={initialize:function(){var e=g.get.event();u||(e?(g.debug("Attaching API events to element",e),T.on(e+w,g.event.trigger)):"now"==p.on&&(g.debug("Querying API now",e),g.query())),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),E=g,T.data(C,E)},destroy:function(){g.verbose("Destroying previous module for",A),T.removeData(C).off(w)},query:function(){if(g.is.disabled())return void g.debug("Element is disabled API request aborted");if(g.is.loading()&&0===p.throttle)return void g.debug("Cancelling request, previous request is still pending");if(p.defaultData&&e.extend(!0,p.urlData,g.get.defaultData()),(p.serializeForm!==!1||S.is("form"))&&("json"==p.serializeForm?e.extend(!0,p.data,g.get.formData()):p.data=g.get.formData()),a=g.get.settings(),a===!1)return void g.error(y.beforeSend);if(p.url?(g.debug("Using specified url",f),f=g.add.urlData(p.url)):(f=g.add.urlData(g.get.templateURL()),g.debug("Added URL Data to url",f)),!f){if(!T.is("form"))return void g.error(y.missingURL,p.action);g.debug("No url or action specified, defaulting to form action"),f=T.attr("action")}g.set.loading(),t=e.extend(!0,{},p,{type:p.method||p.type,data:m,url:p.base+f,beforeSend:p.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),g.verbose("Creating AJAX request with settings",t),g.is.loading()?g.timer=setTimeout(function(){g.request=g.create.request(),g.xhr=g.create.xhr()},p.throttle):(g.request=g.create.request(),g.xhr=g.create.xhr())},is:{disabled:function(){return T.filter(p.filter).length>0},loading:function(){return g.request&&"pending"==g.request.state()}},was:{succesful:function(){return g.request&&"resolved"==g.request.state()},failure:function(){return g.request&&"rejected"==g.request.state()},complete:function(){return g.request&&("resolved"==g.request.state()||"rejected"==g.request.state())}},add:{urlData:function(t,n){var o,a;return t&&(o=t.match(p.regExp.required),a=t.match(p.regExp.optional),n=n||p.urlData,o&&(g.debug("Looking for required URL variables",o),e.each(o,function(o,a){var r=-1!==a.indexOf("$")?a.substr(2,a.length-3):a.substr(1,a.length-2),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):S.data(r)!==i?S.data(r):n[r];return s===i?(g.error(y.requiredParameter,r,t),t=!1,!1):(g.verbose("Found required variable",r,s),void(t=t.replace(a,s)))})),a&&(g.debug("Looking for optional URL variables",o),e.each(a,function(o,a){var r=-1!==a.indexOf("$")?a.substr(3,a.length-4):a.substr(2,a.length-3),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):S.data(r)!==i?S.data(r):n[r];s!==i?(g.verbose("Optional variable Found",r,s),t=t.replace(a,s)):(g.verbose("Optional variable not found",r),t=-1!==t.indexOf("/"+a)?t.replace("/"+a,""):t.replace(a,""))}))),t}},event:{trigger:function(e){g.query(),("submit"==e.type||"click"==e.type)&&e.preventDefault()},xhr:{always:function(){},done:function(e){var t=this,n=(new Date).getTime()-s,i=p.loadingDuration-n;i=i>0?i:0,setTimeout(function(){g.request.resolveWith(t,[e])},i)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-s,a=p.loadingDuration-o;a=a>0?a:0,setTimeout(function(){"abort"!==t?g.request.rejectWith(i,[e,t,n]):g.reset()},a)}},request:{complete:function(e){g.remove.loading(),p.onComplete.call(P,e,T)},done:function(t){g.debug("API Response Received",t),"json"==p.dataType&&e.isFunction(p.successTest)?(g.debug("Checking JSON returned success",p.successTest,t),p.successTest(t)?p.onSuccess.call(P,t,T):(g.debug("JSON test specified by user and response failed",t),p.onFailure.call(P,t,T))):p.onSuccess.call(P,t,T)},error:function(t,n,o){var a,r=p.error[n]!==i?p.error[n]:o;if(t!==i)if(t.readyState!==i&&4==t.readyState){if(200!=t.status&&o!==i&&""!==o)g.error(y.statusMessage+o);else if("error"==n&&"json"==p.dataType)try{a=e.parseJSON(t.responseText),a&&a.error!==i&&(r=a.error)}catch(s){g.error(y.JSONParse)}g.remove.loading(),g.set.error(),p.errorDuration&&setTimeout(g.remove.error,p.errorDuration),g.debug("API Request error:",r),p.onError.call(P,r,T)}else p.onAbort.call(P,r,T),g.debug("Request Aborted (Most likely caused by page change or CORS Policy)",n,o)}}},create:{request:function(){return e.Deferred().always(g.event.request.complete).done(g.event.request.done).fail(g.event.request.error)},xhr:function(){return e.ajax(t).always(g.event.xhr.always).done(g.event.xhr.done).fail(g.event.xhr.fail)}},set:{error:function(){g.verbose("Adding error state to element",S),S.addClass(x.error)},loading:function(){g.verbose("Adding loading state to element",S),S.addClass(x.loading)}},remove:{error:function(){g.verbose("Removing error state from element",S),S.removeClass(x.error)},loading:function(){g.verbose("Removing loading state from element",S),S.removeClass(x.loading)}},get:{request:function(){return g.request||!1},xhr:function(){return g.xhr||!1},settings:function(){var e;return e=p.beforeSend.call(T,p),e&&(e.success!==i&&(g.debug("Legacy success callback detected",e),g.error(y.legacyParameters,e.success),e.onSuccess=e.success),e.failure!==i&&(g.debug("Legacy failure callback detected",e),g.error(y.legacyParameters,e.failure),e.onFailure=e.failure),e.complete!==i&&(g.debug("Legacy complete callback detected",e),g.error(y.legacyParameters,e.complete),e.onComplete=e.complete)),e===i&&g.error(y.noReturnedValue),e!==i?e:p},defaultData:function(){var t={};return e.isWindow(A)||(T.is("input")?t.value=T.val():T.is("form")||(t.text=T.text())),t},event:function(){return e.isWindow(A)||"now"==p.on?(g.debug("API called without element, no events attached"),!1):"auto"==p.on?T.is("input")?A.oninput!==i?"input":A.onpropertychange!==i?"propertychange":"keyup":T.is("form")?"submit":"click":p.on},formData:function(){var t;return e(this).serializeObject()!==i?t=k.serializeObject():(g.error(y.missingSerialize),t=k.serialize()),g.debug("Retrieved form data",t),t},templateURL:function(e){var t;return e=e||T.data(h.action)||p.action||!1,e&&(g.debug("Looking up url for action",e,p.api),p.api[e]!==i?(t=p.api[e],g.debug("Found template url",t)):g.error(y.missingAction,p.action,p.api)),t}},abort:function(){var e=g.get.xhr();e&&"resolved"!==e.state()&&(g.debug("Cancelling API request"),e.abort(),g.request.rejectWith(p.apiSettings))},reset:function(){g.remove.error(),g.remove.loading()},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=E;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(g.error(y.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(E===i&&g.initialize(),g.invoke(l)):(E!==i&&g.destroy(),g.initialize())}),o!==i?o:this},e.api.settings={name:"API",namespace:"api",debug:!0,verbose:!0,performance:!0,on:"auto",filter:".disabled",stateContext:!1,loadingDuration:0,errorDuration:2e3,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,method:"get",data:{},dataType:"json",beforeSend:function(e){return e},beforeXHR:function(){},onSuccess:function(){},onComplete:function(){},onFailure:function(){},onError:function(){},onAbort:function(){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"Required dependency jquery-serialize-object missing, using basic serialize",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{form:"form"},metadata:{action:"action"}},e.api.settings.api={}}(jQuery,window,document),function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,f=s.className,m=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),h=[],b=arguments[0],y="string"==typeof b,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),T=(e(this).find(d.prompt),e(this).find(d.submit)),k=e(this).find(d.clear),S=e(this).find(d.reset),A=[],P=!1,E=this,F=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.set.defaults(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),F=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",F),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+m,t.event.field.keydown),o.on("submit"+m,t.validate.form),l.on("blur"+m,t.event.field.blur),t.attachEvents(T,"submit"),t.attachEvents(S,"reset"),t.attachEvents(k,"clear"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+m,t.event.field.change)})},clear:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(f.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(f.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("clear")):s?i.checkbox("uncheck"):(t.verbose("Resetting field value",n,r),n.val(""))})},reset:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(f.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(f.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("restore defaults")):s?(t.verbose("Resetting checkbox value",i,r),i.checkbox(r===!0?"check":"uncheck")):(t.verbose("Resetting field value",n,r),n.val(r))})},removeEvents:function(){o.off(m),l.off(m),T.off(m),l.off(m)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).length>0&&(T.addClass(f.pressed),P||(i.one("keyup"+m,t.event.field.keyup),t.submit(),t.debug("Enter pressed on input submitting form")),P=!0)},keyup:function(){P=!1,T.removeClass(f.pressed)},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(f.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(f.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e||"hidden"==e?"change":t.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).length>0?l.filter("#"+n):l.filter('[name="'+n+'"]').length>0?l.filter('[name="'+n+'"]'):l.filter("[data-"+u.validate+'="'+n+'"]').length>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1},value:function(e){var n,i=[];return i.push(e),n=t.get.values.call(E,i),n[e]},values:function(n){var i={};return e.isArray(n)||(n=l),e.each(n,function(n,o){var a="string"==typeof o?t.get.field(o):e(o),r=(a.prop("type"),a.prop("name")),s=a.val(),c=a.is(d.checkbox),l=a.is(d.radio),u=c?a.is(":checked"):!1;if(r)if(l)u&&(i[r]=s);else if(c){if(!u)return t.debug("Omitted unchecked checkbox",a),!0;i[r]=!0}else i[r]=s}),i}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).length>0?!0:l.filter('[name="'+e+'"]').length>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.children(d.prompt),u=0!==l.length;a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(f.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.children(d.prompt);r.removeClass(f.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()
}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(f.error).addClass(f.success)},defaults:function(){l.each(function(){var t=e(this),n=t.filter(d.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(u.defaultValue,i)})},error:function(){o.removeClass(f.success).addClass(f.error)},value:function(e,n){var i={};return i[e]=n,t.set.values.call(E,i)},values:function(n){e.isEmptyObject(n)||(e.each(n,function(e,n){var i=t.get.field(e),o=i.parent(),a=o.is(d.uiCheckbox),r=o.is(d.uiDropdown),s=i.is(d.radio),c=i.length>0;c&&(s&&a?(t.verbose("Selecting radio value",n,i),i.filter('[value="'+n+'"]').parent(d.uiCheckbox).checkbox("check")):a?(t.verbose("Setting checkbox value",n,o),o.checkbox(n===!0?"check":"uncheck")):r?(t.verbose("Setting dropdown value",n,o),o.dropdown("set selected",n)):(t.verbose("Setting field value",n,i),i.val(n)))}),t.validate.form())}},validate:{form:function(n){var a=!0;return P?!1:(A=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),s.onSuccess.call(E,n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(A),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),s.onFailure.call(E,A)))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return o.prop("disabled")?(t.debug("Field is disabled. Skipping",n.identifier),a=!0):n.optional&&""===e.trim(o.val())?(t.debug("Field is optional and empty. Skipping",n.identifier),a=!0):n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),s.onValid.call(o),!0):(A=A.concat(r),t.add.prompt(n.identifier,r),s.onInvalid.call(o,r),!1)},rule:function(n,o){var a,r,c=t.get.field(n.identifier),l=o.type,u=e.trim(c.val()+""),d=/\[(.*)\]/i,f=d.exec(l),m=!0;return f!==i&&null!==f?(a=""+f[1],r=l.replace(f[0],""),m=s.rules[r].call(E,u,a)):m=s.rules[l].call(c,u),m}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(h,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.length>1&&(n+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&h.length>0&&(console.groupCollapsed(n),console.table?console.table(h):e.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||x,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(F===i&&t.initialize(),t.invoke(b)):(F!==i&&t.destroy(),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:".reset",submit:".submit",uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").length>0},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(t)},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},empty:function(e){return!(e===i||""===e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)},is:function(e,t){return e==t},length:function(e,t){return e!==i?e.length>=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).length>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').length>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').length>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},not:function(e,t){return e!=t},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)}}}}(jQuery,window,document),function(e,t,n,i){e.fn.state=function(t){var o,a=e(this),r=a.selector||"",s=("ontouchstart"in n.documentElement,(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var n,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.state.settings,t):e.extend({},e.fn.state.settings),m=f.error,g=f.metadata,p=f.className,v=f.namespace,h=f.states,b=f.text,y="."+v,x=v+"-module",w=e(this),C=this,T=w.data(x);n={initialize:function(){n.verbose("Initializing module"),f.automatic&&n.add.defaults(),f.context&&""!==r?e(f.context).on(r,"mouseenter"+y,n.change.text).on(r,"mouseleave"+y,n.reset.text).on(r,"click"+y,n.toggle.state):w.on("mouseenter"+y,n.change.text).on("mouseleave"+y,n.reset.text).on("click"+y,n.toggle.state),n.instantiate()},instantiate:function(){n.verbose("Storing instance of module",n),T=n,w.data(x,n)},destroy:function(){n.verbose("Destroying previous module",T),w.off(y).removeData(x)},refresh:function(){n.verbose("Refreshing selector cache"),w=e(C)},add:{defaults:function(){var o=t&&e.isPlainObject(t.states)?t.states:{};e.each(f.defaults,function(t,a){n.is[t]!==i&&n.is[t]()&&(n.verbose("Adding default states",t,C),e.extend(f.states,a,o))})}},is:{active:function(){return w.hasClass(p.active)},loading:function(){return w.hasClass(p.loading)},inactive:function(){return!w.hasClass(p.active)},state:function(e){return p[e]===i?!1:w.hasClass(p[e])},enabled:function(){return!w.is(f.filter.active)},disabled:function(){return w.is(f.filter.active)},textEnabled:function(){return!w.is(f.filter.text)},button:function(){return w.is(".button:not(a, .submit)")},input:function(){return w.is("input")},progress:function(){return w.is(".ui.progress")}},allow:function(e){n.debug("Now allowing state",e),h[e]=!0},disallow:function(e){n.debug("No longer allowing",e),h[e]=!1},allows:function(e){return h[e]||!1},enable:function(){w.removeClass(p.disabled)},disable:function(){w.addClass(p.disabled)},setState:function(e){n.allows(e)&&w.addClass(p[e])},removeState:function(e){n.allows(e)&&w.removeClass(p[e])},toggle:{state:function(){var t;if(n.allows("active")&&n.is.enabled()){if(n.refresh(),e.fn.api!==i&&(t=w.api("get request")))return void n.listenTo(t);n.change.state()}}},listenTo:function(t){n.debug("API request detected, waiting for state signal",t),t?(b.loading&&n.update.text(b.loading),e.when(t).then(function(){"resolved"==t.state()?(n.debug("API request succeeded"),f.activateTest=function(){return!0},f.deactivateTest=function(){return!0}):(n.debug("API request failed"),f.activateTest=function(){return!1},f.deactivateTest=function(){return!1}),n.change.state()})):(f.activateTest=function(){return!1},f.deactivateTest=function(){return!1})},change:{state:function(){n.debug("Determining state change direction"),n.is.inactive()?n.activate():n.deactivate(),f.sync&&n.sync(),f.onChange.call(C)},text:function(){n.is.textEnabled()&&(n.is.disabled()?(n.verbose("Changing text to disabled text",b.hover),n.update.text(b.disabled)):n.is.active()?b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.deactivate&&(n.verbose("Changing text to deactivating text",b.deactivate),n.update.text(b.deactivate)):b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.activate&&(n.verbose("Changing text to activating text",b.activate),n.update.text(b.activate)))}},activate:function(){f.activateTest.call(C)&&(n.debug("Setting state to active"),w.addClass(p.active),n.update.text(b.active),f.onActivate.call(C))},deactivate:function(){f.deactivateTest.call(C)&&(n.debug("Setting state to inactive"),w.removeClass(p.active),n.update.text(b.inactive),f.onDeactivate.call(C))},sync:function(){n.verbose("Syncing other buttons to current state"),a.not(w).state(n.is.active()?"activate":"deactivate")},get:{text:function(){return f.selector.text?w.find(f.selector.text).text():w.html()},textFor:function(e){return b[e]||!1}},flash:{text:function(e,t,i){var o=n.get.text();n.debug("Flashing text message",e,t),e=e||f.text.flash,t=t||f.flashDuration,i=i||function(){},n.update.text(e),setTimeout(function(){n.update.text(o),i.call(C)},t)}},reset:{text:function(){var e=b.active||w.data(g.storedText),t=b.inactive||w.data(g.storedText);n.is.textEnabled()&&(n.is.active()&&e?(n.verbose("Resetting active text",e),n.update.text(e)):t&&(n.verbose("Resetting inactive text",e),n.update.text(t)))}},update:{text:function(e){var t=n.get.text();e&&e!==t?(n.debug("Updating text",e),f.selector.text?w.data(g.storedText,e).find(f.selector.text).text(e):w.data(g.storedText,e).html(e)):n.debug("Text is already sane, ignoring update",e)}},setting:function(t,o){if(n.debug("Changing setting",t,o),e.isPlainObject(t))e.extend(!0,f,t);else{if(o===i)return f[t];f[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(o===i)return n[t];n[t]=o}},debug:function(){f.debug&&(f.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,f.name+":"),n.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),n.verbose.apply(console,arguments)))},error:function(){n.error=Function.prototype.bind.call(console.error,console,f.name+":"),n.error.apply(console,arguments)},performance:{log:function(e){var t,i,o;f.performance&&(t=(new Date).getTime(),o=s||t,i=t-o,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,100)},display:function(){var t=f.name+":",o=0;s=!1,clearTimeout(n.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,a,r){var s,c,l,u=T;return a=a||d,r=C||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(o,a){var r=o!=s?a+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(u[r])&&o!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||o==s)return u[a]!==i?(c=u[a],!1):(n.error(m.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,a):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(T===i&&n.initialize(),n.invoke(l)):(T!==i&&n.destroy(),n.initialize())}),o!==i?o:this},e.fn.state.settings={name:"State",debug:!1,verbose:!0,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document),function(e,t,n,i){e.fn.visibility=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1);return r.each(function(){var r,m=e.extend(!0,{},e.fn.visibility.settings,o),g=m.className,p=m.namespace,v=m.error,h="."+p,b="module-"+p,y=e(t),x=e(this),w=e(m.context),C=(x.offsetParent(),x.selector||"",x.data(b)),T=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},k=this;r={initialize:function(){r.verbose("Initializing visibility",m),r.setup.cache(),r.save.position(),r.should.trackChanges()&&(r.bindEvents(),"image"==m.type&&r.setup.image(),"fixed"==m.type&&r.setup.fixed()),r.checkVisibility(),r.instantiate()},instantiate:function(){r.verbose("Storing instance of module",r),C=r,x.data(b,r)},destroy:function(){r.verbose("Destroying previous module"),x.off(h).removeData(b)},bindEvents:function(){r.verbose("Binding visibility events to scroll and resize"),y.on("resize"+h,r.event.refresh),w.on("scroll"+h,r.event.scroll)},event:{refresh:function(){T(r.refresh)},scroll:function(){r.verbose("Scroll position changed"),m.throttle?(clearTimeout(r.timer),r.timer=setTimeout(r.checkVisibility,m.throttle)):T(r.checkVisibility)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),c=function(){a++,a>=t.length&&e.isFunction(i)&&i()};o--;)s=n.createElement("img"),s.onload=c,s.onerror=c,s.src=t[o],r.push(s)},should:{trackChanges:function(){return d&&f.length>0?(r.debug("One time query, no need to bind events"),!1):(r.debug("Query is attaching callbacks, watching for changes with scroll"),!0)}},setup:{cache:function(){r.cache={occurred:{},screen:{},element:{}}},image:function(){var e=x.data("src");e&&(r.verbose("Lazy loading image",e),r.topVisible(function(){r.precache(e,function(){r.set.image(e),m.onTopVisible=!1})}))},fixed:function(){r.verbose("Setting up fixed on element pass"),x.visibility({once:!1,continuous:!1,onTopPassed:function(){x.addClass(g.fixed).css({position:"fixed",top:m.offset+"px"}),m.animation&&e.fn.transition!==i&&x.transition(m.transition,m.duration)},onTopPassedReverse:function(){x.removeClass(g.fixed).css({position:"",top:""})}})}},set:{image:function(t){var n=r.cache.screen.bottom<r.cache.element.top;x.attr("src",t),n?(r.verbose("Image outside browser, no show animation"),x.show()):m.transition&&e.fn.transition!==i?x.transition(m.transition,m.duration):x.fadeIn(m.duration)}},refresh:function(){r.debug("Refreshing constants (element width/height)"),r.reset(),r.save.position(),r.checkVisibility(),m.onRefresh.call(k)},reset:function(){r.verbose("Reseting all cached values"),e.isPlainObject(r.cache)&&(r.cache.screen={},r.cache.element={})},checkVisibility:function(){r.verbose("Checking visibility of element",r.cache.element),r.save.calculations(),r.passed(),r.passingReverse(),r.topVisibleReverse(),r.bottomVisibleReverse(),r.topPassedReverse(),r.bottomPassedReverse(),r.passing(),r.topVisible(),r.bottomVisible(),r.topPassed(),r.bottomPassed()},passed:function(t,n){var o=r.get.elementCalculations();if(t!==i&&n!==i)m.onPassed[t]=n;else{if(t!==i)return r.get.pixelsPassed(t)>o.pixelsPassed;o.passing&&e.each(m.onPassed,function(e,t){o.bottomVisible||o.pixelsPassed>r.get.pixelsPassed(e)?r.execute(t,e):m.once||r.remove.occurred(t)})}},passing:function(e){var t=r.get.elementCalculations(),n=e||m.onPassing,o="passing";return e&&(r.debug("Adding callback for passing",e),m.onPassing=e),t.passing?r.execute(n,o):m.once||r.remove.occurred(o),e!==i?t.passing:void 0},topVisible:function(e){var t=r.get.elementCalculations(),n=e||m.onTopVisible,o="topVisible";return e&&(r.debug("Adding callback for top visible",e),m.onTopVisible=e),t.topVisible?r.execute(n,o):m.once||r.remove.occurred(o),e===i?t.topVisible:void 0},bottomVisible:function(e){var t=r.get.elementCalculations(),n=e||m.onBottomVisible,o="bottomVisible";return e&&(r.debug("Adding callback for bottom visible",e),m.onBottomVisible=e),t.bottomVisible?r.execute(n,o):m.once||r.remove.occurred(o),e===i?t.bottomVisible:void 0},topPassed:function(e){var t=r.get.elementCalculations(),n=e||m.onTopPassed,o="topPassed";return e&&(r.debug("Adding callback for top passed",e),m.onTopPassed=e),t.topPassed?r.execute(n,o):m.once||r.remove.occurred(o),e===i?t.topPassed:void 0},bottomPassed:function(e){var t=r.get.elementCalculations(),n=e||m.onBottomPassed,o="bottomPassed";return e&&(r.debug("Adding callback for bottom passed",e),m.onBottomPassed=e),t.bottomPassed?r.execute(n,o):m.once||r.remove.occurred(o),e===i?t.bottomPassed:void 0},passingReverse:function(e){var t=r.get.elementCalculations(),n=e||m.onPassingReverse,o="passingReverse";return e&&(r.debug("Adding callback for passing reverse",e),m.onPassingReverse=e),t.passing?m.once||r.remove.occurred(o):r.get.occurred("passing")&&r.execute(n,o),e!==i?!t.passing:void 0},topVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||m.onTopVisibleReverse,o="topVisibleReverse";return e&&(r.debug("Adding callback for top visible reverse",e),m.onTopVisibleReverse=e),t.topVisible?m.once||r.remove.occurred(o):r.get.occurred("topVisible")&&r.execute(n,o),e===i?!t.topVisible:void 0},bottomVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||m.onBottomVisibleReverse,o="bottomVisibleReverse";return e&&(r.debug("Adding callback for bottom visible reverse",e),m.onBottomVisibleReverse=e),t.bottomVisible?m.once||r.remove.occurred(o):r.get.occurred("bottomVisible")&&r.execute(n,o),e===i?!t.bottomVisible:void 0},topPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||m.onTopPassedReverse,o="topPassedReverse";return e&&(r.debug("Adding callback for top passed reverse",e),m.onTopPassedReverse=e),t.topPassed?m.once||r.remove.occurred(o):r.get.occurred("topPassed")&&r.execute(n,o),e===i?!t.onTopPassed:void 0},bottomPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||m.onBottomPassedReverse,o="bottomPassedReverse";return e&&(r.debug("Adding callback for bottom passed reverse",e),m.onBottomPassedReverse=e),t.bottomPassed?m.once||r.remove.occurred(o):r.get.occurred("bottomPassed")&&r.execute(n,o),e===i?!t.bottomPassed:void 0},execute:function(e,t){var n=r.get.elementCalculations(),i=r.get.screenCalculations();e=e||!1,e&&(m.continuous?(r.debug("Callback being called continuously",t,n),e.call(k,n,i)):r.get.occurred(t)||(r.debug("Conditions met",t,n),e.call(k,n,i))),r.save.occurred(t)},remove:{occurred:function(e){e?r.cache.occurred[e]!==i&&r.cache.occurred[e]===!0&&(r.debug("Callback can now be called again",e),r.cache.occurred[e]=!1):r.cache.occurred={}}},save:{calculations:function(){r.verbose("Saving all calculations necessary to determine positioning"),r.save.scroll(),r.save.direction(),r.save.screenCalculations(),r.save.elementCalculations()},occurred:function(e){e&&(r.cache.occurred[e]===i||r.cache.occurred[e]!==!0)&&(r.verbose("Saving callback occurred",e),r.cache.occurred[e]=!0)},scroll:function(){r.cache.scroll=w.scrollTop()+m.offset},direction:function(){var e,t=r.get.scroll(),n=r.get.lastScroll();return e=t>n&&n?"down":n>t&&n?"up":"static",r.cache.direction=e,r.cache.direction},elementPosition:function(){var t=r.get.screenSize();return r.verbose("Saving element position"),e.extend(r.cache.element,{margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},fits:k.height<t.height,offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()}),r.cache.element},elementCalculations:function(){var t=r.get.screenCalculations(),n=r.get.elementPosition();m.includeMargin?e.extend(r.cache.element,{top:n.offset.top-n.margin.top,bottom:n.offset.top+n.height+n.margin.bottom}):e.extend(r.cache.element,{top:n.offset.top,bottom:n.offset.top+n.height}),e.extend(r.cache.element,{topVisible:t.bottom>=n.top,topPassed:t.top>=n.top,bottomVisible:t.bottom>=n.bottom,bottomPassed:t.top>=n.bottom,pixelsPassed:0,percentagePassed:0}),e.extend(r.cache.element,{visible:r.cache.element.topVisible||r.cache.element.bottomVisible,passing:r.cache.element.topPassed&&!r.cache.element.bottomPassed,hidden:!r.cache.element.topVisible&&!r.cache.element.bottomVisible}),r.cache.element.passing&&(r.cache.element.pixelsPassed=t.top-n.top,r.cache.element.percentagePassed=(t.top-n.top)/n.height),r.verbose("Updated element calculations",r.cache.element)},screenCalculations:function(){var t=w.scrollTop()+m.offset;return r.cache.scroll===i&&(r.cache.scroll=w.scrollTop()+m.offset),r.save.direction(),e.extend(r.cache.screen,{top:t,bottom:t+r.cache.screen.height}),r.cache.screen},screenSize:function(){r.verbose("Saving window position"),r.cache.screen={height:w.height()}},position:function(){r.save.screenSize(),r.save.elementPosition()}},get:{pixelsPassed:function(e){var t=r.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return r.cache.occurred!==i?r.cache.occurred[e]||!1:!1},direction:function(){return r.cache.direction===i&&r.save.direction(),r.cache.direction},elementPosition:function(){return r.cache.element===i&&r.save.elementPosition(),r.cache.element},elementCalculations:function(){return r.cache.element===i&&r.save.elementCalculations(),r.cache.element},screenCalculations:function(){return r.cache.screen===i&&r.save.screenCalculations(),r.cache.screen},screenSize:function(){return r.cache.screen===i&&r.save.screenSize(),r.cache.screen},scroll:function(){return r.cache.scroll===i&&r.save.scroll(),r.cache.scroll},lastScroll:function(){return r.cache.screen===i?(r.debug("First scroll event, no last scroll could be found"),!1):r.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,r,t);else{if(n===i)return r[t];r[t]=n}},debug:function(){m.debug&&(m.performance?r.performance.log(arguments):(r.debug=Function.prototype.bind.call(console.info,console,m.name+":"),r.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?r.performance.log(arguments):(r.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),r.verbose.apply(console,arguments)))},error:function(){r.error=Function.prototype.bind.call(console.error,console,m.name+":"),r.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(r.performance.timer),r.performance.timer=setTimeout(r.performance.display,100)},display:function(){var t=m.name+":",n=0;c=!1,clearTimeout(r.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var s,c,l,u=C;return n=n||f,o=k||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var a=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[a])&&n!=s)u=u[a];else{if(u[a]!==i)return c=u[a],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(r.error(v.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},d?(C===i&&r.initialize(),r.invoke(u)):(C!==i&&r.destroy(),r.initialize())}),a!==i?a:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",className:{fixed:"fixed"},debug:!1,verbose:!1,performance:!0,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,transition:!1,duration:500,onPassed:{},onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,once:!0,continuous:!1,onRefresh:function(){},onScroll:function(){},error:{method:"The method you called is not defined."}}}(jQuery,window,document);