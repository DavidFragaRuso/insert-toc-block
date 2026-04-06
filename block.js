const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType('itb/toc', {
    edit: ({ attributes, setAttributes }) => {

        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <TextControl
                    label="Título (opcional)"
                    value={attributes.title || 'Contenido'}
                    onChange={(value) => setAttributes({ title: value })}
                    __next40pxDefaultSize={true}
                    __nextHasNoMarginBottom={true}
                />
                <p>La tabla de contenidos se generará automáticamente en el frontend.</p>
            </div>
        );
    },

    save: ({ attributes }) => {
        return (
            <div className="itb-toc">
                {attributes.title && <h3>{attributes.title}</h3>}
                <div className="itb-toc-list"></div>
            </div>
        );
    }
});