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
            title: {
                type: 'string',
                default: 'Índice'
            }
        },

        edit: (props) => {
            const { attributes: { title }, setAttributes } = props;

            return el('div', { className: 'itb-toc-editor' },

                // Campo editable del título
                el(RichText, {
                    tagName: 'div',
                    className: 'itb-toc-title-editor',
                    value: title,
                    onChange: (value) => setAttributes({ title: value }),
                    placeholder: 'Título del índice...'
                }),

                // Preview simple (UX)
                el('div', { className: 'itb-toc-placeholder' },
                    el('p', {}, 'La tabla de contenidos se generará automáticamente en el front.')
                )
            );
        },

        save: () => null // Bloque dinámico
    });

})(window.wp);