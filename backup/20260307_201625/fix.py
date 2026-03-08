import os

dirs = [r'c:\Users\danie\OneDrive\Desktop\univers-livre']
count = 0
for d in dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.html'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                if 'Ã' in content:
                    try:
                        fixed = content.encode('cp1252').decode('utf-8')
                        with open(path, 'w', encoding='utf-8') as file:
                            file.write(fixed)
                        print(f"Restored {path}")
                        count += 1
                    except Exception as e:
                        print(f"Failed {path}: {e}")
print(f"Total restored Python: {count}")
