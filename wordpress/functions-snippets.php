<?php
/**
 * SNIPPETS OPCIONALES para functions.php de tu tema hijo.
 * Copia los que necesites dentro del functions.php existente.
 */

/* 1) Ocultar la barra de administración SOLO en la portada,
      para que no tape el header del hero. */
add_action( 'template_redirect', function () {
    if ( is_front_page() ) {
        show_admin_bar( false );
    }
} );

/* 2) Si usas un plugin de caché/optimización (WP Rocket, Autoptimize,
      LiteSpeed Cache) y el hero carga en blanco, excluye este archivo
      de la optimización de JavaScript. Ejemplo genérico: */
add_filter( 'rocket_exclude_js', function ( $excluded ) {
    $excluded[] = '/mono-hero/(.*)';
    return $excluded;
} );

/* 3) Preconexión a Google Fonts (micro-mejora de velocidad). */
add_action( 'wp_head', function () {
    if ( is_front_page() ) {
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    }
}, 1 );
