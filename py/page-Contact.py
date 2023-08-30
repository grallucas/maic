html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    body(
        common_toolbar(CURRENT_PAGE_NAME),
        div(
            div(h1('Contacting the MAIC Eboard')),
            div(class_='break'),
            div(
                # img(src='./img/misc/eboard.png', width=500),
                a('📣 If You Wish to Host an Event, Connect With Us Here 📣', href='https://forms.office.com/Pages/ResponsePage.aspx?id=rM5GQNP9yUasgLfEpJurcGAyFplwhXJCtqB2wsxmGVlUMVNaRkVPUUtNOEsyS1oxMTIwRUpKQkoyNi4u', style = 'font-weight: bold;'),
                p('Below is a list of each eboard member; if you have a specific question, feel free to contact them directly!'),
                hr()
            ),
            class_='card'
        ),
        div(
            elems(*[
                common_content_to_card(entry) for entry in CONTENT_GROUPS[CURRENT_PAGE_NAME]
            ]),
            style = 'margin-right: 40px; margin-left: 40px;'
       )
    )
)