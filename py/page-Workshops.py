html(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        h1("MAIC Workshops"), 
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

            <span style = 'font-weight: bold;'>Workshops are held on Thursdays from 6-7pm. Check the calendar at __________.</span><br><br>
        """),
        h1("Our Research Groups"),
        div("""
             To sign up, please either attend the introductory meetings at the beginning of the Fall Semester for a sign-up form or reach out to an eboard member before the end of October.
        """, style = 'padding-bottom: 50px; color: gray;'),
        style = 'padding-right: 20px; padding-left: 20px;'
        
    ),
    elems(
        common_content_to_card(
            entry,
            a('Download', href=f'./data/downloads/{entry["fname"]}.zip', download='')
        ) for entry in CONTENT_GROUPS[CURRENT_PAGE_NAME]
    )
)