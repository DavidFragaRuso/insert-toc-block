<?php
/*
Plugin Name: Tabla de Contenidos (InPulse Drift)
Description: Añade un bloque para generar tabla de contenidos automática en entradas.
Version: 1.0
Author: David Fraga
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// Registrar bloque de Gutenberg
function itb_register_toc_block() {
    wp_register_script(
        'itb-toc-block',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'block.js'),
        true
    );

    wp_register_script(
        'itb-toc-frontend',
        plugins_url('frontend.js', __FILE__),
        array('jquery'),
        filemtime(plugin_dir_path(__FILE__) . 'frontend.js'),
        true
    );

    wp_register_style(
        'itb-toc-style',
        plugins_url('style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );

    register_block_type('itb/toc', array(
        'editor_script' => 'itb-toc-block',
        'style' => 'itb-toc-style',
        'script' => 'itb-toc-frontend',
        'attributes' => array(
            'title' => array(
                'type' => 'string',
                'default' => 'Contenido'
            )
        )
    ));
}
add_action('init', 'itb_register_toc_block');