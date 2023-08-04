html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    body(
        common_toolbar(CURRENT_PAGE_NAME),
        div(
            elems(*[
                a(
                    h1(name),
                    href=f'#section-{name}',
                    class_='topic-card',
                    style=f'background:{bg};'
                ) for name,bg in zip(
                    ['Python', 'Jupyter', 'Rosie', 'AI', 'News'],
                    [
                        'linear-gradient(135deg,rgb(128, 128, 246) 0%,rgb(128, 128, 246) 50%,rgb(227, 193, 69) 50%,rgb(227, 193, 69) 100%)',
                        'rgb(255, 153, 80)',
                        'rgb(255, 80, 80)',
                        'rgb(96, 60, 150);',
                        'rgb(51, 170, 204);'
                    ]
                )
            ]),
            id='topics'
        ),
        div(b('^ Click to Jump to a Section ^'), style='text-align: center; padding-bottom: 40px;'),
        elems(*[
            elems(
                div(h1(name), id=f"section-{name}", class_="section", style="background: rgb(var(--bg-2)); /*{learning[name]['col']};*/"),
                *[
                    div(
                        div(a(h2('title'), href='.'), style="min-width:200px;"),
                        div(p('summary')),
                        class_='card'
                    ),
                    hr()
            ])
            for name in ['Python', 'Jupyter', 'Rosie', 'AI', 'News'] 
        ])
    )
)

#         $$'\n'.join([
#         f'''
#         <div id="section-{name}" class="section" style="background: rgb(var(--bg-2)); /*{learning[name]['col']};*/">
#             <h1>{name}</h1>
#         </div>
#         ''' + (
#             '\n'.join([
#             f'''
#             <div class="card">
#                 <div style="min-width:200px;">
#                     <a href="."><h2>{article['title']}</h2></a>
#                 </div>
#                 <div>
#                     {article['summary']}
#                 </div>
#                 <hr>
#             </div>
#             <hr>
#             '''
#             for article in learning[name]['articles']
#             ])
#         )
#         for name in ['Python', 'Jupyter', 'Rosie', 'AI', 'ML'] # like this to control order
#         ])$$