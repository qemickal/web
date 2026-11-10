<?php
/**
 * Template Name: Mono Hero — Portada
 * Template Post Type: page
 *
 * Sirve la experiencia de entrada de Mono Cromat & Co. (React compilado)
 * como página de WordPress. No carga header/footer del tema: el hero
 * ocupa toda la pantalla por diseño.
 *
 * Instalación:
 * 1. Sube este archivo a la raíz de tu tema hijo.
 * 2. Sube la carpeta /mono-hero/ (con mono-hero.html adentro) al tema hijo.
 * 3. Sube la carpeta /images/ del paquete a la RAÍZ de tu hosting.
 * 4. Crea una página en WP, elige la plantilla "Mono Hero — Portada".
 */

$mono_hero = get_stylesheet_directory() . '/mono-hero/mono-hero.html';

if ( file_exists( $mono_hero ) ) {
    readfile( $mono_hero );
} else {
    wp_die(
        'Mono Hero: falta el archivo <code>mono-hero/mono-hero.html</code> en tu tema hijo. ' .
        'Revisa el paso 2 de wordpress/README.md del proyecto.'
    );
}

exit;
