html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    body(
        common_toolbar(CURRENT_PAGE_NAME),
        div(
            div(h1('Contact Whole Eboard')),
            div(class_='break'),
            div(
                img(src='./img/misc/eboard.png', width=500),
                br(),
                a('Contact', href='.'),
                p('(note about not contacting individuals unless necessary)'),
                hr()
            ),
            class_='card'
        ),
        elems(*[
            common_content_to_card(entry) for entry in content_groups[CURRENT_PAGE_NAME]
        ])
    )
)