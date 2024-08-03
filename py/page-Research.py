body(
    head(common_metadata(CURRENT_PAGE_NAME)),
    common_toolbar(CURRENT_PAGE_NAME),
    body(
        div(
            h1("MAIC Research"),
            div(class_='break'),
            h3("""
            Our research groups are the <span style = 'font-weight: bold; color: yellow;'>best opportunity</span> we offer students for getting <span style = 'font-weight: bold; color: rgb(var(--hl-2));'>hands-on experience with developing AI technologies</span>.<br>
            """),
            div("""
                All levels of understanding are welcome; in fact, <span style = 'font-weight: bold;'>we encourage Freshman to join</span> so they can start building their knowledge about AI even before their MSOE education. 
                To accomplish this, these groups are facilitated in a mentor/mentee style, driven by other students or industry partners on projects which provide both a motivated purpose and pathway for a final publication.
                After hosting over 15 research groups these past two years, with over half published and presented at conferences, we hope you will join us in developing the technology of tomorrow!<br><br>
                <span style = 'font-weight: bold;'>Below is a list of completed and ongoing research MAIC members have led.</span> <br><br>
            """),
            h1("Our Research Groups"),
            div("""
                To sign up, please either attend the introductory meetings at the beginning of the Fall Semester for a sign-up form or reach out to an eboard member before the end of October.
            """, style = 'color: gray;'),
            class_='card'
        ),
        
        style = 'padding-right: 20px; padding-left: 20px;'
        
    ),
    common_content_group_to_page(CURRENT_PAGE_NAME, CONTENT_GROUPS[CURRENT_PAGE_NAME])
)