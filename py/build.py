from pyhtml import *
import pandas as pd
from markdown import markdown
import os
from datetime import datetime
import traceback

TOP_PAGES = ['index', 'Learning_Resources', 'Research', 'Workshops', 'Merch', 'Contact', 'About']

def get_page_display_name(name):
    if name=='index': return 'Home'
    return name.replace('_', ' ')

def listdir(dir):
    if dir[-1] != '/':
        dir = dir+'/'
    return [dir+f for f in os.listdir(dir)]

### Common page-generation functions

def common_metadata(page_name):
    return elems(
        title('MSOE AI Club') if page_name == 'index'
        else title(f'MAIC - {get_page_display_name(page_name)}'),
        link(rel='icon', type='image/png', href='./logo.png'),
        meta(charset="UTF-8"),
        meta(name='viewport', content='width=device-width, initial-scale=1.0'),
        link(rel='stylesheet', href='./js-css/style.css'),
        link(rel='stylesheet', href=f'./js-css/{page_name}.css')
    )

def common_toolbar(page_name):
    return div(
        h3('MAIC', style='background-image: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(80,77,255,1) 8%, rgba(6,170,216,1) 26%, rgba(100,253,253,1) 42%, rgba(255,141,255,1) 61%, rgba(144,100,253,1) 80%, rgba(80,77,255,1) 100%); -webkit-background-clip: text; background-clip: text; color: transparent;'),
        h4('─'),
        elems(
            a(
                p(get_page_display_name(page)),
                href = ('#below-splash' if page_name=='index' and page=='index' else f'{page}.html'),
                style = 'border-bottom: rgb(var(--text-2)) solid 2px; font-weight: bold;' if page == page_name else ''
            ) for page in TOP_PAGES
        ),
        id='toolbar'
)

def common_content_to_card(entry):
    return div(
        div(h1(entry['title'])),
        div(class_='break'),
        div(img(src=entry['img'], width='200px')) if 'img' in entry else '',
        div(
            entry['body'],
            # hr(),
            style='max-width:75%'
        ),
        class_='card',
        style="background-color: black; border-radius: 5%; border-style: solid; border-width: 3px; border-color: gray; padding-bottom: 35px"
    )

def common_content_group_to_page(page_name, content):
    return html(
        head(common_metadata(page_name)),
        body(
            common_toolbar(page_name),
            elems(common_content_to_card(entry) for entry in content)
        )
    )

def common_get_article_link(fname):
    return f'./articles-{fname}.html'

### Aggregate page content

## DEPRECATED
# leaderboard_df = pd.read_csv('./content/leaderboard.csv')
# LEADERBOARD_HTML = markdown(
#     '|' + '|'.join(leaderboard_df.columns) + '|\n' +
#     '|' + '|'.join(['-']*len(leaderboard_df.columns)) + '|\n' +
#     '\n'.join([
#         '|' + '|'.join([str(x) for x in row]) + '|'
#         for _, row in leaderboard_df.iterrows()
#     ]),
#     extensions=['tables']
# )

def build_leaderboard_html(user_data_path):
    def create_award_user_string(username, awards_df):
        """
        For an awards df (max 3 entries), put award icons next to associated player
        :param username: Name of the player
        :param awards_df: Awards player has and associated data 
        """
        username += " " # Add some padding between the name and the awards
        itr = 0
        for i in range(len(awards_df)):
            itr += 1
            if itr > 5:
                username += "..." # Ellipses wrap so doesn't go over to points column
                break
            else:
                file_name = awards_df.iloc[i]['Icon Image Path']
                tooltip = awards_df.iloc[i]['Tooltip']
                username += f'<img src="{file_name}" title="{tooltip}" class="custom-emoji">'
                # leaderboard_df['User'].iloc[0] = f'{leaderboard_df["User"].iloc[0]} <img src="custom_emojis/gold_medal.png" title="GOLD MEDAL!" class="custom-emoji">'
        return username

    user_data_df = pd.read_csv(user_data_path)
    leaderboard_df = user_data_df[['User', 'All-Time Points']]
    icons_library = pd.read_csv('./data/Icons_Data.csv')

    # Add the images for icons that the player has
    for i in range(len(user_data_df)):
        award_names = user_data_df.iloc[i]['Awards'].split("|")
        awards_df = icons_library[icons_library['Icon Name'].isin(award_names)]
        print("NUM AWARDS: ", len(awards_df))
        awards_df = awards_df.sort_values(by = 'Priority', ascending=False)
        leaderboard_df['User'].iloc[i] = create_award_user_string(leaderboard_df['User'].iloc[i], awards_df) 
        print("USERNAME:", leaderboard_df.iloc[i]['User'])

    # Sort so players with the most point sare at the top
    leaderboard_df = leaderboard_df.sort_values(by='All-Time Points', ascending=False)  
    
    # Add finishing touches
    # leaderboard_df['User'] = leaderboard_df['User'].apply(lambda user: f'\t\t{user}', axis = 1)
    leaderboard_df['User'].iloc[0] = f'🏆 {leaderboard_df["User"].iloc[0]}'
    leaderboard_df['User'].iloc[1] = f'🥈 {leaderboard_df["User"].iloc[1]}'
    leaderboard_df['User'].iloc[2] = f'🥉 {leaderboard_df["User"].iloc[2]}'
    

    leaderboard_html = leaderboard_df.to_html(index = False, table_id= 'df_data', escape = False, classes = 'leaderboard-table')
    return leaderboard_html    

LEADERBOARD_HTML = build_leaderboard_html('./data/User_Data.csv')

CONTENT = []
for fname in listdir('./content'):
    entry = {}
    entry['type'] = fname.split('/')[-1].split('-')[0]
    entry['fname'] = fname.split('/')[-1].split('.')[0]

    with open(fname, 'r') as f:
        lines = f.read().split('\n')
        while ':' in lines[0]:
            colon_idx = lines[0].index(':')
            entry[lines[0][:colon_idx].strip()] = lines[0][colon_idx+1:].strip()
            lines = lines[1:]
        entry['body'] = markdown('\n'.join(lines).strip())

    if 'order' not in entry: entry['order'] = '0'
    entry['date'] = datetime.strptime(entry['date'], '%d/%m/%Y') if 'date' in entry else datetime.min
    if 'title' not in entry:
        entry['title'] = '.'.join(' '.join(fname.split('/')[-1].split('-')[1:]).split('.')[:-1])
    if 'catagories' in entry:
        entry['catagories'] = [s.strip() for s in entry['catagories'].split(',')]

    CONTENT += [entry]
CONTENT.sort(key = lambda x:(x['order'], x['date']), reverse=True)

CONTENT_GROUPS = {}
for entry in CONTENT:
    t = entry['type']
    if t not in CONTENT_GROUPS:
        CONTENT_GROUPS[t] = [entry]
    else:
        CONTENT_GROUPS[t] += [entry]

### Generate HTML

HOME_RECENT_LENGTH = 5

for page_name in TOP_PAGES:
    try:
        with open(f'./py/page-{page_name}.py', 'r', encoding='utf8') as f_from, open(f'./{page_name}.html', 'w', encoding='utf8') as f_to:
            CURRENT_PAGE_NAME = page_name
            try:
                f_to.write(eval(f_from.read()))
            except Exception:
                print(f'ERROR in page: {page_name}:')
                print('\n'.join([f'    {s}' for s in traceback.format_exc().split('\n')]))
    except FileNotFoundError:
        print('Missing expected top page:', f'./py/page-{page_name}.py')

for entry in CONTENT_GROUPS['Learning_Resources']:
    with open(common_get_article_link(entry["fname"]), 'w') as f:
        f.write(
            html(
                head(
                    common_metadata(entry['title'])
                ),
                body(
                    common_toolbar(entry['title']),
                    div(
                        h1(entry['title'], style="text-align:center;"),
                        h3(entry['summary'], style="text-align:center;"),
                        hr(),
                        entry['body'],
                        style="padding-left: 40px; padding-right: 40px;"
                    )
                )
            )
        )

with open('./404.html', 'w') as f:
    f.write(
        html(
            head(
                common_metadata('404'),
                style('#stuff{width:100%; text-align: center;}')
            ),
            body(
                div(
                    h1('404', style="font-size: 800%;"),
                    h2("The page you're looking for doesn't exist!", a('Go back!', href="./index.html")),
                    p(img(src='./img/misc/404snail.png')),
                    id='stuff'
                )
            )
        )
    )