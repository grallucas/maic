html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        div(
            h1("MAIC Workshops"), 
            div(class_='break'),
            # <span style = 'font-weight: bold; color: yellow;'>best opportunity</span>
            h3("""
            Workshops provide a <span style = 'font-weight: bold; color: yellow;'>learning environment</span> for students to hear about the <span style = 'font-weight: bold; color: rgb(var(--hl-2));'>latest AI innovations</span> in a condensed format -- all while using <span style = 'font-weight: bold; color: red;'>ROSIE</span>.<br>
            """),
            div("""          
                In just 1-hour sessions from 6-7pm, workshops have content ranging from reviews of recent AI innovations,
                interacting with technical details in Jupyter notebooks,
                or listening to a visiting industry partner about advancements they've made using AI at their company.
                
                Limited to 1-hour sessions, workshops can range from reviews of recent innovations, 
                hands-on workshops with technical details outlined in Jupyter notebooks, 
                or even industry partners speaking about AI advancements they've developed at their companies.<br>

                Hosted bi-weekly (unless the workshop lands during an exam week), these events are a great way to connect with other students and members from industry who are interested
                in how AI is going to shape the world of tomorrow. While our research groups are more dedicated to getting members hands-on with developing this new technology and understanding underlying AI concepts, workshops
                are a great way to learn about high-level details of the newest technologies that are coming out from other research groups and companies around the globe.<br><br>

                <span style = 'font-weight: bold;'>Workshops are held on Thursdays from 6:30-7:30pm in the <a href='map.html'>Great Hall of the ITC (Direct Supply Building)</a></span><br><br>
            """),
            h1("Our Previous Workshops"),
            class_='card'
        ),
        
        style = 'padding-right: 20px; padding-left: 20px;'
        
    ),
    elems(
        common_content_to_card(
            entry,
            elems(
                a('⇩ Download', href=f'./data/downloads/{entry["fname"]}.zip', download='', style = 'font-weight: bold;'), br(),
                b(f'Developer: '), ', '.join(entry['authors']), br(),
                b('Workshop Date: '), entry['date'].strftime("%M-%d-%Y")
            )
        ) for entry in CONTENT_GROUPS[CURRENT_PAGE_NAME]
    )
)