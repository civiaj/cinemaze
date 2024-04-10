import fs from "fs";

const rawdata = fs.readFileSync("resources/translations.tsv");
const content = rawdata.toString();
let lines = content.split("\r\n");
const columns = lines[0].split("\t");
lines = lines.splice(1);

for (let i = 1; i < columns.length; i++) {
    const lang = columns[i];
    const data = {};

    lines.forEach((line) => {
        const trs = line.split("\t");
        const val = trs[0].split(".");
        if (val.length > 1) {
            if (!data[val[0]]) {
                data[val[0]] = {};
            }
            data[val[0]][val[1]] = trs[i];
        } else {
            data[trs[0]] = trs[i];
        }
    });
    fs.writeFileSync("../client/public/locales/" + lang + ".json", JSON.stringify(data, null, 2));
}
