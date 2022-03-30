tinymce.PluginManager.add('example', function(editor, url) {
    // Add a button that opens a window
    editor.ui.registry.addButton('example', {
        text: 'My button',
        onAction: function() {
            // Open window
            editor.windowManager.open({
                title: 'Example plugin',
                body: [
                    {type: 'textbox', name: 'title', label: 'Title'}
                ],
                buttons: [],
                onsubmit: function(e) {
                    // Insert content when the window form is submitted
                    editor.insertContent('Title: ' + e.data.title);
                }
            });
        }
    });

    return {
        getMetadata: function () {
            return  {
                name: "Example plugin",
                url: "http://exampleplugindocsurl.com"
            };
        }
    };
});
