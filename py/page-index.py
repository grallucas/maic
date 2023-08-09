html(
    head(
        common_metadata(CURRENT_PAGE_NAME),
    ),
    body(
        script(src='./js-css/delay-animation.js'),
        common_toolbar(CURRENT_PAGE_NAME),

        div(
            canvas(id='splash-bg'),
            style='position:relative; width: 100%; height: 100vh'
        ),

        div(
            img(class_='appear', src='./img/misc/logo.png', style='animation: AppearFromTop 0.7s ease-out 0s 1;'),
            id='splash-logo'
        ),

        div(
            h1('About Us'),
            hr(),
            p(b('MSOE AI Club (MAIC)', style='color: rgb(var(--hl-2));'), 'is built upon a foundation of teaching as many students as possible about the innovative space of artificial intelligence, regardless of their previous experience within the space. We do this through a combination of workshops, speaker events, and research groups.'),
            a('Learn More', href='./About.html'),
            id='splash-abt'
        ),

        div(h3('↓ Scroll Down ↓'), id='splash-scroll'),

        div(
            img(src='./img/misc/transition.png', class_='transition'),
            div(
                div(
                    h1('Meet the Eboard!'),
                    img(src="./img/misc/eboard.png", style='width:100%'),
                    p("A passionate team of MSOE univsersity students dedicated to making artificial intelligence knowledge accessible to all. By strengthening our community partnerships each year, and staying on top of current innovations within the field, they create a platform for learning and innovation, inspiraing a future driven by AI's transformative potential."),
                    a('Contact Us', href='./contact.html'),
                    style='max-width: 400px;'
                ),
                div(
                    h1('Leaderboard'),
                    # button('Search', onclick='alert(\'Use Ctrl-F\')'),
                    div(LEADERBOARD_HTML, id='df_data'),
                    id='leaderboard'
                ),
                div(class_='break'),
                div(
                    h1('Recent'),
                    elems(
                        elems(
                            hr(),
                            a(h2(entry['title']),
                            href=common_get_article_link(entry['fname'])), p(entry['summary'])
                        )
                        for entry in
                            sorted(
                                list(
                                    filter(
                                        lambda entry: 'not_in_recent' not in entry,
                                        CONTENT
                                    )
                                ),
                                key=lambda entry: entry['date'], reverse=True
                            )[:HOME_RECENT_LENGTH]
                    )
                ),
                id='below-splash-content'
            ),
            id='below-splash'
        ),
        script(src='./js-css/bg-animation.js')
    )
)