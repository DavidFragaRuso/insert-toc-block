<?php
/**
 * Plugin Name: Insert TOC Block
 * Description: Bloque de tabla de contenidos para Gutenberg con renderizado front y IDs automáticos en h2/h3.
 * Version: 1.0.1
 * Author: David Fraga
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Añadir IDs automáticos a h2/h3
function itb_add_ids_to_headers_regex($content) {
    return preg_replace_callback('/<h([23])(.*?)>(.*?)<\/h\1>/i', function($matches) {
        $tag = $matches[1];
        $attrs = $matches[2];
        $text = strip_tags($matches[3]);
        if (!preg_match('/id=/', $attrs)) {
            $id = sanitize_title($text);
            $attrs .= ' id="'.$id.'"';
        }
        return "<h$tag$attrs>$matches[3]</h$tag>";
    }, $content);
}
add_filter('the_content', 'itb_add_ids_to_headers_regex', 5);

// Renderizado dinámico del bloque TOC
function itb_render_toc_block( $attributes ) {

   //return '<div style="background:green;color:white;padding:10px;">FUNCIONA</div>';

    global $post;
    if ( ! $post ) return '';

    $content = $post->post_content;

    // Regex simple para h2/h3
    preg_match_all('/<h([23])(?:[^>]*)>(.*?)<\/h[23]>/i', $content, $matches, PREG_SET_ORDER);

    if (empty($matches)) return '';

    $title = isset($attributes['title']) && !empty($attributes['title'])
        ? $attributes['title']
        : 'Índice';

    $output = '<div class="itb-toc"';
    $output .= '<div class="itb-toc-title">' . esc_html($title) . '</div>';
    $output .= '<ul>';

    $toc = '';
    foreach ($matches as $match) {
        $tag = 'h' . $match[1];
        $text = strip_tags($match[2]);
        $id = sanitize_title($text);
        $class = $tag === 'h3' ? 'itb-toc-h3' : 'itb-toc-h2';
        $toc .= sprintf('<li class="%s"><a href="#%s">%s</a></li>', $class, $id, esc_html($text));
    }

    $output .= $toc . '</ul></div>';

    return $output;
}

function itb_register_dynamic_block() {
    $dir = plugin_dir_path( __FILE__ );

    wp_register_script(
        'itb-toc-block',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( $dir . 'block.js' )
    );

    register_block_type( __DIR__, array(
        'render_callback' => 'itb_render_toc_block',
    ));
}
add_action( 'init', 'itb_register_dynamic_block' );