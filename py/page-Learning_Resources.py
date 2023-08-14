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
        div(b('^ Click to Jump to a Section ^'), style='text-align: center; padding-bottom: 40px;'),
        elems(
            elems(
                div(h1(section), id=f"section-{section}", class_="section", style="background: rgb(var(--bg-2));"),
                elems(
                    elems(
                        div(
                            div(a(h2(entry['title']), href=common_get_article_link(entry["fname"])), style="min-width:200px;"),
                            div(p(
                                entry['summary']),
                                p(
                                    b('Difficulty: '), entry['difficulty'], br(),
                                    b('Points: '), entry['points'], br(),
                                    b('Catagories: '), ', '.join(entry['categories'])
                                )
                            ),
                            class_='card'
                        ), hr()
                    ) for entry in CONTENT_GROUPS['Learning_Resources'] if entry['categories'][0] == section
                )
            )
            for section in ['Python', 'Jupyter', 'Rosie', 'AI', 'News'] 
        )
    )
)
