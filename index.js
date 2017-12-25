/** Created by azder on 2017-12-24. */

const str = value => !value ? '' : '' + value;

const template = selector => $($(selector).text());

const infoHide = $info => $info.addClass('d-none').removeClass('alert-primary alert-danger alert-success');

const infoShow = (type, $info) => $info.addClass('alert-' + type).removeClass('d-none');

const copy = (
    () => {
        try {
            return [null, document.execCommand('copy')];
        } catch (e) {
            return [e, null];
        }
    }
);


const $buttonTemplate = template('#gb-template-button');

const $glyphs = $('.gb-glyphs').on('click', 'button', event => {

    const $text = $('.gb-text');
    const $info = infoHide($('.gb-info').empty());
    const ocopy = $('.gb-opt-copy').prop('checked');

    $text.val(str($text.val()) + str(event.currentTarget.dataset.value));

    if (ocopy) {
        $text.select();
        const [e, r] = copy();
        if (e) {
            infoShow('danger', $info.text('there was problem copying to clipboard: ' + e));
        } else if (!r) {
            infoShow('danger', $info.text('there was a problem copying to clipboard'));
        }
    } else {
        infoShow('primary', $info.text('"copy to clipboard" not selected'));
    }

});

// run
fetch('glyphs.json').then(response => response.json().then(data => Object.values(data).map(group => {

    group.glyphs.map(glyph => {
        const $b = $buttonTemplate.clone().appendTo($glyphs);
        $b.find('.gb-displayed').html(glyph.display);
        $b.find('.gb-description').text(glyph.description);
        $b.attr('data-value', glyph.value);
        if (glyph.width) {
            $b.removeClass('col-1').addClass(`col-${glyph.width}`)
        }
    });

})));
