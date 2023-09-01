body(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        h1("Merch"),
        div("MAIC merchandise is a way for you to show off your dedication to learning about artificial intelligence! All merchandise can be acquired by completing MAIC activities, either through the acquirement of enough points or being awarded the merch when an achievement is reached!"),
        br(),
        div("If you're wondering how to acquire points, please <a href = 'about_points.html'>refer to this page</a>", style='padding-bottom: 50px;'),
        style = 'padding-left: 20px;'
    ),
    div(
        elems(*[
            common_content_to_card(entry) for entry in CONTENT_GROUPS[CURRENT_PAGE_NAME]
        ]),
        style = 'margin-right: 40px; margin-left: 40px;'
    )
    
    
    #common_content_group_to_page(CURRENT_PAGE_NAME, CONTENT_GROUPS[CURRENT_PAGE_NAME])
)