import { productosactivosLocal } from "../config";

export var productosactivos = null;


export var dataFetch = async function (dataBase) {
    try {
        console.log("Estoy en dataFetch voy a probar con esta BD --->", dataBase)
        const resp = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${dataBase}/values/a2:Q?key=AIzaSyAify4p5Tati7XcBqiJT6XIQGSHXMPePMc`
        );

        // A veces el API funciona pero igual no trae la data, por eso hago el chequeo adicional si volvio OK
        if (!resp.ok) throw new Error("dataFetch2: Problema con Fetch de DATOS ");

        const data = await resp.json();

        console.log(
            "Base de Datos en uso ---> ",
            dataBase.substring(30).slice(-10)
        );

        return data.values;

    } catch (error) {
        console.error(error);
        console.log(
            "Sigue la ejecucion con BD Local dentro de Config -- BD operacional no pudo ser accesada"
        );
        // Toma la BAse de datos alterna (local)  es un array que está en el archivo CONFIG.JS
        return productosactivosLocal;
    }
};

// Va al Google Sheets CONFIG y busca el nombre de la base de datos (Archivo GoogleSheets)
export const generateDB = (async function (dbTest = 'default') {
    try {
        // Busca en CONFIG el arhivo Sheets donde está la data (nombre del archivo), luego llama la rutina que hasce el Fetch de la data
        //
        var respuesta = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/1vSAQAKOPNKdduTi4p9T3Dga6cPDPsJqyryi739Tx8jk/values/a1:b?key=AIzaSyAify4p5Tati7XcBqiJT6XIQGSHXMPePMc`
        );
        var resjson = await respuesta.json();
        var configData = await resjson.values;
        // convierte los datos de CONFIG en un Objeto
        var config = Object.fromEntries(configData);
        // console.log("CONFIG DATA ES ", config);

        // Asigna el nombre de Base de Datos que trae de CONFIG como base de Datos a Usar
        var dataBase = config.bd;
        //En caso que el llamado de la pagina WEB traiga el parametro ?bd=stringdebaseddedatosgoogle fuerza el cambio para usar esa BD
        dbTest != "default" ? dataBase = dbTest : "";

        //Llamada para que lea la  Data
        productosactivos = await dataFetch(dataBase); //OJO PONER dataBase COMO PARAMETRO <<<<<<<<<<<<<<<<<<<<<<<<<<<<s

        // console.log("Base de datos Pijamas", productosactivos);
        // Solicita el despliegue de algun grupo subgrupo  si es que estan el los queryparams
        // if (grupo && subgrupo) {
        //     // console.log(`>>>>>>>  despliegaTarjetas(${parametrosObj.grupo},${parametrosObj.subgrupo})`)
        //     // despliegaTarjetas(parametrosObj.grupo, parametrosObj.subgrupo, true, parametrosObj.soloOferta || false);
        //     console.log("Tome los queryparams Grupo y Subgrupo");
        // }
    } catch (error) {
        console.log(
            "Sigue la ejecucion con BD respaldo dentro del CODIGO -- Error en fetch de la REFERENCIA a la BD Google"
        );

        productosactivos = productosactivosLocal;
        // console.log("Base de datos Pijamas que viene de LOCAL", productosactivos);
        //  if (parametrosObj.grupo && parametrosObj.subgrupo) {
        //   despliegaTarjetas(
        //     parametrosObj.grupo,
        //     parametrosObj.subgrupo,
        //     true,
        //     parametrosObj.soloOferta || false
        //   );
        //  }
    }

    // console.log("Base de Datos para trabajar --->", productosactivos);
});
