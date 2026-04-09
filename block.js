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
            title: { type: 'string', default: 'Índice' },
            content: { type: 'string', source: 'html', selector: '.insert-toc-block' }
        },
        edit: (props) => {
            const { attributes: { title, content }, setAttributes } = props;

            return el('div', { className: 'insert-toc-block' },
                el(RichText, {
                    tagName: 'div',
                    className: 'itb-toc-title-editor',
                    value: title,
                    onChange: (value) => setAttributes({ title: value }),
                    placeholder: 'Título del índice...'
                }),
                el(RichText, {
                    tagName: 'div',
                    value: content,
                    onChange: (value) => setAttributes({ content: value }),
                    placeholder: 'Aquí aparecerá la tabla de contenidos en el front'
                })
            );
        },
        save: () => {
            return null; // Bloque dinámico, renderiza en PHP
        }
    });
})(window.wp);