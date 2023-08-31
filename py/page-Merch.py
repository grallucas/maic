body(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        h1("Merch"),
        div("This is a sub header", style='padding-bottom: 50px;'),
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