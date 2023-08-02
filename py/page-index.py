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
            p('We like AI.'),
            id='splash-abt'
        ),

        div(h3('↓ Go Down ↓'), id='splash-scroll'),

        div(
            img(src='./img/misc/transition.png', class_='transition'),
            div(
                div(
                    h1('Meet the Eboard!'),
                    img(src="./img/misc/eboard.png", width=500),
                    p('Words about the eboard'),
                    a('Contact Us', href='./contact.html')
                ),
                div(
                    h1('Leaderboard'),
                    button('Search', onclick='alert(\'Use Ctrl-F\')'),
                    leaderboard_html,
                    id='leaderboard'
                ),
                div(
                    h1('Recent'),
                    *[
                        elems(
                            hr(),
                            a(h2(entry['title']),
                            href='.'), p(entry['summary'])
                        )
                        for entry in list(filter(lambda entry: 'not_in_recent' not in entry, content))[:HOME_RECENT_LENGTH]
                    ]
                ),
                id='below-splash-content'
            ),
            id='below-splash'
        ),
        script(src='./js-css/bg-animation.js')
    )
)