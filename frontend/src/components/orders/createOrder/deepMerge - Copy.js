function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const json2 = { name: "Alice", parts: [{ age: 25 }, {color: "black"}] };
const json1 = { name: "AAAAA", parts: [{city: "New York", profession: "Engineer"}, {color: "white"}]};

const combined = deepMerge({}, json1);
deepMerge(combined, json2);

console.log("!!!!!",combined);
// Вывод: { name: "Alice", details: { age: 25, city: "New York" }, profession: "Engineer" }
