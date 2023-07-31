# requirements
# pip install markdown
# pip install pandas

from markdown import markdown
import os
import datetime
import traceback
import textwrap
import pandas as pd

### Util

def get_dir_items(dir):
    if dir[-1] != '/':
        dir = dir+'/'
    return [dir+f for f in os.listdir(dir)]

### Functions used in templates

def common_metadata(title):
    return f'''
    <title>{title}</title>
    <link rel="icon" href="./logo.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./js-css/style.css">
    '''

def toolbar(current_page):
    pages = [
        {'file': 'index.html', 'title': 'Home'},
        {'file': 'learning.html', 'title': 'Learning Resources'},
        {'file': 'research.html', 'title': 'Research'},
        {'file': 'workshops.html', 'title': 'Workshops'},
        {'file': 'merch.html', 'title': 'Merch'},
        {'file': 'contact.html', 'title': 'Contact'},
    ]

    return \
    '<div id="toolbar">\n' +\
    '<h3>MAIC</h3>\n' +\
    '<h4>─</h4>\n' +\
    '\n'.join([
    f'<a href="{"#below-splash" if current_page=="index.html" and p["file"] == "index.html" else p["file"]}"' +\
        (' style="border-bottom: rgb(var(--text-2)) solid 1px;"' if p['file']==current_page else '') +\
        f'><p>{p["title"]}</p></a>'
    for p in pages
    ]) +\
    '\n</div>'
    
    return f'''
    <div id="toolbar">
        <h3>MAIC</h3>
        <h4>─</h4>
        <a href="index.html"><p>Home</p></a>
        <a href="."><p>Learning Resources</p></a>
        <a href="."><p>Research</p></a>
        <a href="workshops.html" style="border-bottom: rgb(var(--text-2)) solid 1px;"><p>Workshops</p></a>
        <a href="."><p>Contact</p></a>
    </div>
    '''

def gen_html_from_cards(content: list[dict]) -> str:
    return '\n'.join([
        f'''
        <div class="card">
            <div>
                <h1>{w['title']}</h1>
            </div>
            <div class="break"></div>
            {
            ('<div> <img src="' + w["img"] + '" width=200px> </div>')
            if "img" in w else ''
            }
            <div>
                {w['body']}
                <hr>
            </div>
        </div>
        ''' for w in content
    ])

### Import site md content

def parse_md(path) -> dict:
    result = {}
    with open(path, 'r', encoding = 'utf-8') as f:
        while True:
            line = f.readline()
            if line.strip() == '===': break
            if line.strip() == '': continue
            i = line.index(':')
            result[line[:i].strip()] = line[i+1:].strip()
        result['body'] = markdown(f.read().strip())
        if 'date' in result:
            result['date'] = datetime.datetime.strptime(result['date'], '%d/%m/%Y')
        if 'summary' in result:
            result['summary'] = markdown(result['summary'])
        if 'title' not in result:
            result['title'] = '.'.join(
                path.split('/')[-1].split('.')[:-1]
            )
    return result

workshops = map(parse_md, get_dir_items('./md/workshops/'))
workshops = sorted(workshops, key = lambda w: w['date'], reverse=True)

contacts = map(parse_md, get_dir_items('./md/contacts/'))
contacts = sorted(contacts, key = lambda w: w['date'], reverse=True)

merch = map(parse_md, get_dir_items('./md/merch/'))
merch = sorted(merch, key = lambda w: w['date'], reverse=True)

research = map(parse_md, get_dir_items('./md/research/'))
research = sorted(research, key = lambda w: w['date'], reverse=True)

learning = {}
for dir in get_dir_items('./md/learning/'):
    name = dir.split('/')[-1]
    with open(f'{dir}/.color', 'r', encoding = 'utf-8') as f:
        learning[name] = {'col': ' '.join(f.read().split())}
    
    learning[name]['articles'] = map(parse_md, filter(lambda f: f.split('/')[-1] != '.color', get_dir_items(dir)))
    learning[name]['articles'] = sorted(learning[name]['articles'], key = lambda x: x['date'], reverse=True)

everything = []
for x in learning.values():
    for a in x['articles']:
        everything += [a]
everything += workshops
everything = sorted(everything, key = lambda x: x['date'], reverse=True)

def create_award_user_string(username, awards_df):
    """
    For an awards df (max 3 entries), put award icons next to associated player
    :param username: Name of the player
    :param awards_df: Awards player has and associated data 
    """
    for i in range(len(awards_df)):
        file_name = awards_df.iloc[i]['Icon Image Path']
        tooltip = awards_df.iloc[i]['Tooltip']
        username += f'<img src="{file_name}" title="{tooltip}" class="custom-emoji">'
        # leaderboard_df['User'].iloc[0] = f'{leaderboard_df["User"].iloc[0]} <img src="custom_emojis/gold_medal.png" title="GOLD MEDAL!" class="custom-emoji">'
    return username

def build_leaderboard_html(user_data_path):
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
    

    leaderboard_html = leaderboard_df.to_html(index = False, escape = False, classes = 'leaderboard-table')
    return leaderboard_html    

leaderboard_html = build_leaderboard_html('./data/User_Data.csv')

# DEPRECATED
#     '|' + '|'.join(leaderboard_df.columns) + '|\n' +
#     '|' + '|'.join(['-']*len(leaderboard_df.columns)) + '|\n' +
#     '\n'.join([
#         '|' + '|'.join([str(x) for x in row]) + '|'
#         for _, row in leaderboard_df.iterrows()
#     ]),
#     extensions=['tables']
# )

### Create the final HTML files

def parse_template(path) -> str:
    page = None
    with open(path, 'r', encoding = 'utf-8') as f:page = f.read()
    page = page.split('$$')

    for i, s in enumerate(page):
        if i%2 == 0: continue
        try:
            page[i] = eval(textwrap.dedent(s))
        except Exception:
            print('Error in ' + path)
            traceback.print_exc()

    return '\n'.join(page)


for path in get_dir_items('./templates/'):
    page = parse_template(path)
    with open(path.split('/')[-1], 'w', encoding = 'utf-8') as f:
        f.write('<!--This HTML was generated by a script (and it shows)-->\n' + page)

###

print('Done!')