body(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    div(
        h1("Merch", style = 'padding-right: 5%; padding-left: 5%;'),
        div("This is a sub header", style='padding-bottom: 50px; padding-right: 5%; padding-left: 5%;'),
    ),
    common_content_group_to_page(CURRENT_PAGE_NAME, CONTENT_GROUPS[CURRENT_PAGE_NAME])
)