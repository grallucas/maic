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
            img(class_='appear', src='https://maic-fastapi-lambda.s3-website-us-east-1.amazonaws.com/img/misc/logo.png', style='animation: AppearFromTop 0.7s ease-out 0s 1;'),
            id='splash-logo'
        ),

        div(
            h1('About Us'),
            hr(),
            p(b('MSOE AI Club (MAIC)', style='color: rgb(var(--hl-2));'), 'is built upon a foundation of teaching as many students as possible about the innovative space of artificial intelligence, regardless of their previous experience within the space. We do this through a combination of workshops, speaker events, and research groups.'),
            a(
                '💡 ',
                span('Learn More', style = 'color: #0099ff; font-weight: bold;'),
                href='./About.html', style = 'text-decoration: none;'
            ),
            br(),
            a(
                '📣 ',
                span('Speak At An Upcoming Event', style = 'color: #0099ff; font-weight: bold;'),
                href='https://forms.office.com/Pages/ResponsePage.aspx?id=rM5GQNP9yUasgLfEpJurcGAyFplwhXJCtqB2wsxmGVlUMVNaRkVPUUtNOEsyS1oxMTIwRUpKQkoyNi4u', style = 'text-decoration: none;'
            ),
            id='splash-abt'
        ), #

        div(
            h3('↓ Scroll Down ↓'), 
            id='splash-scroll'
        ),

        div(
            img(src='https://maic-fastapi-lambda.s3-website-us-east-1.amazonaws.com/img/misc/transition.png', class_='transition'),
            div(
                div(
                    h1('Meet the Eboard!'),
                    img(src="https://maic-fastapi-lambda.s3-website-us-east-1.amazonaws.com/img/misc/2023 Org Fair.jpg", style='width:100%'),
                    p("A passionate team of MSOE university students dedicated to making artificial intelligence knowledge accessible to all. By strengthening our community partnerships each year, and staying on top of current innovations within the field, they create a platform for learning and innovation, inspiraing a future driven by AI's transformative potential."),
                    a('Contact Us', href='./contact.html', style = 'color: #0099ff; font-weight: bold;'),
                    style='max-width: 400px;'
                ),
                div(
                    h1('Leaderboard', style = 'display: inline;'),
                    a('What Are Points?', href='about_points.html', style = 'font-weight: bold; margin-left: 10px;'),#, style = 'color: #0099ff; font-weight: bold; margin-bottom: 10px; margin-left: 15px;'),
                    a('Where Are My Achievements?', href='about_achievements.html', style = 'font-weight: bold; margin-left: 10px;'),#, style = 'color: #0099ff; font-weight: bold; margin-bottom: 10px; margin-left: 15px;'),
                    # a('Go To Leaderboard Page', href='./Leaderboard.html'),
                    br(),
                    # button('Search', onclick='alert(\'Use Ctrl-F\')'),
                    div(LEADERBOARD_HTML, id='df_data'),
                    style = 'margin-top: 20px; margin-bottom: 5px;',
                    id='leaderboard',
                ),
                div(class_='break'),
                div(
                    h1('Recent Activity'),
                    elems(
                        div(
                            a(
                                h2(entry['title']),
                                href=common_get_article_link(entry['fname'], entry['type']),
                                style='color: #0099ff; font-weight: bold;'
                            ), 
                            p(entry['summary']),
                            style="margin-bottom: 15px; background-image: url(https://maic-fastapi-lambda.s3-website-us-east-1.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding-bottom: 10px; padding-right: 5%; padding-left: 5%;"
                        )
                        for entry in sorted(
                            list(filter(lambda entry: 'not_in_recent' not in entry, CONTENT)),
                            key=(lambda entry: entry['date']), reverse=True
                        )[:HOME_RECENT_LENGTH]
                    ),
                    style = 'width: 65%;'
                ),
                id='below-splash-content'
            ),
            id='below-splash'
        ),
        script(src='./js-css/bg-animation.js')
    )
)