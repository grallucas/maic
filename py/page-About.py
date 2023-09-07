html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    body(
        common_toolbar(CURRENT_PAGE_NAME),
        div(
            div(
                h1("Official Description"),
                p("""MSOE AI-Club (MAIC) is built upon a foundation of teaching as many students as possible about the innovative space of artificial intelligence, 
                regardless of their previous experience within the space. We do this through a combination of workshops, speaker events, and research groups.
                """),
                p("""For workshops, we create AI/ML projects that we walk the club through that provide understanding about certain AI/ML topics. 
                We also provide challenge problems to enable club members to explore these topics deeper in their own time."""
                ),
                p("""For speaker events, we bring in guests ranging from professors at MSOE to employees from local Wisconsin companies who work in Data Science, Machine Learning,
                Artificial Intelligence, or some related topic to AI. These talks can provide an idea of what is currently being done in industry and how you can get from being 
                a student at MSOE to working at one of their companies."""
                ),
                p("""
                For research groups, we facilitate the time and professional resources for MAIC members to explore AI topics further with their peers, 
                forming a team of students from any background with a mentor who has experience in Artificial Intelligence research. By the end of the project, 
                teams will have gained knowledge about researching current topics, creating effective experiments, and compiling results into a published research paper.
                """),
                br(),
                br(),
                h1("Frequently Asked Questions (FAQ)"),
                h3("Do I need to sign-up to come to events?", style = 'margin-top: 20px;'),
                p("No, you do not need to sign-up to come to events! However, if you are in our Teams, you'll be able to get notifications about upcoming events and other club news."),
                h3("Do I need to be CS to join?", style = 'margin-top: 20px;'),
                p("No, you do not need to be a CS major to join! We welcome all majors and all skill levels. We have members from all majors, including CS, SE, EE, ME, and more! In fact, we encourage other majors to join the club to get AI experience on their resumes as AI continues to spread throughout all major industries. Other majors also offer a fresh perspective on research projects, and some of our top-performing groups have included members from other majors!"),
                h3("How do I join the club?", style = 'margin-top: 20px;'),
                p("You can come to any of our events on Thursdays from 6:30pm - 7:30pm in the ITC Great Hall every-other week. Joining our Teams is as easy as <a href = 'https://teams.microsoft.com/l/team/19%3a1910afef1d1d4e3b9bfd5f7938182f0b%40thread.tacv2/conversations?groupId=8f7bf1ac-c9b6-4bf0-b74a-407f088e74cc&tenantId=4046ceac-fdd3-46c9-ac80-b7c4a49bab70'>clicking this link!</a>"),
                h3("How do I get points?", style = 'margin-top: 20px;'),
                p("You can get points by attending events, participating in workshops, and participating in research groups. You can also get points by completing challenge problems and submitting them to us! For a comprehensive list of how else you can get points, check out <a href = 'about_points.html'>this webpage</a>."),
                h3("How do I get achievements?", style = 'margin-top: 20px;'),
                p("You can get achievements by completing certain tasks, such as attending a certain number of events or completing a certain number of challenge problems. For a comprehensive list of how else you can get achievements, check out <a href = 'about_achievements.html'>this webpage</a>."),
                h3("How do I get on the leaderboard?", style = 'margin-top: 20px;'),
                p("You can get on the leaderboard by getting points! The more points you have, the higher you are on the leaderboard. If you are not on the leaderboard, please notify an eboard member and ensure you are a member of our Teams."),
                br(),
                br(),
                h1("Driven By Industry"),
                p("MAIC is driven by industry, meaning we want to provide students with the skills and knowledge that they need to be successful in industry..."),
                p("""To accomplish this goal, MAIC hopes to frequently communicate with many industry partners, including local companies, 
                to understand what skills they are looking for in their employees. We also hope to bring in speakers from these companies to talk about what they do.
                Below is a list of previous industry partners that we have worked with:"""),
                style = 'margin-right: 40px; margin-left: 40px;'
            ),
            
            
            div(
                elems(
                    common_content_to_card(
                        entry,
                        # elems(
                            
                        # )
                    ) for entry in CONTENT_GROUPS[CURRENT_PAGE_NAME]
                ),
                style = 'margin-right: 40px; margin-left: 40px;'
            ),


            # FAQ

            # History of the Club
        )
    )      
)