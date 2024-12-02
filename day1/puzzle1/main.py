

def parse_text_file(file_path):
    list1 = []
    list2 = []
    
    with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                parts = line.strip().split()
                list1.append(int(parts[0])) 
                list2.append(int(parts[1]))
    return list(zip(sorted(list1), sorted(list2)))


if __name__ == "__main__":
    file_path = input("Enter the path to the .txt file: ").strip()
    tuple_list = parse_text_file(file_path)
    print(tuple_list)
    sum_of_differences = sum(abs(a - b) for a, b in tuple_list)
    print(sum_of_differences)
