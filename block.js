const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { useBlockProps } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType('itb/toc', {
    title: 'Tabla de contenidos',
    category: 'widgets',
    icon: 'list-view',
    supports: { html: false },

    edit: function(props) {
        const blockProps = useBlockProps();
        return createElement(
            'div',
            blockProps,
            createElement(TextControl, {
                label: 'Título (opcional)',
                value: props.attributes.title || 'Contenido',
                onChange: function(value) { props.setAttributes({ title: value }); }
            }),
            createElement('p', null, 'La tabla de contenidos se generará automáticamente en el frontend.')
        );
    },

    save: function(props) {
        return createElement(
            'div',
            { className: 'itb-toc' },
            props.attributes.title ? createElement('h3', null, props.attributes.title) : null,
            createElement('div', { className: 'itb-toc-list' })
        );
    }
});