<?php
/**
 * Plugin Name: Insert TOC Block
 * Description: Bloque de tabla de contenidos para Gutenberg con renderizado front.
 * Version: 1.0.0
 * Author: David Fraga
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Evita acceso directo

function itb_register_toc_block() {
    $dir = plugin_dir_path( __FILE__ );

    // Encolamos JS del bloque
    wp_enqueue_script(
        'itb-toc-block',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( $dir . 'block.js' ),
        true
    );

    // Encolamos CSS (editor + front)
    wp_enqueue_style(
        'itb-toc-block-style',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( $dir . 'style.css' )
    );
}
add_action( 'enqueue_block_assets', 'itb_register_toc_block' );

// Renderizado front
function itb_render_toc_block( $attributes ) {
    global $post;
    if ( ! $post ) return '';

    $content = $post->post_content;

    // Usamos DOMDocument para parsear HTML
    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $content );
    $xpath = new DOMXPath($dom);

    $headers = $xpath->query('//h2|//h3');
    if ( !$headers->length ) return '';

    $toc = '<div class="itb-toc"><ul>';
    foreach ( $headers as $header ) {
        $text = trim( $header->textContent );
        $id = $header->getAttribute('id');
        if ( !$id ) {
            $id = sanitize_title($text);
            $header->setAttribute('id', $id);
        }
        $tag = $header->nodeName;
        $class = $tag === 'h3' ? 'itb-toc-h3' : 'itb-toc-h2';
        $toc .= sprintf('<li class="%s"><a href="#%s">%s</a></li>', $class, $id, esc_html($text));
    }
    $toc .= '</ul></div>';

    return $toc;
}

// Registro del bloque dinámico
function itb_register_dynamic_block() {
    register_block_type( 'idp/toc', array(
        'render_callback' => 'itb_render_toc_block',
        'api_version' => 3,
    ) );
}
add_action( 'init', 'itb_register_dynamic_block' );