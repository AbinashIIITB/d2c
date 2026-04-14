import re

with open('./src/lib/data.ts', 'r') as f:
    lines = f.readlines()

# Stage 1: Identify the block to move
# It starts with the comma at 1599 (index 1599) or so.
# Let's find "new-med-1" and "new-med-45"
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'id: "new-med-1"' in line:
        # Search backwards for the starting { of this object
        j = i
        while j >= 0 and '{' not in lines[j]:
            j -= 1
        # Include the comma before it if it exists
        if j > 0 and ',' in lines[j-1]:
            start_idx = j - 1
        else:
            start_idx = j
    
    if 'id: "new-med-45"' in line:
        # Search forwards for the ending } of this object
        j = i
        while j < len(lines) and '}' not in lines[j]:
            j += 1
        end_idx = j

print(f"Extracted block from index {start_idx} to {end_idx}")

if start_idx == -1 or end_idx == -1:
    print("Failed to find the block!")
    exit(1)

block_to_move = lines[start_idx:end_idx+1]
# Ensure it ends with a comma if it's going to be in the middle, or handle it during insertion.

# Stage 2: Remove the block from lines
del lines[start_idx:end_idx+1]

# Stage 3: Find insertion point (End of colleges array)
# Colleges array starts at "export const colleges: College[] = ["
# and ends at the first "];" after that.
insert_idx = -1
in_colleges = False
for i, line in enumerate(lines):
    if "export const colleges: College[] = [" in line:
        in_colleges = True
    if in_colleges and "];" in line:
        insert_idx = i
        break

if insert_idx == -1:
    print("Failed to find insertion point!")
    exit(1)

# Ensure the block has a leading comma if inserted after existing items
# or simply insert it before the closing ];
# If the last item in colleges doesn't have a comma, add one.
if not lines[insert_idx-1].strip().endswith(','):
    lines[insert_idx-1] = lines[insert_idx-1].rstrip() + ",\n"

# Insert the block
for i, b_line in enumerate(block_to_move):
    lines.insert(insert_idx + i, b_line)

with open('./src/lib/data.ts', 'w') as f:
    f.writelines(lines)

print("Successfully relocated 45 colleges.")
