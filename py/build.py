from pyhtml import *
import pandas as pd
from markdown import markdown
import os
from datetime import datetime
import traceback

from time import time # profiling

t1 = time()

TOP_PAGES = ['index', 'Learning_Resources', 'Research', 'Workshops', 'Merch', 'Contact', 'About', 'Leaderboard']

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
        link(rel='icon', type='image/png', href='./img/misc/Sticker.png'),
        meta(charset="UTF-8"),
        meta(name='viewport', content='width=device-width, initial-scale=1.0'),
        link(rel='stylesheet', href='./js-css/style.css'),
        link(rel='stylesheet', href=f'./js-css/{page_name}.css')
    )

def common_toolbar(page_name):
    return div(
        # h3('<a href = "index.html" style = "text-decoration: none; background-image: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(80,77,255,1) 8%, rgba(6,170,216,1) 26%, rgba(100,253,253,1) 42%, rgba(255,141,255,1) 61%, rgba(144,100,253,1) 80%, rgba(80,77,255,1) 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">MAIC</a>'),
        h3(a(img(src = 'img/misc/Sticker.png', height='25', style='float: left; padding-right: 10px; padding-top: 5px; padding-bottom: 5px;'))),
        elems(
            a(
                p(get_page_display_name(page)),
                href = ('#below-splash' if page_name=='index' and page=='index' else f'{page}.html'),
                style = 'background-color: rgb(55, 34, 107); font-weight: bold; padding-top: 5px; padding-bottom: 5px; border-radius: 10px;' if page == page_name else ''
            ) for page in TOP_PAGES[:-1]
        ),
        id='toolbar',
        style = 'text-align: center;'
    )

def common_content_to_card(entry, extra=''):
    return div(
        div(h1(entry['title'])),
        div(class_='break'),
        div(img(src=entry['img'], height='170'), style = 'float: left; padding-right: 20px; margin-right: 10px; margin-bottom: 10px; display: block;') if 'img' in entry else '',
        div(
            entry['body']+extra,
            # hr(),
            style='margin-right: 10px;'
        ),
        id=entry['fname'],
        style="background-image: url(./img/misc/NN_background_pattern_2.png); background-size: cover; border-radius: 30px; border-style: solid; border-width: 3px; border-color: gray; padding-bottom: 35px; padding-right: 5%; padding-left: 5%; overflow: auto; margin-bottom: 20px;"
    )

def common_content_group_to_page(page_name, content):
    return html(
        body(
            elems(common_content_to_card(entry) for entry in content),
        )
    )

def common_get_article_link(fname, entry_type=None, link=None):
    if entry_type == 'Workshops':
        return f'./Workshops.html#{fname}'
    if link is not None:
        return link
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
            if itr > 7:
                username += "..." # Ellipses wrap so doesn't go over to points column
                break
            else:
                file_name = awards_df.iloc[i]['Icon Image Path']
                tooltip = awards_df.iloc[i]['Tooltip']
                username += f'<img src="{file_name}" title="{tooltip}" class="custom-emoji" height = 20px width = 20px>'
                # leaderboard_df['User'].iloc[0] = f'{leaderboard_df["User"].iloc[0]} <img src="custom_emojis/gold_medal.png" title="GOLD MEDAL!" class="custom-emoji">'
        return username

    user_data_df = pd.read_csv(user_data_path)
    leaderboard_df = user_data_df[['User', 'All-Time Points', 'Current Points']]
    leaderboard_df = leaderboard_df.rename(columns = {'All-Time Points': 'All-Time'})
    leaderboard_df = leaderboard_df.rename(columns = {'Current Points': 'Current'})

    icons_library = pd.read_csv('./data/Icons_Data.csv')

    # Add the images for icons that the player has
    for i in range(len(user_data_df)):
        if type(user_data_df.iloc[i]['Awards']) != float:
            award_names = user_data_df.iloc[i]['Awards'].split("|")
            awards_df = icons_library[icons_library['Icon Name'].isin(award_names)]
            print("NUM AWARDS: ", len(awards_df))
            awards_df = awards_df.sort_values(by = 'Priority', ascending=False)
            leaderboard_df['User'].iloc[i] = create_award_user_string(leaderboard_df['User'].iloc[i], awards_df) 
            print("USERNAME:", leaderboard_df.iloc[i]['User'])

    # Sort so players with the most point sare at the top
    leaderboard_df = leaderboard_df.sort_values(by='All-Time', ascending=False)  
    
    # Add finishing touches
    # leaderboard_df['User'] = leaderboard_df['User'].apply(lambda user: f'\t\t{user}', axis = 1)
    leaderboard_df['User'].iloc[0] = f'🏆 {leaderboard_df["User"].iloc[0]}'
    leaderboard_df['User'].iloc[1] = f'🥈 {leaderboard_df["User"].iloc[1]}'
    leaderboard_df['User'].iloc[2] = f'🥉 {leaderboard_df["User"].iloc[2]}'
    

    leaderboard_html = leaderboard_df.to_html(index = False, table_id= 'df_data', escape = False, classes = 'leaderboard-table', col_space = 20)
    return leaderboard_html    

t2 = time()

LEADERBOARD_HTML = build_leaderboard_html('./data/User_Data.csv')

t3 = time()

CONTENT = []
for fname in listdir('./content'):
    entry = {}
    entry['type'] = fname.split('/')[-1].split('-')[0]
    entry['fname'] = fname.split('/')[-1].split('.')[0]

    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.read().split('\n')
        while lines and ':' in lines[0]:
            colon_idx = lines[0].index(':')
            entry[lines[0][:colon_idx].strip()] = lines[0][colon_idx+1:].strip()
            lines = lines[1:]
        entry['body'] = markdown('\n'.join(lines).strip())

    if 'order' not in entry: entry['order'] = '0'
    entry['date'] = datetime.strptime(entry['date'], '%d/%m/%Y') if 'date' in entry else datetime.min
    if 'title' not in entry:
        entry['title'] = '.'.join(' '.join(fname.split('/')[-1].split('-')[1:]).split('.')[:-1])
    if 'categories' in entry:
        entry['categories'] = [s.strip() for s in entry['categories'].split(',')]
    if 'authors' in entry:
        entry['authors'] = [s.strip() for s in entry['authors'].split(',')]
    if 'summary' in entry:
        entry['summary'] = markdown(entry['summary'])
    if 'link' in entry:
        del entry['body']
    else:
        entry['link'] = None

    CONTENT += [entry]
CONTENT.sort(key = lambda x:(x['order'], x['date']), reverse=True)

CONTENT_GROUPS = {}
for entry in CONTENT:
    t = entry['type']
    if t not in CONTENT_GROUPS:
        CONTENT_GROUPS[t] = [entry]
    else:
        CONTENT_GROUPS[t] += [entry]

# for c in CONTENT:
#     for k,v in c.items():
#         print(k,v)
#     print('\n\n\n')

### Generate HTML

t4 = time()

HOME_RECENT_LENGTH = 5

for page_name in TOP_PAGES:
    try:
        with open(f'./py/page-{page_name}.py', 'r', encoding='utf-8') as f_from, open(f'./{page_name}.html', 'w', encoding='utf-8') as f_to:
            CURRENT_PAGE_NAME = page_name
            try:
                f_to.write(eval(f_from.read()))
            except Exception:
                print(f'ERROR in page: {page_name}:')
                print('\n'.join([f'    {s}' for s in traceback.format_exc().split('\n')]))
    except FileNotFoundError:
        print('Missing expected top page:', f'./py/page-{page_name}.py')

for entry in CONTENT_GROUPS['Learning_Resources']:
    if 'body' not in entry: continue
    with open(common_get_article_link(entry["fname"]), 'w', encoding='utf-8') as f:
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
                        div("By: <a style=font-weight:bold;>" + ', '.join(entry['authors']) + '</a>', style="text-align:center;"),
                        div("Published: " + entry['date'].strftime("%b %d, %Y"), style="text-align:center; padding-bottom: 20px;"),
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

t5 = time()

print(
    f'{100*(t3-t2)/(t5-t1):.2f}% spent in leaderboard.',
    f'{100*(t4-t3)/(t5-t1):.2f}% spent in content aggregation.',
    f'{100*(t5-t4)/(t5-t1):.2f}% spent in html generation.',
    sep = '\n'
)