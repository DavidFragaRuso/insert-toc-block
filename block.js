(function(wp) {
    const itb_registerBlockType = wp.blocks.registerBlockType;
    const { createElement: el } = wp.element;
    const { RichText } = wp.blockEditor || wp.editor; 

    itb_registerBlockType('idp/toc', {
        apiVersion: 3,
        title: 'Tabla de Contenidos',
        icon: 'list-view',
        category: 'widgets',
        attributes: {
            content: { type: 'string', source: 'html', selector: '.insert-toc-block' }
        },
        edit: (props) => {
            const { attributes: { content }, setAttributes } = props;
            return el(
                RichText,
                {
                    tagName: 'div',
                    className: 'insert-toc-block',
                    value: content,
                    onChange: (value) => setAttributes({ content: value }),
                    placeholder: 'Aquí aparecerá la tabla de contenidos...'
                }
            );
        },
        save: (props) => {
            const { attributes: { content } } = props;
            return el(
                RichText.Content,
                {
                    tagName: 'div',
                    className: 'insert-toc-block',
                    value: content
                }
            );
        }
    });
})(window.wp);