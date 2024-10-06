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
            img(class_='appear', src='https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/logo.png', style='animation: AppearFromTop 0.7s ease-out 0s 1;'),
            id='splash-logo'
        ),

        div(
            h1('About Us'),
            hr(),
            p(b('MSOE AI Club (MAIC)', style='color: rgb(var(--hl-2));'), 'is built upon a foundation of teaching as many people as possible about the innovative space of artificial intelligence, regardless of their previous experience. We do this through a combination of Speaker Events, Innovation Labs, and Research Groups.'),
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
            img(src='https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/transition.png', class_='transition'),
            div(
                div(
                    h1('Meet the Eboard!'),
                    img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/2023 Org Fair.jpg", style='width:100%'),
                    p("A passionate team of MSOE university students dedicated to making artificial intelligence knowledge accessible to all. By strengthening our community partnerships each year, and staying on top of current innovations within the field, they create a platform for learning and innovation, inspiring a future driven by AI's transformative potential."),
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
                    h1('Explore AI-Club'),
                    elems(
                        # Speaker Events Section (Image on Left)
                        div(
                            div(
                                img(src="/img/misc/joe_poeschl.jpg", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 3%; margin-right: 0px; border-radius: 15px; border: 2px solid rgb(var(--hl-2));'),
                                div(
                                    a(
                                        h1('Speaker Events', style='color: #ffffff; font-weight: bold; margin-bottom: 7px;'),
                                        p('Learning About the "WHY" of AI', style='color: rgb(var(--hl-2)); font-weight: bold; margin-top: 5px;'),
                                    ),
                                    p('''
                                        AI-Club hosts weekly Speaker Events where industry experts and leaders share insights into cutting-edge AI technologies and their real-world applications. 
                                        These events foster a sense of community, provide members with the latest AI industry trends, and highlight the importance of pursuing a technology-driven education.
                                        <br/><br/>
                                    '''),
                                    p('Join us every week at the ', a('Direct Supply ITC', href='https://maps.app.goo.gl/QQbGUNRQrcK8dZpHA', style='font-weight:bold;'), 'from 6:30-7:30 PM for valuable industry insights—and enjoy some free food!'),         
                                    style="flex: 1;"
                                ),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding: 10px;"
                            )
                        ),

                        # Innovation Labs (Image on Right)
                        div(
                            div(
                                div(
                                    a(
                                        h1('Innovation Labs', style='color: #ffffff; font-weight: bold; margin-bottom: 7px;'),
                                        p('Getting Hands-on With Industry', style='color: #FFC000; font-weight: bold; margin-top: 5px;'),
                                    ),
                                    p('''
                                        The Innovation Labs offer a hands-on, industry-sponsored platform where teams of 8-12 students tackle real-world AI challenges. 
                                        These 2-month "hackathon-style" projects emphasize practical applications over novel technology, with $5000 in prizes and 
                                        direct feedback from industry sponsors.
                                        <br/><br/>
                                    '''), 
                                    p('Teams meet for one hour each week and spend another hour on development. This is a great opportunity to build your AI portfolio, work alongside mentors, and gain industry experience! For more details, ', a('check out this overview document.', href='https://drive.google.com/file/d/1kNZouHtwEL0uxEgGWr5qynHw7G9GEfGE/view?usp=sharing', style='font-weight: bold;')),
                                    style="flex: 1;"
                                ),
                                img(src="/img/misc/hacksgiving-2023.jpg", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 0px; margin-right: 3%; border-radius: 15px; border: 2px solid #FFC000;'),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding: 10px;"
                            )
                        ),

                        # Research Groups Section (Image on Left)
                        div(
                            div(
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/Research_Groups_Image.png", style='width: 45%; margin-right: 20px;'),
                                div(
                                    a(
                                        h2('Research Groups'),
                                        href='#research-groups',  # Set an anchor or relevant link here
                                        style='color: #0099ff; font-weight: bold;'
                                    ),
                                    p('Join one of our Research Groups and dive into specific AI topics through collaboration. With corporate mentorship and a focus on exploratory learning, these groups offer invaluable hands-on experience.'),
                                    style="flex: 1;"
                                ),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding: 10px;"
                            )
                        ),

                        # Learning Tree Section (Image on Left)
                        div(
                            div(
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/Learning_Tree_Image.png", style='width: 45%; margin-right: 20px;'),
                                div(
                                    a(
                                        h2('Learning Tree'),
                                        href='#learning-tree',  # Set an anchor or relevant link here
                                        style='color: #0099ff; font-weight: bold;'
                                    ),
                                    p('The Learning Tree is your pathway to mastering AI. Starting from fundamental concepts to advanced topics, it provides curated learning resources for both beginners and seasoned AI enthusiasts.'),
                                    style="flex: 1;"
                                ),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding: 10px;"
                            )
                        )
                    ),
                    style='width: 65%;'
                ),
                id='below-splash-content'
            ),
            id='below-splash'
        ),
        script(src='./js-css/bg-animation.js')
    )
)