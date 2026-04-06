jQuery(document).ready(function($) {
    $('.itb-toc').each(function() {
        var $tocContainer = $(this).find('.itb-toc-list');
        var $content = $(this).closest('.entry-content');
        if (!$content.length) return;

        var $headings = $content.find('h2, h3, h4');
        if (!$headings.length) {
            $tocContainer.html('<p>No hay encabezados para generar la tabla.</p>');
            return;
        }

        var $ul = $('<ul></ul>');
        $headings.each(function() {
            var $heading = $(this);
            var text = $heading.text();
            var id = $heading.attr('id');
            if (!id) {
                id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                $heading.attr('id', id);
            }
            $ul.append('<li class="toc-' + this.tagName.toLowerCase() + '"><a href="#' + id + '">' + text + '</a></li>');
        });

        $tocContainer.append($ul);
    });
});