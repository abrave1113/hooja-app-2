// function ready() {
    const pictureWidth = 100
    // const pictureWidth = parseFloat(rootStyles.getPropertyValue('--book-picture-width-large'))
    const pictureAspectRatio = 100 / 150
    // const pictureAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-picture-aspect-ratio'))
    const pictureHeight = pictureWidth / pictureAspectRatio
    document.addEventListener('DOMContentLoaded', function() {
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )
        // Create FilePond object
        const inputElement = document.querySelector('input[type="file"]');
        const pond = FilePond.create(inputElement);
    
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / pictureAspectRatio,
        imageResizeTargetWidth:100,
        imageResizeTargetHeight:150,
        imagePreviewHeight:100    
    })
    FilePond.parse(document.body);
})    