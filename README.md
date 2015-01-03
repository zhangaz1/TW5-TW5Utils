!TW5Utils - A plugin that contains some utility widgets for TiddlyWiki5

Currently in this plugin:

*linkfield.js - the link-field widget

!!link-field widget

This widget takes a source field and tiddler and a store field and tiddler, whenever the source field changes the store field is updated to contain the same value as the source field.

Usage:

```
<$link-fields sourcetiddler=sourceTiddler sourcefield=source_field storetiddler=storeTiddler storefield=store_field/>
```