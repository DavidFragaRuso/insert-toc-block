<?php
/**
 * Plugin Name: Insert TOC Block
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function itb_register_block() {

    wp_register_script(
        'itb-block-editor',
        plugins_url( 'block.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ],
        null,
        true
    );

    register_block_type( __DIR__, [
        'editor_script' => 'itb-block-editor',
    ]);
}

add_action( 'init', 'itb_register_block' );


// FRONTEND SCRIPT SOLO SI EXISTE EL BLOQUE
function itb_enqueue_frontend_assets() {

    if ( has_block( 'itb/toc' ) ) {

        wp_enqueue_script(
            'itb-frontend',
            plugins_url( 'frontend.js', __FILE__ ),
            [],
            null,
            true // footer
        );

        wp_enqueue_style(
            'itb-style',
            plugins_url( 'style.css', __FILE__ ),
            [],
            null
        );
    }
}

add_action( 'wp_enqueue_scripts', 'itb_enqueue_frontend_assets' );