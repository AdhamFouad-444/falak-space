import json

with open('simlab/src/data/curriculum.json') as f:
    data = json.load(f)

for section in data['sections']:
    for module in section.get('modules', []):
        mid = module.get('id', '')
        title = module.get('title', '')
        print('--- ' + mid + ' ' + title + ' ---')
        phases = module.get('phases', {})
        for phase_name, phase_data in phases.items():
            if 'instruction' in phase_data:
                print('INSTRUCTION (' + phase_name + '): ' + phase_data['instruction'])
            condition = phase_data.get('condition', {})
            if condition and 'hint' in condition:
                print('HINT (' + phase_name + '): ' + condition['hint'])
            if 'text' in phase_data and 'challenge' in phase_data.get('type', '').lower():
                print('CHALLENGE (' + phase_name + '): ' + phase_data['text'])
