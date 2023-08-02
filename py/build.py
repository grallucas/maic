from pyhtml import *
from collections import OrderedDict
import pandas as pd
from markdown import markdown
import os
from datetime import datetime

top_pages = ['index', 'Learning-Resources', 'Research', 'Workshops', 'Merch', 'Contact']

def get_page_display_name(name):
    if name=='index': return 'Home'
    return name.replace('-', ' ')

def listdir(dir):
    if dir[-1] != '/':
        dir = dir+'/'
    return [dir+f for f in os.listdir(dir)]

### Common page-generation functions

def common_metadata(page_name):
    return elems(
        title(f'MAIC - {get_page_display_name(page_name)}'),
        link(rel='icon', href='./logo.png'),
        meta(charset="UTF-8"),
        meta(name='viewport', content='width=device-width, initial-scale=1.0'),
        link(rel='stylesheet', href='./js-css/style.css'),
        link(rel='stylesheet', href=f'./js-css/{page_name}.css')
    )

def common_toolbar(page_name):
    return div(
        h3('MAIC'),
        h4('─'),
        *[
            a(
                p(get_page_display_name(page)),
                href=f'{page}.html',
                style = 'border-bottom: rgb(var(--text-2)) solid 1px;' if page == page_name else ''
            ) for page in top_pages
        ],
        id='toolbar'
)


def common_content_to_card(entry):
    return div(
        div(h1(entry['title'])),
        div(class_='break'),
        div(img(src=entry['img'], width='200px')) if 'img' in entry else '',
        div(
            entry['body'],
            hr()
        ),
        class_='card'
    )

def common_content_group_to_page(page_name, content_group):
    return html(
        head(common_metadata(page_name)),
        body(
            common_toolbar(page_name),
            elems(*[
                common_content_to_card(entry) for entry in content_group
            ])
        )
    )

# def content_to_page(entry):

### Aggregate page content

leaderboard_df = pd.read_csv('./content/leaderboard.csv')
leaderboard_html = markdown(
    '|' + '|'.join(leaderboard_df.columns) + '|\n' +
    '|' + '|'.join(['-']*len(leaderboard_df.columns)) + '|\n' +
    '\n'.join([
        '|' + '|'.join([str(x) for x in row]) + '|'
        for _, row in leaderboard_df.iterrows()
    ]),
    extensions=['tables']
)

content = []
for fname in listdir('./content/md'):
    entry = {}
    entry['type'] = fname.split('/')[-1].split('-')[0]

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

    content += [entry]
content.sort(key = lambda x:(x['order'], x['date']), reverse=True)

content_groups = {}
for entry in content:
    t = entry['type']
    if t not in content_groups:
        content_groups[t] = [entry]
    else:
        content_groups[t] += [entry]

### Generate HTML

HOME_RECENT_LENGTH = 5

for page_name in top_pages:
    try:
        with open(f'./py/page-{page_name}.py', 'r', encoding='utf8') as f_from, open(f'./{page_name}.html', 'w', encoding='utf8') as f_to:
            CURRENT_PAGE_NAME = page_name
            f_to.write(eval(f_from.read()))
    except FileNotFoundError:
        print('Missing expected top page:', f'./py/page-{page_name}.py')

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
