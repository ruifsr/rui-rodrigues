/** Classe Prato */
/**
 * @class Representa um prato da ementa
 * @constructs Prato
 * @property {string} nome - nome do prato
 * @property {TipoPrato} tipo - tipo do prato.
 * @property {number} preco - preço do prato.
 */
function Prato(nome, tipo, preco) {
    /** @todo Completar */
    this.nome = nome ? nome : "";
    this.tipo = (tipo && verificaTipo(tipo)) ? tipo : "";
    this.preco = parseFloat(preco) || 0.0;
}

/** Propriedades e Métodos de Classe */
/**
 * @param {Prato} tipo - verifica se válido 
 * @property {string} cabecalhoTabela - devolve uma String com código HTML para construir uma linha de cabeçalho 
 */
function verificaTipo(tipo) {
    tipoUp = tipo.toUpperCase();
    if (tipoUp === "B" || tipoUp === "P" || tipoUp === "E" || tipoUp === "S") {
        return true;
    }
    return false;
}

/** Propriedades e Métodos de Classe */
/**
 * @param {Prato} prato - prato para retirar os atributos
 * @property {string} cabecalhoTabela - devolve uma String com código HTML para construir uma linha de cabeçalho 
 */
Prato.cabecalhoTabela = function (prato) {
    /** @todo Completar */
    var resultado = "<tr>";
    /*for (var propriedade in prato) {
        if ((prato[propriedade] instanceof Function) === false) { //Não incluir as propridade de function (notação array)
            resultado += "<th>" + propriedade + "</th>";
        }
    }*/
    //NOTA: Uma de entre várias alternativas mais modernas
    Object.keys(prato).forEach(propriedade => {
        resultado += "<th>" + propriedade + "</th>";
    })
    return resultado += "</tr>";
};

/** Métodos de Instância */
/**
 * Representação da informação de um prato sob a forma do código HTML para construir uma linha de tabela
 * @returns {string} representação da informação de um prato sob a forma do código HTML para construir uma linha de tabela.
 */
Prato.prototype.toString = function () {
    /** @todo Completar */
    var resultado = "<tr>";
    /*for (var propriedade in this) {
        if ((this[propriedade] instanceof Function) === false) { //Não incluir as propriedades de function (notação array)
            resultado += "<td>" + this[propriedade] + "</td>";
        }
    }*/
    //NOTA: Uma de entre várias alternativas mais modernas
    Object.values(this).forEach(valor => {
        resultado += "<td>" + valor + "</td>";
    })
    return resultado += "</tr>";
};



/** Classe Ementa */
/**
 * @class Representa a ementa do restaurante
 * @constructs Ementa
 * @property {Prato[]} pratos - pratos da ementa
 */
function Ementa() {
    this.pratos = [];
}

/** Métodos de Instância */
/**
 * Cria uma string com código HTML para construir uma tabela com a informação de todos os pratos 
 * @returns {string} código HTML para construir uma tabela com a informação de todos os pratos da ementa.
 */
Ementa.prototype.listarPratos = function () {
    if (this.pratos.length === 0) {
        return "";
    } else {
        var resultado = "<table><thead>" + Prato.cabecalhoTabela(this.pratos[0]) + "</thead>";
        /*this.pratos.forEach(function (currentValue) {
            resultado += currentValue;
        });*/
        //NOTA: Podem utilizar uma function "clássica" (ver acima) ou a notação arrow-function mais compacta.
        this.pratos.forEach(currentValue => {
            resultado += currentValue;
        });
        return resultado += "</table>";
    }
};

/**
 * Acrescenta um prato à ementa.
 * @param {Prato} prato - prato para acrescentar à ementa. 
 */
Ementa.prototype.acrescentarPrato = function (prato) {
    /** @todo Completar */
    this.pratos.push(prato);
};

/** Acrescenta diversos pratos à ementa
 * @param {...Prato} pratos - pratos para acrescentar à ementa. 
 */
Ementa.prototype.acrescentarPratos = function () {
    /*pratos = Array.prototype.slice.call(arguments);*/ //Transformar o "arguments" num array para poder usar o forEach
    //NOTA: No ECMA Script 6 podemos fazer deste modo:
    pratos = Array.from(arguments);
    /*pratos.forEach(function (currentValue) {
        this.acrescentarPrato(currentValue);
    }, this);  *///Indicar que a ementa atual será o this dentro de cada chamada à função anterior
    //NOTA: Versão alternativa com arrow-function.
    //Neste tipo de funções o "this" continua a referir-se ao "scope exterior" sendo desnecessário passar o this para o forEach.
    pratos.forEach(currentValue => {
        this.acrescentarPrato(currentValue);
    });
    return this;
};

/**
 * Remove pratos à ementa
 * @param {string} nome - nome de prato que servirá para selecionar os pratos a remover.
 */
Ementa.prototype.removerPrato = function (nome) {
    /** @todo Completar */
    /*for (var i = 0; i < this.pratos.length; i++) {
        if (this.pratos[i].nome === nome) {
            this.pratos.splice(i, 1);
            i -= 1; //Não deixar avançar o i (no i++ do ciclo) para se testar a mesma posição com o novo prato
        }
    }*/
    //NOTA: Versão mais "moderna" utilizando o filter.
    this.pratos = this.pratos.filter(prato => prato.nome !== nome);
};

/** Apresenta, via alert, a informação (nome e preço) dos pratos da ementa
 * @param {string} nome - parte de um nome de prato que servirá como padrão para selecionar os pratos a apresentar. 
 */
Ementa.prototype.procurarPrato = function (nome) {
    /** @todo Completar */
    /*for (var i = 0; i < this.pratos.length; i++) {
        if (this.pratos[i].nome === nome)
            alert("O preço de " + this.pratos[i].nome + " é " + this.pratos[i].preco + "€");
    }*/
    //NOTA: Versão mais "moderna" utilizando o filter e forEach.
    this.pratos
        .filter(prato => prato.nome === nome)
        .forEach(prato => alert("O preço de " + prato.nome + " é " + prato.preco + "€"))
};

/** Métodos de Classe
 * Coloca a informação da ementa, em formato de tabela, no div com id="pratos" 
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.apresentar = function (ementa) {
    document.getElementById("pratos").innerHTML = ementa.listarPratos();
};

/**Acrescenta um prato à ementa. A informação do prato será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.acrescentar = function (ementa) {
    var informacao = prompt("Indique os dados do prato a adicionar:", "<nome>|<tipo: E-Entrada/B-Bebida/P-Prato Principal/S-Sobremesa>|<preço>");
    if (informacao) {
        var campos = informacao.split("|");
        if (campos.length !== 3)
            alert("Dados mal introduzidos. Devia ser '<nome>|<tipo: E-Entrada/B-Bebida/P-Prato Principal/S-Sobremesa>|<preço>'!");
        else {
            ementa.acrescentarPrato(new Prato(campos[0], campos[1], campos[2]));
            Ementa.apresentar(ementa);
        }
    }
};

/** Remove pratos à ementa. A informação dos nome dos pratos a remover será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.remover = function (ementa) {
    /** @todo Completar */
    var nome = prompt("Indique o nome do prato a remover:", "<nome>");
    if (nome) {
        ementa.removerPrato(nome);
        Ementa.apresentar(ementa);
    }
};

/** Apresenta, via alert, a informação (nome e preço) dos pratos da ementa. A informação dos nome dos pratos a apresentar será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.procurar = function (ementa) {
    /** @todo Completar */
    var nome = prompt("Indique o nome do prato a procurar:", "<nome>");
    if (nome) {
        ementa.procurarPrato(nome);
    }
};

/** @memberof Ementa
 * @property {Ementa} omissao - Ementa por omissão: contém os dados de teste.
 */
Ementa.omissao = (new Ementa()).acrescentarPratos(
    new Prato("Choco Frito", "P", 15.0),
    new Prato("Mousse de Chocolate", "S", 2.5),
    new Prato("Pão", "E", 0.8),
    new Prato("JMF Reserva", "B", 5.2)
);

ementa = Ementa.omissao;