module Fayde {
    var jsonFile = 'fayde.json';

    declare var require;

    export function LoadConfigJson (onComplete: (config: any, err?: any) => void) {
        require(['text!' + jsonFile],
            (jsontext) => configure(jsontext, onComplete),
            (err) => onComplete(err));
    }

    function configure (jsontext: string, onComplete: (config: any, err?: any) => void) {
        var json: any;
        try {
            json = JSON.parse(jsontext);
        } catch (err) {
            return onComplete(null, err);
        }
        if (json)
            configureLibs(json.libs || {});
        onComplete(json);
    }

    interface ILibraryConfig {
        name: string;
        path: string;
        deps: string[];
        exports: string
    }

    function configureLibs (json) {
        var libs = [];
        for (var libName in json) {
            libs.push(getLibConfig(libName, json[libName]));
        }

        var configObject = <RequireConfig>{
            paths: {},
            deps: [],
            shim: {},
            map: {
                "*": {}
            }
        };
        for (var i = 0; i < libs.length; i++) {
            setupLibraryConfig(libs[i], configObject);
        }
        requirejs.config(configObject);
    }

    function getLibConfig (libName: string, libJson: any): ILibraryConfig {
        var path = libJson.path;
        if (!path)
            path = "lib/" + libName + "/" + libName;

        return {
            name: libName,
            path: path,
            deps: libJson.deps,
            exports: libJson.exports
        };
    }

    function setupLibraryConfig (lib: ILibraryConfig, co: RequireConfig) {
        var libName = lib.name;

        co.paths[libName] = lib.path;

        var shim = co.shim[libName] = co.shim[libName] || {};

        if (lib.exports)
            shim.exports = lib.exports;
        if (lib.deps)
            shim.deps = lib.deps;

        co.map['*'][lib.path] = libName;

        Fayde.RegisterLibrary(lib.name, lib.path);
    }
}