html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    body(
        common_toolbar(CURRENT_PAGE_NAME),
        div(
            elems(
                a(
                    h1(section),
                    href=f'#section-{section}',
                    class_='topic-card',
                    style=f'background:{bg};'
                ) for section, bg in zip(
                    ['Python', 'Jupyter', 'Rosie', 'AI', 'News'],
                    [
                        'linear-gradient(135deg,rgb(128, 128, 246) 0%,rgb(128, 128, 246) 50%,rgb(227, 193, 69) 50%,rgb(227, 193, 69) 100%)',
                        'rgb(255, 153, 80)',
                        'rgb(255, 80, 80)',
                        'rgb(96, 60, 150);',
                        'rgb(51, 170, 204);'
                    ]
                )
            ),
            id='topics'
        ),
        div(b('↑ Click Any Topic to Jump ↑'), style='text-align: center; padding-bottom: 40px;'),
        a(
            "Submit Your Own Article",
            href = "submit_post_form.html",
            style = "text-align: center; display: block; padding-bottom: 40px; font-weight: bold; background-color: rgb(37, 37, 37); border-radius: 20px; border-style: solid; border-width: 3px; border-color: gray; padding-bottom: 10px; padding-right: 10px; padding-left: 10px; padding-top: 10px; margin-right: 40%; margin-left: 40%; margin-bottom: 40px;"
        ),
        elems(
            elems(
                div(h1(section), id=f"section-{section}", class_="section", style="background: rgb(var(--bg-2));"),
                elems(
                    elems(
                        div(
                            div(f"<img src = '{entry['image']}' height = 125 width = 125>", href = common_get_article_link(entry["fname"])),
                            div(
                                a(
                                    h2(
                                        entry['title']), 
                                        href=common_get_article_link(entry["fname"])
                                    ), 
                                    b(
                                        f'<img src="{"../maic/img/Difficulties/" + entry["difficulty"] + ".png"}" title="{entry["difficulty"].title()}" class="custom-emoji" height ="35">'
                                    ),  
                                    br(),
                                    b(
                                        'Categories: ' + ', '.join(entry['categories'])
                                    ),
                                    style="min-width:200px;"
                                ),
                            div(
                                p(
                                    entry['summary'] 
                                ),
                                style = "padding-top: 7px;"
                            ),
                            class_='card',
                            style = "margin-bottom: 15px; background-image: url(../maic/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding-bottom: 20px; padding-right: 20px; padding-left: 20px; padding-top: 15px; margin-top: 10px; margin-bottom: 10px;"
                        )
                    ) for entry in CONTENT_GROUPS['Learning_Resources'] if entry['categories'][0] == section
                )
            )
            for section in ['Python', 'Jupyter', 'Rosie', 'AI', 'News'] 
        )
    )
)
