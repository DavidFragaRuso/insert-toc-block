(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;
    const { RichText } = wp.blockEditor || wp.editor;

    registerBlockType('idp/toc', {
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
                    placeholder: 'Aquí aparecerá la tabla de contenidos en el front'
                }
            );
        },
        save: () => {
            return null; // Bloque dinámico, renderiza en PHP
        }
    });
})(window.wp);