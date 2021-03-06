/*\
title: $:/plugins/inymsocks/TW5Utils/linkfields.js
type: application/javascript
module-type: widget

Set the value of a field in a specified tiddler to be equal to the value of a source field in a source tiddler

<$link-fields $sourcetiddler=sourceTiddler $sourcefield=source_field $storetiddler=storeTiddler $storefield=store_field/>

<$link-fields $sourcetiddler=dataTiddler $sourceindex=source_index $storetiddler=storeTiddler $storefield=store_field/>

Anything that doesn't start with $ will be treated as field=tiddler and the value will also be stored in the specified field in the specified tiddler. I should get a better way to write that other than =

This is a modified version of the storecount widget from the MathyThing plugin, which is a modified version of the count widget in TiddlyWiki5, it also has a bit from the action-setfield widget in TiddlyWiki5

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var LinkFieldsWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
LinkFieldsWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
LinkFieldsWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
LinkFieldsWidget.prototype.execute = function() {
	this.sourceTiddler = this.getAttribute("$sourcetiddler",this.getVariable("currentTiddler"));
	this.sourceField = this.getAttribute("$sourcefield");
	this.sourceIndex = this.getAttribute("$sourceindex");
	this.storeTiddler = this.getAttribute("$storetiddler");
	this.storeField = this.getAttribute("$storefield");
	this.storeIndex = this.getAttribute("$storeindex");
	
	var sourceTiddler = this.wiki.getTiddler(this.sourceTiddler);
	var storeTiddler = this.wiki.getTiddler(this.storeTiddler);
	if( sourceTiddler != undefined && storeTiddler != undefined ) {
		if ( typeof this.sourceField === "string" ) {
			var newvalue = sourceTiddler.getFieldString(this.sourceField);
			var oldvalue = storeTiddler.getFieldString(this.storeField);
			if ( oldvalue === newvalue ) {
			} else {
				this.wiki.setText(this.storeTiddler,this.storeField,this.storeIndex,newvalue);
			}
		} else if ( typeof this.sourceIndex === "string" ) {
			var sourceIndex = this.sourceIndex;
			var newvalue = this.wiki.extractTiddlerDataItem(sourceTiddler, sourceIndex, '');
			var oldvalue = storeTiddler.getFieldString(this.storeField);
			if ( oldvalue === newvalue ) {
			} else {
				this.wiki.setText(this.storeTiddler,this.storeField,this.storeIndex,newvalue);
			}
		}
	}

	var self = this;
	$tw.utils.each(this.attributes,function(attribute,name) {
		if(name.charAt(0) !== "$") {
			var sourceTiddler = self.wiki.getTiddler(self.sourceTiddler);
			var thisTiddler = self.wiki.getTiddler(attribute);
			if( thisTiddler != undefined && sourceTiddler != undefined ) {
				var newvalue = sourceTiddler.getFieldString(self.sourceField);
				var oldvalue = thisTiddler.getFieldString(name);
				if ( typeof name === "string") {
					if ( oldvalue === newvalue ) {
					} else {
						if ( typeof newvalue ==="string" ) {
							self.wiki.setText(attribute,name,undefined,newvalue);
						}
					}
				}
			}
		}
	});
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
LinkFieldsWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$sourcetiddler"] || changedAttributes["$sourcefield"] || changedAttributes["$storeindex"] || changedAttributes["$storetiddler"] || changedAttributes["$storefield"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports["link-fields"] = LinkFieldsWidget;

})();