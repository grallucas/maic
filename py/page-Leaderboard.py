html(
    head(
        common_metadata(CURRENT_PAGE_NAME),
        style('table,td,th{border: none;}')
    ),
    body(
        h1('MAIC All-Time Points Leaderboard', style = 'text-align: center;'),
        div(
            div(LEADERBOARD_HTML, id='df_data'),
            id='leaderboard',
            style = 'display: flex; justify-content: center; align-items: center;'
        ),
    )
)

