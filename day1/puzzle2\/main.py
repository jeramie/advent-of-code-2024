

def parse_text_file(file_path):
    list1 = []
    list2 = []
    
    with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                parts = line.strip().split()
                list1.append(int(parts[0])) 
                list2.append(int(parts[1]))
    return list1, list2


if __name__ == "__main__":
    file_path = input("Enter the path to the .txt file: ").strip()
    list1, list2 = parse_text_file(file_path)
    similarity_score = sum(a * list2.count(a) for a in list1)
    print(similarity_score)
