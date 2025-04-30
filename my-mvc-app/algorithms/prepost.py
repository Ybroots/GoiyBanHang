import json

class Node:
    def __init__(self, item, count=1):
        self.item = item
        self.count = count
        self.children = {}
        self.parent = None

class PrePostTree:
    def __init__(self):
        self.root = Node(None)
        self.header_table = {}

    def insert_transaction(self, transaction):
        current_node = self.root
        for item in transaction:
            if item not in current_node.children:
                new_node = Node(item)
                new_node.parent = current_node
                current_node.children[item] = new_node
                if item not in self.header_table:
                    self.header_table[item] = []
                self.header_table[item].append(new_node)
            current_node = current_node.children[item]
            current_node.count += 1

    def mine_patterns(self, min_support):
        patterns = {}
        for item, nodes in self.header_table.items():
            support = sum(node.count for node in nodes)
            if support >= min_support:
                patterns[item] = support
        return patterns

if __name__ == "__main__":
    input_data = json.loads(input())
    transactions = input_data['transactions']
    min_support = input_data['minSupport']

    tree = PrePostTree()
    for transaction in transactions:
        tree.insert_transaction(transaction)

    patterns = tree.mine_patterns(min_support)
    print(json.dumps(patterns))