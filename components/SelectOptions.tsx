import Places from "../data/places.json";

let selectOptions: Array<{ value: string; label: string }> = [];

const allKeys: string[] = [];
for (const place of Places) {
  if (place.area_name.en.replaceAll(" ", "") == "") {
    continue;
  }
  if (allKeys.includes(place.area_name.en.replaceAll(" ", "-").toLowerCase())) {
    continue;
  }
  selectOptions.push({
    value: place.area_name.en.replaceAll(" ", "-").toLowerCase(),
    label: place.area_name.en,
  });
  allKeys.push(place.area_name.en.replaceAll(" ", "-").toLowerCase());
}

selectOptions.sort(function (a, b) {
  var x = a.value;
  var y = b.value;
  return x < y ? -1 : x > y ? 1 : 0;
});

export const SelectOptions = ({ onChangeFunction, defaultArea }: any) => {
  console.log(defaultArea);

  return (
    <select
      value={defaultArea}
      className="form-select mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl"
      onChange={onChangeFunction}
    >
      {selectOptions.map((option) => {
        return (
          <option
            value={option.label}
            label={option.label}
            key={option.value}
          />
        );
      })}
    </select>
  );
};
