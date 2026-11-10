<?php
/**
 * Plugin Name:       Mono Hero — Portada
 * Description:       Experiencia de entrada de Mono Cromat & Co. (hero React) como plantilla de página. Funciona con cualquier tema, sin tema hijo.
 * Version:           1.0.0
 * Author:            Mono Cromat & Co.
 * Requires at least: 5.8
 * Requires PHP:      7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Sin acceso directo.
}

/* Registrar la plantilla en el selector de páginas */
add_filter( 'theme_page_templates', function ( $templates ) {
    $templates['mono-hero'] = 'Mono Hero — Portada (React)';
    return $templates;
} );

/* Servir el hero compilado cuando una página use la plantilla */
add_filter( 'template_include', function ( $template ) {
    if ( get_page_template_slug() === 'mono-hero' ) {
        $hero = plugin_dir_path( __FILE__ ) . 'hero/mono-hero.html';
        if ( file_exists( $hero ) ) {
            status_header( 200 );
            readfile( $hero );
            exit;
        }
        wp_die(
            'Mono Hero: no encuentro <code>hero/mono-hero.html</code> dentro del plugin. ' .
            'Revisa la GUIA-PASO-A-PASO.md del proyecto (paso 4).'
        );
    }
    return $template;
} );
