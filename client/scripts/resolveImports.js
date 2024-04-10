import { Project } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

const isAbsolute = (path) => {
    const fsd = ["shared", "entities", "features", "widgets", "pages", "processes", "app"];
    return fsd.some((folderName) => path.startsWith(folderName));
};

project.getSourceFiles().forEach((file) => {
    const fileImports = file.getImportDeclarations();
    fileImports.forEach((fileImport) => {
        const value = fileImport.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            fileImport.setModuleSpecifier("@/" + value);
        }
    });
});

project.save();
