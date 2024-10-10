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
                    img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/maic_eboard_24.jpg", style='width:100%'),
                    p("A passionate team of MSOE university students dedicated to making artificial intelligence knowledge accessible to all. By strengthening our community partnerships each year, and staying on top of current innovations within the field, they create a platform for learning and innovation, inspiring a future driven by AI's transformative potential."),
                    a('Contact Us', href='./Contact.html', style = 'color: #0099ff; font-weight: bold;'),
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
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/joe_poeschl.jpg", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 3%; margin-right: 0px; border-radius: 15px; border: 2px solid rgb(var(--hl-2));'),
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
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: rgb(var(--hl-2)); padding: 10px;"
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
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/hacksgiving-2023.jpg", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 0px; margin-right: 3%; border-radius: 15px; border: 2px solid #FFC000;'),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: #FFC000; padding: 10px;"
                            )
                        ),

                        # Research Groups Section (Image on Left)
                        div(
                            div(
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/2024_ROSIE_MAIC.jpg", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 3%; margin-right: 0px; border-radius: 15px; border: 2px solid #4BECFD;'),
                                div(
                                    a(
                                        h1('Research Groups', style='color: #ffffff; font-weight: bold; margin-bottom: 7px;'),
                                        p('Publishing Novel AI Applications', style='color: #4BECFD; font-weight: bold; margin-top: 5px;'),
                                    ),
                                    p('''
                                        Research Groups are designed for students to work collaboratively on AI projects that often lead to published research. 
                                        Guided by mentors, these groups dive into advanced AI topics, with a focus on innovative solutions and practical experience across 6 months.
                                        We even offer for-credit opportunities!
                                        <br/><br/>
                                    '''),
                                    p('Teams meet weekly to collaborate and develop research papers, often presented at conferences. Interested in making an impact? ', a('See our previous projects here.', href='https://msoe-maic.com/library?nav=Research', style='font-weight: bold;')),
                                    style="flex: 1;"
                                ),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: #4BECFD; padding: 10px;"
                            )
                        ),

                        # Learning Tree Section (Image on Left)
                        div(
                            div(
                                div(
                                    a(
                                        h1('Learning Tree', style='color: #ffffff; font-weight: bold; margin-bottom: 7px;'),
                                        p('Your Pathway to Mastering AI', style='color: #00FA86; font-weight: bold; margin-top: 5px;'),
                                    ),
                                    p('''
                                        The Learning Tree is a structured resource guide that helps both beginners and advanced learners navigate AI concepts. 
                                        Covering fundamental topics through to advanced areas like computer vision and natural language processing, it provides curated 
                                        resources for self-paced learning -- often used by our hands-on project mentors!
                                        <br/><br/>
                                    '''),
                                    p('Explore various AI topics and take control of your learning journey by understanding the path ahead. ', a('Jump to the Learning Tree!', href='https://msoe-maic.com/learning-tree', style='font-weight: bold;')),
                                    style="flex: 1;"
                                ),
                                img(src="https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/learning_tree_logo.png", style='width: 30%; aspect-ratio: 1 / 1; object-fit: cover; margin-left: 0px; margin-right: 3%; border-radius: 15px; border: 2px solid #00FA86;'),
                                style="display: flex; align-items: center; margin-bottom: 5px; background-image: url(https://maic-fastapi-lambda.s3.amazonaws.com/img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: #00FA86; padding: 10px;"
                            )
                        ),
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