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