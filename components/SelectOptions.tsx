import Places from "../data/places.json";

let selectOptions: Array<{ value: string; label: string }> = [];

for (const place of Places) {
  if (place.area_name.en.replaceAll(" ", "") == "") {
    continue;
  }
  selectOptions.push({
    value: place.area_name.en.replaceAll(" ", "-").toLowerCase(),
    label: place.area_name.en,
  });
}

selectOptions.sort(function (a, b) {
  var x = a.value;
  var y = b.value;
  return x < y ? -1 : x > y ? 1 : 0;
});

export const SelectOptions = () => {
  return (
    <select className="form-select mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl">
      {selectOptions.map((option) => {
        return (
          <option
            value={option.value}
            label={option.label}
            key={option.value}
          />
        );
      })}
    </select>
  );
};
