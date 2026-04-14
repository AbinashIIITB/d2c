import re
import random

# Load the raw data
with open('./src/scripts/medical_data.txt', 'r') as f:
    data = f.read()

blocks = [b.strip() for b in data.split('See Details') if b.strip()]

colleges_data = []
for i, block in enumerate(blocks):
    lines = [l.strip() for l in block.split('\n') if l.strip()]
    
    fees = ""
    for l in lines:
        if 'MQ Fees:' in l:
            fees = l.replace('MQ Fees: ', '').strip()
            
    if lines[0].endswith('MBBS') and len(lines) > 1 and lines[1] == lines[0].replace('MBBS', ''):
        name = lines[1]
        location = lines[2]
        description = lines[3] if len(lines) > 3 and not lines[3].startswith('MQ Fees:') else "Medical college."
    else:
        name = lines[0].replace('MBBS', '')
        location = lines[1] if len(lines) > 1 else ""
        description = lines[2] if len(lines) > 2 and not lines[2].startswith('MQ Fees:') else "Medical college."

    name = name.strip()
    if name.endswith('MBBS'):
        name = name[:-4].strip()

    parts = location.split(',')
    state = parts[-1].strip() if len(parts) > 1 else "Unknown"
    
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    reviews = random.randint(50, 150)
    
    name_clean = name.replace('"', '\\"')
    location_clean = location.replace('"', '\\"')
    description_clean = description.replace('"', '\\"')
    image_url = f"https://placehold.co/800x600/1e293b/fff?text={name.replace(' ', '+')}"
    
    college_str = f"""    {{
        id: "new-med-{i + 1}",
        slug: "{slug}",
        name: "{name_clean}",
        location: "{location_clean}",
        state: "{state}",
        rating: 4.0,
        reviews: {reviews},
        fees: "{fees}",
        courses: ["MBBS"],
        type: "Private",
        description: "{description_clean}",
        imageUrl: "{image_url}",
        tags: ["Medical", "MBBS"],
        about: "{description_clean}",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            {{ name: "MBBS", duration: "5.5 Years", type: "Full Time" }}
        ],
        feesDetails: [
            {{
                title: "Management Quota (MQ) Fees",
                items: [{{ label: "Total Fees", value: "{fees}" }}]
            }}
        ],
        admissions: {{
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }}
    }}"""
    colleges_data.append(college_str)

output_block = ",\n".join(colleges_data)

# Inject into data.ts
with open('./src/lib/data.ts', 'r') as f:
    ts_lines = f.readlines()

# Find the end of 'colleges' array
# It starts at 'export const colleges: College[] = ['
# and ends at the first '];' after it.
insert_idx = -1
in_colleges = False
for i, line in enumerate(ts_lines):
    if "export const colleges: College[] = [" in line:
        in_colleges = True
    if in_colleges and "];" in line:
        insert_idx = i
        break

if insert_idx != -1:
    # Ensure a comma before appending if not empty
    if insert_idx > 0 and not ts_lines[insert_idx-1].strip().endswith(','):
        ts_lines[insert_idx-1] = ts_lines[insert_idx-1].rstrip() + ",\n"
    
    ts_lines.insert(insert_idx, output_block + "\n")
    
    with open('./src/lib/data.ts', 'w') as f:
        f.writelines(ts_lines)
    print(f"Successfully injected {len(colleges_data)} colleges.")
else:
    print("Could not find insertion point!")
    exit(1)
