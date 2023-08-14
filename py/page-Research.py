body(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        h1("Research Groups"),
        div("This is a sub header", style='padding-bottom: 50px;'),
        style = 'padding-right: 20px; padding-left: 20px;'
    ),
    common_content_group_to_page(CURRENT_PAGE_NAME, CONTENT_GROUPS[CURRENT_PAGE_NAME])
)