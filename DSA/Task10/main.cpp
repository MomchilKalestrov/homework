template <typename TKey, typename TValue>
class KeyValue {
    public:
        TKey key;
        TValue value;
        
        KeyValue(TKey key, TValue value) {
            this.key = key;
            this.value = value;
        };

        bool compare(KeyValue kv) {
            return kv.key == this.key && kv.value == this.value;
        };
};

int main() {
    return 0;
};