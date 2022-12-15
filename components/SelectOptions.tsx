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
  return (
    <select
      value={defaultArea}
      className="form-select mt-3 w-full text-stone-100 rounded-xl bg-inherit"
      onChange={onChangeFunction}
    >
      {selectOptions.map((optionProps) => {
        return (
          <option
            value={optionProps.label}
            label={optionProps.label}
            key={optionProps.value}
            className="bg-black"
          />
        );
      })}
    </select>
  );
};
