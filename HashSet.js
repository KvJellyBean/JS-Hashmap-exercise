import Node from "./Node.js";

class HashSet {
  constructor() {
    this.bucket = Array(16);
    this.bucketLength = this.bucket.length;
    this.loadFactor = 0.75;
    this.bucketSize = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key) {
    if (this.loadFactor < this.bucketSize / this.bucketLength) {
      this.bucket = this.bucket.concat(Array(16));
      this.bucketLength = this.bucket.length;
    }

    const hashKey = this.hash(key);
    this.bucket[hashKey % this.bucketLength] = new Node(hashKey);
    this.bucketSize++;
    return;
  }

  get(key) {
    const hashKey = this.hash(key);
    if (this.bucket[hashKey % this.bucketLength] === undefined) {
      return null;
    }

    const bucketKey = this.bucket[hashKey % this.bucketLength].key;

    if (hashKey === bucketKey) return bucketKey;
    else return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const hashKey = this.hash(key);

    if (this.has(key)) {
      delete this.bucket[hashKey % this.bucketLength];
      this.bucketSize--;
      return true;
    }
    return false;
  }

  length() {
    return this.bucketSize;
  }

  clear() {
    this.bucket = Array(16);
    this.bucketLength = this.bucket.length;
    this.bucketSize = 0;
    return;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.bucketLength; i++) {
      if (this.bucket[i] === undefined) continue;
      keys.push(this.bucket[i].key);
    }
    return keys;
  }

  entries() {
    return this.keys();
  }
}

const myHash = new HashSet();
